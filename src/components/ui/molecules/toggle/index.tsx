import { Toggle as Builder } from "$/components/ui/builders";
import { cx } from "$/styles/css";
import { interactable } from "$/styles/patterns";

function Component({ children, className, ...rest }: Builder.ToggleProps) {
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
