import {GeminiSendRequest} from "./geminiService";
import {PamphletRequest} from "../requests/pampheltRequest";
import {SystemPromptBuilder} from "../Statics/systemPromptBuilder";

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
    ) ?? [];

    // 2. Sequentially process each prompt with a delay in between.
    const markdownList: string[] = [];
    for (const [index, prompt] of prompts.entries()) {
        // Send the request and wait for the result
        const result = await send(prompt);
        markdownList.push(result);

        // Wait for 13 seconds, but ONLY if it's not the last item
        if (index < prompts.length - 1) {
            console.log("Request sent. Delaying 13s before the next one...");
            await delay(13000);
        }
    }

    // 3. Join the results into a single string.
    return markdownList.join("\n\n");
}

/**
 * Sends a prompt to the Gemini API with a retry mechanism.
 * (This function is correct and does not need changes)
 * @param prompt The prompt string to send.
 * @param maxRetries The maximum number of times to retry on failure.
 * @returns A promise that resolves to the API response text.
 */
async function send(prompt: string, maxRetries: number = 5): Promise<string> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await GeminiSendRequest({prompt: prompt});
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