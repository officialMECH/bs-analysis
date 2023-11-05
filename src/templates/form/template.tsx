import { css } from "$/styles/css";
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

function Row({ children }: PropsWithChildren) {
	return (
		<Fragment>
			<div className={styles.row}>{children}</div>
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
	row: css({
		display: "grid",
		width: "full",
		gridTemplateColumns: "repeat(auto-fit, minmax(56px, 1fr))",
		gridRowGap: 4,
		gridColumnGap: 2,
	}),
};
