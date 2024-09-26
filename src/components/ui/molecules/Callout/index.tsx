import { ComponentPropsWithoutRef } from "react";
import { css, cva, cx } from "styled-system/css";
import { hstack, vstack } from "styled-system/patterns";
import { RecipeVariantProps } from "styled-system/types";

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
		_last: {
			marginY: 0,
		},
	}),
};

export { Component };
