import { InferOutput } from "valibot";
import { default as beatmap } from "./beatmap";
import { default as data } from "./data";

export default {
	beatmap,
	data,
};

export type Characteristic = "Standard" | "NoArrows" | "OneSaber" | "Legacy" | "360Degree" | "90Degree" | "Lightshow" | "Lawless";
export type Difficulty = "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus";

export type IEntity = InferOutput<ReturnType<typeof data.entity>>;
