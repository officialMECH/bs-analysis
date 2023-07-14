import { ComponentProps, ElementType } from "react";

interface Props extends ComponentProps<"div"> {
	as?: ElementType;
	direction?: "column" | "row";
}

export default function Center({ children, as = "div", direction, style, ...delegated }: Props) {
	const As = as;
	const justifyContent = direction !== "column" ? "center" : undefined;
	const alignItems = direction !== "row" ? "center" : undefined;
	return (
		<As style={{ display: "flex", flexDirection: direction, alignItems, justifyContent, ...style }} {...delegated}>
			{children}
		</As>
	);
}