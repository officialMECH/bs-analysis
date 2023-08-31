import { center, scrollable } from "$/styles/patterns";
import { Table as ITable, flexRender } from "@tanstack/react-table";
import Actions from "./actions";

interface Props<T> {
	table: ITable<T>;
}

export default function Table<T>({ table }: Props<T>) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<table style={{ width: table.getCenterTotalSize() }}>
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<th key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
											<Actions table={table} header={header} />
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => {
							return (
								<tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
					<tfoot>
						{table.getFooterGroups().map((group) => (
							<tr key={group.id}>
								{group.headers.map((footer) => {
									return (
										<td key={footer.id} colSpan={footer.colSpan}>
											{footer.isPlaceholder ? null : flexRender(footer.column.columnDef.footer, footer.getContext())}
										</td>
									);
								})}
							</tr>
						))}
					</tfoot>
				</table>
			</div>
		</div>
	);
}

const styles = {
	wrapper: center({ width: "full" }),
	container: scrollable({ direction: "horizontal" }),
};
