import { cva } from "$/styles/css";
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
	const SortIcon = (props: { direction: false | SortDirection }) => {
		if (!props.direction) return <i className="fa-solid fa-sort" />;
		const direction = header.column.getSortingFn().name === "basic" ? header.column.getNextSortingOrder() : props.direction;
		return direction === "asc" ? <i className="fa-solid fa-caret-up" /> : <i className="fa-solid fa-caret-down" />;
	};
	function handleClickSort(event: MouseEvent<HTMLElement>) {
		const handler = header.column.getToggleSortingHandler();
		if (event.shiftKey) event.preventDefault();
		if (handler) handler(event);
	}
	return (
		<Fragment>
			<div className={styles.actions}>
				{header.column.getCanFilter() && (
					<Popover render={() => <Filter table={table} column={header.column} />}>
						<Icon as={"span"} className={styles.icon({ active: !!header.column.getIsFiltered() })}>
							{<i className="fa-solid fa-filter" />}
						</Icon>
					</Popover>
				)}
				{header.column.getCanSort() && (
					<Icon as={"span"} onClick={(event: MouseEvent<HTMLElement>) => handleClickSort(event)} className={styles.icon({ active: !!header.column.getIsSorted() })}>
						{<SortIcon direction={header.column.getIsSorted()} />}
					</Icon>
				)}
			</div>
		</Fragment>
	);
}

const styles = {
	actions: center({ color: "neutral" }),
	icon: cva({
		variants: {
			active: {
				true: { color: "text" },
				false: { color: "neutral" },
			},
		},
	}),
};
