import { createPrimitive } from "$/components/primitives";
import { cx } from "styled-system/css";
import { interactable } from "styled-system/patterns";

interface Props {}

const Component = createPrimitive<"textarea", Props>("textarea", (Element, { asChild, children, className, ...delegated }) => {
	return (
		<Element className={cx(cn.root, className)} {...delegated}>
			{children}
		</Element>
	);
});

const cn = {
	root: interactable({}),
};

export { Component };
