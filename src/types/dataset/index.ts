import { z } from "zod";
import shared from "../shared";

const date = z.coerce.date().transform((date) => date?.toISOString());

const entity = z.object({ total: z.number().min(0) });

const data = z.object({
	id: shared.id,
	title: z.string().optional(),
	pack: z.string().optional(),
	released: date.optional(),
	bpm: z.number().min(10).max(1000).optional(),
	length: z.number().min(0).optional(),
	characteristic: z.preprocess((value) => {
		if (typeof value === "string" && ["No Arrows", "One Saber", "360 Degree", "90 Degree"].includes(value)) return value.replace(" ", "");
		return value;
	}, shared.characteristic),
	difficulty: z.preprocess((value) => {
		if (typeof value === "string" && ["Expert+"].includes(value)) return "ExpertPlus";
		return value;
	}, shared.difficulty),
	colorNotes: entity.extend({}).optional(),
	bombNotes: entity.extend({}).optional(),
	obstacles: entity.extend({}).optional(),
	sliders: entity.extend({}).optional(),
	burstSliders: entity.extend({}).optional(),
	basicBeatmapEvents: entity.extend({}).optional(),
	colorBoostBeatmapEvents: entity.extend({}).optional(),
	rotationEvents: entity.extend({}).optional(),
	bpmEvents: entity.extend({}).optional(),
	lightColorEventBoxGroups: entity.extend({}).optional(),
	lightRotationEventBoxGroups: entity.extend({}).optional(),
	lightTranslationEventBoxGroups: entity.extend({}).optional(),
	vfxEventBoxGroups: entity.extend({}).optional(),
	waypoints: entity.extend({}).optional(),
	basicEventTypesWithKeywords: entity.extend({}).optional(),
	jumpSpeed: z.number().optional(),
	jumpOffset: z.number().optional(),
	mappers: z.array(z.string()).optional(),
	lighters: z.array(z.string()).optional(),
});

const format = z.union([z.array(data), z.record(data)]);

const dataset = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	color: z.string().optional(),
	contributors: z.string().array().optional(),
	updated: date.optional(),
	data: format,
});

export type IEntity<T = unknown> = z.infer<typeof entity> & Partial<T>;
export type IData = z.infer<typeof data>;
export type IDataset<T = z.infer<typeof format>> = Omit<z.infer<typeof dataset>, "data"> & { data: T };

export default { entity, data, format, dataset };
