import { Chart } from "$/components/ui/atoms";
import { useDataset } from "$/hooks";
import { memo } from "react";
import { ChartProps, base, cn } from "./helpers";

const Component = memo(({ id, show, theme, height }: ChartProps) => {
	const { state } = useDataset(id);

	if (!show) return null;

	const charts = [
		base.time(state!, (x) => x.released, { title: { text: "Release Dates", subtext: "by Time of Day" } }), //
	].filter((x) => !!x);
	if (charts.length === 0) return null;

	return (
		<div className={cn.column}>
			<Chart style={{ height }} theme={theme} option={charts[0]!}></Chart>
		</div>
	);
});

export { Component };
