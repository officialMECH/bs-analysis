import { cva } from "$/styles/css";
import { center, wrap } from "$/styles/patterns";
import { Table } from "@tanstack/react-table";
import { ReactNode } from "react";
import { Checkbox } from "..";

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
					<Checkbox className={styles.wrapper({ checked: c.getIsVisible() })} key={c.id} id={c.id} checked={c.getIsVisible()} onChange={c.getToggleVisibilityHandler()}>
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
	wrapper: cva({
		base: center.raw({
			width: 8,
			height: 8,
			color: "white",
			"&:focus": {
				borderColor: "white",
			},
		}),
		variants: {
			checked: {
				true: { backgroundColor: "primary" },
				false: { backgroundColor: "neutral" },
			},
		},
	}),
};
