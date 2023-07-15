export const predicates = {
	unique: <T>(value: T, index: number, array: T[]) => array.indexOf(value) === index,
};
