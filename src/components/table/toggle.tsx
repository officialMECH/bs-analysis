import { colors } from "$/constants";
import { units } from "$/helpers";
import { useDark } from "$/hooks";
import { join } from "$/utils";
import { Table } from "@tanstack/react-table";
import { ReactNode } from "react";
import { Center, Spacer } from "../containers";

interface Props<T> {
	table: Table<T>;
	icons?: Record<string, ReactNode>;
}

export default function Toggle<T>({ table, icons = {} }: Props<T>) {
	const dark = useDark();
	return (
		<Spacer as={"div"} center size={0.5} style={{ flexWrap: "wrap", padding: join(units.rem(1)), backgroundColor: colors.neutral(0.125) }}>
			{table.getAllLeafColumns().map((c) => {
				const backgroundColor = c.getIsVisible() ? colors.accent : dark ? colors.neutral(0.5) : colors.neutral(1);
				const size = units.rem(2);
				if (["link"].includes(c.id)) return null;
				return (
					<div key={c.id}>
						<Center as={"label"} title={c.id} htmlFor={c.id} style={{ width: size, height: size, backgroundColor, color: "white" }}>
							{icons[c.id] ?? c.id}
						</Center>
						<input type="checkbox" id={c.id} checked={c.getIsVisible()} onChange={c.getToggleVisibilityHandler()} style={{ position: "absolute", visibility: "hidden", opacity: 0 }}></input>
					</div>
				);
			})}
		</Spacer>
	);
}
