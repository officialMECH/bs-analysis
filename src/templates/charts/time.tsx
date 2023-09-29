import { Chart } from "$/components";
import { useDataset } from "$/hooks";
import { ChartProps, base, styles } from "./helpers";

export default function TimeCharts({ id, show, theme, height }: ChartProps) {
	const { state } = useDataset(id);
	if (!show) return null;
	return (
		<div className={styles.row}>
			<Chart style={{ height }} theme={theme} option={base.time(state!, (x) => x.released!, { title: { text: "Release Dates", subtext: "by Time of Day" } })}></Chart>
		</div>
	);
}
