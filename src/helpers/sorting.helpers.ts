import { characteristics, difficulties } from "$/constants/beatmap";
import { Characteristic, Difficulty, IEntry } from "$/types";
import { createLevelIndex } from "./resolvers.helpers";

export default {
	string: (a: string, b: string) => a.localeCompare(b),
	released: (a: string | Date, b: string | Date) => new Date(a).valueOf() - new Date(b).valueOf(),
	level: (a: Pick<IEntry, "characteristic" | "difficulty">, b: Pick<IEntry, "characteristic" | "difficulty">) => createLevelIndex(a) - createLevelIndex(b),
	characteristic: (a: Characteristic, b: Characteristic) => {
		const order = characteristics;
		return order.indexOf(a) - order.indexOf(b);
	},
	difficulty: (a: Difficulty, b: Difficulty) => {
		const order = difficulties;
		return order.indexOf(a) - order.indexOf(b);
	},
} satisfies Record<string, (a: never, b: typeof a) => number>;
