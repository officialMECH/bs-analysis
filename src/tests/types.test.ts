import { schemas } from "$/types";
import { describe, expect, test } from "vitest";

describe("Input Validation", () => {
	describe("string", () => {
		const validator = schemas.artificial.string();
		test("basic", () => expect(validator.parse("test")).toEqual("test"));
		test("undefined", () => expect(validator.parse("")).toEqual(undefined));
	});
	describe("number", () => {
		const validator = schemas.artificial.number();
		test("basic", () => expect(validator.parse("100")).toEqual(100));
		test("zero", () => expect(validator.parse("0")).toEqual(0));
		test("undefined", () => expect(validator.parse("")).toEqual(undefined));
	});
	describe("entity", () => {
		const validator = schemas.artificial.entity();
		test("basic", () => expect(validator.parse("100")).toEqual({ total: 100 }));
		test("zero", () => expect(validator.parse("0")).toEqual({ total: 0 }));
		test("undefined", () => expect(validator.parse("")).toEqual(undefined));
	});
});
