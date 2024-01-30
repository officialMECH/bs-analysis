import { BaseSchema, Output, literal, string, transform, union } from "valibot";

// HACK: undefined input values are pain, this is my personal hell
function artificial<T, S extends BaseSchema>(schema: S, transformer = (x: Output<S>) => x as T) {
	return transform(union([schema, literal("")]), (x) => {
		if (typeof x === "string" && x === "") return undefined;
		if (Array.isArray(x) && x.length === 0) return undefined;
		return x !== "" ? transformer(x) : undefined;
	});
}

export default {
	refine: artificial,
	string: (schema: BaseSchema = string()) => artificial(schema, (x) => String(x)),
	number: (schema: BaseSchema = string()) => artificial(schema, (x) => Number(x)),
	entity: (schema: BaseSchema = string()) => artificial(schema, (x) => ({ total: Number(x) })),
};
