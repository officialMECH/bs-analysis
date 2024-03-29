import * as Primitive from "@radix-ui/react-popover";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const Root = Primitive.Root;

const Trigger = Primitive.Trigger;

const Content = forwardRef<ElementRef<typeof Primitive.Content>, ComponentPropsWithoutRef<typeof Primitive.Content>>(({ sideOffset = 4, ...props }, ref) => {
	return (
		<Primitive.Portal>
			<Primitive.Content ref={ref} sideOffset={sideOffset} {...props} />
		</Primitive.Portal>
	);
});

export { Content, Root, Trigger };
