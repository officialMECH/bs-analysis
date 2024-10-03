import { Dialog } from "$/components/ui/molecules";
import { ActionItem, Actions } from "$/components/ui/organisms";
import { ManualDataForm } from "$/components/ui/templates";
import { resolveLevelIndex } from "$/helpers";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { IEntry } from "$/types";
import { common, omit, prune } from "$/utils";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";

interface Props<T> {
	table: Table<T>;
	ids: string[];
	onSubmit?: (update: IEntry) => void;
	onDelete?: (ids: string[]) => void;
}

function Component<T>({ table, ids, onSubmit, onDelete }: Props<T>) {
	const { key } = useParams("/:key");
	const { state, dispatch } = useDataset(key);
	if (!state) throw Error("The dataset does not exist.");

	function getData(id: string) {
		const [sid, bid] = id.split("/");
		const { characteristic, difficulty } = resolveLevelIndex(Number(bid));
		const data = state!.data.find((d) => {
			return (d.id === sid || d.id === sid.toLowerCase()) && d.characteristic === characteristic && d.difficulty === difficulty;
		});
		if (!data) throw Error(`Could not resolve entry for ${id}`);
		return data;
	}

	const entries = ids.map((id) => getData(id));
	// merge data from all entries to collect all possible keys
	const merged = entries.reduce((r, x) => ({ ...r, ...x }), {}) as Partial<IEntry>;
	// save all properties that are shared across all entries
	const shared = entries.reduce((current, data) => common<IEntry>(current, data), entries[0]);
	// omit shared keys between selected entries
	const different = omit({ ...prune(merged) }, ...(Object.keys(prune(shared ?? {})) as (keyof IEntry)[]));
	const disable = Object.keys(different).reduce((r, key) => ({ ...r, [key]: true }), {});

	const handleSubmit = useCallback(
		(update: IEntry, close: () => void) => {
			const updated = entries.map((x) => ({ ...x, ...omit(update, "id", "characteristic", "difficulty", ...(Object.keys(different) as (keyof IEntry)[])) }));
			const dataset = { ...state, data: state!.data.concat(...updated), updated: new Date().toISOString() };
			dispatch({ type: "UPDATE", payload: { id: key, dataset, overwrite: true } });
			if (onSubmit) onSubmit(update);
			close();
			table.setRowSelection({});
		},
		[different, dispatch, entries, key, onSubmit, state, table],
	);

	const handleDelete = useCallback(() => {
		if (!state) throw Error("An unexpected error occured.");
		if (!confirm("Are you sure you want to delete these entries?")) return;
		const data = state.data.filter((x) => !entries.some((d) => x.id === d.id && x.characteristic === d.characteristic && x.difficulty === d.difficulty));
		dispatch({ type: "UPDATE", payload: { id: key, dataset: { ...state, data }, overwrite: true } });
		if (onDelete) onDelete(ids);
		table.setRowSelection({});
	}, [dispatch, entries, ids, key, onDelete, state, table]);

	const items = useMemo<Record<string, ActionItem>>(() => {
		return {
			edit: {
				icon: faPencil,
				render: (Icon, { ...rest }) => {
					return (
						<Dialog title="Edit Entry" render={({ close }) => <ManualDataForm initial={shared} onSubmit={(x) => handleSubmit(x, close)} disable={disable} />}>
							<Icon {...rest} title="Edit" variant="primary" />
						</Dialog>
					);
				},
			},
			delete: {
				icon: faTrash,
				render: (Icon, { ...rest }) => {
					return <Icon {...rest} title="Delete" variant="danger" onClick={() => handleDelete()} />;
				},
			},
		};
	}, [disable, handleDelete, handleSubmit, shared]);

	if (ids.length <= 0) return null;
	return <Actions items={items} spacing={2} />;
}

export { Component };
