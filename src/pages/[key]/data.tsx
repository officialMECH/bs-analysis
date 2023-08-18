import { Templates } from "$/components";
import { useDataset, useTitle } from "$/hooks";
import { useParams } from "$/router";
import { Fragment } from "react";

export default function Data() {
	const { key } = useParams("/:key");
	const { state: dataset } = useDataset(key);
	useTitle(dataset ? `Dataset: ${dataset?.name ?? key}` : "Unknown Dataset");

	function Title() {
		return (
			<Fragment>
				<span>{dataset ? dataset.name ?? key : "Unknown Dataset"}</span>
				<Templates.Actions id={key} exists={!!dataset}></Templates.Actions>
			</Fragment>
		);
	}
	return (
		<Templates.Content title={<Title />} controls>
			{dataset && <Templates.Table id={key} data={dataset.data} />}
		</Templates.Content>
	);
}
