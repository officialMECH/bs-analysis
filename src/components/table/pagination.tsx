import { units } from "$/helpers";
import { useDataset } from "$/hooks";
import { Table } from "@tanstack/react-table";
import { Spacer } from "../containers";

interface Props<T> {
	id: string;
	table: Table<T>;
}

export default function Pagination<T>({ id, table }: Props<T>) {
	const { state: dataset } = useDataset(id);
	return (
		<Spacer as={"div"} size={0.5} direction="column" center>
			<Spacer as={"div"} size={0.5} direction="row" center>
				<button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
					<i className="fa-solid fa-angles-left"></i>
				</button>
				<button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
					<i className="fa-solid fa-angle-left" />
				</button>
				<button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
					<i className="fa-solid fa-angle-right" />
				</button>
				<button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
					<i className="fa-solid fa-angles-right"></i>
				</button>
			</Spacer>
			<Spacer as={"div"} size={0.5} direction="row" center>
				<input type="number" defaultValue={table.getState().pagination.pageIndex + 1} onChange={(e) => table.setPageIndex(e.target.value ? Number(e.target.value) - 1 : 0)} style={{ width: units.rem(3) }} />
				<select value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
					{[10, 25, 50, 100, 500, "All"].map((pageSize) => (
						<option key={pageSize} value={typeof pageSize === "string" ? dataset!.data.length : pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</Spacer>
			<small style={{ fontWeight: "bold" }}>
				{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
			</small>
		</Spacer>
	);
}
