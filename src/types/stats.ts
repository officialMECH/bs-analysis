import { z } from "zod";
import shared from "./shared";

const date = z.coerce.date().transform((date) => date?.toISOString());

const entity = z.object({ total: shared.total });

const data = z.object({
	id: shared.id,
	title: z.string().optional(),
	pack: z.string().optional(),
	released: date.optional(),
	bpm: z.number().min(10).max(1000).optional(),
	length: shared.total.optional(),
	characteristic: shared.characteristic,
	difficulty: shared.difficulty,
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
