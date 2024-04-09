import { Table as Builder } from "$/components/ui/builders";
import { Table as ITable, flexRender } from "@tanstack/react-table";
import Actions from "./actions";

interface Props<T> {
	table: ITable<T>;
}

function Component<T>({ table }: Props<T>) {
	return (
		<Builder.Root style={{ width: table.getCenterTotalSize() }}>
			<Builder.Header>
				{table.getHeaderGroups().map((headerGroup) => (
					<Builder.Row key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<Builder.Head key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									<Actions table={table} header={header} />
								</Builder.Head>
							);
						})}
					</Builder.Row>
				))}
			</Builder.Header>
			<Builder.Body>
				{table.getRowModel().rows.map((row) => {
					return (
						<Builder.Row key={row.id}>
							{row.getVisibleCells().map((cell) => {
								return <Builder.Cell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Builder.Cell>;
							})}
						</Builder.Row>
					);
				})}
			</Builder.Body>
			<Builder.Footer>
				{table.getFooterGroups().map((group) => (
					<Builder.Row key={group.id}>
						{group.headers.map((footer) => {
							return (
								<Builder.Head key={footer.id} colSpan={footer.colSpan}>
									{footer.isPlaceholder ? null : flexRender(footer.column.columnDef.footer, footer.getContext())}
								</Builder.Head>
							);
						})}
					</Builder.Row>
				))}
			</Builder.Footer>
		</Builder.Root>
	);
}

export { Component };
