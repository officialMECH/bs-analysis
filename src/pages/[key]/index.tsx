import { Layouts, Spacer } from "$/components";
import Icon from "$/components/icon";
import { colors } from "$/constants";
import { useDataset, useTitle } from "$/hooks";
import { useParams } from "$/router";
import { Fragment } from "react";

export default function Overview() {
	const { key } = useParams("/:key");
	const { state: dataset, dispatch } = useDataset(key);
	useTitle(dataset ? `Overview: ${dataset?.name ?? key}` : "Unknown Dataset");

	function contributors(values: string[]) {
		return values.map((name, i) => {
			if (i === values.length - 1) return name;
			return `${name}, `;
		}, null);
	}

	function handleDelete() {
		if (!confirm("Are you sure you want to delete this dataset?")) return;
		dispatch({ type: "DELETE", payload: { id: key } });
	}

	if (!dataset) {
		return (
			<Layouts.Content title={{ left: "Unknown Dataset" }}>
				<p>This dataset is not available.</p>
			</Layouts.Content>
		);
	}

	function Icons() {
		return (
			<Fragment>
				<Icon as={"a"} href={`/${key}/data`}>
					<i title="Dataset" className="fa-solid fa-table"></i>
				</Icon>
				<Icon as={"button"} tabIndex={0} className="unstyled" onClick={handleDelete} style={{ color: colors.error, cursor: "pointer" }}>
					<i title="Delete" className="fa-solid fa-trash"></i>
				</Icon>
			</Fragment>
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
						<small>{contributors(dataset.contributors)}</small>
					</Spacer>
				)}
			</Spacer>
		</Layouts.Content>
	);
}
