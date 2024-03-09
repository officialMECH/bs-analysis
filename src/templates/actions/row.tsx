import { Dialog, Icon } from "$/components";
import { resolveLevelIndex } from "$/helpers";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { cx } from "$/styles/css";
import { hstack } from "$/styles/patterns";
import { IEntry } from "$/types";
import { common, omit, prune } from "$/utils";
import { Table } from "@tanstack/react-table";
import { Fragment } from "react";
import { DataForm } from "../form";

interface Props<T> {
	table: Table<T>;
	ids: string[];
	onSubmit?: (update: IEntry) => void;
	onDelete?: (ids: string[]) => void;
}

export default function RowActions<T>({ table, ids, onSubmit, onDelete }: Props<T>) {
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

	function handleSubmit(update: IEntry, close: () => void) {
		const updated = entries.map((x) => ({ ...x, ...omit(update, "id", "characteristic", "difficulty", ...(Object.keys(different) as (keyof IEntry)[])) }));
		const dataset = { ...state, data: state!.data.concat(...updated), updated: new Date().toISOString() };
		dispatch({ type: "UPDATE", payload: { id: key, dataset, overwrite: true } });
		if (onSubmit) onSubmit(update);
		close();
		table.setRowSelection({});
	}

	function handleDelete() {
		if (!state) throw Error("An unexpected error occured.");
		if (!confirm("Are you sure you want to delete these entries?")) return;
		const data = state.data.filter((x) => !entries.some((d) => x.id === d.id && x.characteristic === d.characteristic && x.difficulty === d.difficulty));
		dispatch({ type: "UPDATE", payload: { id: key, dataset: { ...state, data }, overwrite: true } });
		if (onDelete) onDelete(ids);
		table.setRowSelection({});
	}

	if (ids.length <= 0) return null;
	return (
		<div className={styles.row}>
			<Dialog render={({ close }) => <DataForm initial={shared} onSubmit={(x) => handleSubmit(x, close)} disable={disable} />}>
				<Icon title="Edit" variant="primary" className={cx("fa-solid fa-pencil")} />
			</Dialog>
			<Fragment>
				<Icon title="Delete" variant="danger" className="fa-solid fa-trash" onClick={() => handleDelete()} />
			</Fragment>
		</div>
	);
}

const styles = {
	row: hstack({ gap: 2 }),
};
