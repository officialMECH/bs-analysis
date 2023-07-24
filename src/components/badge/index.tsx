import { ComponentProps } from "react";

interface Props extends ComponentProps<"span"> {
	color?: string;
}

export default function Badge({ color = "#404040", children, style, ...delegated }: Props) {
	return (
		<span style={{ ...style, padding: "0.25rem 1rem", fontWeight: "bold", backgroundColor: color }} {...delegated}>
			{children}
		</span>
	);
}
