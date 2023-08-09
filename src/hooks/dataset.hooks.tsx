import { StorageContext } from "$/components/storage";
import { useContext } from "react";

export function useDatasets() {
	const { state, dispatch } = useContext(StorageContext);
	return { state, dispatch };
}
export function useDataset(id: string) {
	const { state, dispatch } = useContext(StorageContext);
	return { state: state[id], dispatch };
}
