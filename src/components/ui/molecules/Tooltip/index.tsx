import { Tooltip as Builder } from "$/components/ui/builders";
import { css } from "$/styles/css";
import { RenderProps } from "$/types";
import { ComponentPropsWithoutRef } from "react";

function Component({ render, children, ...rest }: ComponentPropsWithoutRef<typeof Builder.Root> & RenderProps) {
	return (
		<Builder.Provider>
			<Builder.Root {...rest}>
				<Builder.Trigger asChild>
					<span>{children}</span>
				</Builder.Trigger>
				<Builder.Content side="top" sideOffset={4} className={cn.content}>
					{render({ close })}
				</Builder.Content>
			</Builder.Root>
		</Builder.Provider>
	);
}

const cn = {
	content: css({
		zIndex: 1,
		width: "max-content",
		backgroundColor: "black",
		color: "white",
		fontSize: "sm",
		paddingY: 2,
		paddingX: 4,
		fontWeight: "medium",
	}),
};

export { Component };
