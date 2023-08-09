import { units } from "$/helpers";
import { Polymorphic } from "$/types";
import { join } from "$/utils";
import { ElementType } from "react";

interface Props {
	color?: string;
}

export default function Badge<T extends ElementType>({ color, href, children, style, ...delegated }: Polymorphic<T, Props>) {
	const Wrapper = href ? "a" : "span";
	return (
		<Wrapper className={join("badge")} href={href} style={{ padding: join(units.rem(0.25), units.rem(1)), fontWeight: "bold", backgroundColor: color ?? undefined, ...style }} {...delegated}>
			{children}
		</Wrapper>
	);
}
