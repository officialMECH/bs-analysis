import { ObjectEntries, ObjectSchema, array, isoTimestamp, maxValue, minValue, number, object, partial, pipe, record, string, variant } from "valibot";
import shared from "../shared";

const metadata = {
	dataset: partial(
		object({
			name: string(),
			description: string(),
			color: string(),
			contributors: array(string()),
			updated: pipe(string(), isoTimestamp()),
		}),
	),
	entry: partial(
		object({
			title: string(),
			pack: string(),
			released: pipe(string(), isoTimestamp()),
			bpm: pipe(number(), minValue(10), maxValue(1000)),
			length: pipe(number(), minValue(0)),
			colorNotes: shared.data.entity({}),
			bombNotes: shared.data.entity({}),
			obstacles: shared.data.entity({}),
			sliders: shared.data.entity({}),
			burstSliders: shared.data.entity({}),
			basicBeatmapEvents: shared.data.entity({}),
			colorBoostBeatmapEvents: shared.data.entity({}),
			rotationEvents: shared.data.entity({}),
			bpmEvents: shared.data.entity({}),
			njsEvents: shared.data.entity({}),
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
		}),
	),
} satisfies Record<string, ObjectSchema<ObjectEntries, undefined>>;

const entry = object({
	...object({
		id: shared.data.id,
		characteristic: shared.beatmap.characteristic,
		difficulty: shared.beatmap.difficulty,
	}).entries,
	...metadata.entry.entries,
});

const dataset = variant("data", [
	object({ ...metadata.dataset.entries, ...object({ data: array(entry) }).entries }),
	object({ ...metadata.dataset.entries, ...object({ data: record(string(), entry) }).entries }),
	//
]);

export default { dataset, entry, metadata };
