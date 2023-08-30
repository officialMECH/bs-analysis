import { Templates } from "$/components";
import { css } from "$/styles/css";

export default function App() {
	return <Templates.Content layout={"home"} title={<span className={styles.title}>Beat Saber Map Analysis</span>}></Templates.Content>;
}

const styles = {
	title: css({ fontSize: "5xl" }),
};
