import {PamphletOptions} from "../types/pamphletOptions.ts";
import {TopicData} from "../types/topicData.ts";

export type PamphletRequest = {
    options: PamphletOptions ,
    topics: TopicData[] | null,
}