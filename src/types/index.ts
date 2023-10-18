import { ZodSchema, literal, union } from "zod";
import { default as stats } from "./dataset";
import { default as metadata } from "./metadata";
import shared from "./shared";

export * from "./components";
export * from "./dataset";
export * from "./metadata";
export * from "./shared";

export interface Entry<T> {
	name: string;
	contents: T;
}

export const schemas = { ...shared, ...stats, metadata };

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
