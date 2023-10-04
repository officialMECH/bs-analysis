import { flex, hstack, vstack } from "$/styles/patterns";
import { IData, IDataset } from "$/types";
import { predicates } from "$/utils";
import { EChartsOption } from "echarts";

export interface ChartProps {
	id: string;
	show?: boolean;
	theme?: string;
	height?: number;
}

type Chart = (dataset: IDataset<IData[]>, transformer: (data: IData) => string | number | Date | undefined, options?: EChartsOption, filter?: (data: IData) => boolean) => EChartsOption | null;

const template: EChartsOption = {
	animation: false,
	tooltip: {},
	legend: {
		orient: "horizontal",
		bottom: 0,
	},
};

export const base = {
	pie: (dataset, transformer, options, filter = () => true) => {
		const data = dataset.data.filter((x) => filter(x));
		const series = data.map(transformer).filter(predicates.unique);
		return {
			...template,
			...options,
			title: { ...template.title, ...options?.title },
			legend: { show: false },
			series: {
				type: "pie",
				data: series.map((serie) => {
					const values = data.filter((x) => transformer(x) === serie);
					return {
						value: values.length,
						name: serie!.toString(),
					};
				}),
			},
		};
	},
	level: (dataset, transformer, options, filter = () => true) => {
		const data = dataset.data.filter((x) => filter(x) && transformer(x) !== undefined);
		if (data.length === 0) return null;
		const difficulties = data.map((x) => x.difficulty).filter(predicates.unique);
		const titles = data.map((x) => x.title ?? x.id).filter(predicates.unique);
		return {
			...template,
			...options,
			xAxis: { type: "category", axisTick: { show: false }, axisLabel: { show: false }, data: titles },
			series: difficulties.map((difficulty) => {
				const values = data.filter((x) => x.difficulty === difficulty);
				return {
					type: "scatter",
					name: difficulty,
					data: values.map((x) => [titles.indexOf(x.title ?? x.id), transformer(x)!]),
					markLine: {
						data: [{ type: "average", name: "Average" }],
					},
				};
			}),
		};
	},
	time: (dataset, transformer, options, filter = () => true) => {
		const data = dataset.data.filter((x) => filter(x) && transformer(x) !== undefined);
		if (data.length === 0) return null;
		const cells = data.map((x) => {
			const date = new Date(transformer(x)!);
			return { hours: date.getHours(), day: date.getDay() };
		});
		const totals = cells.map((cell) => {
			const values = data.filter((x) => {
				const date = new Date(transformer(x)!);
				return date.getDay() === cell.day && date.getHours() === cell.hours;
			});
			return values.length;
		});
		return {
			...template,
			...options,
			xAxis: { type: "category", data: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"] },
			yAxis: { type: "category", data: ["Saturday", "Friday", "Thursday", "Wednesday", "Tuesday", "Monday", "Sunday"] },
			visualMap: { min: 0, max: Math.max(...totals), calculable: true, orient: "horizontal", left: "center" },
			series: {
				type: "heatmap",
				data: cells.map((cell, i) => [cell.hours, cell.day, totals[i]]),
			},
		};
	},
} satisfies Record<string, Chart>;

export const styles = {
	wrapper: flex({ margin: 4, width: "full", direction: "column", gap: 4 }),
	column: vstack(),
	row: hstack(),
};
