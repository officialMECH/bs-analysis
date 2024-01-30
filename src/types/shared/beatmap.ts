import { characteristics, difficulties } from "$/constants/beatmap";
import { coerce, picklist } from "valibot";

export default {
	characteristic: coerce(picklist(characteristics), (value) => {
		if (typeof value === "string" && ["No Arrows", "One Saber", "360 Degree", "90 Degree"].includes(value)) return value.replace(" ", "");
		return value;
	}),
	difficulty: coerce(picklist(difficulties), (value) => {
		if (typeof value === "string" && ["Expert+"].includes(value)) return "ExpertPlus";
		return value;
	}),
};
