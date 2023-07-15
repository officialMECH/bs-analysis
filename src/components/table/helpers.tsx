import { DIFFICULTY_COLORS } from "$/constants";
import { hjd, jd, nps, rt } from "$/helpers";
import { IData } from "$/types";
import { createColumnHelper } from "@tanstack/react-table";
import Cell from "./cell";

const helper = createColumnHelper<IData>();

export const columns = [
	helper.accessor((r) => r.title, {
		id: "title",
		size: 8,
		header: (c) => <Cell c={c.column}>Title</Cell>,
		cell: (c) => <Cell c={c.column}>{c.getValue()}</Cell>,
	}),
	helper.accessor((r) => r.pack, {
		id: "pack",
		size: 6,
		header: (c) => <Cell c={c.column}>Pack</Cell>,
		cell: (c) => <Cell c={c.column}>{c.getValue()}</Cell>,
	}),
	helper.accessor((r) => r.released, {
		id: "released",
		size: 6,
		header: (c) => <Cell c={c.column}>Released</Cell>,
		cell: (c) => {
			const released = c.getValue();
			if (!released) return released;
			return <Cell c={c.column}>{new Date(released).toLocaleDateString()}</Cell>;
		},
	}),
	helper.accessor((r) => r.bpm, {
		id: "bpm",
		header: (c) => <Cell c={c.column}>BPM</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.length, {
		id: "length",
		header: (c) => <Cell c={c.column}>Length</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.characteristic, {
		id: "characteristic",
		size: 6,
		header: (c) => <Cell c={c.column}>Characteristic</Cell>,
		cell: (c) => (
			<Cell c={c.column} style={{ backgroundColor: "#404040" }}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => r.difficulty, {
		id: "difficulty",
		size: 6,
		header: (c) => <Cell c={c.column}>Difficulty</Cell>,
		cell: (c) => (
			<Cell c={c.column} style={{ backgroundColor: DIFFICULTY_COLORS[c.getValue()] }}>
				{c.getValue()}
			</Cell>
		),
	}),
	helper.accessor((r) => nps(r), {
		id: "nps",
		size: 4,
		header: (c) => <Cell c={c.column}>NPS</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue().toFixed(2)}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.colorNotes.total, {
		id: "colorNotes",
		header: (c) => <Cell c={c.column}>Notes</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.bombNotes.total, {
		id: "bombNotes",
		header: (c) => <Cell c={c.column}>Bombs</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.obstacles.total, {
		id: "obstacles",
		header: (c) => <Cell c={c.column}>Obstacles</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.sliders.total, {
		id: "sliders",
		header: (c) => <Cell c={c.column}>Arcs</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.burstSliders.total, {
		id: "burstSliders",
		header: (c) => <Cell c={c.column}>Chains</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.basicBeatmapEvents.total, {
		id: "basicBeatmapEvents",
		header: (c) => <Cell c={c.column}>Basic Events</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.colorBoostBeatmapEvents.total, {
		id: "colorBoostBeatmapEvents",
		header: (c) => <Cell c={c.column}>Boost Events</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.rotationEvents.total, {
		id: "rotationEvents",
		header: (c) => <Cell c={c.column}>Rotation Events</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.bpmEvents.total, {
		id: "bpmEvents",
		header: (c) => <Cell c={c.column}>BPM Events</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.lightColorEventBoxGroups.total, {
		id: "lightColorEventBoxGroups",
		header: (c) => <Cell c={c.column}>Light Color Event Box Groups</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.lightRotationEventBoxGroups.total, {
		id: "lightRotationEventBoxGroups",
		header: (c) => <Cell c={c.column}>Light Rotation Event Box Groups</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.lightTranslationEventBoxGroups.total, {
		id: "lightTranslationEventBoxGroups",
		header: (c) => <Cell c={c.column}>Light Translation Event Box Groups</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.waypoints.total, {
		id: "waypoints",
		header: (c) => <Cell c={c.column}>Waypoints</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.basicEventTypesWithKeywords.total, {
		id: "basicEventTypesForKeyword",
		header: (c) => <Cell c={c.column}>Special Event Types</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.jumpSpeed, {
		id: "jumpSpeed",
		header: (c) => <Cell c={c.column}>NJS</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.jumpOffset, {
		id: "jumpOffset",
		header: (c) => <Cell c={c.column}>Offset</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => hjd(r), {
		id: "hjd",
		header: (c) => <Cell c={c.column}>HJD</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue()}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => jd(r), {
		id: "jd",
		header: (c) => <Cell c={c.column}>JD</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue().toFixed(3)}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => rt(r), {
		id: "rt",
		header: (c) => <Cell c={c.column}>RT</Cell>,
		cell: (c) => (
			<Cell c={c.column}>
				<pre>{c.getValue().toFixed(3)}</pre>
			</Cell>
		),
	}),
	helper.accessor((r) => r.mappers, {
		id: "mappers",
		size: 6,
		header: (c) => <Cell c={c.column}>Mapper(s)</Cell>,
		cell: (c) => {
			return <Cell c={c.column}>{c.getValue().toLocaleString()}</Cell>;
		},
	}),
	helper.accessor((r) => r.lighters, {
		id: "lighters",
		size: 6,
		header: (c) => <Cell c={c.column}>Lighter(s)</Cell>,
		cell: (c) => {
			return <Cell c={c.column}>{c.getValue().toLocaleString()}</Cell>;
		},
	}),
];
