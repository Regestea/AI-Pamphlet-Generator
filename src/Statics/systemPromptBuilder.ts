export class SystemPromptBuilder {
    public readonly defaultSystemPrompt: string;

    constructor(subject: string, topic:string, subTopic:string, language: string, userPrompt?: string) {
        this.defaultSystemPrompt = `
System:
    the whole pamphlet subject is ${subject}
    your task is make a pamphlet at this topic : ${topic} about ${subTopic} no need to say anything about topic just make a pamphlet about his ${subTopic} the topic : ${topic} is just a classification
    The goal is a detailed and structured document, not a brief summary.
    Final Output: The entire response must be the pamphlet itself, formatted in Markdown. Do not include any introductory phrases like "Here is the pamphlet."
    Pamphlet Structure: The pamphlet should be well-structured with a main title, headings for different sections, and the use of bullet points or lists to organize information.
    Content Enrichment: If the topic requires it for clarity, you may add relevant examples or brief explanations to enhance the pamphlet's content.
    Language: The pamphlet must be written in \`${language}\`.
    ${userPrompt?.trim() ? `userPrompt: ${userPrompt}\n` : ""}
`;
    }
}
