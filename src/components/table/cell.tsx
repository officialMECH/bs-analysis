import { poly } from "$/helpers";
import { cva } from "$/styles/css";
import { scrollable } from "$/styles/patterns";
import { token } from "$/styles/tokens";
import { HTMLPolymorphicProps } from "@polymorphic-factory/react";
import { CellContext } from "@tanstack/react-table";
import { ElementType } from "react";

type CellProps<D, V> = Pick<CellContext<D, V>, "column"> & { wrapper?: ElementType; href?: string };
type AccessorCellProps<D, V> = CellProps<D, V> & Pick<CellContext<D, V>, "getValue"> & { validate?: (raw: V | undefined) => boolean; transform?: (raw: V | undefined, valid: boolean) => unknown; background?: (raw: V) => string; color?: (raw: V) => string };

export function Cell<T extends ElementType, D, V>({ as, href, column, style, children }: HTMLPolymorphicProps<T> & CellProps<D, V>) {
	const Child = poly(as ?? "span");
	const Parent = poly(href ? "a" : "div");
	return (
		<Parent href={href}>
			<div className={styles.wrapper} style={{ width: column.getSize() * 16, ...style }}>
				<Child>{children}</Child>
			</div>
		</Parent>
	);
}

export function AccessorCell<T extends ElementType, D, V>({ as, getValue, background, color, transform, validate, children, style, ...delegated }: HTMLPolymorphicProps<T> & AccessorCellProps<D, V>) {
	const value = getValue();
	const valid = validate ? validate(value) : true;
	return (
		<Cell as={value ? (as as ElementType) : "pre"} className={styles.accessor({ valid })} style={{ color: valid ? (color ? color(value) : undefined) : token("colors.error"), backgroundColor: valid ? (background ? background(value) : undefined) : undefined, ...style }} {...delegated}>
			{transform ? transform(value, valid) : value}
			{children}
		</Cell>
	);
}

const styles = {
	wrapper: scrollable({
		direction: "horizontal",
		hideScrollbar: true,
		whiteSpace: "nowrap",
		textAlign: "center",
	}),
	accessor: cva({
		variants: {
			valid: {
				false: { color: "error", backgroundColor: undefined },
			},
		},
	}),
};
