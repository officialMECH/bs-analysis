import { Button, Icon } from "$/components/ui/atoms";
import { Dialog, Table } from "$/components/ui/molecules";
import { ArchiveDataForm, ManualDataForm, tables } from "$/components/ui/templates";
import { fields } from "$/constants";
import { formatters, sort } from "$/helpers";
import { useDataset } from "$/hooks";
import { Characteristic, Difficulty, IEntry } from "$/types";
import { faAdd, faArchive } from "@fortawesome/free-solid-svg-icons";
import { ColumnFiltersState, RowSelectionState, SortingState, getCoreRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { hstack, vstack } from "styled-system/patterns";
import Pagination from "./pagination";
import ToggleRow from "./toggle";

interface Props {
	id: string;
	data: IEntry[];
}

function Component({ id, data }: Props) {
	const { state, dispatch } = useDataset(id);
	const location = useLocation();

	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
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
		vfxEventBoxGroups: false,
		waypoints: false,
		basicEventTypesWithKeywords: false,
		hjd: false,
		jd: false,
		rt: false,
		mappers: false,
		lighters: false,
	});
	const [sorting, setSorting] = useState<SortingState>([
		{ id: "released", desc: false },
		{ id: "id", desc: false },
		{ id: "characteristic", desc: false },
		{ id: "difficulty", desc: false },
	]);

	const table = useReactTable<IEntry>({
		data: data ?? [],
		columns: tables.dataset,
		meta: { id },
		state: { columnFilters, columnVisibility, rowSelection, sorting },
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
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row, index) => (row.id ? formatters.id(row) : index.toString()),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		debugTable: import.meta.env.DEV,
	});

	useEffect(() => setRowSelection({}), [location]);

	function handleSubmit(updates: IEntry[], close: () => void) {
		const dataset = { ...state, data: state!.data.concat(updates), updated: new Date().toISOString() };
		dispatch({ type: "UPDATE", payload: { id, dataset, overwrite: true } });
		close();
		setRowSelection(updates.reduce((r, x) => ({ ...r, [formatters.id(x)]: true }), {}));
	}

	return (
		<div className={cn.column}>
			<ToggleRow table={table} fields={fields.dataset} />
			<Pagination id={id} table={table} />
			<div className={cn.row}>
				<Dialog title="Add Entry" render={({ close }) => <ManualDataForm onSubmit={(x) => handleSubmit([x], close)} />}>
					<Button title="Add Entry">
						<Icon icon={faAdd} />
					</Button>
				</Dialog>
				<Dialog title="Import from Archive" render={({ close }) => <ArchiveDataForm onSubmit={(x) => handleSubmit(x, close)} />}>
					<Button title="Import from Archive">
						<Icon icon={faArchive} />
					</Button>
				</Dialog>
			</div>
			<Table.Table table={table} />
		</div>
	);
}

const cn = {
	column: vstack({ gap: 4, alignItems: "center", width: "full" }),
	row: hstack({ gap: 2 }),
};

export { Component };
