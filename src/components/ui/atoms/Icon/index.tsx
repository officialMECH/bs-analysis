import { createPrimitive } from "$/components/primitives";
import { cva, cx } from "$/styles/css";
import { RecipeVariantProps } from "$/styles/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Component = createPrimitive<typeof FontAwesomeIcon, RecipeVariantProps<typeof cn.root>>(FontAwesomeIcon, (Element, { asChild, tabIndex, variant, className, ...delegated }) => {
	return <Element tabIndex={tabIndex ?? -1} className={cx(cn.root({ variant }), className)} {...delegated} />;
});

const cn = {
	root: cva({
		base: {
			cursor: "pointer",
			userSelect: "none",
			"&:focus": {
				outline: "none",
			},
		},
		variants: {
			variant: {
				default: { color: "inherit" },
				primary: { color: "primary" },
				danger: { color: "danger" },
				link: {
					color: "link",
					"&:not([disabled]):hover": {
						color: "indigo.400",
					},
				},
			},
		},
		defaultVariants: { variant: "default" },
	}),
};

export { Component };
