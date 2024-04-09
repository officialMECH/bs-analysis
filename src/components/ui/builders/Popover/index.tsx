import { createPrimitive } from "$/components/primitives";
import * as Primitive from "@radix-ui/react-popover";

const Root = Primitive.Root;

const Trigger = Primitive.Trigger;

const Content = createPrimitive<typeof Primitive.Content>(Primitive.Content, (Element, { asChild, sideOffset = 4, ...props }) => {
	return (
		<Primitive.Portal>
			<Element sideOffset={sideOffset} {...props} />
		</Primitive.Portal>
	);
});

export { Content, Root, Trigger };
