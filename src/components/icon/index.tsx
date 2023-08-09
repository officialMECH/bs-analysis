import { units } from "$/helpers";
import { Polymorphic } from "$/types";
import { ElementType, Fragment } from "react";
import { Center } from "..";

export default function Icon<T extends ElementType>({ as, children, style, ...delegated }: Polymorphic<T>) {
	return (
		<Fragment>
			<Center as={as} style={{ width: units.em(1.5), ...style }} {...delegated}>
				{children}
			</Center>
		</Fragment>
	);
}
