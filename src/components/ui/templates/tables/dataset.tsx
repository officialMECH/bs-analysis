import { Icon } from "$/components/ui/atoms";
import { Checkbox, Table } from "$/components/ui/molecules";
import { RowActions } from "$/components/ui/templates";
import { characteristics, difficulties } from "$/constants/beatmap";
import { calc, formatDuration, formatters } from "$/helpers";
import { Link } from "$/router";
import { css } from "$/styles/css";
import { center } from "$/styles/patterns";
import { token } from "$/styles/tokens";
import { IEntry } from "$/types";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { createColumnHelper } from "@tanstack/react-table";

const helper = createColumnHelper<IEntry>();
const size = { sm: 4, md: 6, lg: 10 };

export const columns = [
	helper.display({
		id: "link",
		size: size.sm,
		header: (c) => <Table.Cell context={c}>Level</Table.Cell>,
		footer: (c) => {
			const { rows } = c.table.getFilteredSelectedRowModel();
			return (
				<Table.Cell context={c} className={center({ marginY: 1 })}>
					<RowActions table={c.table} ids={rows.map((r) => r.id)} />
				</Table.Cell>
			);
		},
		cell: (c) => {
			const [sid, bid] = c.row.id.split("/");
			return (
				<Table.Cell context={c} className={center({ gap: 2 })}>
					<Checkbox id={c.row.id} checked={c.row.getIsSelected()} onCheckedChange={(x) => c.row.toggleSelected(!!x)} />
					<Link to={"/:key/level/:sid/:bid"} params={{ key: c.table.options.meta!.id, sid, bid }} className={css({ padding: 0 })}>
						<Icon icon={faExternalLink} />
					</Link>
				</Table.Cell>
			);
		},
	}),
	helper.accessor((r) => r.id, {
		id: "id",
		size: size.md,
		meta: { type: "list" },
		filterFn: "equals",
		sortingFn: "text",
		header: (c) => <Table.Cell context={c}>ID</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} color={() => token("colors.subtext")} />,
	}),
	helper.accessor((r) => r.title, {
		id: "title",
		size: size.lg,
		header: (c) => <Table.Cell context={c}>Title</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.pack, {
		id: "pack",
		size: size.md,
		meta: { type: "list" },
		filterFn: "equals",
		header: (c) => <Table.Cell context={c}>Pack</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.released, {
		id: "released",
		size: size.md,
		meta: { type: "datetime" },
		sortingFn: "datetime",
		header: (c) => <Table.Cell context={c}>Released</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} transform={(value) => (value ? new Date(value).toLocaleString() : undefined)} />,
	}),
	helper.accessor((r) => r.bpm, {
		id: "bpm",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>BPM</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.length, {
		id: "length",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Length</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} transform={(value) => (value ? formatDuration(Math.floor(value)) : undefined)} />,
	}),
	helper.accessor((r) => r.characteristic, {
		id: "characteristic",
		size: size.md,
		meta: { type: "list" },
		filterFn: "equals",
		sortingFn: "characteristic",
		header: (c) => <Table.Cell context={c}>Characteristic</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} background={() => token(`colors.container`)} validate={(value) => !!value && characteristics.includes(value)} transform={(value) => (!value ? "MISSING" : value)} />,
	}),
	helper.accessor((r) => r.difficulty, {
		id: "difficulty",
		size: size.md,
		meta: { type: "list" },
		filterFn: "equals",
		sortingFn: "difficulty",
		header: (c) => <Table.Cell context={c}>Difficulty</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} background={(value) => token(`colors.difficulty.${value}`)} validate={(value) => !!value && difficulties.includes(value)} transform={(value) => (!value ? "MISSING" : value)} />,
	}),
	helper.accessor((r) => calc.nps(r), {
		id: "nps",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>NPS</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} transform={(value) => value?.toFixed(2)} />,
	}),
	helper.accessor((r) => r.colorNotes?.total, {
		id: "colorNotes",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Notes</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.bombNotes?.total, {
		id: "bombNotes",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Bombs</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.obstacles?.total, {
		id: "obstacles",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Obstacles</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.sliders?.total, {
		id: "sliders",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Arcs</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.burstSliders?.total, {
		id: "burstSliders",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Chains</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.basicBeatmapEvents?.total, {
		id: "basicBeatmapEvents",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Basic Events</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.colorBoostBeatmapEvents?.total, {
		id: "colorBoostBeatmapEvents",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Boost Events</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.rotationEvents?.total, {
		id: "rotationEvents",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Rotation Events</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.bpmEvents?.total, {
		id: "bpmEvents",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>BPM Events</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.lightColorEventBoxGroups?.total, {
		id: "lightColorEventBoxGroups",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Light Color Event Box Groups</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.lightRotationEventBoxGroups?.total, {
		id: "lightRotationEventBoxGroups",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Light Rotation Event Box Groups</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.lightTranslationEventBoxGroups?.total, {
		id: "lightTranslationEventBoxGroups",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Light Translation Event Box Groups</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.vfxEventBoxGroups?.total, {
		id: "vfxEventBoxGroups",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>VFX Event Box Groups</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.waypoints?.total, {
		id: "waypoints",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Waypoints</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.basicEventTypesWithKeywords?.total, {
		id: "basicEventTypesWithKeywords",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Special Event Types</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.jumpSpeed, {
		id: "jumpSpeed",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>NJS</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => r.jumpOffset, {
		id: "jumpOffset",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>Offset</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => calc.hjd(r), {
		id: "hjd",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>HJD</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} />,
	}),
	helper.accessor((r) => calc.jd(r), {
		id: "jd",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>JD</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} transform={(value) => value?.toFixed(3)} />,
	}),
	helper.accessor((r) => calc.rt(r), {
		id: "rt",
		size: size.sm,
		meta: { type: "number" },
		filterFn: "inNumberRange",
		header: (c) => <Table.Cell context={c}>RT</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} transform={(value) => value?.toFixed(3)} />,
	}),
	helper.accessor((r) => r.mappers, {
		id: "mappers",
		size: size.md,
		meta: { type: "array" },
		filterFn: "includesString",
		header: (c) => <Table.Cell context={c}>Mapper(s)</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} transform={(value) => (value ? formatters.array(value) : undefined)} />,
	}),
	helper.accessor((r) => r.lighters, {
		id: "lighters",
		size: size.md,
		meta: { type: "array" },
		filterFn: "includesString",
		header: (c) => <Table.Cell context={c}>Lighter(s)</Table.Cell>,
		cell: (c) => <Table.AccessorCell context={c} transform={(value) => (value ? formatters.array(value) : undefined)} />,
	}),
];
