

export function MarkdownToFIleService(markdown: string) {
    // 1. Generate a random filename using a GUID/UUID.
    const fileName = `${crypto.randomUUID()}.md`;

    // 2. Create a Blob from the markdown content.
    // A Blob (Binary Large Object) is a file-like object of immutable, raw data.
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });

    // 3. Create a URL for the Blob.
    // This URL is a reference to the Blob data in the browser's memory.
    const url = URL.createObjectURL(blob);

    // 4. Create a temporary anchor (<a>) element to trigger the download.
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName); // Set the generated file name

    // 5. Append the link to the body, click it, and then remove it.
    // This is done to ensure the link is "clickable" in all browsers.
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 6. Clean up by revoking the Object URL to free up memory.
    URL.revokeObjectURL(url);
}