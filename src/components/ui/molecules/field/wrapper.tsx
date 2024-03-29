import { Icon } from "$/components/ui/atoms";
import { Field as Builder } from "$/components/ui/builders";
import { Tooltip } from "$/components/ui/molecules";
import { css, cva, cx } from "$/styles/css";
import { hstack, scrollable, vstack } from "$/styles/patterns";
import { faQuestionCircle, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { DeepKeys, DeepValue, FieldApi } from "@tanstack/react-form";
import { PropsWithChildren, ReactNode } from "react";

export interface Props<T, K extends DeepKeys<T>> {
	id?: string;
	field?: FieldApi<T, K, any, any, DeepValue<T, K>>;
	heading: ReactNode;
	subheading?: string;
	center?: boolean;
	disabled?: boolean;
	tooltip?: () => ReactNode;
}

function Component<T, K extends DeepKeys<T>>({ id, field, heading, subheading, center, tooltip, children }: PropsWithChildren<Props<T, K>>) {
	return (
		<Builder.Root id={(field?.name as string) ?? id} className={cx(cn.root)}>
			<Builder.Heading className={cn.heading({ center })}>
				{heading}
				{subheading && <Builder.Subheading className={cn.subheading}>{subheading}</Builder.Subheading>}
				{tooltip && (
					<Builder.Help asChild>
						<Tooltip render={tooltip}>
							<Icon icon={faQuestionCircle} className={cx(cn.tooltip)} />
						</Tooltip>
					</Builder.Help>
				)}
				{field && field.state.meta.errors.length > 0 && (
					<Builder.Message asChild>
						<Tooltip render={() => field?.state.meta.errors.join(", ")}>
							<Icon icon={faTriangleExclamation} className={cx(cn.error)} />
						</Tooltip>
					</Builder.Message>
				)}
			</Builder.Heading>
			<Builder.Control className={cx(cn.input)}>{children}</Builder.Control>
		</Builder.Root>
	);
}

const Input = Builder.Input;

const cn = {
	root: vstack({
		gap: 1,
		width: "inherit",
		"& > * > input, select, textarea": {
			width: "full",
			hideWebkit: true,
		},
	}),
	heading: cva({
		base: scrollable.raw({
			fontWeight: "bold",
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

export { Component, Input };
