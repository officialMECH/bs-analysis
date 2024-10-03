import { Dialog as Builder } from "$/components/ui/builders";
import { RenderProps } from "$/types";
import { ComponentPropsWithoutRef } from "react";
import { css } from "styled-system/css";
import { visuallyHidden } from "styled-system/patterns";

interface Props extends ComponentPropsWithoutRef<typeof Builder.Root> {
	title: string;
}

function Component({ title, render, children, ...rest }: Props & RenderProps<{ close: (props?: Props) => void }>) {
	return (
		<Builder.Root {...rest}>
			<Builder.Trigger asChild>{children}</Builder.Trigger>
			<Builder.Content className={cn.content}>
				<Builder.Title className={visuallyHidden()}>{title}</Builder.Title>
				{render({ close })}
			</Builder.Content>
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
