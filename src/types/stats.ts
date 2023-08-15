import { z } from "zod";
import shared from "./shared";

const stats = z.object({ total: z.number().min(0) });
const date = z.coerce.date().transform((date) => date?.toISOString());

const data = z.object({
	id: z.string(),
	title: z.string().optional(),
	pack: z.string().optional(),
	released: date.optional(),
	bpm: z.number().min(10).max(1000).optional(),
	length: z.number().min(0).optional(),
	characteristic: shared.characteristic,
	difficulty: shared.difficulty,
	colorNotes: stats.extend({}).optional(),
	bombNotes: stats.extend({}).optional(),
	obstacles: stats.extend({}).optional(),
	sliders: stats.extend({}).optional(),
	burstSliders: stats.extend({}).optional(),
	basicBeatmapEvents: stats.extend({}).optional(),
	colorBoostBeatmapEvents: stats.extend({}).optional(),
	rotationEvents: stats.extend({}).optional(),
	bpmEvents: stats.extend({}).optional(),
	lightColorEventBoxGroups: stats.extend({}).optional(),
	lightRotationEventBoxGroups: stats.extend({}).optional(),
	lightTranslationEventBoxGroups: stats.extend({}).optional(),
	waypoints: stats.extend({}).optional(),
	basicEventTypesWithKeywords: stats.extend({}).optional(),
	jumpSpeed: z.number().optional(),
	jumpOffset: z.number().optional(),
	mappers: z.array(z.string()).optional(),
	lighters: z.array(z.string()).optional(),
});
const format = z.union([data.array(), z.record(data)]);
const dataset = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	color: z.string().optional(),
	contributors: z.string().array().optional(),
	updated: date.optional(),
	data: format,
});

export type IStats<T = unknown> = z.infer<typeof stats> & Partial<T>;
export type IProperty<K extends string | number, T = unknown> = Record<K, IStats<T>>;

export type IData = z.infer<typeof data>;
export type IDataset<T = z.infer<typeof format>> = Omit<z.infer<typeof dataset>, "data"> & { data: T };

export default { stats, data, format, dataset };
