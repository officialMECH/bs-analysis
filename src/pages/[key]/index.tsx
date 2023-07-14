import { useDataset } from "$/hooks";
import { useParams } from "$/router";

export default function Overview() {
	const { key } = useParams("/:key");
	const { state } = useDataset(key);
	if (!state.name) {
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
			<h1 style={{ display: "flex", justifyContent: "space-between" }}>
				<span>{state.name}</span>
				<span style={{ color: "gray" }}>{state.data.length}</span>
			</h1>
			<hr />
		</main>
	);
}
