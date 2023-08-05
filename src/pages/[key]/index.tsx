import { Center, Spacer } from "$/components";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";

export default function Overview() {
	const { key } = useParams("/:key");
	const { state } = useDataset(key);

	function contributors(values: string[]) {
		return values.map((name, i) => {
			if (i === values.length - 1) return name;
			return `${name}, `;
		}, null);
	}

	if (!localStorage.getItem(key)) {
		return (
			<main>
				<h1>Not Found</h1>
				<hr />
				<p>This dataset is not available.</p>
			</main>
		);
	}
	return (
		<main>
			<Center as="h1" style={{ justifyContent: "space-between" }}>
				<span style={{ color: state.name ? "unset" : "gray" }}>{state.name ?? key}</span>
				<Spacer direction="row">
					<a href={`${key}/data`}>
						<i title="Dataset" className="fa-solid fa-table"></i>
					</a>
				</Spacer>
			</Center>
			<hr />
			<p style={{ whiteSpace: "pre-line" }}>{state.description}</p>
			<Spacer size={2} direction="row">
				{state.updated && (
					<Spacer size={0} direction="column">
						<strong>Last Updated</strong>
						<small>{new Date(state.updated).toLocaleString()}</small>
					</Spacer>
				)}
				{state.contributors && (
					<Spacer size={0} direction="column">
						<strong>Contributors</strong>
						<small>{contributors(state.contributors)}</small>
					</Spacer>
				)}
			</Spacer>
		</main>
	);
}
