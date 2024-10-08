import { difficulties } from "$/constants/beatmap";
import { IDataset, IEntry } from "$/types";
import { omit, predicates } from "$/utils";
import { EChartsOption } from "echarts";
import { css } from "styled-system/css";
import { hstack, vstack } from "styled-system/patterns";

export interface ChartProps {
	id: string;
	show?: boolean;
	theme?: string;
	height?: number;
}

type Chart = (dataset: IDataset<IEntry[]>, transformer: (data: IEntry) => string | number | Date | undefined, options?: EChartsOption, filter?: (data: IEntry) => boolean) => EChartsOption | null;

const template: EChartsOption = {
	animation: false,
	tooltip: { confine: true },
	legend: {
		type: "scroll",
		orient: "horizontal",
		bottom: 0,
	},
	visualMap: {
		textStyle: { fontFamily: "monospace" },
	},
	xAxis: {
		axisTick: { alignWithLabel: true },
		axisLabel: { fontFamily: "monospace" },
	},
	yAxis: {
		axisTick: { alignWithLabel: true },
		axisLabel: { fontFamily: "monospace" },
	},
};

export const base = {
	pie: (dataset, transformer, options, filter = () => true) => {
		const data = dataset.data.filter((x) => filter(x));
		const series = data.length === 0 ? [] : data.map(transformer).filter(predicates.unique);
		return {
			...omit(template, "xAxis", "yAxis", "visualMap"),
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
		const titles = data.map((x) => x.title ?? x.id).filter(predicates.unique);
		return {
			...omit(template, "visualMap"),
			...options,
			xAxis: { ...template.xAxis, type: "category", axisTick: { show: false }, axisLabel: { show: false }, data: titles },
			yAxis: { ...template.yAxis },
			dataZoom: [
				{ type: "inside", yAxisIndex: 0, filterMode: "none" },
				{ type: "slider", xAxisIndex: 0, filterMode: "none", bottom: 40 },
			],
			series: difficulties.map((difficulty) => {
				const values = data.filter((x) => x.difficulty === difficulty);
				return {
					type: "scatter",
					name: difficulty,
					data: data.length === 0 ? [] : values.map((x) => [titles.indexOf(x.title ?? x.id), transformer(x)!]),
					markLine: {
						data: [{ type: "average", name: "Average", label: { fontFamily: "monospace" } }],
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
			xAxis: { ...template.xAxis, type: "category", data: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"] },
			yAxis: { ...template.yAxis, type: "category", data: ["Sat", "Fri", "Thu", "Wed", "Tue", "Mon", "Sun"] },
			visualMap: { ...template.visualMap, min: 0, max: Math.max(...totals), calculable: true, orient: "horizontal", left: "center" },
			series: {
				type: "heatmap",
				data: cells.map((cell, i) => [cell.hours, cell.day, totals[i]]),
			},
		};
	},
} satisfies Record<string, Chart>;

export const cn = {
	column: vstack(),
	row: hstack({ justifyContent: "center", flex: 1, width: "full" }),
	select: css({ minWidth: 24 }),
};
