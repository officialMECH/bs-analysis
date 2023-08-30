import { wrap } from "$/styles/patterns";
import { Table } from "@tanstack/react-table";
import { ReactNode } from "react";
import Checkbox from "../input/checkbox";

interface Props<T> {
	table: Table<T>;
	icons?: Record<string, ReactNode>;
}

export default function Toggle<T>({ table, icons = {} }: Props<T>) {
	return (
		<div className={styles.container}>
			{table.getAllLeafColumns().map((c) => {
				if (["link"].includes(c.id)) return null;
				return (
					<Checkbox key={c.id} id={c.id} checked={c.getIsVisible()} onChange={c.getToggleVisibilityHandler()}>
						{icons[c.id] ?? c.id}
					</Checkbox>
				);
			})}
		</div>
	);
}

const styles = {
	container: wrap({
		justifyContent: "center",
		backgroundColor: "container",
		padding: 4,
	}),
};
