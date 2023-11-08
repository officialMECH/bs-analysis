import { ZodSchema, z } from "zod";

// HACK: undefined input values are pain, this is my personal hell
function artificial<T, S extends ZodSchema>(schema: S, transformer = (x: z.infer<S>) => x as T) {
	return z.union([schema, z.literal("")]).transform((x) => {
		if (typeof x === "string" && x === "") return undefined;
		if (Array.isArray(x) && x.length === 0) return undefined;
		return x !== "" ? transformer(x) : undefined;
	});
}

export default {
	refine: artificial,
	string: (schema: ZodSchema = z.string()) => artificial(schema, (x) => String(x)),
	number: (schema: ZodSchema = z.string()) => artificial(schema, (x) => Number(x)),
	entity: (schema: ZodSchema = z.string()) => artificial(schema, (x) => ({ total: Number(x) })),
};
