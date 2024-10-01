import { pipe, string, transform } from "valibot";

export default {
	characteristic: pipe(
		string(),
		transform((value) => {
			if (typeof value === "string" && ["No Arrows", "One Saber", "360 Degree", "90 Degree"].includes(value)) return value.replace(" ", "");
			return value;
		}),
	),
	difficulty: pipe(
		string(),
		transform((value) => {
			if (typeof value === "string" && ["Expert+"].includes(value)) return "ExpertPlus";
			return value;
		}),
	),
};
