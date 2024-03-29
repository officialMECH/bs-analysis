import { Dialog as Builder } from "$/components/ui/builders";
import { css } from "$/styles/css";
import { RenderProps } from "$/types";
import { ComponentPropsWithoutRef } from "react";

function Component({ render, children, ...rest }: ComponentPropsWithoutRef<typeof Builder.Root> & RenderProps) {
	return (
		<Builder.Root {...rest}>
			<Builder.Trigger asChild>{children}</Builder.Trigger>
			<Builder.Content className={cn.content}>{render({ close })}</Builder.Content>
		</Builder.Root>
	);
}

const cn = {
	content: css({
		backgroundColor: "background",
		padding: 6,
		left: "50%",
		marginY: 8,
		marginX: "auto",
		width: "calc(100% - 4rem)",
		maxWidth: "4xl",
	}),
};

export { Component };
