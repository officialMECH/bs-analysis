import { Chart } from "$/components";
import { useDataset } from "$/hooks";
import { ChartProps, base, styles } from "./helpers";

export default function TimeCharts({ id, show, theme, height }: ChartProps) {
	const { state } = useDataset(id);

	if (!show) return null;

	const charts = [
		base.time(state!, (x) => x.released, { title: { text: "Release Dates", subtext: "by Time of Day" } }), //
	].filter((x) => !!x);
	if (charts.length === 0) return null;

	return (
		<div className={styles.column}>
			<Chart style={{ height }} theme={theme} option={charts[0]!}></Chart>
		</div>
	);
}
