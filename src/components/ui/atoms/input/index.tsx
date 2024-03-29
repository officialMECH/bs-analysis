import { cx } from "$/styles/css";
import { interactable } from "$/styles/patterns";
import { AsChildProps } from "$/types";
import { Slot } from "@radix-ui/react-slot";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { ComponentPropsWithoutRef, ElementRef, Fragment, forwardRef, useRef } from "react";

interface Props<T extends string | number> {
	value?: T;
	defaultValue?: T;
	onValueChange?: (value: T) => void;
	delay?: number;
}

const Component = forwardRef<ElementRef<"input">, Omit<ComponentPropsWithoutRef<"input">, "value" | "defaultValue"> & AsChildProps & Props<string | number>>(({ asChild, defaultValue: defaultProp = "", value: prop, onValueChange: onChange, delay = 0, children, className, ...rest }, ref) => {
	const [value, setValue] = useControllableState<string | number>({ prop, defaultProp, onChange });
	const target = useRef<HTMLInputElement | null>(null);
	if (asChild) {
		return (
			<Fragment>
				<Slot ref={ref} onClick={() => target.current?.click()} className={className}>
					{children}
				</Slot>
				<input ref={target} tabIndex={-1} value={value} onChange={(e) => setValue(e.target.value)} style={{ display: "none" }} {...rest} />
			</Fragment>
		);
	}
	return <input ref={target} value={value} onChange={(e) => setValue(e.target.value)} onClick={() => target.current?.click()} className={cx(cn.root, className)} {...rest} />;
});

const cn = {
	root: interactable({ cursor: "text" }),
};

export { Component };
