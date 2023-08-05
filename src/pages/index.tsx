import { Spacer } from "$/components";
import { useDataset } from "$/hooks";
import { schemas } from "$/types";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export default function App() {
	const [datasets, setDatasets] = useState<string[]>(() => Object.keys(localStorage));
	const { dispatch } = useDataset();
	const input = useRef<HTMLInputElement | null>(null);

	function handleImportClick() {
		const current = input.current;
		if (!current) return;
		current.click();
	}
	function handleImportChange(event: ChangeEvent<HTMLInputElement>) {
		const files = event.target.files;
		if (!files) return;
		const file = files[0];
		const id = file.name.split(".")[0];
		const raw = file.text();
		void raw.then((contents) => {
			const result = schemas.dataset.safeParse(JSON.parse(contents));
			if (!result.success) {
				result.error.issues.forEach((issue) => console.error(`${issue.path.toString()} | ${issue.message}`));
			} else {
				dispatch({ type: "UPDATE", payload: { id, dataset: result.data } });
				setDatasets((value) => (value.includes(id) ? value : value.concat(id)));
			}
		});
	}

	useEffect(() => {
		window.addEventListener("storage", () => setDatasets(() => Object.keys(localStorage)));
	}, []);

	return (
		<main className={styles.home}>
			<h1 className={styles.title}>Beat Saber Map Analysis</h1>
			<hr />
			<Spacer size={0.5} center direction="column">
				<div>
					<button onClick={handleImportClick}>Import Dataset</button>
					<input type="file" id="file" ref={input} style={{ display: "none" }} onChange={handleImportChange} />
				</div>
				<div>
					<h2 style={{ margin: 0 }}>{datasets.length > 0 ? "Datasets" : "No Datasets Available"}</h2>
					<Spacer center direction="row">
						{datasets.map((key) => (
							<a key={key} href={key}>
								{key}
							</a>
						))}
					</Spacer>
				</div>
			</Spacer>
		</main>
	);
}
