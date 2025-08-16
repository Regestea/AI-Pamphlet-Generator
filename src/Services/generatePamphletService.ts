import { GeminiSendRequest } from "./geminiService";
import { PamphletRequest } from "../requests/pampheltRequest";
import { SystemPromptBuilder } from "../Statics/systemPromptBuilder";

// Helper function for creating a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates a pamphlet by sending requests for each sub-topic and combining the results.
 * @param r The pamphlet request containing topics and options.
 * @returns A promise that resolves to a single Markdown string.
 */
export async function generatePamphletService(r: PamphletRequest): Promise<string> {
    // 1. Create a flat list of all prompts that need to be sent.
    const prompts = r.topics?.flatMap(topicData =>
        topicData.SubTopicList.map(subTopic =>
            new SystemPromptBuilder(
                r.options.Subject,
                topicData.Topic,
                subTopic,
                r.options.Language,
                r.options.AdditionalPrompt
            ).defaultSystemPrompt
        )
    ) ?? []; // Use '?? []' to gracefully handle if r.topics is null/undefined

    // 2. Map each prompt to an asynchronous 'send' call. This creates an array of Promises.
    const promises = prompts.map(prompt => send(prompt));

    // 3. Wait for all the API calls to complete.
    const markdownList = await Promise.all(promises);
    
    // 4. Join the results into a single string. Using two newlines is better for Markdown.
    return markdownList.join("\n\n");
}

/**
 * Sends a prompt to the Gemini API with a retry mechanism.
 * @param prompt The prompt string to send.
 * @param maxRetries The maximum number of times to retry on failure.
 * @returns A promise that resolves to the API response text.
 */
async function send(prompt: string, maxRetries: number = 5): Promise<string> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await GeminiSendRequest({ prompt: prompt });
            if (result.success && result.text != undefined) {
                return result.text; // Success!
            }
            console.warn(`Attempt ${attempt} failed. Retrying in 5 seconds...`);
        } catch (error) {
            console.error(`Attempt ${attempt} threw an error:`, error);
        }

        // Don't wait after the final attempt
        if (attempt < maxRetries) {
            await delay(5000);
        }
    }

    // If all retries fail, throw an error to be handled by the caller.
    throw new Error(`Failed to process prompt after ${maxRetries} attempts.`);
}