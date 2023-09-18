import { cva } from "$/styles/css";
import { hstack, scrollable, vstack } from "$/styles/patterns";
import { Fragment, PropsWithChildren, ReactNode } from "react";
import Nav from "./nav";

interface Props {
	title: ReactNode;
	layout?: "home" | "basic" | "data" | "level";
	gap?: number;
}

export default function Content({ title: text, layout, gap = 8, children }: PropsWithChildren<Props>) {
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
			<div className={styles.content({ center: layout === "home" })} style={{ gap: gap * 4 }}>
				{children}
			</div>
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
	content: cva({
		base: vstack.raw({}),
		variants: {
			center: {
				true: { alignItems: "center" },
				false: { alignItems: "start" },
			},
		},
	}),
};
