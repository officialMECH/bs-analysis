import { useDataset } from "$/hooks";
import { css } from "$/styles/css";
import { hstack, vstack } from "$/styles/patterns";
import { Table } from "@tanstack/react-table";

interface Props<T> {
	id: string;
	table: Table<T>;
}

export default function Pagination<T>({ id, table }: Props<T>) {
	const { state: dataset } = useDataset(id);
	return (
		<div className={styles.column}>
			<div className={styles.row}>
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
			</div>
			<div className={styles.row}>
				<input type="number" min={1} max={table.getPageCount()} defaultValue={table.getState().pagination.pageIndex + 1} onChange={(e) => table.setPageIndex(e.target.value ? Number(e.target.value) - 1 : 0)} />
				<select value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
					{[10, 25, 50, 100, 500, "All"].map((pageSize) => (
						<option key={pageSize} value={typeof pageSize === "string" ? dataset!.data.length : pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
			<small className={styles.small}>
				{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
			</small>
		</div>
	);
}

const styles = {
	column: vstack({}),
	row: hstack({}),
	small: css({ fontWeight: "bold" }),
};
