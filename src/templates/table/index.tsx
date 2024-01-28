import { Dialog, Icon, Table } from "$/components";
import { formatters, parsers, sort } from "$/helpers";
import { useDataset } from "$/hooks";
import { hstack, vstack } from "$/styles/patterns";
import { Characteristic, Difficulty, IData } from "$/types";
import { ColumnFiltersState, RowSelectionState, SortingState, getCoreRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { icons } from "..";
import ArchiveDataForm from "../form/archive";
import ManualDataForm from "../form/level";
import { columns } from "./helpers";

interface Props {
	id: string;
	data: IData[];
}

export default function DataTable({ id, data }: Props) {
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

	const table = useReactTable<IData>({
		data: data ?? [],
		columns,
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

	function handleSubmit(updates: IData[], close: () => void) {
		parsers.dataset.raw({ id, object: { ...state, data: state!.data.concat(updates), updated: new Date().toISOString() } }, (id, dataset) => {
			dispatch({ type: "UPDATE", payload: { id, dataset, overwrite: true } });
		});
		close();
		setRowSelection(updates.reduce((r, x) => ({ ...r, [formatters.id(x)]: true }), {}));
	}

	return (
		<div className={styles.column}>
			<Table.Toggle table={table} icons={icons} />
			<Table.Pagination id={id} table={table} />
			<div className={styles.row}>
				<Dialog render={({ close }) => <ManualDataForm onSubmit={(x) => handleSubmit([x], close)} />}>
					<button title="Add Entry">
						<Icon className="fa-solid fa-add" />
					</button>
				</Dialog>
				<Dialog render={({ close }) => <ArchiveDataForm onSubmit={(x) => handleSubmit(x, close)} />}>
					<button title="Import from Archive">
						<Icon className="fa-solid fa-archive" />
					</button>
				</Dialog>
			</div>
			<Table.Table table={table} />
		</div>
	);
}

const styles = {
	column: vstack({ gap: 4, alignItems: "center", width: "full" }),
	row: hstack({ gap: 2 }),
};
