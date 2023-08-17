import { colors } from "$/constants";
import { useDataset } from "$/hooks";
import { schemas } from "$/types";
import saveAs from "file-saver";
import { ChangeEvent, Fragment, PropsWithChildren, useRef } from "react";
import { Icon, Spacer } from "../containers";

interface Props {
	id: string;
	exists?: boolean;
}

export default function Actions({ id, exists, children }: PropsWithChildren<Props>) {
	const { state, dispatch } = useDataset(id);
	const input = useRef<HTMLInputElement | null>(null);

	function handleOverwriteClick() {
		const current = input.current;
		if (!current) return;
		current.click();
	}
	function handleOverwriteChange(event: ChangeEvent<HTMLInputElement>) {
		const files = event.target.files;
		if (!files) return;
		const file = files[0];
		const raw = file.text();
		void raw.then((contents) => {
			const result = schemas.dataset.safeParse(JSON.parse(contents));
			if (!result.success) {
				result.error.issues.forEach((issue) => console.error(`${issue.path.toString()} | ${issue.message}`));
			} else {
				dispatch({ type: "UPDATE", payload: { id: id, dataset: result.data } });
			}
		});
	}
	function handleDownload() {
		const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
		saveAs(blob, `${id}.json`);
	}
	function handleDelete() {
		if (!confirm("Are you sure you want to delete this dataset?")) return;
		dispatch({ type: "DELETE", payload: { id: id } });
	}

	return (
		<Spacer as={"div"} size={2} direction="row">
			<Icon as={"button"} tabIndex={0} onClick={handleOverwriteClick} style={{ color: colors.accent }}>
				<i title="Overwrite" className="fa-solid fa-file-import"></i>
			</Icon>
			<input type="file" id="file" ref={input} style={{ display: "none" }} onChange={handleOverwriteChange} />
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
