import { params, units } from "$/helpers";
import { Column, Table } from "@tanstack/react-table";
import { ComponentProps, Fragment } from "react";

interface Props<T, V> {
	column: Column<T, V>;
	table: Table<T>;
}

const Input = ({ ...delegated }: ComponentProps<"input">) => <input {...delegated} style={{ width: `calc(${units.ratio(1)} - ${units.rem(0.5)})` }}></input>;

export default function Filter<T, V>({ column, table }: Props<T, V>) {
	const first = table.getPreFilteredRowModel().flatRows[0].getValue(column.id);

	if (typeof first === "number") {
		const value = column.getFilterValue() as [number, number] | undefined;
		return (
			<Fragment>
				<Input className={params("hide-webkit", "center")} type="number" value={value?.[0]} onChange={(event) => column.setFilterValue((current: [number, number]) => [event.target.value, current?.[1]])} placeholder={`Min`} />
				<Input className={params("hide-webkit", "center")} type="number" value={value?.[1]} onChange={(event) => column.setFilterValue((current: [number, number]) => [current?.[0], event.target.value])} placeholder={`Max`} />
			</Fragment>
		);
	}
	const value = column.getFilterValue() as string | undefined;
	return <Input type="text" value={value} onChange={(event) => column.setFilterValue(event.target.value)} placeholder={`Search...`} />;
}
