import { units } from "$/helpers";
import { ComponentProps, ElementType } from "react";

interface Props extends ComponentProps<"div"> {
	as?: ElementType;
	direction?: "row" | "column";
	center?: boolean;
	size?: number;
}

export default function Spacer({ children, as = "div", direction, size = 1, center, style, ...delegated }: Props) {
	const As = as;
	const justifyContent = center && direction !== "column" ? "center" : undefined;
	const alignItems = center && direction !== "row" ? "center" : undefined;
	return (
		<As style={{ ...style, display: "flex", flexDirection: direction, alignItems, justifyContent, gap: units.rem(size) }} {...delegated}>
			{children}
		</As>
	);
}
