import { createPrimitive } from "$/components/primitives";
import { css, cva, cx } from "$/styles/css";
import { interactable } from "$/styles/patterns";
import { RecipeVariantProps } from "$/styles/types";

const Component = createPrimitive<"button", RecipeVariantProps<typeof cn.root>>("button", (Element, { asChild, children, className, ...rest }) => {
	return (
		<Element className={cx(cn.root(), className)} {...rest}>
			{children}
		</Element>
	);
});

const cn = {
	root: cva({
		base: css.raw(interactable.raw(), {
			paddingY: 1,
			paddingX: 4,
			borderRadius: "md",
		}),
	}),
};

export { Component };
