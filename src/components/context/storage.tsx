import { datasets } from "$/constants";
import { IDataset, IEntry, PayloadAction, schemas } from "$/types";
import { omit } from "$/utils";
import { Dispatch, PropsWithChildren, Reducer, createContext, useEffect, useReducer } from "react";
import { is } from "valibot";

type T = IDataset<IEntry[]> | undefined;
type State = Record<string, T>;
type Actions = PayloadAction<{ id: string; dataset: IDataset; overwrite?: boolean }, "UPDATE"> | PayloadAction<{ id: string }, "DELETE"> | PayloadAction<{ id: string }, "DOWNLOAD">;

const reducer: Reducer<State, Actions> = (state, action) => {
	switch (action.type) {
		case "UPDATE": {
			const { id, dataset, overwrite } = action.payload;
			const exists = Object.keys(state).includes(id);
			if (exists && !overwrite) return state;
			const data = Object.values(dataset.data);
			const valid = data.filter((entry, index, array) => {
				if (!is(schemas.entry, entry)) return false;
				const match = array.find((x, i) => i > index && x.id === entry.id && x.characteristic === entry.characteristic && x.difficulty === entry.difficulty);
				// if duplicate data exists, forward all data into the latest entry and remove earlier instances
				if (match) {
					array[array.indexOf(match)] = { ...entry, ...match };
					return false;
				}
				return true;
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

const storage = Object.entries(localStorage).reduce((record: State, [key, value]: [string, string]) => {
	if (!is(schemas.dataset, value)) return record;
	return { ...record, [key]: JSON.parse(value) as T };
}, {});

const Context = createContext<{ state: State; dispatch: Dispatch<Actions> }>({ state: {}, dispatch: () => null });

function StorageProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer<Reducer<State, Actions>>(reducer, storage);
	useEffect(() => {
		Object.entries(datasets).forEach(([key, contents]) => {
			const name = key.split("/")[key.split("/").length - 1].split(".")[0];
			dispatch({ type: "UPDATE", payload: { id: name, dataset: contents.default, overwrite: false } });
		});
	}, []);
	return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
}

export { Context as StorageContext, StorageProvider };
