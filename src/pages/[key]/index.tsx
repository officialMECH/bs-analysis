import { Layouts, Spacer } from "$/components";
import Icon from "$/components/icon";
import { colors } from "$/constants";
import { formatters } from "$/helpers";
import { useDataset, useTitle } from "$/hooks";
import { useParams } from "$/router";
import { schemas } from "$/types";
import saveAs from "file-saver";
import { ChangeEvent, Fragment, useRef } from "react";

export default function Overview() {
	const { key } = useParams("/:key");
	const { state: dataset, dispatch } = useDataset(key);
	useTitle(dataset ? `Overview: ${dataset?.name ?? key}` : "Unknown Dataset");
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
				dispatch({ type: "UPDATE", payload: { id: key, dataset: result.data } });
			}
		});
	}
	function handleDownload() {
		const blob = new Blob([JSON.stringify(dataset, null, 2)], { type: "application/json" });
		saveAs(blob, `${key}.json`);
	}
	function handleDelete() {
		if (!confirm("Are you sure you want to delete this dataset?")) return;
		dispatch({ type: "DELETE", payload: { id: key } });
	}

	function Icons() {
		return (
			<Fragment>
				<Icon as={"button"} tabIndex={0} onClick={handleOverwriteClick} style={{ color: colors.accent }}>
					<i title="Overwrite" className="fa-solid fa-file-import"></i>
				</Icon>
				<input type="file" id="file" ref={input} style={{ display: "none" }} onChange={handleOverwriteChange} />
				{dataset && (
					<Fragment>
						<Icon as={"button"} tabIndex={0} onClick={handleDownload} style={{ color: colors.accent }}>
							<i title="Download" className="fa-solid fa-download"></i>
						</Icon>
						<Icon as={"button"} tabIndex={0} onClick={handleDelete} style={{ color: colors.error }}>
							<i title="Delete" className="fa-solid fa-trash"></i>
						</Icon>
						<Icon as={"a"} href={`/${key}/data`}>
							<i title="View Data Table" className="fa-solid fa-table"></i>
						</Icon>
					</Fragment>
				)}
			</Fragment>
		);
	}

	if (!dataset) {
		return (
			<Layouts.Content title={{ left: "Unknown Dataset", right: <Icons /> }}>
				<p>This dataset is not available.</p>
			</Layouts.Content>
		);
	}
	return (
		<Layouts.Content title={{ left: <span>{dataset.name ?? key}</span>, right: <Icons /> }}>
			{dataset.description && <p style={{ whiteSpace: "pre-line" }}>{dataset.description}</p>}
			<Spacer size={2} direction="row">
				{dataset.updated && (
					<Spacer size={0} direction="column">
						<strong>Last Updated</strong>
						<small>{new Date(dataset.updated).toLocaleString()}</small>
					</Spacer>
				)}
				{dataset.contributors && (
					<Spacer size={0} direction="column">
						<strong>Contributors</strong>
						<small>{formatters.array(dataset.contributors)}</small>
					</Spacer>
				)}
			</Spacer>
		</Layouts.Content>
	);
}
