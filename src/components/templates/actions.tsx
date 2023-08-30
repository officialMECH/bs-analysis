import { createLevelIndex, parsers, sort } from "$/helpers";
import { useDataset } from "$/hooks";
import { cva } from "$/styles/css";
import { hstack } from "$/styles/patterns";
import { IData } from "$/types";
import saveAs from "file-saver";
import { ChangeEvent, Fragment, MouseEvent, PropsWithChildren, useRef } from "react";
import { Icon, IconInput } from "..";

interface Props {
	id: string;
	exists?: boolean;
}

export default function Actions({ id, exists }: PropsWithChildren<Props>) {
	const { state, dispatch } = useDataset(id);
	const input = useRef<HTMLInputElement | null>(null);

	function handleOverwrite(event: ChangeEvent<HTMLInputElement>) {
		const files = event.target.files;
		if (!files) return;
		parsers.file(files[0], (_, dataset) => dispatch({ type: "UPDATE", payload: { id, dataset } }));
	}
	function handleDownload(event: MouseEvent<HTMLButtonElement>) {
		if (!state) return;
		let data: IData[] | Record<string, IData> = state.data;
		if (event.shiftKey) {
			data = data.sort((a, b) => sort.level(a, b));
			data = data.sort((a, b) => sort.string(a.id, b.id));
			data = data.sort((a, b) => (a.released && b.released ? sort.released(a.released, b.released) : 0));
			data = state.data.reduce((record, value) => {
				return { ...record, [`${value.id}/${createLevelIndex(value)}`]: value };
			}, {});
		}
		parsers.raw({ id, object: { ...state, data } }, (id, dataset) => {
			const blob = new Blob([JSON.stringify(dataset, null, 2)], { type: "application/json" });
			saveAs(blob, `${id}.json`);
		});
	}
	function handleDelete() {
		if (!confirm("Are you sure you want to delete this dataset?")) return;
		dispatch({ type: "DELETE", payload: { id: id } });
	}

	return (
		<div className={styles.row}>
			<IconInput className={styles.icon({ variant: "primary" })} onClick={() => input.current?.click()} type="file" id="file" accept="application/json" onChange={handleOverwrite}>
				<i title="Overwrite" className="fa-solid fa-file-import"></i>
			</IconInput>
			{exists && (
				<Fragment>
					<Icon className={styles.icon({ variant: "primary" })} onClick={handleDownload}>
						<i title="Download" className="fa-solid fa-download"></i>
					</Icon>
					<Icon className={styles.icon({ variant: "error" })} onClick={handleDelete}>
						<i title="Delete" className="fa-solid fa-trash"></i>
					</Icon>
				</Fragment>
			)}
		</div>
	);
}

const styles = {
	row: hstack({ gap: 2 }),
	icon: cva({
		variants: {
			variant: {
				primary: { color: "primary" },
				error: { color: "error" },
			},
		},
	}),
};
