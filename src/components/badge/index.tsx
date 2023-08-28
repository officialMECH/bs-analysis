import { Polymorphic } from "$/types";
import { ElementType } from "react";
import styles from "./styles.module.css";

interface Props {
	color?: string;
	href?: string;
}

export default function Badge<T extends ElementType>({ color, href, children, style, ...delegated }: Polymorphic<T, Props>) {
	const Wrapper = href ? "a" : "span";
	return (
		<Wrapper className={styles.badge} href={href} style={{ backgroundColor: color, ...style }} {...delegated}>
			{children}
		</Wrapper>
	);
}
