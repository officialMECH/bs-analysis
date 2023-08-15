import { units } from "$/helpers";
import { Polymorphic } from "$/types";
import { join } from "$/utils";
import { ElementType, Fragment } from "react";
import { Center } from "..";

export default function Icon<T extends ElementType = "span">({ as: wrapper, children, style, ...delegated }: Polymorphic<T>) {
	const unstyle = wrapper === "button";
	return (
		<Fragment>
			<Center as={wrapper as "span"} className={join(unstyle && "unstyled")} style={{ width: units.em(1.5), cursor: unstyle && "pointer", ...style }} {...delegated}>
				{children}
			</Center>
		</Fragment>
	);
}
