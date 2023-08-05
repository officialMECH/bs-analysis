import { params, units } from "$/helpers";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"span"> {
	color?: string;
}

export default function Badge({ color = "#404040", children, style, ...delegated }: Props) {
	return (
		<span style={{ ...style, padding: params(units.rem(0.25), units.rem(1)), fontWeight: "bold", backgroundColor: color }} {...delegated}>
			{children}
		</span>
	);
}
