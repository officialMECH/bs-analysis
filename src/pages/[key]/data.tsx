import { Spacer, Table, columns, icons } from "$/components";
import Layouts from "$/components/layouts";
import { createLevelIndex } from "$/helpers";
import { useDataset, useTitle } from "$/hooks";
import { useParams } from "$/router";
import { IData } from "$/types";
import { ColumnFiltersState, SortingState, getCoreRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

export default function Data() {
	const { key } = useParams("/:key");
	const { state: dataset } = useDataset(key);
	useTitle(dataset ? `Dataset: ${dataset?.name ?? key}` : "Unknown Dataset");

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
		data: dataset?.data ?? [],
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

	if (!dataset) {
		return (
			<Layouts.Content title={{ left: "Unknown Dataset" }}>
				<p>This dataset is not available.</p>
			</Layouts.Content>
		);
	}
	return (
		<Layouts.Content title={{ left: <span>{dataset.name ?? key}</span>, right: <span style={{ color: "gray" }}>{dataset.data.length}</span> }}>
			<Spacer size={1} direction="column">
				<Table.Toggle table={table} icons={icons}></Table.Toggle>
				<Table.Pagination id={key} table={table}></Table.Pagination>
				<Table.Table table={table}></Table.Table>
				{import.meta.env.DEV && <Table.Debug table={table} enabled={false}></Table.Debug>}
			</Spacer>
		</Layouts.Content>
	);
}
