import { colors } from "$/constants";
import { createLevelIndex, formatDuration, formatters, hjd, jd, nps, rt } from "$/helpers";
import { IData, schemas } from "$/types";
import { createColumnHelper } from "@tanstack/react-table";
import { AccessorCell, Cell } from "./cell";

const helper = createColumnHelper<IData>();
const size = { sm: 4, md: 6, lg: 12 };

export const columns = [
	helper.accessor((r) => `${r.id}/${createLevelIndex(r)}`, {
		id: "id",
		size: size.md,
		header: (c) => <Cell {...c}>ID</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} style={{ color: c.row.original.id ? "gray" : colors.error }} />,
	}),
	helper.accessor((r) => r.title, {
		id: "title",
		size: size.lg,
		header: (c) => <Cell {...c}>Title</Cell>,
		cell: (c) => <AccessorCell {...c} href={`./level/${c.row.id}`} wrapper={c.getValue() ? "span" : "pre"} />,
	}),
	helper.accessor((r) => r.pack, {
		id: "pack",
		size: size.md,
		header: (c) => <Cell {...c}>Pack</Cell>,
		cell: (c) => <AccessorCell {...c} />,
	}),
	helper.accessor((r) => r.released, {
		id: "released",
		size: size.md,
		header: (c) => <Cell {...c}>Released</Cell>,
		cell: (c) => <AccessorCell {...c} transform={(value) => (value ? new Date(value).toLocaleString() : undefined)} />,
	}),
	helper.accessor((r) => r.bpm, {
		id: "bpm",
		size: size.sm,
		header: (c) => <Cell {...c}>BPM</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.length, {
		id: "length",
		size: size.sm,
		header: (c) => <Cell {...c}>Length</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} transform={(value) => (value ? formatDuration(value) : undefined)} />,
	}),
	helper.accessor((r) => r.characteristic, {
		id: "characteristic",
		size: size.md,
		header: (c) => <Cell {...c}>Characteristic</Cell>,
		cell: (c) => {
			const value = c.getValue();
			const valid = Object.values(schemas.characteristic.Values).includes(value);
			return <AccessorCell {...c} wrapper={value && valid ? "strong" : "pre"} transform={(value) => (!value ? "MISSING" : !valid ? "INVALID" : value)} style={{ backgroundColor: valid ? "rgba(64, 64, 64, 0.25)" : undefined, color: value && valid ? undefined : colors.error }} />;
		},
	}),
	helper.accessor((r) => r.difficulty, {
		id: "difficulty",
		size: size.md,
		header: (c) => <Cell {...c}>Difficulty</Cell>,
		cell: (c) => {
			const value = c.getValue();
			const valid = Object.values(schemas.difficulty.Values).includes(value);
			return <AccessorCell {...c} wrapper={value && valid ? "strong" : "pre"} transform={(value) => (!value ? "MISSING" : !valid ? "INVALID" : value)} style={{ backgroundColor: value && valid ? colors.difficulty[value] : undefined, color: value && valid ? undefined : colors.error }} />;
		},
	}),
	helper.accessor((r) => nps(r), {
		id: "nps",
		size: size.sm,
		header: (c) => <Cell {...c}>NPS</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} transform={(value) => value?.toFixed(2)} />,
	}),
	helper.accessor((r) => r.colorNotes?.total, {
		id: "colorNotes",
		size: size.sm,
		header: (c) => <Cell {...c}>Notes</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.bombNotes?.total, {
		id: "bombNotes",
		size: size.sm,
		header: (c) => <Cell {...c}>Bombs</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.obstacles?.total, {
		id: "obstacles",
		size: size.sm,
		header: (c) => <Cell {...c}>Obstacles</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.sliders?.total, {
		id: "sliders",
		size: size.sm,
		header: (c) => <Cell {...c}>Arcs</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.burstSliders?.total, {
		id: "burstSliders",
		size: size.sm,
		header: (c) => <Cell {...c}>Chains</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.basicBeatmapEvents?.total, {
		id: "basicBeatmapEvents",
		size: size.sm,
		header: (c) => <Cell {...c}>Basic Events</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.colorBoostBeatmapEvents?.total, {
		id: "colorBoostBeatmapEvents",
		size: size.sm,
		header: (c) => <Cell {...c}>Boost Events</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.rotationEvents?.total, {
		id: "rotationEvents",
		size: size.sm,
		header: (c) => <Cell {...c}>Rotation Events</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.bpmEvents?.total, {
		id: "bpmEvents",
		size: size.sm,
		header: (c) => <Cell {...c}>BPM Events</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.lightColorEventBoxGroups?.total, {
		id: "lightColorEventBoxGroups",
		size: size.sm,
		header: (c) => <Cell {...c}>Light Color Event Box Groups</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.lightRotationEventBoxGroups?.total, {
		id: "lightRotationEventBoxGroups",
		size: size.sm,
		header: (c) => <Cell {...c}>Light Rotation Event Box Groups</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.lightTranslationEventBoxGroups?.total, {
		id: "lightTranslationEventBoxGroups",
		size: size.sm,
		header: (c) => <Cell {...c}>Light Translation Event Box Groups</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.waypoints?.total, {
		id: "waypoints",
		size: size.sm,
		header: (c) => <Cell {...c}>Waypoints</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.basicEventTypesWithKeywords?.total, {
		id: "basicEventTypesForKeyword",
		size: size.sm,
		header: (c) => <Cell {...c}>Special Event Types</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.jumpSpeed, {
		id: "jumpSpeed",
		size: size.sm,
		header: (c) => <Cell {...c}>NJS</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => r.jumpOffset, {
		id: "jumpOffset",
		size: size.sm,
		header: (c) => <Cell {...c}>Offset</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => hjd(r), {
		id: "hjd",
		size: size.sm,
		header: (c) => <Cell {...c}>HJD</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} />,
	}),
	helper.accessor((r) => jd(r), {
		id: "jd",
		size: size.sm,
		header: (c) => <Cell {...c}>JD</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} transform={(value) => value?.toFixed(3)} />,
	}),
	helper.accessor((r) => rt(r), {
		id: "rt",
		size: size.sm,
		header: (c) => <Cell {...c}>RT</Cell>,
		cell: (c) => <AccessorCell {...c} wrapper={"pre"} transform={(value) => value?.toFixed(3)} />,
	}),
	helper.accessor((r) => r.mappers, {
		id: "mappers",
		size: size.md,
		filterFn: "includesString",
		header: (c) => <Cell {...c}>Mapper(s)</Cell>,
		cell: (c) => <AccessorCell {...c} transform={(value) => (value ? formatters.array(value) : undefined)} />,
	}),
	helper.accessor((r) => r.lighters, {
		id: "lighters",
		size: size.md,
		filterFn: "includesString",
		header: (c) => <Cell {...c}>Lighter(s)</Cell>,
		cell: (c) => <AccessorCell {...c} transform={(value) => (value ? formatters.array(value) : undefined)} />,
	}),
];
