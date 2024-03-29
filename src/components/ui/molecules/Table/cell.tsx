import { Table } from "$/components/ui/builders";
import { cva, cx } from "$/styles/css";
import { scrollable } from "$/styles/patterns";
import { token } from "$/styles/tokens";
import { CellContext } from "@tanstack/react-table";
import { ComponentPropsWithoutRef, ReactNode } from "react";

interface Props<TData, TValue, ContextKeys extends keyof CellContext<TData, TValue>> extends ComponentPropsWithoutRef<typeof Table.Cell> {
	context: Pick<CellContext<TData, TValue>, ContextKeys>;
}
function Cell<TData, TValue>({ context, className, style, ...rest }: Props<TData, TValue, "column">) {
	return (
		<Table.Cell asChild className={cx(cn.root, className)} style={{ width: context.column.getSize() * 16, ...style }} {...rest}>
			<div>{rest.children}</div>
		</Table.Cell>
	);
}

interface AccessorProps<TData, TValue> extends Omit<Props<TData, TValue, "column" | "getValue">, "color"> {
	validate?: (raw: TValue | undefined) => boolean;
	transform?: (raw: TValue | undefined, isValid: boolean) => ReactNode;
	background?: (raw: TValue) => string;
	color?: (raw: TValue) => string;
}
function AccessorCell<TData, TValue>({ context, validate, transform, background, color, style, className, ...rest }: AccessorProps<TData, TValue>) {
	const value = context.getValue();
	const valid = validate ? validate(value) : true;
	return (
		<Cell context={context} className={cx(cn.accessor({ valid }), className)} style={{ color: valid ? (color ? color(value) : undefined) : token("colors.danger"), backgroundColor: valid ? (background ? background(value) : undefined) : undefined, ...style }} {...rest}>
			{transform ? transform(value, valid) : (value as ReactNode)}
		</Cell>
	);
}

const cn = {
	root: scrollable({
		direction: "horizontal",
		hideScrollbar: true,
		whiteSpace: "nowrap",
		textAlign: "center",
		gap: 1,
		height: "fit-content",
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

export { AccessorCell, Cell };
