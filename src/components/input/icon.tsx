import { css } from "$/styles/css";
import { ComponentProps, Fragment, useRef } from "react";
import { Icon } from "..";

export default function IconInput({ children, className, ...delegated }: ComponentProps<"input">) {
	const input = useRef<HTMLInputElement | null>(null);
	return (
		<Fragment>
			<Icon as={"span"} onClick={() => input.current?.click()} className={className}>
				{children}
			</Icon>
			<input className={styles.input} ref={input} tabIndex={-1} {...delegated} />
		</Fragment>
	);
}

const styles = {
	input: css({ display: "none" }),
};
