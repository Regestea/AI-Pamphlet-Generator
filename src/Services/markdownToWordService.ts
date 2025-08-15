// src/services/markdownToWordService.ts
import MarkdownIt from 'markdown-it';
import { saveAs } from 'file-saver';
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    ShadingType,
    IStylesOptions,
} from 'docx';

// Initialize markdown-it
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
});

/**
 * Parses an HTML node and its children to create an array of docx Paragraphs.
 */
function htmlToDocxObjects(node: Node): Paragraph[] {
    const paragraphs: Paragraph[] = [];

    const processChildren = (
        childNodes: NodeListOf<ChildNode>,
        paragraphProps: any = {}
    ): Paragraph => {
        const runs: TextRun[] = [];
        childNodes.forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
                runs.push(new TextRun(child.textContent || ''));
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                const elem = child as HTMLElement;
                let textRunOptions: any = {};

                if (elem.nodeName === 'STRONG' || elem.nodeName === 'B') {
                    textRunOptions.bold = true;
                }
                if (elem.nodeName === 'EM' || elem.nodeName === 'I') {
                    textRunOptions.italics = true;
                }

                elem.childNodes.forEach((nestedChild) => {
                    if (nestedChild.nodeType === Node.TEXT_NODE) {
                        runs.push(
                            new TextRun({
                                text: nestedChild.textContent || '',
                                ...textRunOptions,
                            })
                        );
                    }
                });
            }
        });
        return new Paragraph({ ...paragraphProps, children: runs });
    };

    node.childNodes.forEach((childNode) => {
        if (childNode.nodeType !== Node.ELEMENT_NODE) return;

        const element = childNode as HTMLElement;
        let paragraph: Paragraph | null = null;

        switch (element.nodeName) {
            case 'H1':
                paragraph = processChildren(element.childNodes, { heading: HeadingLevel.HEADING_1 });
                break;
            case 'H2':
                paragraph = processChildren(element.childNodes, { heading: HeadingLevel.HEADING_2 });
                break;
            case 'P':
                paragraph = processChildren(element.childNodes);
                break;
            case 'PRE':
                const codeNode = element.querySelector('code');
                if (codeNode) {
                    paragraph = new Paragraph({
                        children: [
                            new TextRun({
                                text: codeNode.textContent || '',
                                font: 'Gadugi', // Keep monospace font for code
                            }),
                        ],
                        shading: {
                            type: ShadingType.CLEAR,
                            fill: 'F1F1F1',
                        },
                    });
                }
                break;
            case 'UL':
            case 'OL':
                element.querySelectorAll('li').forEach((li) => {
                    const listParagraph = new Paragraph({
                        children: [new TextRun(li.textContent || '')],
                        bullet: { level: 0 },
                    });
                    paragraphs.push(listParagraph);
                });
                break;
        }

        if (paragraph) {
            paragraphs.push(paragraph);
        }
    });

    return paragraphs;
}

export async function convertMarkdownToWord(markdown: string, filename = 'document.docx') {
    if (typeof window === "undefined") {
        throw new Error("convertMarkdownToWord can only run in the browser.");
    }

    try {
        const htmlString = md.render(markdown);
        const parser = new DOMParser();
        const docHtml = parser.parseFromString(htmlString, 'text/html');
        const docxObjects = htmlToDocxObjects(docHtml.body);

        // --- NEW: Define default styles for the document ---
        const docStyles: IStylesOptions = {
            default: {
                document: {
                    run: {
                        font: 'Gadugi', // Set the default font here
                    },
                },
            },
        };

        const doc = new Document({
            styles: docStyles, // Apply the default styles
            sections: [{
                children: docxObjects,
            }],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, filename);

    } catch (error) {
        console.error("Failed to convert Markdown to Word:", error);
        throw new Error("An error occurred during the Word document generation.");
    }
}