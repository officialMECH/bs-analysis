import { array, number, object, string, unknown } from "valibot";

export default {
	beatmap: object({
		version: string(),
		colorNotes: array(unknown()),
		bombNotes: array(unknown()),
		obstacles: array(unknown()),
		sliders: array(unknown()),
		burstSliders: array(unknown()),
		basicBeatmapEvents: array(unknown()),
		colorBoostBeatmapEvents: array(unknown()),
		rotationEvents: array(unknown()),
		bpmEvents: array(unknown()),
		lightColorEventBoxGroups: array(unknown()),
		lightRotationEventBoxGroups: array(unknown()),
		lightTranslationEventBoxGroups: array(unknown()),
		vfxEventBoxGroups: array(unknown()),
		waypoints: array(unknown()),
		basicEventTypesWithKeywords: object({ d: array(object({ e: array(number()) })) }),
	}),
};
