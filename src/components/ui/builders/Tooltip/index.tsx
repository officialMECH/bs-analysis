import { createPrimitive } from "$/components/primitives";
import * as Primitive from "@radix-ui/react-tooltip";

type Props = Primitive.TooltipProps;

const Provider = Primitive.Provider;

const Root = Primitive.Root;

const Trigger = Primitive.Trigger;

const Content = createPrimitive<typeof Primitive.Content>(Primitive.Content, (Element, { sideOffset = 4, ...props }) => {
	return <Element sideOffset={sideOffset} {...props} />;
});

export { Content, Provider, Root, Trigger, type Props };
