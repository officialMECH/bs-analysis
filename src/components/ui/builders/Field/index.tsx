import { createPrimitive } from "$/components/primitives";
import { Input as I } from "$/components/ui/atoms";
import { AsChildProps, ScopedProps } from "$/types";
import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Provider, useContext } from "./context";

interface RootProps extends ComponentPropsWithoutRef<"div">, AsChildProps {
	id: string;
}
const Root = createPrimitive<"fieldset", ScopedProps<RootProps>>("fieldset", (Element, { __scope, asChild, id, ...rest }) => {
	return (
		<Provider scope={__scope} id={id}>
			<Element {...rest} />
		</Provider>
	);
});

const Heading = createPrimitive<"label", ScopedProps<{}>>("label", (Element, { __scope, asChild, ...rest }) => {
	const { id } = useContext("FieldLabel", __scope);
	return <Element htmlFor={id.concat("-input")} {...rest} />;
});

const Subheading = createPrimitive("small");

const Help = createPrimitive("span");

const Message = createPrimitive("span");

const Control = createPrimitive("div");

interface InputProps extends ComponentPropsWithoutRef<typeof I>, AsChildProps {}
const Input = forwardRef<ElementRef<typeof I>, ScopedProps<InputProps>>(({ __scope, asChild, ...rest }, ref) => {
	const Element = asChild ? Slot : I;
	const { id } = useContext("FieldInput", __scope);
	return <Element ref={ref} id={id.concat("-input")} {...rest} />;
});

export { Control, Heading, Help, Input, Message, Root, Subheading };
