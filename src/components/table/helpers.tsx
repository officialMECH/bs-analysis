import { DIFFICULTY_COLORS } from "$/constants";
import { formatDuration, hjd, jd, nps, rt } from "$/helpers";
import { IData, schemas } from "$/types";
import { createColumnHelper } from "@tanstack/react-table";
import Cell from "./cell";

const helper = createColumnHelper<IData>();

export const columns = [
	helper.accessor((r) => r.title, {
		id: "id",
		size: 6,
		header: (c) => <Cell column={c.column}>ID</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"} style={{ color: c.row.original.id ? "gray" : "red" }}>
				{c.row.id}
			</Cell>
		),
	}),
	helper.accessor((r) => r.title, {
		id: "title",
		size: 12,
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
		size: 6,
		header: (c) => <Cell column={c.column}>Pack</Cell>,
		cell: (c) => <Cell column={c.column}>{c.getValue()}</Cell>,
	}),
	helper.accessor((r) => r.released, {
		id: "released",
		size: 6,
		header: (c) => <Cell column={c.column}>Released</Cell>,
		cell: (c) => {
			const released = c.getValue();
			if (!released) return released;
			return <Cell column={c.column}>{new Date(released).toLocaleDateString()}</Cell>;
		},
	}),
	helper.accessor((r) => r.bpm, {
		id: "bpm",
		header: (c) => <Cell column={c.column}>BPM</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.length, {
		id: "length",
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
		size: 6,
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
		size: 6,
		header: (c) => <Cell column={c.column}>Difficulty</Cell>,
		cell: (c) => {
			const value = c.getValue();
			const valid = Object.values(schemas.difficulty.Values).includes(value);
			return (
				<Cell column={c.column} wrapper={value && valid ? "strong" : "pre"} style={{ backgroundColor: value && valid ? DIFFICULTY_COLORS[value] : undefined, color: value && valid ? undefined : "red" }}>
					{!value ? "MISSING" : !valid ? "INVALID" : value}
				</Cell>
			);
		},
	}),
	helper.accessor((r) => nps(r), {
		id: "nps",
		size: 4,
		header: (c) => <Cell column={c.column}>NPS</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()?.toFixed(2)}
			</Cell>
		),
	}),
	helper.accessor((r) => r.colorNotes?.total, {
		id: "colorNotes",
		header: (c) => <Cell column={c.column}>Notes</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.bombNotes?.total, {
		id: "bombNotes",
		header: (c) => <Cell column={c.column}>Bombs</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.obstacles?.total, {
		id: "obstacles",
		header: (c) => <Cell column={c.column}>Obstacles</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.sliders?.total, {
		id: "sliders",
		header: (c) => <Cell column={c.column}>Arcs</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.burstSliders?.total, {
		id: "burstSliders",
		header: (c) => <Cell column={c.column}>Chains</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.basicBeatmapEvents?.total, {
		id: "basicBeatmapEvents",
		header: (c) => <Cell column={c.column}>Basic Events</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.colorBoostBeatmapEvents?.total, {
		id: "colorBoostBeatmapEvents",
		header: (c) => <Cell column={c.column}>Boost Events</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.rotationEvents?.total, {
		id: "rotationEvents",
		header: (c) => <Cell column={c.column}>Rotation Events</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.bpmEvents?.total, {
		id: "bpmEvents",
		header: (c) => <Cell column={c.column}>BPM Events</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.lightColorEventBoxGroups?.total, {
		id: "lightColorEventBoxGroups",
		header: (c) => <Cell column={c.column}>Light Color Event Box Groups</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.lightRotationEventBoxGroups?.total, {
		id: "lightRotationEventBoxGroups",
		header: (c) => <Cell column={c.column}>Light Rotation Event Box Groups</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.lightTranslationEventBoxGroups?.total, {
		id: "lightTranslationEventBoxGroups",
		header: (c) => <Cell column={c.column}>Light Translation Event Box Groups</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.waypoints?.total, {
		id: "waypoints",
		header: (c) => <Cell column={c.column}>Waypoints</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.basicEventTypesWithKeywords?.total, {
		id: "basicEventTypesForKeyword",
		header: (c) => <Cell column={c.column}>Special Event Types</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.jumpSpeed, {
		id: "jumpSpeed",
		header: (c) => <Cell column={c.column}>NJS</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.jumpOffset, {
		id: "jumpOffset",
		header: (c) => <Cell column={c.column}>Offset</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => hjd(r), {
		id: "hjd",
		header: (c) => <Cell column={c.column}>HJD</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => jd(r), {
		id: "jd",
		header: (c) => <Cell column={c.column}>JD</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()?.toFixed(3)}
			</Cell>
		),
	}),
	helper.accessor((r) => rt(r), {
		id: "rt",
		header: (c) => <Cell column={c.column}>RT</Cell>,
		cell: (c) => (
			<Cell column={c.column} wrapper={"pre"}>
				{c.getValue()?.toFixed(3)}
			</Cell>
		),
	}),
	helper.accessor((r) => r.mappers, {
		id: "mappers",
		size: 6,
		header: (c) => <Cell column={c.column}>Mapper(s)</Cell>,
		cell: (c) => <Cell column={c.column}>{c.getValue()?.toLocaleString()}</Cell>,
	}),
	helper.accessor((r) => r.lighters, {
		id: "lighters",
		size: 6,
		header: (c) => <Cell column={c.column}>Lighter(s)</Cell>,
		cell: (c) => <Cell column={c.column}>{c.getValue()?.toLocaleString()}</Cell>,
	}),
];
