import { units } from "$/helpers";
import { Polymorphic } from "$/types";
import { ElementType } from "react";

interface Props {
	direction?: "row" | "column";
	center?: boolean;
	size?: number;
}

export default function Spacer<T extends ElementType>({ as, children, direction, center, size = 1, style, ...delegated }: Polymorphic<T, Props>) {
	const As = as ?? "div";
	const justifyContent = center && direction !== "column" ? "center" : undefined;
	const alignItems = center && direction !== "row" ? "center" : undefined;
	return (
		<As style={{ display: "flex", flexDirection: direction, alignItems, justifyContent, gap: units.rem(size), ...style }} {...delegated}>
			{children}
		</As>
	);
}
