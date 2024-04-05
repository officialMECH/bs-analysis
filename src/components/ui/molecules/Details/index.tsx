import { Details as Builder } from "$/components/ui/builders";
import { css, cx } from "$/styles/css";
import { interactable } from "$/styles/patterns";
import { RenderProps } from "$/types";
import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<typeof Builder.Root> {}

function Component({ children, render, className, ...rest }: Props & RenderProps<Props>) {
	return (
		<Builder.Root className={cx(cn.root, className)} {...rest}>
			<Builder.Trigger className={cx(cn.trigger)}>{children}</Builder.Trigger>
			<Builder.Content className={cx(cn.content)}>{render({})}</Builder.Content>
		</Builder.Root>
	);
}

const cn = {
	root: css({
		width: "full",
	}),
	trigger: css(interactable.raw(), {
		paddingY: 2,
		paddingX: 4,
		display: "flex",
		justifyContent: "space-between",
		gap: 8,
		alignItems: "center",
		fontWeight: "bold",
		fontSize: "xl",
		listStyle: "none",
		"&::-webkit-details-marker": {
			display: "none",
		},
		"&::after": {
			fontFamily: "system",
			content: '"▶"',
		},
		"&[data-state='open']::after": {
			fontFamily: "system",
			content: '"▼"',
		},
	}),
	content: css({
		paddingBottom: 2,
		height: "max-content",
	}),
};

export { Component };
