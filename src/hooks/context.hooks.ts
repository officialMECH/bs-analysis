import { Storage } from "$/components/context";
import { schemas } from "$/types";
import { useContext, useMemo } from "react";
import { is } from "valibot";

export function useDatasets() {
	const { state, dispatch } = useContext(Storage.Context);
	const valid = useMemo(() => {
		const filtered = Object.entries(state).filter(([_, contents]) => is(schemas.dataset, contents));
		return filtered.reduce((acc, [key, contents]) => ({ ...acc, [key]: contents }), {});
	}, [state]);
	return { state: valid as Storage.State, dispatch };
}
export function useDataset(key: string) {
	const { state, dispatch } = useContext(Storage.Context);
	return { state: state[key], dispatch };
}
