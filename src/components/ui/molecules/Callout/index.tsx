import { css, cx } from "$/styles/css";
import { hstack, vstack } from "$/styles/patterns";
import { PropsWithChildren } from "react";

interface Props {
	title?: string;
}

function Component({ title, children }: PropsWithChildren<Props>) {
	return (
		<aside className={cx(cn.root)}>
			{title && <span className={cx(cn.heading)}>{title}</span>}
			<small className={cx(cn.content)}>{children}</small>
		</aside>
	);
}

const cn = {
	root: vstack({
		gap: 1,
		alignItems: "start",
		width: "full",
		padding: 4,
		backgroundColor: "container",
	}),
	heading: hstack({
		fontWeight: "bold",
	}),
	content: css({}),
};

export { Component };
