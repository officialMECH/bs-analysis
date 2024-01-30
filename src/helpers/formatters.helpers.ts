import { IEntry } from "$/types";
import { createLevelIndex } from "./resolvers.helpers";

export default {
	array: (values: string | (string | number)[]) => {
		if (typeof values === "string") values = values.trim().split(",");
		const formatted = values.map((name, i) => {
			if (i === values.length - 1) return name.toString();
			return `${name.toString()}, `;
		}, null);
		return formatted.join(" ");
	},
	id: (data: IEntry) => `${data.id}/${createLevelIndex(data)}`,
};
