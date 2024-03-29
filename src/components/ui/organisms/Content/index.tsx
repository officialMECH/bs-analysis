import { Heading } from "$/components/ui/atoms";
import { cva } from "$/styles/css";
import { hstack, scrollable, vstack } from "$/styles/patterns";
import { Fragment, PropsWithChildren, ReactNode } from "react";
import Nav from "./nav";

interface Props {
	title: ReactNode;
	layout?: "home" | "basic" | "data" | "level";
	gap?: number;
}

function Component({ title: text, layout, gap = 8, children }: PropsWithChildren<Props>) {
	return (
		<main>
			<Heading size={1} className={cn.title({ center: layout === "home" })}>
				{text}
			</Heading>
			<hr />
			{layout && (
				<Fragment>
					<Nav layout={layout} />
					<hr />
				</Fragment>
			)}
			<div className={cn.content({ center: layout === "home" })} style={{ gap: gap * 4 }}>
				{children}
			</div>
		</main>
	);
}

const cn = {
	title: cva({
		base: scrollable.raw({
			direction: "horizontal",
			hideScrollbar: true,
			padding: 0.5,
			whiteSpace: "nowrap",
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
				true: { alignItems: "center", justifyContent: "center" },
				false: { alignItems: "start", justifyContent: "start" },
			},
		},
	}),
};

export { Component };
