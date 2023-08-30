import { poly } from "$/helpers";
import { css } from "$/styles/css";
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

const wrapper = css({
	paddingX: 2,
	cursor: "pointer",
});
