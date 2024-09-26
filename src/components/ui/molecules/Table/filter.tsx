import { Input } from "$/components/ui/atoms";
import { Column, Table } from "@tanstack/react-table";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";

interface Props<T, V> {
	column: Column<T, V>;
	table: Table<T>;
}

export default function Filter<T, V>({ column, table }: Props<T, V>) {
	const { meta } = column.columnDef;
	const rows = table.getPreFilteredRowModel().flatRows;

	if (meta?.type === "number" || rows.some((r) => typeof r.getValue(column.id) === "number")) {
		const value = column.getFilterValue() as [number, number] | undefined;
		return (
			<div className={cn.root}>
				<Input delay={250} type="number" value={value?.[0] ?? ""} onValueChange={(value) => column.setFilterValue((current: [number, number]) => [value, current?.[1]])} placeholder={`Min`} className={cn.input} />
				<Input delay={250} type="number" value={value?.[1] ?? ""} onValueChange={(value) => column.setFilterValue((current: [number, number]) => [current?.[0], value])} placeholder={`Max`} className={cn.input} />
			</div>
		);
	}
	const value = column.getFilterValue() as string | undefined;
	const values = Array.from(column.getFacetedUniqueValues().keys()).filter((x) => x !== undefined);
	return (
		<div className={cn.root}>
			<Input delay={250} list={column.id + "-list"} value={value ?? ""} onValueChange={(value) => column.setFilterValue(value)} placeholder={`Search...`} className={cn.input} />
			{meta?.type === "list" && (
				<datalist id={column.id + "-list"}>
					{values.map((x: string) => (
						<option key={x} value={x} />
					))}
				</datalist>
			)}
		</div>
	);
}

const cn = {
	root: flex({ width: 48, gap: 0.5 }),
	input: css({ width: "full", hideWebkit: true }),
};
