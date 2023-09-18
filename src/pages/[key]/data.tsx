import { useDataset, useTitle } from "$/hooks";
import { useParams } from "$/router";
import { cva } from "$/styles/css";
import Templates from "$/templates";
import { Fragment } from "react";

export default function Data() {
	const { key } = useParams("/:key");
	const { state: dataset } = useDataset(key);
	useTitle(dataset ? `Data: ${dataset?.name ?? key}` : "Unknown Dataset");

	function Title() {
		return (
			<Fragment>
				<span className={styles.name({ exists: !!dataset?.name })}>{dataset ? dataset.name ?? key : "Unknown Dataset"}</span>
				<Templates.Actions id={key} exists={!!dataset} />
			</Fragment>
		);
	}
	return (
		<Templates.Content title={<Title />} layout={"data"}>
			{dataset ? <Templates.Table id={key} data={dataset.data} /> : "This dataset is not available."}
		</Templates.Content>
	);
}

const styles = {
	name: cva({
		variants: {
			exists: {
				true: { color: "text" },
				false: { color: "subtext" },
			},
		},
	}),
};
