import {GeminiModels} from "../enums/GeminiModels.ts";
import {Settings} from "../types/Settings.ts";

export function GetSettings() {
    let settings: string | null = localStorage.getItem("Settings");
    if (settings == null) {
        const settingsData: Settings = {
            GeminiApiKey: "AIzaSyAPugWtK25v2DXQDzGNN76nTuRyf9e1sdA",
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