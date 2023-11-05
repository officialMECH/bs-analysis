import { Checkbox, Icon, Table } from "$/components";
import { calc, formatDuration, formatters } from "$/helpers";
import { vstack } from "$/styles/patterns";
import { token } from "$/styles/tokens";
import { IData, schemas } from "$/types";
import { createColumnHelper } from "@tanstack/react-table";
import RowActions from "../actions/row";

const helper = createColumnHelper<IData>();
const size = { sm: 4, md: 6, lg: 10 };

export const columns = [
	helper.display({
		id: "link",
		size: size.sm,
		header: (c) => {
			const isSelected = c.table.getIsSomeRowsSelected() || c.table.getIsAllRowsSelected();
			return (
				<Table.Cell {...c} className={vstack({ gap: 0 })}>
					<span>Level</span>
					<Checkbox id={c.column.id} checked={isSelected} onChange={c.table.getToggleAllRowsSelectedHandler()} />
				</Table.Cell>
			);
		},
		footer: (c) => {
			const { rows } = c.table.getFilteredSelectedRowModel();
			return (
				<Table.Cell {...c} className={vstack({ gap: 0 })}>
					<RowActions table={c.table} ids={rows.map((r) => r.id)} />
				</Table.Cell>
			);
		},
		cell: (c) => (
			<Table.Cell {...c}>
				<Checkbox id={c.row.id} checked={c.row.getIsSelected()} onChange={c.row.getToggleSelectedHandler()} />
				<Icon className="fa-solid fa-external-link" asChild>
					<a href={`./level/${c.row.id}`} />
				</Icon>
			</Table.Cell>
		),
	}),
	helper.accessor((r) => r.id, {
		id: "id",
		size: size.md,
		filterFn: "equals",
		header: (c) => <Table.Cell {...c}>ID</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} color={() => token("colors.subtext")} />,
	}),
	helper.accessor((r) => r.title, {
		id: "title",
		size: size.lg,
		header: (c) => <Table.Cell {...c}>Title</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.pack, {
		id: "pack",
		size: size.md,
		filterFn: "equals",
		header: (c) => <Table.Cell {...c}>Pack</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.released, {
		id: "released",
		size: size.md,
		sortingFn: "datetime",
		header: (c) => <Table.Cell {...c}>Released</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} transform={(value) => (value ? new Date(value).toLocaleString() : undefined)} />,
	}),
	helper.accessor((r) => r.bpm, {
		id: "bpm",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>BPM</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.length, {
		id: "length",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Length</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} transform={(value) => (value ? formatDuration(value) : undefined)} />,
	}),
	helper.accessor((r) => r.characteristic, {
		id: "characteristic",
		size: size.md,
		filterFn: "equals",
		sortingFn: "characteristic",
		header: (c) => <Table.Cell {...c}>Characteristic</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} background={() => token(`colors.container`)} validate={(value) => !!value && Object.values(schemas.characteristic.Values).includes(value)} transform={(value, valid) => (!value ? "MISSING" : !valid ? "INVALID" : value)} />,
	}),
	helper.accessor((r) => r.difficulty, {
		id: "difficulty",
		size: size.md,
		filterFn: "equals",
		sortingFn: "difficulty",
		header: (c) => <Table.Cell {...c}>Difficulty</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} background={(value) => token(`colors.difficulty.${value}`)} validate={(value) => !!value && Object.values(schemas.difficulty.Values).includes(value)} transform={(value, valid) => (!value ? "MISSING" : !valid ? "INVALID" : value)} />,
	}),
	helper.accessor((r) => calc.nps(r), {
		id: "nps",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>NPS</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} transform={(value) => value?.toFixed(2)} />,
	}),
	helper.accessor((r) => r.colorNotes?.total, {
		id: "colorNotes",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Notes</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.bombNotes?.total, {
		id: "bombNotes",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Bombs</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.obstacles?.total, {
		id: "obstacles",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Obstacles</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.sliders?.total, {
		id: "sliders",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Arcs</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.burstSliders?.total, {
		id: "burstSliders",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Chains</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.basicBeatmapEvents?.total, {
		id: "basicBeatmapEvents",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Basic Events</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.colorBoostBeatmapEvents?.total, {
		id: "colorBoostBeatmapEvents",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Boost Events</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.rotationEvents?.total, {
		id: "rotationEvents",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Rotation Events</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.bpmEvents?.total, {
		id: "bpmEvents",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>BPM Events</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.lightColorEventBoxGroups?.total, {
		id: "lightColorEventBoxGroups",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Light Color Event Box Groups</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.lightRotationEventBoxGroups?.total, {
		id: "lightRotationEventBoxGroups",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Light Rotation Event Box Groups</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.lightTranslationEventBoxGroups?.total, {
		id: "lightTranslationEventBoxGroups",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Light Translation Event Box Groups</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.vfxEventBoxGroups?.total, {
		id: "vfxEventBoxGroups",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>VFX Event Box Groups</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.waypoints?.total, {
		id: "waypoints",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Waypoints</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.basicEventTypesWithKeywords?.total, {
		id: "basicEventTypesWithKeywords",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Special Event Types</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.jumpSpeed, {
		id: "jumpSpeed",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>NJS</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.jumpOffset, {
		id: "jumpOffset",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>Offset</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => calc.hjd(r), {
		id: "hjd",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>HJD</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} />,
	}),
	helper.accessor((r) => calc.jd(r), {
		id: "jd",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>JD</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} transform={(value) => value?.toFixed(3)} />,
	}),
	helper.accessor((r) => calc.rt(r), {
		id: "rt",
		size: size.sm,
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell {...c}>RT</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} transform={(value) => value?.toFixed(3)} />,
	}),
	helper.accessor((r) => r.mappers, {
		id: "mappers",
		size: size.md,
		filterFn: "includesString",
		header: (c) => <Table.Cell {...c}>Mapper(s)</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} transform={(value) => (value ? formatters.array(value) : undefined)} />,
	}),
	helper.accessor((r) => r.lighters, {
		id: "lighters",
		size: size.md,
		filterFn: "includesString",
		header: (c) => <Table.Cell {...c}>Lighter(s)</Table.Cell>,
		cell: (c) => <Table.AccessorCell {...c} transform={(value) => (value ? formatters.array(value) : undefined)} />,
	}),
];
