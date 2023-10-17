import { cva } from "$/styles/css";
import { scrollable } from "$/styles/patterns";
import { token } from "$/styles/tokens";
import { AsChildProps } from "$/types";
import { Slot } from "@radix-ui/react-slot";
import { CellContext } from "@tanstack/react-table";
import { ElementType, ReactNode } from "react";

type CellProps<D, V> = Pick<CellContext<D, V>, "column"> & { wrapper?: ElementType; href?: string };
type AccessorCellProps<D, V> = CellProps<D, V> & Pick<CellContext<D, V>, "getValue"> & { validate?: (raw: V | undefined) => boolean; transform?: (raw: V | undefined, valid: boolean) => ReactNode; background?: (raw: V) => string; color?: (raw: V) => string };
type Props<P> = Omit<AsChildProps<"div">, "color"> & P;

export function Cell<D, V>({ asChild, href, column, style, children }: Props<CellProps<D, V>>) {
	const Child = asChild ? Slot : "div";
	const Parent = href ? "a" : "div";
	return (
		<Parent href={href}>
			<Child className={styles.wrapper} style={{ width: column.getSize() * 16, ...style }}>
				{children}
			</Child>
		</Parent>
	);
}

export function AccessorCell<D, V>({ getValue, background, color, transform, validate, style, ...delegated }: Props<AccessorCellProps<D, V>>) {
	const value = getValue();
	const valid = validate ? validate(value) : true;
	return (
		<Cell className={styles.accessor({ valid })} style={{ color: valid ? (color ? color(value) : undefined) : token("colors.danger"), backgroundColor: valid ? (background ? background(value) : undefined) : undefined, ...style }} {...delegated}>
			{transform ? transform(value, valid) : (value as ReactNode)}
		</Cell>
	);
}

const styles = {
	wrapper: scrollable({
		direction: "horizontal",
		hideScrollbar: true,
		whiteSpace: "nowrap",
		textAlign: "center",
		"& > *": { paddingX: 1 },
	}),
	accessor: cva({
		variants: {
			valid: {
				false: { color: "danger", backgroundColor: undefined },
			},
		},
	}),
};
