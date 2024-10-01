import { createPrimitive } from "$/components/primitives";
import * as Primitive from "@radix-ui/react-dialog";
import { css, cx } from "styled-system/css";

const Root = Primitive.Root;

const Trigger = Primitive.Trigger;

const Content = createPrimitive<typeof Primitive.Content>(Primitive.Content, (Element, { asChild, className, ...rest }) => {
	return (
		<Primitive.Portal>
			<Primitive.Overlay className={cn.overlay}>
				<Element className={cx(cn.content, className)} {...rest} />
			</Primitive.Overlay>
		</Primitive.Portal>
	);
});

const Title = Primitive.Title;

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

export { Content, Root, Title, Trigger };
