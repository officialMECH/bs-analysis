import { InferOutput, pipe, transform, union } from "valibot";
import { default as v1 } from "./v1";

const format = union(v1.dataset.options.map((schema) => schema.entries.data));

export type IDataset<T = InferOutput<typeof format>> = Omit<InferOutput<typeof v1.dataset>, "data"> & { data: T };
export type IEntry = InferOutput<typeof v1.entry>;

export default {
	dataset: pipe(
		v1.dataset,
		transform((x): InferOutput<typeof v1.dataset> => {
			return x;
		}),
	),
	entry: pipe(
		v1.entry,
		transform((x): InferOutput<typeof v1.entry> => {
			return x;
		}),
	),
	metadata: {
		v1: v1.metadata,
	},
};
