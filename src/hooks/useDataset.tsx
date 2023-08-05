import { IData, IDataset, PayloadAction, schemas } from "$/types";
import { Reducer, useMemo, useReducer } from "react";
import { z } from "zod";

type Actions = PayloadAction<{ id: string; dataset: IDataset<z.infer<typeof schemas.format>> }, "UPDATE">;

export default function useDataset(tid?: string) {
	const [state, dispatch] = useReducer<Reducer<IDataset<IData[]>, Actions>>(
		(state, action) => {
			switch (action.type) {
				case "UPDATE": {
					const { id, dataset } = action.payload;
					// flatten data records to array (used in legacy format)
					const data = Object.values(dataset.data);
					const valid = data.filter((entry, index) => {
						const result = schemas.data.safeParse(entry);
						if (!result.success) {
							result.error.issues.forEach((issue) => console.error(`[${index}].${issue.path.toString()} | ${issue.message}`));
						}
						return result.success || import.meta.env.DEV;
					});
					localStorage.setItem(id, JSON.stringify({ ...dataset, data: valid }));
					return state;
				}
				default: {
					return { data: [] };
				}
			}
		},
		{ data: [] }
	);

	// fetch target dataset from localStorage
	const target = tid ? localStorage.getItem(tid) : null;

	return {
		state: useMemo(() => (target ? (JSON.parse(target) as IDataset<IData[]>) : state), [state, target]),
		dispatch,
	};
}
