import { Badge, Spacer } from "$/components";
import { DIFFICULTY_COLORS } from "$/constants";
import { resolveLevelIndex } from "$/helpers";
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
			if (i === values.length - 1) return <a style={{ color: "lime", fontWeight: "bold" }}>{mapper}</a>;
			return <span>{<a style={{ color: "lime", fontWeight: "bold" }}>{mapper}</a>}, </span>;
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
			<h1 className="hide-scroll" style={{ display: "flex", alignItems: "center", gap: "4rem", justifyContent: "space-between", whiteSpace: "nowrap", overflowX: "scroll" }}>
				<Spacer direction="row">
					{data.title}
					<div>
						<Badge>{data.characteristic}</Badge>
						<Badge color={DIFFICULTY_COLORS[data.difficulty]}>{data.difficulty}</Badge>
					</div>
					{(data.mappers || data.lighters) && mappers.length > 0 && <span>[{mappers(data)}]</span>}
				</Spacer>
			</h1>
			<hr />
		</main>
	);
}
