import { Spacer, Templates } from "$/components";
import { formatters } from "$/helpers";
import { useDataset, useMobile, useTitle } from "$/hooks";
import { useParams } from "$/router";
import { Fragment } from "react";

export default function Overview() {
	const { key } = useParams("/:key");
	const { state: dataset } = useDataset(key);
	useTitle(dataset ? `${dataset?.name ?? key}` : "Unknown Dataset");
	const mobile = useMobile();

	function Title() {
		return (
			<Fragment>
				<span style={{ color: dataset && dataset.name ? undefined : "gray" }}>{dataset ? dataset.name ?? key : "Unknown Dataset"}</span>
				<Templates.Actions id={key} exists={!!dataset}></Templates.Actions>
			</Fragment>
		);
	}
	return (
		<Templates.Content title={<Title />} controls>
			<Spacer as={"div"} size={2} direction="column">
				{dataset ? (
					<Fragment>
						{(dataset.description || dataset.contributors || dataset.updated) && (
							<div>
								{dataset.description && <p style={{ marginTop: 0, whiteSpace: "pre-line" }}>{dataset.description}</p>}
								<Spacer as={"div"} size={mobile ? 1 : 2} direction={mobile ? "column" : "row"}>
									{dataset.updated && (
										<Spacer as={"div"} size={0} direction="column">
											<strong>Last Updated</strong>
											<small>{new Date(dataset.updated).toLocaleString()}</small>
										</Spacer>
									)}
									{dataset.contributors && (
										<Spacer as={"div"} size={0} direction="column">
											<strong>Contributors</strong>
											<small>{formatters.array(dataset.contributors)}</small>
										</Spacer>
									)}
								</Spacer>
							</div>
						)}
					</Fragment>
				) : (
					"This dataset is not available."
				)}
			</Spacer>
		</Templates.Content>
	);
}
