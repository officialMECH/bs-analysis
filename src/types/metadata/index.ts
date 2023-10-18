import { z } from "zod";

const characteristic = z.enum(["Standard", "NoArrows", "OneSaber", "Legacy", "360Degree", "90Degree", "Lightshow", "Lawless"]);
const difficulty = z.enum(["Easy", "Normal", "Hard", "Expert", "ExpertPlus"]);

const info = z.object({
	_songName: z.string(),
	_songFilename: z.string(),
	_beatsPerMinute: z.number(),
	_difficultyBeatmapSets: z.array(
		z.object({
			_beatmapCharacteristicName: characteristic,
			_difficultyBeatmaps: z.array(
				z.object({
					_difficulty: difficulty,
					_beatmapFilename: z.string(),
					_noteJumpMovementSpeed: z.number(),
					_noteJumpStartBeatOffset: z.number(),
				})
			),
		})
	),
});

const v2 = z.object({
	_version: z.string(),
	_notes: z.array(z.object({ _type: z.number() })),
	_obstacles: z.array(z.unknown()),
	_sliders: z.array(z.unknown()).optional(),
	_events: z.array(z.object({ _type: z.number() })),
	_waypoints: z.array(z.unknown()).optional(),
	_specialEventsKeywordFilters: z.object({ _keywords: z.array(z.object({ _specialEvents: z.array(z.number()) })).optional() }).optional(),
});

const v3 = z.object({
	version: z.string(),
	colorNotes: z.array(z.unknown()),
	bombNotes: z.array(z.unknown()),
	obstacles: z.array(z.unknown()),
	sliders: z.array(z.unknown()),
	burstSliders: z.array(z.unknown()),
	basicBeatmapEvents: z.array(z.unknown()),
	colorBoostBeatmapEvents: z.array(z.unknown()),
	rotationEvents: z.array(z.unknown()),
	bpmEvents: z.array(z.unknown()),
	lightColorEventBoxGroups: z.array(z.unknown()),
	lightRotationEventBoxGroups: z.array(z.unknown()),
	lightTranslationEventBoxGroups: z.array(z.unknown()).optional(),
	waypoints: z.array(z.unknown()),
	basicEventTypesWithKeywords: z.object({ d: z.array(z.object({ e: z.array(z.number()) })).optional() }),
});

export type IInfo = z.infer<typeof info>;
export type ILevelV2 = z.infer<typeof v2>;
export type ILevelV3 = z.infer<typeof v3>;

export default { characteristic, difficulty, info, v2, v3 };
