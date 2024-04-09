import { Toggle } from "$/components/ui/molecules";
import { cva } from "$/styles/css";
import { center, wrap } from "$/styles/patterns";
import { IField } from "$/types";
import { Table } from "@tanstack/react-table";

interface Props<T> {
	table: Table<T>;
	fields?: Record<string, IField>;
}

export default function Component<T>({ table, fields: icons = {} }: Props<T>) {
	return (
		<div className={cn.container}>
			{table.getAllLeafColumns().map((c) => {
				if (["link"].includes(c.id)) return null;
				return (
					<Toggle title={icons[c.id]?.label ?? undefined} className={cn.wrapper({ checked: c.getIsVisible() })} key={c.id} id={c.id} pressed={c.getIsVisible()} onPressedChange={(x) => c.toggleVisibility(x)}>
						{icons[c.id]?.icon ?? c.id}
					</Toggle>
				);
			})}
		</div>
	);
}

const cn = {
	container: wrap({
		justifyContent: "center",
		backgroundColor: "container",
		padding: 4,
	}),
	wrapper: cva({
		base: center.raw({
			width: 8,
			height: 8,
			padding: 0,
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
