import {GeminiModels} from "../enums/geminiModels.ts";
import {Settings} from "../types/settings.ts";

export function GetSettings() {
    let settings: string | null = localStorage.getItem("Settings");
    if (settings == null) {
        const settingsData: Settings = {
            GeminiApiKey: "",
            GeminiModel: GeminiModels.Flash,
        }
        settings = JSON.stringify(settingsData);
        localStorage.setItem("Settings", settings);
        return settingsData;
    }
    return JSON.parse(settings) as Settings;
}

export function SetSettings(settings: Settings) {
    localStorage.setItem("Settings", JSON.stringify(settings));
}