import { Chart, Icon } from "$/components";
import { characteristics } from "$/constants/beatmap";
import { calc } from "$/helpers";
import { useDataset } from "$/hooks";
import { IEntry } from "$/types";
import { predicates } from "$/utils";
import { useState } from "react";
import { ChartProps, base, styles } from "./helpers";

export default function LevelCharts({ id, show, theme, height }: ChartProps) {
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
		base.level(state!, (x) => calc.nps(x)?.toFixed(2), { title: { text: "Level Distribution", subtext: "by NPS" } }, filter), //
		base.level(state!, (x) => x.jumpSpeed, { title: { text: "Level Distribution", subtext: "by Jump Speed" } }, filter),
		base.level(state!, (x) => calc.jd(x)?.toFixed(3), { title: { text: "Level Distribution", subtext: "by Jump Distance" } }, filter),
	].filter((x) => !!x);
	if (charts.length === 0) return null;

	if (charts.length <= idx) setIdx(charts.length - 1);

	return (
		<div className={styles.column}>
			<Chart style={{ height }} theme={theme} option={charts[idx]}></Chart>
			<div className={styles.row}>
				<select className={styles.select} disabled={pack === "All" && packs.length < 2} value={pack} onChange={(e) => setPack(e.target.value)}>
					{["All", ...packs, pack].filter(predicates.unique).map((x) => (
						<option key={x}>{x}</option>
					))}
				</select>
				<select className={styles.select} value={characteristic} onChange={(e) => setCharacteristic(e.target.value)}>
					{characteristics.map((x) => (
						<option key={x}>{x}</option>
					))}
				</select>
			</div>
			<div className={styles.row}>
				<button disabled={idx === 0} onClick={() => setIdx((x) => x - 1)}>
					<Icon className="fa-solid fa-arrow-left" />
				</button>
				<button disabled={idx === charts.length - 1} onClick={() => setIdx((x) => x + 1)}>
					<Icon className="fa-solid fa-arrow-right" />
				</button>
			</div>
		</div>
	);
}
