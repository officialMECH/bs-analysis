import { poly } from "$/helpers";
import { cva } from "$/styles/css";
import { HTMLPolymorphicProps } from "@polymorphic-factory/react";
import { ElementType } from "react";

export default function Badge<T extends ElementType>({ href, children, color, ...delegated }: HTMLPolymorphicProps<T>) {
	const As = poly(href ? "a" : "span");
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
