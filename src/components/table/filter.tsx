import { units } from "$/helpers";
import { debounce, join } from "$/utils";
import { Column, Table } from "@tanstack/react-table";
import { ChangeEvent, ComponentProps, Fragment, useCallback, useState } from "react";

interface Props<T, V> {
	column: Column<T, V>;
	table: Table<T>;
}

function Input<T extends string | number | readonly string[]>({ value: initialValue, setValue: setDebouncedValue, delay = 500, ...props }: { value: T | undefined; setValue: (value: T | undefined) => void; delay?: number } & Omit<ComponentProps<"input">, "value" | "onChange">) {
	const [value, setValue] = useState<T | undefined>(initialValue);
	const onChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setValue(event.target.value as T);
			const callback = debounce(() => setDebouncedValue(event.target.value as T), delay);
			callback();
		},
		[delay, setDebouncedValue]
	);

	return <input {...props} value={value ?? ""} onChange={onChange} style={{ width: `calc(${units.ratio(1)} - ${units.rem(0.5)})` }} />;
}

export default function Filter<T, V>({ column, table }: Props<T, V>) {
	const name = column.getFilterFn()?.name;
	const first = table.getPreFilteredRowModel().flatRows[0].getValue(column.id);

	if (typeof first === "number" || name === "inNumberRange") {
		const value = column.getFilterValue() as [number, number] | undefined;
		return (
			<Fragment>
				<Input className={join("hide-webkit", "center")} type="number" value={value?.[0]} setValue={(value) => column.setFilterValue((current: [number, number]) => [value, current?.[1]])} placeholder={`Min`} />
				<Input className={join("hide-webkit", "center")} type="number" value={value?.[1]} setValue={(value) => column.setFilterValue((current: [number, number]) => [current?.[0], value])} placeholder={`Max`} />
			</Fragment>
		);
	}
	const value = column.getFilterValue() as string | undefined;
	const values = Array.from(column.getFacetedUniqueValues().keys()).filter((x) => x !== undefined);
	return (
		<Fragment>
			<Input list={column.id + "list"} value={value} setValue={(value) => column.setFilterValue(value)} placeholder={`Search...`} />
			{name === "equals" && (
				<datalist id={column.id + "list"}>
					{values.map((x: string) => (
						<option key={x} value={x} />
					))}
				</datalist>
			)}
		</Fragment>
	);
}
