import { Button, Icon, Input, Select } from "$/components/ui/atoms";
import { useDataset } from "$/hooks";
import { css } from "$/styles/css";
import { hstack, vstack } from "$/styles/patterns";
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { Table } from "@tanstack/react-table";

interface Props<T> {
	id: string;
	table: Table<T>;
}

export default function Pagination<T>({ id, table }: Props<T>) {
	const { state: dataset } = useDataset(id);
	return (
		<div className={cn.column}>
			<div className={cn.row}>
				<Button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
					<Icon icon={faAnglesLeft} />
				</Button>
				<Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
					<Icon icon={faAngleLeft} />
				</Button>
				<Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
					<Icon icon={faAngleRight} />
				</Button>
				<Button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
					<Icon icon={faAnglesRight} />
				</Button>
			</div>
			<div className={cn.row}>
				<Input type="number" min={1} max={table.getPageCount()} defaultValue={table.getState().pagination.pageIndex + 1} onValueChange={(value) => table.setPageIndex(value ? Number(value) - 1 : 0)} />
				<Select value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
					{[10, 25, 50, 100, 500, "All"].map((pageSize) => (
						<option key={pageSize} value={typeof pageSize === "string" ? dataset!.data.length : pageSize}>
							Show {pageSize}
						</option>
					))}
				</Select>
			</div>
			<small className={cn.small}>
				{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
			</small>
		</div>
	);
}

const cn = {
	column: vstack({}),
	row: hstack({}),
	small: css({ fontWeight: "bold" }),
};
