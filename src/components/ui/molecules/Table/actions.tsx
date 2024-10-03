import { Icon } from "$/components/ui/atoms";
import { Checkbox, Popover } from "$/components/ui/molecules";
import { faCaretDown, faCaretUp, faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { Header, SortDirection, Table } from "@tanstack/react-table";
import { Fragment, MouseEvent } from "react";
import { cva, cx } from "styled-system/css";
import { center } from "styled-system/patterns";
import Filter from "./filter";

interface Props<D> {
	table: Table<D>;
	header: Header<D, unknown>;
}

export default function Actions<D>({ table, header }: Props<D>) {
	function getSortIcon(props: { direction: false | SortDirection }) {
		if (!props.direction) return faSort;
		const direction = header.column.getSortingFn().name === "basic" ? header.column.getNextSortingOrder() : props.direction;
		return direction === "asc" ? faCaretUp : faCaretDown;
	}
	function handleClickSort(event: MouseEvent<Element>) {
		const handler = header.column.getToggleSortingHandler();
		if (event.shiftKey) event.preventDefault();
		if (handler) handler(event);
	}
	const sortIcon = getSortIcon({ direction: header.column.getIsSorted() });
	return (
		<Fragment>
			<div className={cn.actions}>
				{header.column.id === "link" && <Checkbox id={header.column.id} checked={table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()} onCheckedChange={(x) => table.toggleAllRowsSelected(!!x)} />}
				{header.column.getCanFilter() && (
					<Popover render={() => <Filter table={table} column={header.column} />}>
						<Icon icon={faFilter} className={cx(cn.icon({ active: !!header.column.getIsFiltered() }))} />
					</Popover>
				)}
				{header.column.getCanSort() && <Icon icon={sortIcon} onClick={(event: MouseEvent<Element>) => handleClickSort(event)} className={cx(cn.icon({ active: !!header.column.getIsSorted() }))} />}
			</div>
		</Fragment>
	);
}

const cn = {
	actions: center({
		gap: 1,
		color: "neutral",
		height: "1em",
		marginY: 1,
	}),
	icon: cva({
		base: { cursor: "pointer" },
		variants: {
			active: {
				true: { color: "{text}" },
				false: { color: "neutral" },
			},
		},
	}),
};
