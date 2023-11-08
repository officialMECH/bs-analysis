import { css, cx } from "$/styles/css";
import { ComponentProps, Fragment, useRef } from "react";
import { Icon } from "..";

export default function Checkbox({ id, checked, onChange, children, className, ...delegated }: ComponentProps<"input">) {
	const input = useRef<HTMLInputElement | null>(null);
	return (
		<Fragment>
			<label tabIndex={0} htmlFor={id} className={cx(styles.label, className)}>
				{children ?? <Icon className={checked ? "fa-solid fa-square-check" : "fa-solid fa-square"}></Icon>}
			</label>
			<input ref={input} type="checkbox" tabIndex={-1} id={id} checked={checked} onChange={onChange} className={styles.input} {...delegated} />
		</Fragment>
	);
}

const styles = {
	label: css({ cursor: "pointer" }),
	input: css({ display: "none" }),
};
