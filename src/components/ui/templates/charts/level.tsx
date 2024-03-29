import { Button, Chart, Icon, Select } from "$/components/ui/atoms";
import { characteristics } from "$/constants/beatmap";
import { calc } from "$/helpers";
import { useDataset } from "$/hooks";
import { IEntry } from "$/types";
import { predicates } from "$/utils";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { memo, useState } from "react";
import { ChartProps, base, cn } from "./helpers";

const Component = memo(({ id, show, theme, height }: ChartProps) => {
	const { state } = useDataset(id);
	const [idx, setIdx] = useState(0);
	const [pack, setPack] = useState("All");
	const [characteristic, setCharacteristic] = useState("Standard");
	const packs = Object.values(state!.data.map((x) => x.pack).filter((x, i, a) => !!x && predicates.unique(x, i, a)));

	if (!show) return null;

	const filter = (x: IEntry) => {
		const withPack = pack !== "All" ? x.pack === pack : true;
		return withPack && x.characteristic === characteristic;
	};

	const charts = [
		base.level(state!, (x) => calc.nps(x)?.toFixed(2), { title: { text: "Level Distribution", subtext: "by NPS" } }, filter),
		base.level(state!, (x) => x.jumpSpeed, { title: { text: "Level Distribution", subtext: "by Jump Speed" } }, filter),
		base.level(state!, (x) => calc.jd(x)?.toFixed(3), { title: { text: "Level Distribution", subtext: "by Jump Distance" } }, filter),
		//
	].filter((x) => !!x);
	if (charts.length === 0) return null;

	if (charts.length <= idx) setIdx(charts.length - 1);

	return (
		<div className={cn.column}>
			<Chart style={{ height }} theme={theme} option={charts[idx]} />
			<div className={cn.row}>
				<Select className={cn.select} disabled={pack === "All" && packs.length < 2} value={pack} onChange={(e) => setPack(e.target.value)}>
					{["All", ...packs, pack].filter(predicates.unique).map((x) => (
						<option key={x}>{x}</option>
					))}
				</Select>
				<Select className={cn.select} value={characteristic} onChange={(e) => setCharacteristic(e.target.value)}>
					{characteristics.map((x) => (
						<option key={x}>{x}</option>
					))}
				</Select>
			</div>
			<div className={cn.row}>
				<Button disabled={idx === 0} onClick={() => setIdx((x) => x - 1)}>
					<Icon icon={faArrowLeft} />
				</Button>
				<Button disabled={idx === charts.length - 1} onClick={() => setIdx((x) => x + 1)}>
					<Icon icon={faArrowRight} />
				</Button>
			</div>
		</div>
	);
});

export { Component };
