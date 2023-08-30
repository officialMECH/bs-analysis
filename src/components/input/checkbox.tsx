import { css, cva } from "$/styles/css";
import { center } from "$/styles/patterns";
import { ComponentProps } from "$/styles/types/jsx";
import { Fragment, useRef } from "react";

export default function Checkbox({ id, checked, onChange, children, ...delegated }: ComponentProps<"input">) {
	const input = useRef<HTMLInputElement | null>(null);
	return (
		<Fragment>
			<label tabIndex={0} title={id} htmlFor={id} className={styles.wrapper({ checked })}>
				{children}
			</label>
			<input ref={input} type="checkbox" tabIndex={-1} id={id} checked={checked} onChange={onChange} className={styles.input} {...delegated} />
		</Fragment>
	);
}

const styles = {
	wrapper: cva({
		base: center.raw({
			width: 8,
			height: 8,
			color: "white",
			"&:focus": {
				borderColor: "white",
			},
		}),
		variants: {
			checked: {
				true: { backgroundColor: "primary" },
				false: { backgroundColor: "neutral" },
			},
		},
	}),
	input: css({ display: "none" }),
};
