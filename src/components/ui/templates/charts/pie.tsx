import { Chart } from "$/components/ui/atoms";
import { useDataset } from "$/hooks";
import { memo } from "react";
import { ChartProps, base, cn } from "./helpers";

const Component = memo(({ id, show, theme, height }: ChartProps) => {
	const { state } = useDataset(id);

	if (!show) return null;

	const charts = [
		base.pie(state!, (x) => x.characteristic, {}), //
		base.pie(state!, (x) => x.difficulty, {}),
	].filter((x) => !!x);
	if (charts.length === 0) return null;

	return (
		<div className={cn.row}>
			<Chart style={{ height }} theme={theme} option={charts[0]} />
			<Chart style={{ height }} theme={theme} option={charts[1]} />
		</div>
	);
});

export { Component };
