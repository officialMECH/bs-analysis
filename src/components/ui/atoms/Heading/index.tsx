import { createDynamicPrimitive } from "$/components/primitives";
import { cva, cx } from "styled-system/css";
import { RecipeVariantProps } from "styled-system/types";

const arr = ["h1", "h2", "h3", "h4", "h5", "h6"];
interface Props {}

const Component = createDynamicPrimitive<"h1", Props & RecipeVariantProps<typeof cn.root>>(
	({ size = 1 }) => arr[size - 1] as "h1",
	(Element, { asChild, size = 1, className, ...rest }) => {
		return <Element className={cx(cn.root({ size }), className)} {...rest} />;
	},
);

export { Component };

const cn = {
	root: cva({
		base: {
			fontWeight: "bold",
		},
		variants: {
			size: {
				1: { fontSize: "3xl" },
				2: { fontSize: "2xl", marginBottom: 4 },
				3: { fontSize: "xl" },
				4: { fontSize: "xl" },
				5: { fontSize: "xl" },
				6: { fontSize: "xl" },
			},
		},
	}),
};
