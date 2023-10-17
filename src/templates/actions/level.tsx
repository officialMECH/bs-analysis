import { Dialog, Icon } from "$/components";
import { createLevelIndex, resolveLevelIndex } from "$/helpers";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { cx } from "$/styles/css";
import { hstack } from "$/styles/patterns";
import { Fragment } from "react";
import { DataForm } from "../form";

interface Props {
	id: string;
}

export default function LevelActions({ id }: Props) {
	const { key } = useParams("/:key/level/:sid/:bid");
	const [sid, bid] = id.split("/");
	const { characteristic, difficulty } = resolveLevelIndex(Number(bid));
	const { state: dataset, dispatch } = useDataset(key);
	const data = dataset?.data.find((d) => {
		return (d.id === sid || d.id === sid.toLowerCase()) && d.characteristic === characteristic && d.difficulty === difficulty;
	});

	function handleDelete(id: string) {
		if (!dataset) throw Error("An unexpected error occured.");
		if (!confirm("Are you sure you want to delete this entry?")) return;
		const [sid, index] = id.split("/");
		const { characteristic, difficulty } = resolveLevelIndex(Number(index));
		const data = dataset.data.filter((x) => !(x.id === sid && x.characteristic === characteristic && x.difficulty === difficulty));
		dispatch({ type: "UPDATE", payload: { id: key, dataset: { ...dataset, data }, overwrite: true } });
	}

	return (
		<div className={styles.row}>
			<Dialog render={({ close }) => <DataForm initial={{ id: sid, characteristic, difficulty, ...data }} onSubmit={() => close()} />}>
				<Icon title="Edit" variant="primary" className={cx("fa-solid fa-pencil")} />
			</Dialog>
			{data && (
				<Fragment>
					<Icon title="Delete" variant="danger" className="fa-solid fa-trash" onClick={() => handleDelete(`${data.id}/${createLevelIndex(data)}`)} />
				</Fragment>
			)}
		</div>
	);
}

const styles = {
	row: hstack({ gap: 4 }),
};
