import { units } from "$/helpers";
import { Table } from "@tanstack/react-table";
import { Fragment, PropsWithChildren } from "react";

interface Props<T> extends PropsWithChildren {
	enabled?: boolean;
	table: Table<T>;
}

export default function Debug<T>({ enabled = import.meta.env.DEV, table, children }: Props<T>) {
	return (
		enabled && (
			<Fragment>
				<pre style={{ fontSize: units.rem(0.75) }}>
					{children}
					{JSON.stringify(table.getState(), null, 2)}
				</pre>
			</Fragment>
		)
	);
}
