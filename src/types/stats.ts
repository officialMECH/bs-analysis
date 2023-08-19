import { ZodIssueCode, z } from "zod";
import shared from "./shared";

const date = z.coerce.date().transform((date) => date?.toISOString());

const entity = z.object({ total: z.number().min(0) });

const data = z.object({
	id: z.string().nonempty(),
	title: z.string().optional(),
	pack: z.string().optional(),
	released: date.optional(),
	bpm: z.number().min(10).max(1000).optional(),
	length: z.number().min(0).optional(),
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

const format = z.union([
	data.array().min(1),
	z.record(data).superRefine((arg, ctx) => {
		// @ts-ignore
		if (Object.values(arg).length === 0) ctx.addIssue({ code: ZodIssueCode.too_small, minimum: 0, type: "object", inclusive: true, exact: false, message: "Object must contain at least 1 element(s)" });
		return true;
	}),
]);

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

export default { stats: entity, data, format, dataset };
