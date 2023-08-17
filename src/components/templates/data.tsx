import { Spacer, Table, columns, icons } from "$/components";
import { createLevelIndex } from "$/helpers";
import { IData } from "$/types";
import { ColumnFiltersState, SortingState, getCoreRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

interface Props {
	id: string;
	data: IData[];
}

export default function Data({ id, data }: Props) {
	const [sorting, setSorting] = useState<SortingState>([
		{ id: "released", desc: false },
		{ id: "title", desc: false },
	]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
		id: import.meta.env.DEV,
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
			minSize: 4,
			maxSize: 12,
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
		<Spacer as={"div"} direction="column">
			<Table.Toggle table={table} icons={icons}></Table.Toggle>
			<Table.Pagination id={id} table={table}></Table.Pagination>
			<Table.Table table={table}></Table.Table>
			{import.meta.env.DEV && <Table.Debug table={table} enabled={false}></Table.Debug>}
		</Spacer>
	);
}
