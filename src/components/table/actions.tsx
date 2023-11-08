import { cva, cx } from "$/styles/css";
import { center } from "$/styles/patterns";
import { Header, SortDirection, Table } from "@tanstack/react-table";
import { Fragment, MouseEvent } from "react";
import { Icon, Popover } from "..";
import Filter from "./filter";

interface Props<D> {
	table: Table<D>;
	header: Header<D, unknown>;
}

export default function Actions<D>({ table, header }: Props<D>) {
	function getSortIcon(props: { direction: false | SortDirection }) {
		if (!props.direction) return "fa-solid fa-sort";
		const direction = header.column.getSortingFn().name === "basic" ? header.column.getNextSortingOrder() : props.direction;
		return direction === "asc" ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down";
	}
	function handleClickSort(event: MouseEvent<HTMLElement>) {
		const handler = header.column.getToggleSortingHandler();
		if (event.shiftKey) event.preventDefault();
		if (handler) handler(event);
	}
	const sortIcon = getSortIcon({ direction: header.column.getIsSorted() });
	return (
		<Fragment>
			<div className={styles.actions}>
				{header.column.getCanFilter() && (
					<Popover render={() => <Filter table={table} column={header.column} />}>
						<Icon className={cx("fa-solid fa-filter", styles.icon({ active: !!header.column.getIsFiltered() }))} />
					</Popover>
				)}
				{header.column.getCanSort() && <Icon onClick={(event: MouseEvent<HTMLElement>) => handleClickSort(event)} className={cx(sortIcon, styles.icon({ active: !!header.column.getIsSorted() }))} />}
			</div>
		</Fragment>
	);
}

const styles = {
	actions: center({ gap: 1, color: "neutral" }),
	icon: cva({
		base: { cursor: "pointer" },
		variants: {
			active: {
				true: { color: "text" },
				false: { color: "neutral" },
			},
		},
	}),
};
