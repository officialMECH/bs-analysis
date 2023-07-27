import { Spacer, Table, columns, icons } from "$/components";
import { createLevelIndex } from "$/helpers";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { IData } from "$/types";
import { getCoreRowModel, getFacetedUniqueValues, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

export default function Data() {
	const { key } = useParams("/:key");
	const { state } = useDataset(key);

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
		data: state.data,
		columns: columns,
		state: { columnVisibility },
		defaultColumn: {
			size: 4,
			minSize: 4,
			maxSize: 12,
		},
		getRowId: (row, index) => (row.id ? `${row.id}/${createLevelIndex(row)}` : index.toString()),
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		debugTable: import.meta.env.DEV,
	});

	if (!state.name) {
		return (
			<main>
				<h1>Not Found</h1>
				<hr />
				<p>This dataset is not available.</p>
			</main>
		);
	}
	return (
		<main>
			<h1 style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<span>{state.name}</span>
				<span style={{ color: "gray" }}>{state.data.length}</span>
			</h1>
			<hr />
			<Spacer size={1} direction="column">
				<Table.Toggle table={table} icons={icons}></Table.Toggle>
				<Table.Pagination id={key} table={table}></Table.Pagination>
				<Table.Table table={table}></Table.Table>
				{import.meta.env.DEV && <Table.Debug table={table} enabled={false}></Table.Debug>}
			</Spacer>
		</main>
	);
}
