import { colors } from "$/constants";
import { createLevelIndex, parsers, sort } from "$/helpers";
import { useDataset } from "$/hooks";
import { IData } from "$/types";
import saveAs from "file-saver";
import { ChangeEvent, Fragment, MouseEvent, PropsWithChildren, useRef } from "react";
import { Icon, Spacer } from "../containers";

interface Props {
	id: string;
	exists?: boolean;
}

export default function Actions({ id, exists, children }: PropsWithChildren<Props>) {
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
		<Spacer as={"div"} direction="row">
			<Icon as={"button"} tabIndex={0} onClick={() => input.current?.click()} style={{ color: colors.accent }}>
				<i title="Overwrite" className="fa-solid fa-file-import"></i>
			</Icon>
			<input ref={input} type="file" id="file" accept="application/json" style={{ display: "none" }} onChange={handleOverwrite} />
			{exists && (
				<Fragment>
					<Icon as={"button"} tabIndex={0} onClick={handleDownload} style={{ color: colors.accent }}>
						<i title="Download" className="fa-solid fa-download"></i>
					</Icon>
					<Icon as={"button"} tabIndex={0} onClick={handleDelete} style={{ color: colors.error }}>
						<i title="Delete" className="fa-solid fa-trash"></i>
					</Icon>
				</Fragment>
			)}
			{children}
		</Spacer>
	);
}
