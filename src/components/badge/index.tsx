import { cva } from "$/styles/css";
import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"span"> {
	href?: string;
}

export default function Badge({ href, children, color, ...delegated }: Props) {
	const As = href ? "a" : "span";
	return (
		<As href={href} className={wrapper({ link: !!href })} style={{ backgroundColor: color }} {...delegated}>
			{children}
		</As>
	);
}

const wrapper = cva({
	base: {
		fontWeight: "bold",
		backgroundColor: "container",
		color: "text",
		paddingY: 1,
		paddingX: 4,
	},
	variants: {
		link: {
			true: {
				backgroundColor: "link",
				transition: "background-color 0.25s",
				"&:not([disabled]):hover": {
					backgroundColor: "indigo.400",
				},
			},
		},
	},
});
