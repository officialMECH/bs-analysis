import { Toggle as Builder } from "$/components/ui/builders";
import { ComponentPropsWithoutRef } from "react";
import { cx } from "styled-system/css";
import { interactable } from "styled-system/patterns";

interface Props extends ComponentPropsWithoutRef<typeof Builder.Root> {}

function Component({ children, className, ...rest }: Props) {
	return (
		<Builder.Root className={cx(cn.root, className)} {...rest}>
			{children}
		</Builder.Root>
	);
}

const cn = {
	root: interactable({ backgroundColor: "neutral" }),
};

export { Component };
