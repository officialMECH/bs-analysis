import { ObjectEntries, date, minLength, minValue, number, object, pipe, string, transform } from "valibot";

export default {
	id: pipe(string(), minLength(1)),
	timestamp: pipe(
		date(),
		transform((x) => x.toISOString()),
	),
	entity: (entries: ObjectEntries) => object({ total: pipe(number(), minValue(0)), ...entries }),
};
