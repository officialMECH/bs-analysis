import { formatters } from "$/helpers";
import { useDataset, useTitle } from "$/hooks";
import { useParams } from "$/router";
import { cva } from "$/styles/css";
import { stack, vstack } from "$/styles/patterns";
import Templates from "$/templates";
import { Fragment } from "react";

export default function Overview() {
	const { key } = useParams("/:key");
	const { state: dataset } = useDataset(key);
	useTitle(dataset ? `${dataset?.name ?? key}` : "Unknown Dataset");

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
			{dataset ? (
				<Fragment>
					{(dataset.description || dataset.contributors || dataset.updated) && (
						<div className={styles.description}>
							{dataset.description && <span className={styles.description}>{dataset.description}</span>}
							{(dataset.contributors || dataset.updated) && (
								<div className={styles.metadata}>
									{dataset.updated && (
										<div className={styles.field}>
											<strong>Last Updated</strong>
											<small>{new Date(dataset.updated).toLocaleString()}</small>
										</div>
									)}
									{dataset.contributors && (
										<div className={styles.field}>
											<strong>Contributors</strong>
											<small>{formatters.array(dataset.contributors)}</small>
										</div>
									)}
								</div>
							)}
						</div>
					)}
					<Templates.Charts id={key} />
				</Fragment>
			) : (
				"This dataset is not available."
			)}
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
	description: vstack({ alignItems: "left", whiteSpace: "pre-line" }),
	metadata: stack({
		gap: { base: 4, xs: 8 },
		flexDirection: { base: "column", xs: "row" },
	}),
	field: vstack({ gap: 0, alignItems: "left" }),
};
