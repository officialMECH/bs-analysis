import { array, number, object, string } from "valibot";
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
		bpmData: array(object({})),
	}),
	beatmap: object({
		version: string(),
		colorNotes: array(object({})),
		bombNotes: array(object({})),
		obstacles: array(object({})),
		chains: array(object({})),
		arcs: array(object({})),
		spawnRotations: array(object({})),
	}),
	lightshow: object({
		version: string(),
		waypoints: array(object({})),
		basicEvents: array(object({})),
		colorBoostEvents: array(object({})),
		eventBoxGroups: array(object({ t: list([0, 1, 2, 3, 4]) })),
		basicEventTypesWithKeywords: object({ d: array(object({ e: array(number()) })) }),
	}),
};
