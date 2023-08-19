import { Characteristic, Difficulty, IData, schemas } from "$/types";
import { createLevelIndex } from "./resolvers.helpers";

export default {
	string: (a: string, b: string) => a.localeCompare(b),
	released: (a: string | Date, b: string | Date) => new Date(a).valueOf() - new Date(b).valueOf(),
	level: (a: Pick<IData, "characteristic" | "difficulty">, b: Pick<IData, "characteristic" | "difficulty">) => createLevelIndex(a) - createLevelIndex(b),
	characteristic: (a: Characteristic, b: Characteristic) => {
		const order = Object.values(schemas.characteristic.Values);
		return order.indexOf(a) - order.indexOf(b);
	},
	difficulty: (a: Difficulty, b: Difficulty) => {
		const order = Object.values(schemas.difficulty.Values);
		return order.indexOf(a) - order.indexOf(b);
	},
} satisfies Record<string, (a: never, b: typeof a) => number>;
