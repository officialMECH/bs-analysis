import { Chart } from "$/components";
import { useDataset } from "$/hooks";
import { ChartProps, base, styles } from "./helpers";

export default function PieCharts({ id, show, theme, height }: ChartProps) {
	const { state } = useDataset(id);

	if (!show) return null;

	const charts = [
		base.pie(state!, (x) => x.characteristic, {}), //
		base.pie(state!, (x) => x.difficulty, {}),
	].filter((x) => !!x);
	if (charts.length === 0) return null;

	return (
		<div className={styles.row}>
			<Chart style={{ height }} theme={theme} option={charts[0]} />
			<Chart style={{ height }} theme={theme} option={charts[1]} />
		</div>
	);
}
