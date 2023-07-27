import { IDataset, PayloadAction, schemas } from "$/types";
import { Reducer, useMemo, useReducer } from "react";

type Actions = PayloadAction<{ id: string; contents: string }, "UPDATE">;

export default function useDataset(tid?: string) {
	const [state, dispatch] = useReducer<Reducer<IDataset, Actions>>(
		(state, action) => {
			switch (action.type) {
				case "UPDATE": {
					const { id, contents } = action.payload;
					const dataset = JSON.parse(contents) as IDataset;
					// flatten data records to array (used in legacy format)
					const data = Object.values(dataset.data).flat();
					const valid = data.filter((entry, index) => {
						const result = schemas.data.safeParse(entry);
						if (!result.success) {
							result.error.issues.forEach((issue) => console.error(`[${index}].${issue.path.toString()} | ${issue.message}`));
						}
						return result.success || import.meta.env.DEV;
					});
					localStorage.setItem(id, JSON.stringify({ name: dataset.name, data: valid.sort((a, b) => (a.released && b.released ? a.released.valueOf() - b.released.valueOf() : 0)) }));
					return state;
				}
				default: {
					return { name: null, data: [] };
				}
			}
		},
		{ name: null, data: [] }
	);

	// fetch target dataset from localStorage
	const target = tid ? localStorage.getItem(tid) : null;

	return {
		state: useMemo(() => (target ? (JSON.parse(target) as IDataset) : state), [state, target]),
		dispatch,
	};
}
