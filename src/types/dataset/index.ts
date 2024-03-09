import { Output, transform, union } from "valibot";
import { default as v1 } from "./v1";

const format = union(v1.dataset.options.map((schema) => schema.entries.data));

export type IDataset<T = Output<typeof format>> = Omit<Output<typeof v1.dataset>, "data"> & { data: T };
export type IEntry = Output<typeof v1.entry>;

export default {
	dataset: transform(v1.dataset, (x): Output<typeof v1.dataset> => {
		return x;
	}),
	entry: transform(v1.entry, (x): Output<typeof v1.entry> => {
		return x;
	}),
	metadata: {
		v1: v1.metadata,
	},
};
