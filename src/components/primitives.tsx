/**  */

import { AsChildProps } from "$/types";
import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, ElementType, ForwardRefExoticComponent, ForwardedRef, forwardRef } from "react";

type PrimitiveElement = ElementType | ForwardRefExoticComponent<any>;
type PrimitiveProps<T extends ElementType> = ComponentPropsWithoutRef<T>;

function render<T extends PrimitiveElement, P = {}>(fallback: any, { asChild, children, ...rest }: PrimitiveProps<T> & AsChildProps & P, ref: ForwardedRef<T>): JSX.Element | null {
	const Element = asChild ? Slot : fallback;
	return (
		<Element ref={ref} {...rest}>
			{children}
		</Element>
	);
}

/** Create an exotic component with slot behavior. */
export function createPrimitive<T extends PrimitiveElement, P = {}>(fallback: T, renderFn = (element: T, props: PrimitiveProps<T> & AsChildProps & P, ref: ForwardedRef<T>): JSX.Element | null => render(element, props, ref)) {
	type Props = PrimitiveProps<T> & AsChildProps & P;
	return forwardRef<T, Props>((...args) => renderFn(fallback, ...args));
}
/** Create an exotic component with slot behavior, as determined by its properties (useful for headings, fields, etc). */
export function createDynamicPrimitive<T extends PrimitiveElement, P>(fallback: (props: PrimitiveProps<T> & P) => ElementType, renderFn = (element: T, props: PrimitiveProps<T> & AsChildProps & P, ref: ForwardedRef<T>) => render(element, props, ref)) {
	type Props = PrimitiveProps<T> & AsChildProps & P;
	return forwardRef<T, Props>((props, ref) => renderFn(fallback(props) as T, props, ref));
}
/** Create an exotic component with slot behavior. */
export function createMaskedPrimitive<T extends PrimitiveElement, P = {}>(fallback: T, renderFn = (element: T, props: PrimitiveProps<T> & AsChildProps & P, ref: ForwardedRef<T>): JSX.Element | null => render(element, props, ref)) {
	type Props = PrimitiveProps<T> & AsChildProps & P;
	return forwardRef<T, Props>((...args) => renderFn(fallback, ...args));
}
