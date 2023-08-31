import { css } from "$/styles/css";
import { hstack, vstack } from "$/styles/patterns";
import { join } from "$/utils";
import { ComponentProps, ReactNode } from "react";
import Tooltip from "../floating/tooltip";

interface Props extends ComponentProps<"input"> {
	heading: string;
	subheading?: string;
	tooltip?: () => ReactNode;
}

export default function InputField({ heading, subheading, tooltip, onClick, ...delegated }: Props) {
	return (
		<div className={styles.group}>
			<h2 className={styles.row}>
				{heading}
				{subheading && <small className={styles.subheading}>{subheading}</small>}
				{tooltip && (
					<Tooltip render={tooltip}>
						<i className={join("fa-solid fa-question-circle", styles.tooltip)} onClick={onClick}></i>
					</Tooltip>
				)}
			</h2>
			<input {...delegated} />
		</div>
	);
}

const styles = {
	group: vstack({ gap: 1, alignItems: "start" }),
	row: hstack({ gap: 2, alignItems: "baseline" }),
	subheading: css({ fontWeight: "normal", color: "subtext" }),
	tooltip: css({ color: "subtext" }),
};
