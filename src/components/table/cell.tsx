import { units } from "$/helpers";
import { IData, Polymorphic } from "$/types";
import { CellContext } from "@tanstack/react-table";
import { ElementType } from "react";

type CellProps<D, V> = Pick<CellContext<D, V>, "column"> & { wrapper?: ElementType; width?: number; href?: string };
type AccessorCellProps<D, V> = CellProps<D, V> & Pick<CellContext<D, V>, "getValue"> & { transform?: (raw: V | undefined) => unknown };

export function Cell<D extends IData, V, T extends ElementType = "div">({ as, href, wrapper: Wrapper = "span", column, style, children }: Polymorphic<T, CellProps<D, V>>) {
	const As = as ?? "div";
	return (
		<As className={"hide-webkit"} style={{ width: units.rem(column.getSize()), whiteSpace: "nowrap", overflowX: "scroll", ...style }}>
			{href ? (
				<a href={href}>
					<Wrapper>{children}</Wrapper>
				</a>
			) : (
				<Wrapper>{children}</Wrapper>
			)}
		</As>
	);
}

export function AccessorCell<D extends IData, V, T extends ElementType = "div">({ getValue, transform, as: wrapper, ...delegated }: Polymorphic<T, AccessorCellProps<D, V>>) {
	const value = getValue();
	return (
		<Cell as={wrapper as ElementType} {...delegated}>
			{transform ? transform(value) : value}
		</Cell>
	);
}
