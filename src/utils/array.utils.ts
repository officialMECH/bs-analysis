import { Predicate } from "$/types";

export const predicates = {
	unique: <T>(value: T, index: number, array: T[]) => array.indexOf(value) === index,
} satisfies Record<string, Predicate<unknown, unknown>>;
