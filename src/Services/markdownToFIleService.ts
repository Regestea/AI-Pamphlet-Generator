

export function MarkdownToFIleService(markdown: string) {

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });

    return URL.createObjectURL(blob);
}