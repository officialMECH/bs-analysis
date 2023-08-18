import { units } from "$/helpers";
import { Polymorphic } from "$/types";
import { join } from "$/utils";
import { ElementType, Fragment } from "react";
import { Center } from "../containers";

export default function Icon<T extends ElementType>({ as: wrapper, children, style, ...delegated }: Polymorphic<T>) {
	const unstyle = wrapper === "button";
	return (
		<Fragment>
			<Center as={wrapper as "span"} className={join(unstyle && "unstyled")} style={{ padding: join(0, units.em(0.25)), cursor: unstyle && "pointer", ...style }} {...delegated}>
				{children}
			</Center>
		</Fragment>
	);
}
