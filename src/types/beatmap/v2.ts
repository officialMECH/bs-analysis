import { array, number, object, string, unknown } from "valibot";
import shared from "../shared";

export default {
	info: object({
		_songName: string(),
		_songFilename: string(),
		_beatsPerMinute: number(),
		_difficultyBeatmapSets: array(
			object({
				_beatmapCharacteristicName: shared.beatmap.characteristic,
				_difficultyBeatmaps: array(
					object({
						_difficulty: shared.beatmap.difficulty,
						_beatmapFilename: string(),
						_noteJumpMovementSpeed: number(),
						_noteJumpStartBeatOffset: number(),
					})
				),
			})
		),
	}),
	beatmap: object({
		_version: string(),
		_notes: array(object({ _type: number() })),
		_obstacles: array(unknown()),
		_sliders: array(unknown()),
		_events: array(object({ _type: number() })),
		_waypoints: array(unknown()),
		_specialEventsKeywordFilters: object({ _keywords: array(object({ _specialEvents: array(number()) })) }),
	}),
};
