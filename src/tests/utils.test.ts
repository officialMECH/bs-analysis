import { common, difference, prune } from "$/utils";
import { describe, expect, test } from "vitest";

describe("Object Utils", () => {
	type Type<T> = { same: T | undefined; different: T | undefined };
	describe(common.name, () => {
		test("string", () => {
			const a = { same: "test", different: "one" };
			const b = { same: "test", different: undefined };
			expect(common<Type<unknown>>(a, b)).toEqual({ same: "test" });
		});
		test("number", () => {
			const a = { same: 0, different: 1 };
			const b = { same: 0, different: undefined };
			expect(common<Type<unknown>>(a, b)).toEqual({ same: 0 });
		});
		test("array", () => {
			const a = { same: [0, 1], different: [0, 1] };
			const b = { same: [0, 1], different: undefined };
			expect(common<Type<unknown>>(a, b)).toEqual({ same: [0, 1] });
		});
		test("object", () => {
			const a = { nested: { same: "one", different: "one" } };
			const b = { nested: { same: "one", different: undefined } };
			expect(common<Record<string, Type<unknown> | undefined>>(a, b)).toEqual({ nested: { same: "one" } });
		});
		test("undefined", () => {
			const a = { same: undefined, different: 0 };
			const b = { same: undefined, different: undefined };
			expect(common<Type<unknown>>(a, b)).toEqual({ same: undefined });
		});
	});
	describe(difference.name, () => {
		test("string", () => {
			const a = { same: "test", different: "one" };
			const b = { same: "test", different: "two" };
			expect(difference<Type<unknown>>(a, b)).toEqual([{ different: "one" }, { different: "two" }]);
		});
		test("number", () => {
			const a = { same: 0, different: 1 };
			const b = { same: 0, different: 2 };
			expect(difference<Type<unknown>>(a, b)).toEqual([{ different: 1 }, { different: 2 }]);
		});
		describe("array", () => {
			test("basic", () => {
				const a = { same: [0, 1], different: [0, 1] };
				const b = { same: [0, 1], different: [1, 0] };
				expect(difference<Type<unknown>>(a, b)).toEqual([{ different: [0, 1] }, { different: [1, 0] }]);
			});
			test("undefined", () => {
				const a = { same: [0, 1], different: [0, 1] };
				const b = { same: [0, 1], different: undefined };
				expect(difference<Type<unknown>>(a, b)).toEqual([{ different: [0, 1] }, { different: undefined }]);
			});
		});
		describe("object", () => {
			test("basic", () => {
				const a = { nested: { same: "one", different: "one" } };
				const b = { nested: { same: "one", different: "two" } };
				expect(difference<Record<string, Type<unknown> | undefined>>(a, b)).toEqual([{ nested: { different: "one" } }, { nested: { different: "two" } }]);
			});
			test("undefined", () => {
				const a = { nested: { same: "one", different: "one" } };
				const b = { nested: undefined };
				expect(difference<Record<string, Type<unknown> | undefined>>(a, b)).toEqual([{ nested: { same: "one", different: "one" } }, { nested: undefined }]);
			});
		});
		test("undefined", () => {
			const a = { same: undefined, different: 0 };
			const b = { same: undefined, different: undefined };
			expect(difference<Type<unknown>>(a, b)).toEqual([{ different: 0 }, { different: undefined }]);
		});
	});
	describe(prune.name, () => {
		test("undefined", () => expect(prune({ value: undefined })).toEqual({}));
		test("string", () => expect(prune({ value: "test", ignored: "" })).toEqual({ value: "test" }));
		test("number", () => expect(prune({ value: 0, ignored: NaN })).toEqual({ value: 0 }));
		test("array", () => expect(prune({ value: [0, 1], ignored: [] })).toEqual({ value: [0, 1] }));
		test("object", () => expect(prune({ value: { total: 100 }, ignored: undefined })).toEqual({ value: { total: 100 } }));
		test("recursive case", () => expect(prune({ nested: { value: "test", total: undefined } })).toEqual({ nested: { value: "test" } }));
	});
});
