import { ObjectEntries, date, minLength, minValue, number, object, string, transform } from "valibot";

export default {
	id: string([minLength(1)]),
	timestamp: transform(date(), (x) => x.toISOString()),
	entity: (entries: ObjectEntries) => object({ total: number([minValue(0)]), ...entries }),
};
