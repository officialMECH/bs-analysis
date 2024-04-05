import { createPrimitive } from "$/components/primitives";
import * as Primitive from "@radix-ui/react-collapsible";
import { useState } from "react";

const Root = createPrimitive(Primitive.Root, (Element, { ...rest }) => {
	const [open] = useState(rest.open);
	return (
		<Element asChild {...rest}>
			<details open={open}>{rest.children}</details>
		</Element>
	);
});

const Trigger = createPrimitive(Primitive.Trigger, (Element, { ...rest }) => {
	return (
		<Element asChild {...rest}>
			<summary>{rest.children}</summary>
		</Element>
	);
});

const Content = createPrimitive(Primitive.Content, (Element, { ...rest }) => {
	return (
		<Element asChild>
			<section>{rest.children}</section>
		</Element>
	);
});

export { Content, Root, Trigger };
