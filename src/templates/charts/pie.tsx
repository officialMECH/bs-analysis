import { Chart } from "$/components";
import { useDataset } from "$/hooks";
import { ChartProps, base, styles } from "./helpers";

export default function PieCharts({ id, show, theme, height }: ChartProps) {
	const { state } = useDataset(id);
	if (!show) return null;
	return (
		<div className={styles.row}>
			<Chart style={{ height }} theme={theme} option={base.pie(state!, (x) => x.characteristic, {})} />
			<Chart style={{ height }} theme={theme} option={base.pie(state!, (x) => x.difficulty, {})} />
		</div>
	);
}
