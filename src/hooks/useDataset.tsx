import { IDataset, PayloadAction } from "$/types";
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
					localStorage.setItem(id, JSON.stringify({ name: dataset.name, data }));
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
