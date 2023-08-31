import { cva } from "$/styles/css";
import { flex, vstack } from "$/styles/patterns";
import { Fragment, ReactNode, useState } from "react";

interface Props {
	render: Record<string, ReactNode>;
	initial?: string;
}

export default function Tabs({ render, initial = "" }: Props) {
	const entries = Object.entries(render);
	const [active, setActive] = useState(initial);
	return (
		<div className={styles.container}>
			<ul className={styles.list.wrapper}>
				{entries.map(([id]) => (
					<li key={id} onClick={() => setActive(id)} className={styles.list.item({ active: active === id })}>
						{id}
					</li>
				))}
			</ul>
			{active && (
				<div className={styles.outlet}>
					{entries.map(([id, child]) => (
						<Fragment key={id}>{active === id ? child : null}</Fragment>
					))}
				</div>
			)}
		</div>
	);
}

const styles = {
	container: vstack({
		width: "full",
		gap: 0,
	}),
	list: {
		wrapper: flex({
			gap: 2,
			width: "full",
		}),
		item: cva({
			base: {
				fontWeight: "bold",
				paddingY: 1,
				paddingX: 4,
				backgroundColor: "element",
				cursor: "pointer",
			},
			variants: {
				active: {
					true: { backgroundColor: "neutral", color: "white" },
				},
			},
		}),
	},
	outlet: vstack({
		alignItems: "start",
		backgroundColor: "container",
		padding: 4,
		width: "full",
	}),
};
