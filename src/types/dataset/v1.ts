import { ObjectEntries, ObjectSchema, array, isoTimestamp, maxValue, merge, minValue, number, object, partial, record, string, variant } from "valibot";
import shared from "../shared";

const metadata = {
	dataset: partial(
		object({
			name: string(),
			description: string(),
			color: string(),
			contributors: array(string()),
			updated: string([isoTimestamp()]),
		})
	),
	entry: partial(
		object({
			title: string(),
			pack: string(),
			released: string([isoTimestamp()]),
			bpm: number([minValue(10), maxValue(1000)]),
			length: number([minValue(0)]),
			colorNotes: shared.data.entity({}),
			bombNotes: shared.data.entity({}),
			obstacles: shared.data.entity({}),
			sliders: shared.data.entity({}),
			burstSliders: shared.data.entity({}),
			basicBeatmapEvents: shared.data.entity({}),
			colorBoostBeatmapEvents: shared.data.entity({}),
			rotationEvents: shared.data.entity({}),
			bpmEvents: shared.data.entity({}),
			lightColorEventBoxGroups: shared.data.entity({}),
			lightRotationEventBoxGroups: shared.data.entity({}),
			lightTranslationEventBoxGroups: shared.data.entity({}),
			vfxEventBoxGroups: shared.data.entity({}),
			waypoints: shared.data.entity({}),
			basicEventTypesWithKeywords: shared.data.entity({}),
			jumpSpeed: number(),
			jumpOffset: number(),
			mappers: array(string()),
			lighters: array(string()),
		})
	),
} satisfies Record<string, ObjectSchema<ObjectEntries>>;

const entry = merge([
	object({
		id: shared.data.id,
		characteristic: shared.beatmap.characteristic,
		difficulty: shared.beatmap.difficulty,
	}),
	metadata.entry,
]);

const dataset = variant("data", [
	merge([metadata.dataset, object({ data: array(entry) })]),
	merge([metadata.dataset, object({ data: record(entry) })]),
	//
]);

export default { dataset, entry, metadata };
