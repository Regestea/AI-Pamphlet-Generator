// src/services/markdownItService.ts
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';

const md = new MarkdownIt({
    html: true, // Enable HTML tags in source
    linkify: true, // Autoconvert URL-like text to links
    typographer: true, // Enable smartquotes and other typographic replacements
});

/**
 * A professional, clean default stylesheet for the PDF.
 * You can customize this or override it with the `customCss` option.
 */
const defaultStyles = `
    /* A simple reset for margins and padding */
    body, h1, h2, h3, h4, p, ul, ol, pre {
        margin: 0;
        padding: 0;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: #333;
    }

    h1, h2, h3, h4 {
        margin-bottom: 0.75em;
        font-weight: 600;
        line-height: 1.2;
    }

    h1 { font-size: 2.2em; border-bottom: 1px solid #eaecef; padding-bottom: .3em; }
    h2 { font-size: 1.8em; border-bottom: 1px solid #eaecef; padding-bottom: .3em; }
    h3 { font-size: 1.4em; }

    p {
        margin-bottom: 1.2em;
    }

    ul, ol {
        margin-bottom: 1.2em;
        padding-left: 1.5em;
    }

    a {
        color: #007bff;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }

    pre {
        background-color: #f1f1f1;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 1em;
        margin-bottom: 1.2em;
        white-space: pre-wrap; /* Wrap long lines of code */
        word-wrap: break-word; /* Break long words */
        font-size: 0.9em;
    }

    code {
        font-family: "Courier New", Courier, monospace;
    }

    strong {
        font-weight: bold;
    }
`;

export interface PdfOptions {
    /** Custom CSS to style the PDF content. Overrides the default styles. */
    customCss?: string;
}

/**
 * Converts a Markdown string into a styled, multi-page A4 PDF
 * and returns a local Blob URL for the generated file.
 *
 * @param markdown The Markdown string to convert.
 * @param options Configuration options for styling.
 * @returns A Promise that resolves to a Blob URL string.
 */
export async function convertMarkdownToPdf(markdown: string, options: PdfOptions = {}): Promise<string> {
    if (typeof window === "undefined") {
        // This function is browser-only because it interacts with the DOM.
        throw new Error('convertMarkdownToPdf can only run in the browser.');
    }

    const { customCss = defaultStyles } = options;

    // 1. Markdown -> HTML (Sanitized for security)
    const rawHtml = md.render(markdown);
    const safeHtml = DOMPurify.sanitize(rawHtml);

    // 2. Create an off-screen container to render the HTML for capturing.
    // This element is positioned outside the viewport so the user doesn't see it.
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-9999px'; // Position off-screen
    wrapper.style.top = '0';
    wrapper.style.width = '800px'; // A good width for A4 printing simulation
    wrapper.style.padding = '24px';
    wrapper.style.background = 'white';
    wrapper.style.boxSizing = 'border-box';

    // Inject both the styles and the HTML content into the wrapper
    wrapper.innerHTML = `<style>${customCss}</style>${safeHtml}`;
    document.body.appendChild(wrapper);

    try {
        // 3. Render the off-screen wrapper to a canvas using html2canvas.
        const canvas = await html2canvas(wrapper, {
            scale: 2, // Render at a higher resolution for better PDF quality
            useCORS: true,
        });

        // 4. Define PDF dimensions (A4 in millimeters)
        const A4_WIDTH_MM = 210;
        const A4_HEIGHT_MM = 297;
        const MARGIN_MM = 15; // A comfortable margin

        const pdf = new jsPDF({
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
        });

        const pdfContentWidthMm = A4_WIDTH_MM - MARGIN_MM * 2;
        const pxPerMm = canvas.width / pdfContentWidthMm;
        const pageHeightPx = Math.floor((A4_HEIGHT_MM - MARGIN_MM * 2) * pxPerMm);

        // 5. Slice the canvas into page-sized chunks and add them to the PDF.
        let yPos = 0;
        while (yPos < canvas.height) {
            const sliceHeightPx = Math.min(pageHeightPx, canvas.height - yPos);
            const sliceCanvas = document.createElement('canvas');
            sliceCanvas.width = canvas.width;
            sliceCanvas.height = sliceHeightPx;
            const ctx = sliceCanvas.getContext('2d');
            if (!ctx) throw new Error('Failed to get canvas 2D context.');

            // Draw a slice of the master canvas onto the page canvas
            ctx.drawImage(canvas, 0, yPos, canvas.width, sliceHeightPx, 0, 0, canvas.width, sliceHeightPx);

            const imgData = sliceCanvas.toDataURL('image/jpeg', 0.95);
            const sliceHeightMm = sliceHeightPx / pxPerMm;

            if (yPos > 0) pdf.addPage(); // Add a new page for subsequent slices
            pdf.addImage(imgData, 'JPEG', MARGIN_MM, MARGIN_MM, pdfContentWidthMm, sliceHeightMm);

            yPos += sliceHeightPx;
        }

        // 6. Generate the PDF as a Blob and create a URL for it.
        const pdfBlob = pdf.output('blob');
        return URL.createObjectURL(pdfBlob);

    } finally {
        // 7. Always clean up by removing the off-screen element from the DOM.
        wrapper.remove();
    }
}
