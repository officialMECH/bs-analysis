import { Dialog, Icon, UnstyledInput } from "$/components";
import { datasets } from "$/constants";
import { formatters, parsers, sort } from "$/helpers";
import { useDataset } from "$/hooks";
import { cx } from "$/styles/css";
import { hstack } from "$/styles/patterns";
import { IDataset, IEntry } from "$/types";
import saveAs from "file-saver";
import { ChangeEvent, Fragment, MouseEvent, PropsWithChildren } from "react";
import { DatasetForm } from "../form";

interface Props {
	id: string;
}

export default function DatasetActions({ id }: PropsWithChildren<Props>) {
	const { state, dispatch } = useDataset(id);

	function internal(key: string) {
		const name = key.split("/")[key.split("/").length - 1].split(".")[0];
		return name === id;
	}
	const isInternal = Object.keys(datasets).some(internal);

	function handleRefresh() {
		const entry = Object.entries(datasets).find(([key]) => internal(key));
		if (!entry) return;
		dispatch({ type: "UPDATE", payload: { id, dataset: entry[1].default, overwrite: true } });
	}
	function handleOverwrite(event: ChangeEvent<HTMLInputElement>) {
		const files = event.target.files;
		if (!files) return;
		parsers.text.file<IDataset>(files[0], (_, dataset) => dispatch({ type: "UPDATE", payload: { id, dataset, overwrite: true } }));
	}
	function handleDownload(event: MouseEvent<HTMLButtonElement>) {
		if (!state) return;
		event.preventDefault();
		let data: IEntry[] | Record<string, IEntry> = state.data;
		data = data.sort((a, b) => sort.level(a, b));
		data = data.sort((a, b) => sort.string(a.id, b.id));
		data = data.sort((a, b) => (a.released && b.released ? sort.released(a.released, b.released) : 0));
		data = state.data.reduce((record, value) => {
			return { ...record, [formatters.id(value)]: value };
		}, {});
		const blob = new Blob([JSON.stringify({ ...state, data }, null, event.shiftKey ? 0 : 2)], { type: "application/json" });
		saveAs(blob, `${id}.json`);
	}
	function handleDelete() {
		if (!confirm("Are you sure you want to delete this dataset?")) return;
		dispatch({ type: "DELETE", payload: { id: id } });
	}

	return (
		<div className={styles.row}>
			<Dialog render={({ close }) => <DatasetForm initial={{ id, ...state }} onSubmit={() => close()} />}>
				<Icon title="Edit" variant="primary" className={cx("fa-solid fa-pencil")} />
			</Dialog>
			<UnstyledInput type="file" id="file" accept="application/json,text/plain" onChange={handleOverwrite}>
				<Icon title="Overwrite" variant="primary" className={cx("fa-solid fa-file-import")} />
			</UnstyledInput>
			{state && (
				<Fragment>
					<Icon title="Download" variant="primary" className={cx("fa-solid fa-download")} onClick={handleDownload} />
					{!isInternal && <Icon title="Delete" variant="danger" className={cx("fa-solid fa-trash")} onClick={handleDelete} />}
					{isInternal && <Icon title="Refresh" variant="primary" className={cx("fa-solid fa-refresh")} onClick={handleRefresh} />}
				</Fragment>
			)}
		</div>
	);
}

const styles = {
	row: hstack({ gap: 4 }),
};
