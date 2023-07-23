import { Characteristic, Difficulty, schemas } from "$/types";

export function createLevelIndex(data: { characteristic: Characteristic; difficulty: Difficulty }) {
	const c = Object.values(schemas.characteristic.Values).indexOf(data.characteristic);
	const d = Object.values(schemas.difficulty.Values).indexOf(data.difficulty);
	return c * 5 + d;
}
