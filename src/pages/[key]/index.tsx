import { Details, Section } from "$/components/ui/molecules";
import { Content } from "$/components/ui/organisms";
import { DatasetActions, LevelCharts, PieCharts, TimeCharts } from "$/components/ui/templates";
import { formatters } from "$/helpers";
import { useDark, useDataset, useTitle } from "$/hooks";
import { useParams } from "$/router";
import { Fragment, useState } from "react";
import { cva } from "styled-system/css";
import { flex, stack, vstack } from "styled-system/patterns";

export default function Overview() {
	const [show, setShow] = useState(false);
	const dark = useDark();
	const { key } = useParams("/:key");
	const { state: dataset } = useDataset(key);
	useTitle(dataset ? `${dataset?.name ?? key}` : "Unknown Dataset");

	function Title() {
		return (
			<Fragment>
				<span className={cn.name({ exists: !!dataset?.name })}>{dataset ? dataset.name ?? key : "Unknown Dataset"}</span>
				<DatasetActions id={key} />
			</Fragment>
		);
	}
	function Charts() {
		return (
			<div className={cn.charts}>
				<PieCharts id={key} show={show} theme={dark ? "dark" : "light"} height={150} />
				<LevelCharts id={key} show={show} theme={dark ? "dark" : "light"} height={300} />
				<TimeCharts id={key} show={show} theme={dark ? "dark" : "light"} height={300} />
			</div>
		);
	}
	return (
		<Content title={<Title />} layout={"data"}>
			{dataset ? (
				<Fragment>
					{(dataset.description || dataset.contributors || dataset.updated) && (
						<Section className={cn.description}>
							{dataset.description && <div className={cn.description}>{dataset.description}</div>}
							{(dataset.contributors || dataset.updated) && (
								<div className={cn.metadata}>
									{dataset.updated && (
										<div className={cn.field}>
											<strong>Last Updated</strong>
											<small>{new Date(dataset.updated).toLocaleString()}</small>
										</div>
									)}
									{dataset.contributors && (
										<div className={cn.field}>
											<strong>Contributors</strong>
											<small>{formatters.array(dataset.contributors)}</small>
										</div>
									)}
								</div>
							)}
						</Section>
					)}
					<Section>
						<Details render={() => <Charts />} open={show} onOpenChange={(open) => setShow(open)}>
							Charts
						</Details>
					</Section>
				</Fragment>
			) : (
				"This dataset is not available."
			)}
		</Content>
	);
}

const cn = {
	name: cva({
		variants: {
			exists: {
				true: { color: "text" },
				false: { color: "subtext" },
			},
		},
	}),
	description: vstack({ alignItems: "left", whiteSpace: "pre-line" }),
	metadata: stack({
		gap: { base: 4, xs: 8 },
		flexDirection: { base: "column", xs: "row" },
	}),
	field: vstack({ gap: 0, alignItems: "left" }),
	charts: flex({ marginY: 4, width: "full", direction: "column", gap: 4 }),
};
