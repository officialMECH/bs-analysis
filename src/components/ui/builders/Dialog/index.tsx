import { css, cx } from "$/styles/css";
import * as Primitive from "@radix-ui/react-dialog";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const Root = Primitive.Root;

const Trigger = Primitive.Trigger;

const Content = forwardRef<ElementRef<typeof Primitive.Content>, ComponentPropsWithoutRef<typeof Primitive.Content>>(({ className, ...props }, ref) => {
	return (
		<Primitive.Portal>
			<Primitive.Overlay className={cn.overlay}>
				<Primitive.Content className={cx(cn.content, className)} ref={ref} {...props} />
			</Primitive.Overlay>
		</Primitive.Portal>
	);
});

const cn = {
	portal: css({
		"&[data-lock-scroll]": {
			padding: 0,
			marginX: "auto",
		},
	}),
	overlay: css({
		backgroundColor: "rgba(0, 0, 0, 0.75)",
		position: "fixed",
		inset: 0,
		overflowY: "auto",
	}),
	content: css({}),
};

export { Content, Root, Trigger };
