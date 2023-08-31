import { css } from "$/styles/css";
import { flex } from "$/styles/patterns";
import { debounce } from "$/utils";
import { Column, Table } from "@tanstack/react-table";
import { ChangeEvent, ComponentProps, useCallback, useState } from "react";

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

	return <input className={styles.input} {...props} value={value ?? ""} onChange={onChange} />;
}

export default function Filter<T, V>({ column, table }: Props<T, V>) {
	const name = column.getFilterFn()?.name;
	const first = table.getPreFilteredRowModel().flatRows[0].getValue(column.id);

	if (typeof first === "number" || name === "inNumberRange") {
		const value = column.getFilterValue() as [number, number] | undefined;
		return (
			<div className={styles.wrapper}>
				<Input type="number" value={value?.[0]} setValue={(value) => column.setFilterValue((current: [number, number]) => [value, current?.[1]])} placeholder={`Min`} />
				<Input type="number" value={value?.[1]} setValue={(value) => column.setFilterValue((current: [number, number]) => [current?.[0], value])} placeholder={`Max`} />
			</div>
		);
	}
	const value = column.getFilterValue() as string | undefined;
	const values = Array.from(column.getFacetedUniqueValues().keys()).filter((x) => x !== undefined);
	return (
		<div className={styles.wrapper}>
			<Input list={column.id + "list"} value={value} setValue={(value) => column.setFilterValue(value)} placeholder={`Search...`} />
			{name === "equals" && (
				<datalist id={column.id + "list"}>
					{values.map((x: string) => (
						<option key={x} value={x} />
					))}
				</datalist>
			)}
		</div>
	);
}

const styles = {
	wrapper: flex({ width: 48, gap: 0.5 }),
	input: css({ width: "full", hideWebkit: true }),
};
