import { poly } from "$/helpers";
import { center } from "$/styles/patterns";
import { join } from "$/utils";
import { HTMLPolymorphicProps } from "@polymorphic-factory/react";
import { ElementType } from "react";

export default function Icon<T extends ElementType>({ as, children, className, ...delegated }: HTMLPolymorphicProps<T>) {
	const As = poly(as ?? "span");
	return (
		<As tabIndex={0} className={join(wrapper, className)} {...delegated}>
			{children}
		</As>
	);
}

const wrapper = center({
	minWidth: 6,
	minHeight: 6,
	cursor: "pointer",
});
