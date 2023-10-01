import { useDark } from "$/hooks";
import { useState } from "react";
import { styles } from "./helpers";
import LevelCharts from "./level";
import PieCharts from "./pie";
import TimeCharts from "./time";

interface Props {
	id: string;
}

export default function Charts({ id }: Props) {
	const dark = useDark();
	const [show, setShow] = useState(false);
	return (
		<details open={show} onToggle={(e) => setShow(e.currentTarget.open)}>
			<summary>Charts</summary>
			<div className={styles.wrapper}>
				<PieCharts id={id} show={show} theme={dark ? "dark" : "light"} height={200} />
				<LevelCharts id={id} show={show} theme={dark ? "dark" : "light"} height={300} />
				<TimeCharts id={id} show={show} theme={dark ? "dark" : "light"} height={300} />
			</div>
		</details>
	);
}
