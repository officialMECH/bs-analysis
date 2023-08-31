import { Table, columns, icons } from "$/components";
import { createLevelIndex, sort } from "$/helpers";
import { vstack } from "$/styles/patterns";
import { Characteristic, Difficulty, IData } from "$/types";
import { ColumnFiltersState, SortingState, getCoreRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

interface Props {
	id: string;
	data: IData[];
}

export default function Data({ id, data }: Props) {
	const [sorting, setSorting] = useState<SortingState>([
		{ id: "released", desc: false },
		{ id: "id", desc: false },
		{ id: "characteristic", desc: false },
		{ id: "difficulty", desc: false },
	]);

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
		id: false,
		pack: false,
		released: false,
		bombNotes: false,
		obstacles: false,
		sliders: false,
		burstSliders: false,
		basicBeatmapEvents: false,
		colorBoostBeatmapEvents: false,
		rotationEvents: false,
		bpmEvents: false,
		lightColorEventBoxGroups: false,
		lightRotationEventBoxGroups: false,
		lightTranslationEventBoxGroups: false,
		waypoints: false,
		basicEventTypesForKeyword: false,
		hjd: false,
		jd: false,
		rt: false,
		mappers: false,
		lighters: false,
	});

	const table = useReactTable<IData>({
		data: data ?? [],
		columns: columns,
		state: { columnVisibility, sorting, columnFilters },
		defaultColumn: {
			minSize: 2,
			maxSize: 12,
		},
		sortingFns: {
			characteristic: (rowA, rowB) => {
				const a = rowA.getValue<Characteristic>("characteristic");
				const b = rowB.getValue<Characteristic>("characteristic");
				return sort.characteristic(a, b);
			},
			difficulty: (rowA, rowB) => {
				const a = rowA.getValue<Difficulty>("difficulty");
				const b = rowB.getValue<Difficulty>("difficulty");
				return sort.difficulty(a, b);
			},
		},
		getRowId: (row, index) => (row.id ? `${row.id}/${createLevelIndex(row)}` : index.toString()),
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		debugTable: import.meta.env.DEV,
	});

	return (
		<div className={styles.column}>
			<Table.Toggle table={table} icons={icons}></Table.Toggle>
			<Table.Pagination id={id} table={table}></Table.Pagination>
			<Table.Table table={table}></Table.Table>
		</div>
	);
}

const styles = {
	column: vstack({ gap: 4, width: "full" }),
};