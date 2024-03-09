import { Literal, literal, union } from "valibot";

export function list<T extends Literal>(options: [T, ...T[]]) {
	return union(options.map((x) => literal(x)));
}
