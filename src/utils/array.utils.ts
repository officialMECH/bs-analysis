export const predicates = {
	unique: <T>(value: T, index: number, array: T[]) => array.indexOf(value) === index,
};

function joinTruthy(items: (string | number | boolean | null | undefined)[], delimiter = " "): string {
	const filtered = items.filter((c) => !!c);
	return filtered.map((c) => c!.toString()).join(delimiter);
}

export const join = (...items: (string | number | boolean | null | undefined)[]) => joinTruthy(items, " ");
export const list = (...items: (string | boolean | null | undefined)[]) => joinTruthy(items, ",");

export function omit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
	const draft = { ...obj };
	keys.forEach((key) => delete draft[key]);
	return draft;
}
