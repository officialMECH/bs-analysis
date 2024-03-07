import { array, number, object, optional, string } from "valibot";
import { list } from "../helpers";
import shared from "../shared";

export default {
	info: object({
		version: string(),
		song: object({ title: string() }),
		audio: object({
			songFilename: string(),
			songDuration: number(),
			audioDataFilename: string(),
			bpm: number(),
			lufs: number(),
		}),
		difficultyBeatmaps: array(
			object({
				characteristic: shared.beatmap.characteristic,
				difficulty: shared.beatmap.difficulty,
				beatmapAuthors: object({
					mappers: array(string()),
					lighters: array(string()),
				}),
				noteJumpMovementSpeed: number(),
				noteJumpStartBeatOffset: number(),
				beatmapDataFilename: string(),
				lightshowDataFilename: string(),
			})
		),
	}),
	audio: object({
		version: string(),
		bpmData: optional(array(object({}))),
	}),
	beatmap: object({
		version: string(),
		colorNotes: optional(array(object({}))),
		bombNotes: optional(array(object({}))),
		obstacles: optional(array(object({}))),
		chains: optional(array(object({}))),
		arcs: optional(array(object({}))),
		spawnRotations: optional(array(object({}))),
	}),
	lightshow: object({
		version: string(),
		waypoints: optional(array(object({}))),
		basicEvents: optional(array(object({}))),
		colorBoostEvents: optional(array(object({}))),
		eventBoxGroups: optional(array(object({ t: list([0, 1, 2, 3, 4]) }))),
		basicEventTypesWithKeywords: optional(object({ d: array(object({ e: array(number()) })) })),
	}),
};
