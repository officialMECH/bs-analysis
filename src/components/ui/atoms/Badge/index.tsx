import { createDynamicPrimitive } from "$/components/primitives";
import { cva, cx } from "$/styles/css";
import { RecipeVariantProps } from "$/styles/types";

const Component = createDynamicPrimitive<"a", RecipeVariantProps<typeof cn.root>>(
	({ href }) => (href ? "a" : "span"),
	(Element, { asChild, children, color, className, ...rest }) => {
		return (
			<Element className={cx(cn.root(), className)} style={{ backgroundColor: color }} {...rest}>
				{children}
			</Element>
		);
	}
);

const cn = {
	root: cva({
		base: {
			fontWeight: "bold",
			backgroundColor: "container",
			color: "text",
			paddingY: 1,
			paddingX: 4,
			"&[href]": {
				backgroundColor: "link",
				transition: "background-color 0.25s",
				"&:not([disabled]):hover": {
					backgroundColor: "indigo.400",
				},
			},
		},
	}),
};

export { Component };
