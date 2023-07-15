import { Table as ITable, flexRender } from "@tanstack/react-table";
import { Center } from "../containers";
import wrappers from "./style.module.css";

interface Props<T> {
	table: ITable<T>;
}

export default function Table<T>({ table }: Props<T>) {
	return (
		<Center>
			<div className={wrappers.table} style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
				<table style={{ width: table.getCenterTotalSize() }}>
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<th key={header.id} colSpan={header.colSpan} style={{ width: "inherit", textAlign: "center" }}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
										return (
											<td key={cell.id} style={{ width: "inherit", backgroundColor: "inherit", textAlign: "center" }}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</td>
										);
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
										<td key={footer.id} colSpan={footer.colSpan} style={{ width: "inherit", textAlign: "center", color: "#888" }}>
											{footer.isPlaceholder ? null : flexRender(footer.column.columnDef.footer, footer.getContext())}
										</td>
									);
								})}
							</tr>
						))}
					</tfoot>
				</table>
			</div>
		</Center>
	);
}
