import { units } from "$/helpers";
import { IData } from "$/types";
import { Column } from "@tanstack/react-table";
import { ComponentProps, ElementType } from "react";

interface Props extends ComponentProps<"a"> {
	column: Column<IData>;
	as?: ElementType;
	wrapper?: ElementType;
	width?: number;
}

export default function Cell({ column, href, as: As = "div", wrapper: Wrapper = "span", children, style }: Props) {
	return (
		<As className={"hide-scroll"} style={{ width: units.rem(column.getSize()), whiteSpace: "nowrap", overflowX: "scroll", ...style }}>
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
