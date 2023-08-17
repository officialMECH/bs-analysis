import { IData, IDataset, PayloadAction, schemas } from "$/types";
import { omit } from "$/utils";
import { Dispatch, PropsWithChildren, Reducer, createContext, useReducer } from "react";

type T = IDataset<IData[]> | undefined;
type State = Record<string, T>;
type Actions = PayloadAction<{ id: string; dataset: IDataset }, "UPDATE"> | PayloadAction<{ id: string }, "DELETE"> | PayloadAction<{ id: string }, "DOWNLOAD">;

const reducer: Reducer<State, Actions> = (state, action) => {
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
			return { ...state, [id]: { ...dataset, data: valid } };
		}
		case "DELETE": {
			const { id } = action.payload;
			localStorage.removeItem(id);
			return omit(state, id);
		}
		default: {
			return state;
		}
	}
};

const storage = Object.entries(localStorage).reduce((record: State, [key, value]: [string, string]) => ({ ...record, [key]: JSON.parse(value) as T }), {});

const Context = createContext<{ state: State; dispatch: Dispatch<Actions> }>({ state: {}, dispatch: () => null });

function StorageProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer<Reducer<State, Actions>>(reducer, storage);
	return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
}

export { Context as StorageContext, StorageProvider };
