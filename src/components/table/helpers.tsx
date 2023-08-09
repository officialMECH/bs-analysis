import { colors } from "$/constants";
import { createLevelIndex, formatDuration, hjd, jd, nps, rt } from "$/helpers";
import { IData, schemas } from "$/types";
import { createColumnHelper } from "@tanstack/react-table";
import Cell from "./cell";

const helper = createColumnHelper<IData>();
const size = { sm: 4, md: 6, lg: 12 };

export const columns = [
	helper.accessor((r) => `${r.id}/${createLevelIndex(r)}`, {
		id: "id",
		size: size.md,
		header: (c) => <Cell column={c.column}>ID</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"} style={{ color: c.row.original.id ? "gray" : "red" }}>
				{c.row.id}
			</Cell>
		),
	}),
	helper.accessor((r) => r.title, {
		id: "title",
		size: size.lg,
		header: (c) => <Cell column={c.column}>Title</Cell>,
		cell: (c) => {
			const value = c.getValue();
			return (
				<Cell column={c.column} href={`./level/${c.row.id}`} wrapper={value ? "span" : "pre"} style={{ color: value ? undefined : "gray" }}>
					{value}
				</Cell>
			);
		},
	}),
	helper.accessor((r) => r.pack, {
		id: "pack",
		size: size.md,
		header: (c) => <Cell column={c.column}>Pack</Cell>,
		cell: (c) => <Cell column={c.column}>{c.getValue()}</Cell>,
	}),
	helper.accessor((r) => r.released, {
		id: "released",
		size: size.md,
		header: (c) => <Cell column={c.column}>Released</Cell>,
		cell: (c) => {
			const released = c.getValue();
			if (!released) return released;
			return <Cell column={c.column}>{new Date(released).toLocaleDateString()}</Cell>;
		},
	}),
	helper.accessor((r) => r.bpm, {
		id: "bpm",
		size: size.sm,
		header: (c) => <Cell column={c.column}>BPM</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.length, {
		id: "length",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Length</Cell>,
		cell: (c) => {
			const value = c.getValue();
			return (
				<Cell column={c.column} wrapper={"pre"}>
					{value ? formatDuration(value) : undefined}
				</Cell>
			);
		},
	}),
	helper.accessor((r) => r.characteristic, {
		id: "characteristic",
		size: size.md,
		header: (c) => <Cell column={c.column}>Characteristic</Cell>,
		cell: (c) => {
			const value = c.getValue();
			const valid = Object.values(schemas.characteristic.Values).includes(value);
			return (
				<Cell column={c.column} wrapper={value && valid ? "strong" : "pre"} style={{ backgroundColor: valid ? "#404040" : undefined, color: value && valid ? undefined : "red" }}>
					{!value ? "MISSING" : !valid ? "INVALID" : value}
				</Cell>
			);
		},
	}),
	helper.accessor((r) => r.difficulty, {
		id: "difficulty",
		size: size.md,
		header: (c) => <Cell column={c.column}>Difficulty</Cell>,
		cell: (c) => {
			const value = c.getValue();
			const valid = Object.values(schemas.difficulty.Values).includes(value);
			return (
				<Cell column={c.column} wrapper={value && valid ? "strong" : "pre"} style={{ backgroundColor: value && valid ? colors.difficulty[value] : undefined, color: value && valid ? undefined : "red" }}>
					{!value ? "MISSING" : !valid ? "INVALID" : value}
				</Cell>
			);
		},
	}),
	helper.accessor((r) => nps(r), {
		id: "nps",
		size: size.sm,
		header: (c) => <Cell column={c.column}>NPS</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()?.toFixed(2)}
			</Cell>
		),
	}),
	helper.accessor((r) => r.colorNotes?.total, {
		id: "colorNotes",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Notes</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.bombNotes?.total, {
		id: "bombNotes",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Bombs</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.obstacles?.total, {
		id: "obstacles",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Obstacles</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.sliders?.total, {
		id: "sliders",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Arcs</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.burstSliders?.total, {
		id: "burstSliders",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Chains</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.basicBeatmapEvents?.total, {
		id: "basicBeatmapEvents",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Basic Events</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.colorBoostBeatmapEvents?.total, {
		id: "colorBoostBeatmapEvents",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Boost Events</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.rotationEvents?.total, {
		id: "rotationEvents",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Rotation Events</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.bpmEvents?.total, {
		id: "bpmEvents",
		size: size.sm,
		header: (c) => <Cell column={c.column}>BPM Events</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.lightColorEventBoxGroups?.total, {
		id: "lightColorEventBoxGroups",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Light Color Event Box Groups</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.lightRotationEventBoxGroups?.total, {
		id: "lightRotationEventBoxGroups",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Light Rotation Event Box Groups</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.lightTranslationEventBoxGroups?.total, {
		id: "lightTranslationEventBoxGroups",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Light Translation Event Box Groups</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.waypoints?.total, {
		id: "waypoints",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Waypoints</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.basicEventTypesWithKeywords?.total, {
		id: "basicEventTypesForKeyword",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Special Event Types</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.jumpSpeed, {
		id: "jumpSpeed",
		size: size.sm,
		header: (c) => <Cell column={c.column}>NJS</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.jumpOffset, {
		id: "jumpOffset",
		size: size.sm,
		header: (c) => <Cell column={c.column}>Offset</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => hjd(r), {
		id: "hjd",
		size: size.sm,
		header: (c) => <Cell column={c.column}>HJD</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => jd(r), {
		id: "jd",
		size: size.sm,
		header: (c) => <Cell column={c.column}>JD</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()?.toFixed(3)}
			</Cell>
		),
	}),
	helper.accessor((r) => rt(r), {
		id: "rt",
		size: size.sm,
		header: (c) => <Cell column={c.column}>RT</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()?.toFixed(3)}
			</Cell>
		),
	}),
	helper.accessor((r) => r.mappers, {
		id: "mappers",
		size: size.md,
		header: (c) => <Cell column={c.column}>Mapper(s)</Cell>,
		cell: (c) => <Cell column={c.column}>{c.getValue()?.toLocaleString()}</Cell>,
	}),
	helper.accessor((r) => r.lighters, {
		id: "lighters",
		size: size.md,
		header: (c) => <Cell column={c.column}>Lighter(s)</Cell>,
		cell: (c) => <Cell column={c.column}>{c.getValue()?.toLocaleString()}</Cell>,
	}),
];
