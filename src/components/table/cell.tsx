import { units } from "$/helpers";
import { IData } from "$/types";
import { Column } from "@tanstack/react-table";
import { ComponentProps, ElementType } from "react";

interface Props extends ComponentProps<"div"> {
	column: Column<IData>;
	wrapper?: ElementType;
	width?: number;
}

export default function Cell({ column, wrapper: Wrapper = "span", children, style }: Props) {
	return (
		<div className={"hide-scroll"} style={{ width: units.rem(column.getSize()), whiteSpace: "nowrap", overflowX: "scroll", ...style }}>
			<Wrapper>{children}</Wrapper>
		</div>
	);
}
