import { css } from "$/styles/css";
import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, Fragment, useRef } from "react";

export default function UnstyledInput({ children, className, ...delegated }: ComponentPropsWithoutRef<"input">) {
	const input = useRef<HTMLInputElement | null>(null);
	return (
		<Fragment>
			<Slot onClick={() => input.current?.click()} className={className}>
				{children}
			</Slot>
			<input className={styles.hide} ref={input} tabIndex={-1} {...delegated} />
		</Fragment>
	);
}

const styles = {
	hide: css({ display: "none" }),
};
