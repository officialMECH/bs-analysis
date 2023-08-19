import { units } from "$/helpers";
import { IData, Polymorphic } from "$/types";
import { join } from "$/utils";
import { CellContext } from "@tanstack/react-table";
import { ElementType, Fragment, PropsWithChildren } from "react";

type CellProps<D, V> = Pick<CellContext<D, V>, "column"> & { wrapper?: ElementType; href?: string };
type AccessorCellProps<D, V> = CellProps<D, V> & Pick<CellContext<D, V>, "getValue"> & { transform?: (raw: V | undefined) => unknown };

export function Cell<D extends IData, V, T extends ElementType = "span">({ as, href, column, style, children }: Polymorphic<T, CellProps<D, V>>) {
	const Wrapper = as ?? "span";
	const Parent = <T extends PropsWithChildren>({ children, ...delegated }: T) => (href ? <a {...delegated}>{children}</a> : <Fragment>{children}</Fragment>);
	return (
		<Parent href={href}>
			<div className={join("hide-webkit", "horizontal-scroll")} style={{ width: units.rem(column.getSize()), ...style }}>
				<Wrapper>{children}</Wrapper>
			</div>
		</Parent>
	);
}

export function AccessorCell<D extends IData, V, T extends ElementType = "span">({ getValue, transform, as: wrapper, children, ...delegated }: Polymorphic<T, AccessorCellProps<D, V>>) {
	const value = getValue();
	return (
		<Cell as={wrapper as ElementType} {...delegated}>
			{transform ? transform(value) : value}
			{children}
		</Cell>
	);
}
