import {Languages} from "../enums/languages.ts";
import {FileFormats} from "../enums/fileFormats.ts";

export type PamphletOptions = {
    AdditionalPrompt: string,
    Subject:string,
    Language: Languages,
    Format: FileFormats
}