import { schemas } from "$/types";
import { parse } from "valibot";
import { describe, expect, test } from "vitest";

describe("Input Validation", () => {
	describe("string", () => {
		const validator = schemas.artificial.string();
		test("basic", () => expect(parse(validator, "test")).toEqual("test"));
		test("undefined", () => expect(parse(validator, "")).toEqual(undefined));
	});
	describe("number", () => {
		const validator = schemas.artificial.number();
		test("basic", () => expect(parse(validator, "100")).toEqual(100));
		test("zero", () => expect(parse(validator, "0")).toEqual(0));
		test("undefined", () => expect(parse(validator, "")).toEqual(undefined));
	});
	describe("entity", () => {
		const validator = schemas.artificial.entity();
		test("basic", () => expect(parse(validator, "100")).toEqual({ total: 100 }));
		test("zero", () => expect(parse(validator, "0")).toEqual({ total: 0 }));
		test("undefined", () => expect(parse(validator, "")).toEqual(undefined));
	});
});
