import { Badge, Spacer, Templates } from "$/components";
import { colors } from "$/constants";
import { resolveLevelIndex } from "$/helpers";
import { useDataset, useTitle } from "$/hooks";
import { useParams } from "$/router";
import { IData } from "$/types";
import { predicates } from "$/utils";

export default function Level() {
	const { key, sid, bid } = useParams("/:key/level/:sid/:bid");
	const { state: dataset } = useDataset(key);
	const data = dataset?.data.find((d) => {
		const { characteristic, difficulty } = resolveLevelIndex(Number(bid));
		return (d.id === sid || d.id === sid.toLowerCase()) && d.characteristic === characteristic && d.difficulty === difficulty;
	});
	useTitle(data ? `${data.title ?? data.id} [${data.characteristic} ${data.difficulty}]` : "Unknown Level");

	function mappers(data: Pick<IData, "mappers" | "lighters">) {
		const values = [...(data.mappers ?? []), ...(data.lighters ?? [])].filter(predicates.unique);
		return values.map((mapper, i) => {
			const isMapper = data.mappers && data.mappers.includes(mapper);
			const isLighter = data.lighters && data.lighters.includes(mapper);
			const color = isMapper && !isLighter ? colors.mapper.mapper : isLighter && !isMapper ? colors.mapper.lighter : colors.mapper.hybrid;
			if (i === values.length - 1) return <a style={{ color, fontWeight: "bold" }}>{mapper}</a>;
			return <span>{<a style={{ color, fontWeight: "bold" }}>{mapper}</a>}, </span>;
		}, null);
	}

	if (!data) {
		return (
			<Templates.Content title={"Unknown Level"} nav={false}>
				<p>This level is not available.</p>
			</Templates.Content>
		);
	}

	const Title = () => {
		return (
			<Spacer as={"div"} direction="row">
				{data.title}
				<div>
					<Badge>{data.characteristic}</Badge>
					<Badge color={colors.difficulty(0.5)[data.difficulty]}>{data.difficulty}</Badge>
				</div>
				{(data.mappers || data.lighters) && mappers.length > 0 && <span style={{ color: "gray" }}>[{mappers(data)}]</span>}
			</Spacer>
		);
	};
	return <Templates.Content title={<Title />} nav={false}></Templates.Content>;
}
