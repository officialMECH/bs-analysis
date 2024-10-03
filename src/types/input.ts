import { GenericSchema, InferOutput, StringSchema, literal, pipe, string, transform, union } from "valibot";

// HACK: undefined input values are pain, this is my personal hell
function artificial<T, S extends GenericSchema>(schema: S, transformer = (x: InferOutput<S>) => x as T) {
	return pipe(
		union([schema, literal("")]) as unknown as StringSchema<undefined>,
		transform((x) => {
			if (typeof x === "string" && x === "") return undefined;
			if (Array.isArray(x) && x.length === 0) return undefined;
			return x !== "" ? transformer(x) : undefined;
		}),
	);
}

export default {
	refine: artificial,
	string: (schema: GenericSchema = string()) => artificial(schema, (x) => String(x)),
	number: (schema: GenericSchema = string()) => artificial(schema, (x) => Number(x)),
	entity: (schema: GenericSchema = string()) => artificial(schema, (x) => ({ total: Number(x) })),
};
