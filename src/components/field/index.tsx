import { css, cx } from "$/styles/css";
import { hstack, vstack } from "$/styles/patterns";
import { ComponentProps, ReactNode } from "react";
import { Tooltip } from "..";

interface Props extends ComponentProps<"input"> {
	heading: string;
	subheading?: string;
	tooltip?: () => ReactNode;
}

export default function Field({ heading, subheading, tooltip, onClick, children, ...delegated }: Props) {
	return (
		<div className={styles.group}>
			<h2 className={styles.row}>
				{heading}
				{subheading && <small className={styles.subheading}>{subheading}</small>}
				{tooltip && (
					<Tooltip render={tooltip}>
						<i className={cx("fa-solid fa-question-circle", styles.tooltip)} onClick={onClick} />
					</Tooltip>
				)}
			</h2>
			{children ?? <input {...delegated} />}
		</div>
	);
}

const styles = {
	group: vstack({ gap: 1, alignItems: "start" }),
	row: hstack({ gap: 2, alignItems: "baseline" }),
	subheading: css({ fontWeight: "normal", color: "subtext" }),
	tooltip: css({ color: "subtext" }),
};
