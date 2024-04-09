import { Input } from "$/components/ui/atoms";
import { Dialog } from "$/components/ui/molecules";
import { ActionItem, Actions } from "$/components/ui/organisms";
import { ManualDatasetForm } from "$/components/ui/templates";
import { datasets } from "$/constants";
import { formatters, parsers, sort } from "$/helpers";
import { useDataset } from "$/hooks";
import { IDataset, IEntry } from "$/types";
import { faDownload, faFileImport, faPencil, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import saveAs from "file-saver";
import { ChangeEvent, MouseEvent, PropsWithChildren, useCallback, useMemo } from "react";

interface Props {
	id: string;
}

function Component({ id }: PropsWithChildren<Props>) {
	const { state, dispatch } = useDataset(id);

	const internal = useCallback(
		function (key: string) {
			const name = key.split("/")[key.split("/").length - 1].split(".")[0];
			return name === id;
		},
		[id]
	);
	const isInternal = Object.keys(datasets).some(internal);

	const handleRefresh = useCallback(() => {
		const entry = Object.entries(datasets).find(([key]) => internal(key));
		if (!entry) return;
		dispatch({ type: "UPDATE", payload: { id, dataset: entry[1].default, overwrite: true } });
	}, [dispatch, id, internal]);

	const handleOverwrite = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const files = event.target.files;
			if (!files) return;
			parsers.text.file<IDataset>(files[0], (_, dataset) => dispatch({ type: "UPDATE", payload: { id, dataset, overwrite: true } }));
		},
		[dispatch, id]
	);

	const handleDownload = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
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
		},
		[id, state]
	);

	const handleDelete = useCallback(() => {
		if (!confirm("Are you sure you want to delete this dataset?")) return;
		dispatch({ type: "DELETE", payload: { id: id } });
	}, [dispatch, id]);

	const items = useMemo<Record<string, ActionItem>>(() => {
		return {
			edit: {
				icon: faPencil,
				render: (Icon, { ...rest }) => {
					return (
						<Dialog render={({ close }) => <ManualDatasetForm initial={{ id, ...state }} onSubmit={() => close()} />}>
							<Icon {...rest} title="Edit" variant="primary" />
						</Dialog>
					);
				},
			},
			overwrite: {
				icon: faFileImport,
				render: (Icon, { ...rest }) => {
					return (
						<Input asChild type="file" id="file" accept="application/json,text/plain" onChange={handleOverwrite}>
							<Icon {...rest} title="Overwrite" variant="primary" />
						</Input>
					);
				},
			},
			download: {
				icon: faDownload,
				render: (Icon, { ...rest }) => {
					return <Icon {...rest} title="Download" variant="primary" onClick={handleDownload} />;
				},
			},
			delete: {
				icon: faTrash,
				condition: () => !isInternal,
				render: (Icon, { ...rest }) => {
					return <Icon {...rest} title="Delete" variant="danger" onClick={handleDelete} />;
				},
			},
			refresh: {
				icon: faRefresh,
				condition: () => isInternal,
				render: (Icon, { ...rest }) => {
					return <Icon {...rest} title="Refresh" variant="primary" onClick={handleRefresh} />;
				},
			},
		};
	}, [handleDelete, handleDownload, handleOverwrite, handleRefresh, id, isInternal, state]);

	return <Actions items={items} />;
}

export { Component };
