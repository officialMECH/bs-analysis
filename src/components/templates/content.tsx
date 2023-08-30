import { cva } from "$/styles/css";
import { hstack, scrollable, vstack } from "$/styles/patterns";
import { Fragment, PropsWithChildren, ReactNode } from "react";
import Nav from "./nav";

interface Props {
	title: ReactNode;
	layout?: "home" | "basic" | "data" | "level";
}

export default function Content({ title: text, layout, children }: PropsWithChildren<Props>) {
	return (
		<main>
			<h1 className={styles.title({ center: layout === "home" })}>{text}</h1>
			<hr />
			{layout && (
				<Fragment>
					<Nav layout={layout} />
					<hr />
				</Fragment>
			)}
			<div className={styles.content}>{children}</div>
		</main>
	);
}

const styles = {
	title: cva({
		base: scrollable.raw({
			direction: "horizontal",
			hideScrollbar: true,
			padding: 0.5,
			whiteSpace: "nowrap",
			fontSize: "3xl",
		}),
		variants: {
			center: {
				true: hstack.raw({ justifyContent: "center", textAlign: "center", whiteSpace: "normal" }),
				false: hstack.raw({ gap: 8, justifyContent: "space-between" }),
			},
		},
	}),
	content: vstack({
		alignItems: "start",
	}),
};
