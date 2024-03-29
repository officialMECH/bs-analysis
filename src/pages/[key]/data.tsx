import { Content, DatasetTable } from "$/components/ui/organisms";
import { DatasetActions } from "$/components/ui/templates";
import { useDataset, useTitle } from "$/hooks";
import { useParams } from "$/router";
import { cva } from "$/styles/css";
import { Fragment } from "react";

export default function Data() {
	const { key } = useParams("/:key");
	const { state: dataset } = useDataset(key);
	useTitle(dataset ? `Data: ${dataset?.name ?? key}` : "Unknown Dataset");

	function Title() {
		return (
			<Fragment>
				<span className={cn.name({ exists: !!dataset?.name })}>{dataset ? dataset.name ?? key : "Unknown Dataset"}</span>
				<DatasetActions id={key} />
			</Fragment>
		);
	}
	return (
		<Content title={<Title />} layout={"data"}>
			{dataset ? <DatasetTable id={key} data={dataset.data} /> : "This dataset is not available."}
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
};
