import { Badge } from "$/components/ui/atoms";
import { Content } from "$/components/ui/organisms";
import { LevelActions, Stub } from "$/components/ui/templates";
import { resolveLevelIndex } from "$/helpers";
import { useDataset, useTitle } from "$/hooks";
import { useParams } from "$/router";
import { css, cva } from "$/styles/css";
import { hstack } from "$/styles/patterns";
import { token } from "$/styles/tokens";
import { IEntry } from "$/types";
import { predicates } from "$/utils";
import { Fragment } from "react";

export default function Page() {
	const { key, sid, bid } = useParams("/:key/level/:sid/:bid");
	const { state: dataset } = useDataset(key);
	const data = dataset?.data.find((d) => {
		const { characteristic, difficulty } = resolveLevelIndex(Number(bid));
		return (d.id === sid || d.id === sid.toLowerCase()) && d.characteristic === characteristic && d.difficulty === difficulty;
	});
	useTitle(data ? `${data.title ?? data.id} [${data.characteristic} ${data.difficulty}]` : "Unknown Level");

	function mappers(data: Pick<IEntry, "mappers" | "lighters">) {
		const values = [...(data.mappers ?? []), ...(data.lighters ?? [])].filter(predicates.unique);
		return values.map((mapper, i) => {
			const isMapper = data.mappers && data.mappers.includes(mapper);
			const isLighter = data.lighters && data.lighters.includes(mapper);
			const type = isMapper && !isLighter ? "mapper" : isLighter && !isMapper ? "lighter" : "hybrid";
			const Name = (
				<a key={mapper} className={cn.mappers.name({ type })}>
					{mapper}
				</a>
			);
			if (i === values.length - 1) return Name;
			return <span>{Name}, </span>;
		}, null);
	}

	function Title() {
		return (
			<Fragment>
				<div className={cn.title.wrapper}>
					<span className={cn.title.name({ exists: !!data?.title })}>{data ? data.title ?? data.id : "Unknown Level"}</span>
					{data && (
						<Fragment>
							<div className={cn.level}>
								<Badge>{data.characteristic}</Badge>
								<Badge color={token(`colors.difficulty.${data.difficulty}`)}>{data.difficulty}</Badge>
							</div>
							{(data.mappers || data.lighters) && mappers.length > 0 && <span className={cn.mappers.list}>[{mappers(data)}]</span>}
						</Fragment>
					)}
				</div>
				<div className={cn.title.wrapper}>
					<LevelActions id={`${sid}/${bid}`} />
				</div>
			</Fragment>
		);
	}
	return (
		<Content title={<Title />} layout={"level"}>
			{data ? <Stub /> : "This level is not available."}
		</Content>
	);
}

const cn = {
	title: {
		wrapper: hstack({ gap: 4 }),
		name: cva({
			variants: {
				exists: {
					true: { color: "text" },
					false: { color: "subtext" },
				},
			},
		}),
	},
	level: hstack({ gap: 0 }),
	mappers: {
		list: css({ color: "subtext" }),
		name: cva({
			base: {
				fontWeight: "bold",
			},
			variants: {
				type: {
					mapper: { color: "green.500" },
					lighter: { color: "fuchsia.500" },
					hybrid: { color: "violet.500" },
				},
			},
		}),
	},
};
