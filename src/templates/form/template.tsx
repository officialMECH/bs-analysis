import { css } from "$/styles/css";
import { flex, vstack } from "$/styles/patterns";
import { Fragment, PropsWithChildren } from "react";

interface Props {
	title?: string;
}

function Template({ title, children }: PropsWithChildren<Props>) {
	return (
		<Fragment>
			<h2 className={styles.title}>{title}</h2>
			<hr />
			<div className={styles.spacer}>{children}</div>
		</Fragment>
	);
}

function Row({ children }: PropsWithChildren<Props>) {
	return <div className={styles.row}>{children}</div>;
}

export { Row, Template };

const styles = {
	title: css({ fontSize: "2xl" }),
	spacer: vstack({ alignItems: "start", gap: 4 }),
	row: flex({ width: "full", gap: 2 }),
};
