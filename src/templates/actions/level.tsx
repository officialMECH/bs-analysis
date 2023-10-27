import { Dialog, Icon } from "$/components";
import { parsers, resolveLevelIndex } from "$/helpers";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { cx } from "$/styles/css";
import { hstack } from "$/styles/patterns";
import { IData } from "$/types";
import { omit } from "$/utils";
import { Fragment } from "react";
import { DataForm } from "../form";

interface Props {
	id: string;
	onSubmit?: (update: IData) => void;
	onDelete?: (id: string) => void;
}

export default function LevelActions({ id, onSubmit, onDelete }: Props) {
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

	function handleSubmit(update: IData, close: () => void) {
		const { id, characteristic, difficulty } = entry;
		const updated = { id, characteristic, difficulty, ...omit(update, "id", "characteristic", "difficulty") };
		parsers.dataset.raw({ id: key, object: { ...state, data: { ...state!.data.concat(updated), updated }, updated: new Date().toISOString() } }, (id, dataset) => {
			dispatch({ type: "UPDATE", payload: { id, dataset, overwrite: true } });
		});
		if (onSubmit) onSubmit(update);
		close();
	}

	function handleDelete(id: string) {
		if (!state) throw Error("An unexpected error occured.");
		if (!confirm("Are you sure you want to delete this entry?")) return;
		const [sid, index] = id.split("/");
		const { characteristic, difficulty } = resolveLevelIndex(Number(index));
		const data = state.data.filter((x) => !(x.id === sid && x.characteristic === characteristic && x.difficulty === difficulty));
		dispatch({ type: "UPDATE", payload: { id: key, dataset: { ...state, data }, overwrite: true } });
		if (onDelete) onDelete(id);
	}

	return (
		<div className={styles.row}>
			<Dialog render={({ close }) => <DataForm initial={{ ...entry.data, ...omit(entry, "data") }} onSubmit={(x) => handleSubmit(x, close)} />}>
				<Icon title="Edit" variant="primary" className={cx("fa-solid fa-pencil")} />
			</Dialog>
			{entry.data && (
				<Fragment>
					<Icon title="Delete" variant="danger" className="fa-solid fa-trash" onClick={() => handleDelete(id)} />
				</Fragment>
			)}
		</div>
	);
}

const styles = {
	row: hstack({ gap: 4 }),
};
