import { ZodSchema, literal, union } from "zod";
import shared from "./shared";
import stats from "./stats";

export * from "./components";
export * from "./shared";
export * from "./stats";

export const schemas = { ...shared, ...stats };

// HACK: undefined input values are pain, this is my personal hell
export function artificial<T>(schema: ZodSchema, transformer = (x: unknown) => x as T) {
	return union([schema, literal("")]).transform((x) => {
		if (typeof x === "string" && x === "") return undefined;
		if (Array.isArray(x) && x.length === 0) return undefined;
		return x !== "" ? transformer(x) : undefined;
	});
}

export const numeric = (s: ZodSchema) => artificial(s, (x) => Number(x));
export const entity = (s: ZodSchema) => artificial(s, (x) => ({ total: Number(x) }));
