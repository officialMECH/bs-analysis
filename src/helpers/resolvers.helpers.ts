import { Characteristic, Difficulty, schemas } from "$/types";

export function createLevelIndex(data: { characteristic: Characteristic; difficulty: Difficulty }) {
	const c = Object.values(schemas.characteristic.Values).indexOf(data.characteristic);
	const d = Object.values(schemas.difficulty.Values).indexOf(data.difficulty);
	return c * 5 + d;
}

export function resolveLevelIndex(value: number) {
	const c = Math.floor(value / 5);
	const d = value % 5;
	return {
		characteristic: Object.values(schemas.characteristic.Values)[c],
		difficulty: Object.values(schemas.difficulty.Values)[d],
	};
}
