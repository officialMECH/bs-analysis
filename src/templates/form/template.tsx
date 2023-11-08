import { css, cva } from "$/styles/css";
import { vstack } from "$/styles/patterns";
import { Fragment, PropsWithChildren } from "react";

interface Props {
	title?: string;
}

function Template({ title, children }: PropsWithChildren<Props>) {
	return (
		<Fragment>
			<h2 className={styles.title}>{title}</h2>
			<hr />
			<div className={styles.contents}>{children}</div>
		</Fragment>
	);
}

function Row({ children, size = "sm" }: PropsWithChildren<{ size?: "sm" | "md" | "lg" | "xl" }>) {
	return (
		<Fragment>
			<div className={styles.row({ size })}>{children}</div>
		</Fragment>
	);
}

export { Row, Template };

const styles = {
	title: css({
		fontSize: "2xl",
	}),
	contents: vstack({
		alignItems: "start",
		gap: 4,
	}),
	row: cva({
		base: {
			display: "grid",
			width: "full",
			gridTemplateColumns: "repeat(auto-fit, minmax(48px, 1fr))",
			gridRowGap: 4,
			gridColumnGap: 2,
		},
		variants: {
			size: {
				sm: { gridTemplateColumns: "repeat(auto-fit, minmax(48px, 1fr))" },
				md: { gridTemplateColumns: "repeat(auto-fit, minmax(96px, 1fr))" },
				lg: { gridTemplateColumns: "repeat(auto-fit, minmax(144px, 1fr))" },
				xl: { gridTemplateColumns: "repeat(auto-fit, minmax(192px, 1fr))" },
			},
		},
	}),
};
