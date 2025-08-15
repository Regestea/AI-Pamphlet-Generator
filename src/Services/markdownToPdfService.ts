// src/services/markdownItService.ts
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
});

/**
 * A professional, clean default stylesheet for the PDF.
 * You can customize this or override it with the `customCss` option.
 */
const defaultStyles = `
    /* A reset for margins and padding */
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

    h1 { font-size: 2.2em; }
    h2 { font-size: 1.8em; }
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

    pre {
        background-color: #f1f1f1;
        border-radius: 4px;
        padding: 1em;
        margin-bottom: 1.2em;
        white-space: pre-wrap; /* Wrap long lines of code */
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
    filename?: string;
    customCss?: string;
}

/**
 * Convert markdown -> styled HTML -> multi-page A4 PDF and trigger download.
 */
export async function convertMarkdownToPdf(markdown: string, options: PdfOptions = {}) {
    if (typeof window === "undefined") {
        throw new Error('convertMarkdownToPdf can only run in the browser.');
    }

    const { filename = 'document.pdf', customCss = defaultStyles } = options;

    // 1. Markdown -> HTML (Sanitized)
    const rawHtml = md.render(markdown);
    const safeHtml = DOMPurify.sanitize(rawHtml);

    // 2. Create off-screen wrapper and inject HTML with styles
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.style.width = '800px'; // A good width for A4 printing
    wrapper.style.padding = '24px'; // Generous padding
    wrapper.style.background = 'white';

    // Inject both the styles and the HTML content
    wrapper.innerHTML = `<style>${customCss}</style>${safeHtml}`;
    document.body.appendChild(wrapper);

    try {
        // 3. Render wrapper to canvas
        const canvas = await html2canvas(wrapper, { scale: 2, useCORS: true });

        // 4. PDF Sizing (A4 in mm)
        const A4_WIDTH_MM = 210;
        const A4_HEIGHT_MM = 297;
        const MARGIN_MM = 15; // A slightly larger margin

        const pdf = new jsPDF({
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
        });

        const pdfContentWidthMm = A4_WIDTH_MM - MARGIN_MM * 2;
        const pxPerMm = canvas.width / pdfContentWidthMm;
        const pageHeightPx = Math.floor((A4_HEIGHT_MM - MARGIN_MM * 2) * pxPerMm);

        // 5. Slice canvas into pages and add to PDF
        let yPos = 0;
        while (yPos < canvas.height) {
            const sliceHeightPx = Math.min(pageHeightPx, canvas.height - yPos);
            const sliceCanvas = document.createElement('canvas');
            sliceCanvas.width = canvas.width;
            sliceCanvas.height = sliceHeightPx;
            const ctx = sliceCanvas.getContext('2d');
            if (!ctx) throw new Error('Failed to get canvas 2D context.');

            ctx.drawImage(canvas, 0, yPos, canvas.width, sliceHeightPx, 0, 0, canvas.width, sliceHeightPx);

            const imgData = sliceCanvas.toDataURL('image/jpeg', 0.95);
            const sliceHeightMm = sliceHeightPx / pxPerMm;

            if (yPos > 0) pdf.addPage();
            pdf.addImage(imgData, 'JPEG', MARGIN_MM, MARGIN_MM, pdfContentWidthMm, sliceHeightMm);

            yPos += sliceHeightPx;
        }

        // 6. Save PDF
        pdf.save(filename);
    } finally {
        // Cleanup
        wrapper.remove();
    }
}