import { css, cva, cx } from "$/styles/css";
import { hstack, scrollable, vstack } from "$/styles/patterns";
import { DeepKeys, DeepValue, FieldApi } from "@tanstack/react-form";
import { PropsWithChildren, ReactNode } from "react";
import { Tooltip } from "..";

export interface Props<T, K extends DeepKeys<T>> {
	field?: FieldApi<T, K, undefined, undefined, DeepValue<T, K>>;
	heading: ReactNode;
	subheading?: string;
	center?: boolean;
	disabled?: boolean;
	tooltip?: () => ReactNode;
}

export default function Wrapper<T, K extends DeepKeys<T>>({ field, heading, subheading, center, tooltip, children }: PropsWithChildren<Props<T, K>>) {
	return (
		<div className={styles.group}>
			<h2 className={styles.heading({ center })}>
				{heading}
				{subheading && <small className={styles.subheading}>{subheading}</small>}
				{tooltip && (
					<Tooltip render={tooltip}>
						<i className={cx("fa-solid fa-question-circle", styles.tooltip)} />
					</Tooltip>
				)}
				{field && field.state.meta.errors.length > 0 && (
					<Tooltip render={() => field?.state.meta.errors}>
						<i className={cx("fa-solid fa-triangle-exclamation", styles.error)} />
					</Tooltip>
				)}
			</h2>
			<div className={styles.input}>{children}</div>
		</div>
	);
}

const styles = {
	group: vstack({
		gap: 1,
		width: "inherit",
		"& > * > input, select, textarea": {
			width: "full",
			hideWebkit: true,
		},
	}),
	heading: cva({
		base: scrollable.raw({
			direction: "horizontal",
			display: "inline-flex",
			gap: 2,
			alignItems: "baseline",
			width: "full",
			hideWebkit: true,
		}),
		variants: {
			center: {
				true: { justifyContent: "center" },
			},
		},
	}),
	subheading: css({
		fontWeight: "normal",
		color: "subtext",
	}),
	tooltip: css({
		paddingRight: 0.5,
		color: "subtext",
	}),
	input: hstack({
		gap: 2,
		width: "full",
	}),
	error: css({
		color: "danger",
	}),
};
