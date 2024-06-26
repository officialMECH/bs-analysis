import { createPrimitive } from "$/components/primitives";
import { css, cx } from "$/styles/css";
import * as Primitive from "@radix-ui/react-dialog";

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
