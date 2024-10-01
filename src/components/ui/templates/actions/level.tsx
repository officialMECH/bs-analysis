import { Dialog } from "$/components/ui/molecules";
import { ActionItem, Actions } from "$/components/ui/organisms";
import { ManualDataForm } from "$/components/ui/templates";
import { resolveLevelIndex } from "$/helpers";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { IEntry } from "$/types";
import { omit } from "$/utils";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useMemo } from "react";

interface Props {
	id: string;
	onSubmit?: (update: IEntry) => void;
	onDelete?: (id: string) => void;
}

function Component({ id, onSubmit, onDelete }: Props) {
	const { key } = useParams("/:key");
	const { state, dispatch } = useDataset(key);
	if (!state) throw Error("The dataset does not exist.");

	function getData(id: string) {
		const [sid, bid] = id.split("/");
		const { characteristic, difficulty } = resolveLevelIndex(Number(bid));
		const data = state!.data.find((d) => {
			return (d.id === sid || d.id === sid.toLowerCase()) && d.characteristic === characteristic && d.difficulty === difficulty;
		});
		return { data, id: sid, characteristic, difficulty };
	}
	const entry = getData(id);

	const handleSubmit = useCallback(
		(update: IEntry, close: () => void) => {
			const { id, characteristic, difficulty } = entry;
			const updated = { id, characteristic, difficulty, ...omit(update, "id", "characteristic", "difficulty") };
			const dataset = { ...state, data: { ...state!.data.concat(updated), updated }, updated: new Date().toISOString() };
			dispatch({ type: "UPDATE", payload: { id: key, dataset, overwrite: true } });
			if (onSubmit) onSubmit(update);
			close();
		},
		[dispatch, entry, key, onSubmit, state],
	);

	const handleDelete = useCallback(
		(id: string) => {
			if (!state) throw Error("An unexpected error occured.");
			if (!confirm("Are you sure you want to delete this entry?")) return;
			const [sid, index] = id.split("/");
			const { characteristic, difficulty } = resolveLevelIndex(Number(index));
			const data = state.data.filter((x) => !(x.id === sid && x.characteristic === characteristic && x.difficulty === difficulty));
			dispatch({ type: "UPDATE", payload: { id: key, dataset: { ...state, data }, overwrite: true } });
			if (onDelete) onDelete(id);
		},
		[dispatch, key, onDelete, state],
	);

	const items = useMemo<Record<string, ActionItem>>(() => {
		return {
			edit: {
				icon: faPencil,
				render: (Icon, { key, ...rest }) => {
					return (
						<Dialog title="Edit Entry" render={({ close }) => <ManualDataForm initial={{ ...entry.data, ...omit(entry, "data") }} onSubmit={(x) => handleSubmit(x, close)} />}>
							<Icon key={key} {...rest} title="Edit" variant="primary" />
						</Dialog>
					);
				},
			},
			delete: {
				icon: faTrash,
				condition: () => !!entry.data,
				render: (Icon, { key, ...rest }) => {
					return <Icon key={key} {...rest} title="Delete" variant="danger" onClick={() => handleDelete(id)} />;
				},
			},
		};
	}, [entry, handleDelete, handleSubmit, id]);

	return <Actions items={items} />;
}

export { Component };
