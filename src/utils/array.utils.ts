export const predicates = {
	unique: <T>(value: T, index: number, array: T[]) => array.indexOf(value) === index,
};

export function pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
	const draft = { ...obj };
	keys.forEach((key) => (draft[key] = obj[key]));
	return draft;
}
export function omit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
	const draft = { ...obj };
	keys.forEach((key) => delete draft[key]);
	return draft;
}
