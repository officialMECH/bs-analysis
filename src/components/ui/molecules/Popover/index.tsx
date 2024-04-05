import { Popover as Builder } from "$/components/ui/builders";
import { css } from "$/styles/css";
import { RenderProps } from "$/types";
import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<typeof Builder.Root> {}

function Component({ render, children, ...rest }: Props & RenderProps) {
	return (
		<Builder.Root {...rest}>
			<Builder.Trigger>{children}</Builder.Trigger>
			<Builder.Content side="top" sideOffset={4} className={cn.content}>
				{render({})}
			</Builder.Content>
		</Builder.Root>
	);
}

const cn = {
	content: css({
		zIndex: 1,
		width: "max-content",
		backgroundColor: "container",
		color: "white",
		fontSize: "sm",
		paddingY: 2,
		paddingX: 4,
		fontWeight: "medium",
	}),
};

export { Component };
