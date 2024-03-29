import * as Primitive from "@radix-ui/react-tooltip";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

type Props = Primitive.TooltipProps;

const Provider = Primitive.Provider;

const Root = Primitive.Root;

const Trigger = Primitive.Trigger;

const Content = forwardRef<ElementRef<typeof Primitive.Content>, ComponentPropsWithoutRef<typeof Primitive.Content>>(({ sideOffset = 4, ...props }, ref) => {
	return <Primitive.Content ref={ref} sideOffset={sideOffset} {...props} />;
});

export { Content, Provider, Root, Trigger, type Props };
