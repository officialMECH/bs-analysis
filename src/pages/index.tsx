import { Nav, Spacer } from "$/components";
import styles from "./styles.module.css";

export default function App() {
	return (
		<main className={styles.home}>
			<h1 className={styles.title}>Beat Saber Map Analysis</h1>
			<hr />
			<Nav center />
			<hr />
			<Spacer center direction="column"></Spacer>
		</main>
	);
}
