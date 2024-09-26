import { createPrimitive } from "$/components/primitives";
import { css, cva, cx } from "styled-system/css";
import { interactable } from "styled-system/patterns";
import { RecipeVariantProps } from "styled-system/types";

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
