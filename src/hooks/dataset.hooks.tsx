import { StorageContext } from "$/components/storage";
import { useContext } from "react";

export function useDatasets() {
	const { state, dispatch } = useContext(StorageContext);
	return { state, dispatch };
}
export function useDataset(key: string) {
	const { state, dispatch } = useContext(StorageContext);
	return { state: state[key], dispatch };
}
