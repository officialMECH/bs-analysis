import { Polymorphic } from "$/types";
import { ElementType } from "react";

interface Props {
	direction?: "column" | "row";
}

export default function Center<T extends ElementType = "div">({ as, children, direction, style, ...delegated }: Polymorphic<T, Props>) {
	const As = as ?? "div";
	const justifyContent = direction !== "column" ? "center" : undefined;
	const alignItems = direction !== "row" ? "center" : undefined;
	return (
		<As style={{ display: "flex", flexDirection: direction, alignItems, justifyContent, ...style }} {...delegated}>
			{children}
		</As>
	);
}
