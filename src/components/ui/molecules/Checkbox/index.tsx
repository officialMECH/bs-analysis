import { Icon } from "$/components/ui/atoms";
import { Checkbox as Builder } from "$/components/ui/builders";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { ComponentPropsWithoutRef } from "react";
import { css, cx } from "styled-system/css";
import { center, interactable } from "styled-system/patterns";

interface Props extends ComponentPropsWithoutRef<typeof Builder.Root> {}

function Component({ className, ...rest }: Props) {
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
			borderRadius: "xs",
		}),
	),
	indicator: css({
		position: "relative",
		color: "container",
		fontSize: "xs",
	}),
};

export { Component };
