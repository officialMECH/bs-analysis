import { Badge, Spacer } from "$/components";
import { DIFFICULTY_COLORS, MAPPER_COLORS } from "$/constants";
import { resolveLevelIndex, units } from "$/helpers";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { IData } from "$/types";
import { predicates } from "$/utils";

export default function Level() {
	const { key, sid, bid } = useParams("/:key/level/:sid/:bid");
	const { state } = useDataset(key);
	const data = state.data.find((d) => {
		const { characteristic, difficulty } = resolveLevelIndex(Number(bid));
		return (d.id === sid || d.id === sid.toLowerCase()) && d.characteristic === characteristic && d.difficulty === difficulty;
	});

	function mappers(data: Pick<IData, "mappers" | "lighters">) {
		const values = [...(data.mappers ?? []), ...(data.lighters ?? [])].filter(predicates.unique);
		return values.map((mapper, i) => {
			const isMapper = data.mappers && data.mappers.includes(mapper);
			const isLighter = data.lighters && data.lighters.includes(mapper);
			const color = isMapper && !isLighter ? MAPPER_COLORS.mapper : isLighter && !isMapper ? MAPPER_COLORS.lighter : MAPPER_COLORS.hybrid;
			if (i === values.length - 1) return <a style={{ color, fontWeight: "bold" }}>{mapper}</a>;
			return <span>{<a style={{ color, fontWeight: "bold" }}>{mapper}</a>}, </span>;
		}, null);
	}

	if (!localStorage.getItem(key) || !data) {
		return (
			<main>
				<h1>Not Found</h1>
				<hr />
				<p>This level is not available.</p>
			</main>
		);
	}
	return (
		<main>
			<h1 className="hide-webkit" style={{ display: "flex", alignItems: "center", gap: units.rem(4), justifyContent: "space-between", whiteSpace: "nowrap", overflowX: "scroll" }}>
				<Spacer direction="row">
					{data.title}
					<div>
						<Badge>{data.characteristic}</Badge>
						<Badge color={DIFFICULTY_COLORS[data.difficulty]}>{data.difficulty}</Badge>
					</div>
					{(data.mappers || data.lighters) && mappers.length > 0 && <span style={{ color: "lightgray" }}>[{mappers(data)}]</span>}
				</Spacer>
			</h1>
			<hr />
		</main>
	);
}
