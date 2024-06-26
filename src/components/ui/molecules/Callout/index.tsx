import { css, cva, cx } from "$/styles/css";
import { hstack, vstack } from "$/styles/patterns";
import { RecipeVariantProps } from "$/styles/types";
import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"aside"> {}

function Component({ title, variant, children, ...rest }: Props & RecipeVariantProps<typeof cn.root>) {
	return (
		<aside className={cx(cn.root({ variant }))} {...rest}>
			<span className={cx(cn.heading)}>{title ?? variant?.toUpperCase()}</span>
			<small className={cx(cn.content)}>{children}</small>
		</aside>
	);
}

const cn = {
	root: cva({
		base: vstack.raw({
			gap: 1,
			alignItems: "start",
			width: "full",
			padding: 4,
		}),
		variants: {
			variant: {
				info: {
					backgroundColor: "container",
				},
			},
		},
	}),
	heading: hstack({
		fontWeight: "bold",
	}),
	content: css({
		"& :last-child": {
			marginY: 0,
		},
	}),
};

export { Component };
