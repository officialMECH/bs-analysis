import { Popover as Builder } from "$/components/ui/builders";
import { css } from "$/styles/css";
import { RenderProps } from "$/types";
import { ComponentPropsWithoutRef } from "react";

function Component({ render, children, ...rest }: ComponentPropsWithoutRef<typeof Builder.Root> & RenderProps) {
	return (
		<Builder.Root {...rest}>
			<Builder.Trigger>{children}</Builder.Trigger>
			<Builder.Content side="top" sideOffset={4} className={cn.content}>
				{render({ close })}
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
