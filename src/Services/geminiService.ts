import {GoogleGenAI} from "@google/genai";
import {GetSettings} from "./settingsService.ts";
import {GeminiRequest} from "../requests/geminiRequest.ts";

export async function GeminiSendRequest(geminiRequest: GeminiRequest) {
    const ai = new GoogleGenAI({apiKey: GetSettings().GeminiApiKey});
    
    const settings = GetSettings();

    try {
        const response = await ai.models.generateContent({
            model: settings.GeminiModel,
            contents: [
                {role: "user", parts: [{text: geminiRequest.prompt}]},
            ],
        });

        return {success: true, text: response.text};
    } catch (err) {
        return {success: false, error: {message: String(err)}};
    }
}
