import { Nav, Spacer } from "$/components";
import { useDatasets } from "$/hooks";
import { useNavigate } from "$/router";
import { schemas } from "$/types";
import { ChangeEvent, useRef } from "react";
import styles from "./styles.module.css";

export default function App() {
	const navigate = useNavigate();
	const { dispatch } = useDatasets();
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
				// HACK: localstorage sometimes desyncs with context when dispatching updates on the same dataset more than once
				navigate(0);
			}
		});
	}

	return (
		<main className={styles.home}>
			<h1 className={styles.title}>Beat Saber Map Analysis</h1>
			<hr />
			<Nav center />
			<hr />
			<Spacer center direction="column">
				<section>
					<Spacer size={0.5} direction="column">
						<div>
							<button onClick={handleImportClick}>Import Dataset</button>
							<input type="file" id="file" ref={input} style={{ display: "none" }} onChange={handleImportChange} />
						</div>
					</Spacer>
				</section>
			</Spacer>
		</main>
	);
}
