import { Spacer } from "$/components";
import { units } from "$/helpers";
import { useDataset } from "$/hooks";
import { ChangeEvent, useRef } from "react";
import styles from "./styles.module.css";

export default function App() {
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
		void file.text().then((contents) => {
			dispatch({ type: "UPDATE", payload: { id, contents } });
		});
	}

	const datasets = Object.keys(localStorage);

	return (
		<main className={styles.home}>
			<h1 className={styles.title}>Beat Saber Map Analysis</h1>
			<hr style={{ margin: units.rem(2) }} />
			<Spacer size={0.5} center direction="column">
				{import.meta.env.DEV && <button onClick={handleImportClick}>Import Dataset</button>}
				<input type="file" id="file" ref={input} style={{ display: "none" }} onChange={handleImportChange} />
				<small>
					<strong>{datasets.length > 0 ? "Datasets" : "No Datasets Available"}</strong>
					<Spacer center direction="row">
						{datasets.map((key) => (
							<a href={key}>{key}</a>
						))}
					</Spacer>
				</small>
			</Spacer>
		</main>
	);
}
