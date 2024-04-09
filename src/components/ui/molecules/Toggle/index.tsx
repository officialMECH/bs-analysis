import { Toggle as Builder } from "$/components/ui/builders";
import { cx } from "$/styles/css";
import { interactable } from "$/styles/patterns";
import { ComponentPropsWithoutRef } from "react";

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
