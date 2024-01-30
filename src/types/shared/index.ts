import { Output } from "valibot";
import { default as beatmap } from "./beatmap";
import { default as data } from "./data";

export default {
	beatmap,
	data,
};

export type Characteristic = Output<typeof beatmap.characteristic>;
export type Difficulty = Output<typeof beatmap.difficulty>;

export type IEntity = Output<ReturnType<typeof data.entity>>;
