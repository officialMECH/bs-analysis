import { Icon } from "$/components/ui/atoms";
import { Checkbox as Builder } from "$/components/ui/builders";
import { css, cx } from "$/styles/css";
import { center, interactable } from "$/styles/patterns";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Component({ className, ...rest }: Builder.CheckboxProps) {
	return (
		<Builder.Root className={cx(cn.root, className)} {...rest}>
			<Builder.Indicator asChild className={cn.indicator}>
				<Icon icon={faCheck} />
			</Builder.Indicator>
		</Builder.Root>
	);
}

const cn = {
	root: css(
		interactable.raw(),
		center.raw({
			width: "1em",
			height: "1em",
			backgroundColor: "light",
		})
	),
	indicator: css({
		position: "relative",
		color: "container",
		fontSize: "sm",
	}),
};

export { Component };
