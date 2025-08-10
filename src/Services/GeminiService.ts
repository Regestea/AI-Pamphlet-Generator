import {GoogleGenAI} from "@google/genai";
import {GetSettings} from "./SettingsService.ts";
import {GeminiRequest} from "../Requests/GeminiRequest.ts";

export async function GeminiSendRequest(geminiRequest: GeminiRequest) {
    const ai = new GoogleGenAI({apiKey: GetSettings().GeminiApiKey});
    
    const settings = GetSettings();

    try {
        const response = await ai.models.generateContent({
            model: settings.GeminiModel,
            contents: [
                // System prompt (correct role is "system", not "model")
                {role: "model", parts: [{text: geminiRequest.systemPrompt}]},

                // User message
                {role: "user", parts: [{text: geminiRequest.userPrompt}]},
            ],
        });

        return {success: true, text: response.text};
    } catch (err) {
        return {success: false, error: {message: String(err)}};
    }
}
