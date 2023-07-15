import { Center } from "$/components";
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
			<Center as="h1">
				<span>{state.name}</span>
			</Center>
			<hr />
			<Center>
				<a href={`${key}/data`}>
					<button>Dataset</button>
				</a>
			</Center>
		</main>
	);
}
