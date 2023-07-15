import { units } from "$/helpers";
import { IData } from "$/types";
import { Column } from "@tanstack/react-table";
import { ComponentProps, PropsWithChildren } from "react";

export default function Cell({ c, children, style }: PropsWithChildren<{ c: Column<IData>; width?: number } & ComponentProps<"div">>) {
	return (
		<div className={"hide-scroll"} style={{ width: units.rem(c.getSize()), whiteSpace: "nowrap", overflowX: "scroll", ...style }}>
			{children}
		</div>
	);
}
