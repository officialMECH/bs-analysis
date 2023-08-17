import { colors } from "$/constants";
import { units } from "$/helpers";
import { join } from "$/utils";
import { Table } from "@tanstack/react-table";
import { ReactNode } from "react";
import { Spacer } from "../containers";
import styles from "./style.module.css";

interface Props<T> {
	table: Table<T>;
	icons?: Record<string, ReactNode>;
}

export default function Toggle<T>({ table, icons = {} }: Props<T>) {
	return (
		<Spacer as={"div"} center size={0.5} style={{ flexWrap: "wrap", padding: join(units.rem(1)), backgroundColor: "rgba(64, 64, 64, 0.125)" }}>
			{table.getAllLeafColumns().map((c) => {
				if (c.id === "id" && !import.meta.env.DEV) return null;
				return (
					<div key={c.id} className={styles.toggle}>
						<label title={c.id} htmlFor={c.id} style={{ backgroundColor: c.getIsVisible() ? colors.accent : "#404040", color: "white" }}>
							{icons[c.id] ?? c.id}
						</label>
						<input type="checkbox" id={c.id} checked={c.getIsVisible()} onChange={c.getToggleVisibilityHandler()}></input>
					</div>
				);
			})}
		</Spacer>
	);
}
