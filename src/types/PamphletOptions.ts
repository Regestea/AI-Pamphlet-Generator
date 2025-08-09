import {Languages} from "../enums/Languages.ts";
import {FileFormats} from "../enums/FileFormats.ts";

export type PamphletOptions = {
    AdditionalPrompt: string,
    Language: Languages,
    Format: FileFormats
}