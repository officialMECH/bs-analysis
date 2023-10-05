/* eslint-disable */

import JSZip from "jszip";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { default as prompt } from "prompts";

export const CHARACTERISTICS = {
	["Standard"]: "Standard",
	["OneSaber"]: "One Saber",
	["NoArrows"]: "No Arrows",
	["360Degree"]: "360 Degree",
	["90Degree"]: "90 Degree",
	["Legacy"]: "Legacy",
	["Lightshow"]: "Lightshow",
	["Lawless"]: "Lawless",
};
export const DIFFICULTIES = {
	["Easy"]: "Easy",
	["Normal"]: "Normal",
	["Hard"]: "Hard",
	["Expert"]: "Expert",
	["ExpertPlus"]: "Expert+",
};

export const nonempty = (x) => x !== "";
export const delay = (x) => Promise.resolve(setTimeout(() => {}, x));

export function pick(obj, ...keys) {
	const draft = {};
	keys.forEach((key) => (draft[key] = obj[key]));
	return draft;
}
export function omit(obj, ...keys) {
	const draft = { ...obj };
	keys.forEach((key) => delete draft[key]);
	return draft;
}

export const predicates = {
	unique: (value, index, array) => array.indexOf(value) === index,
};

/**
 * @param {boolean} required
 * @param {import("prompts").PromptObject[]} prompts
 */
export async function config(required, prompts) {
	const details = ["-d", "--details"].includes(...process.argv.slice(2));
	const minify = ["-m", "--minify"].includes(...process.argv.slice(2));
	const { config: path } = await prompt({ name: "config", type: "text", message: "Configuration File" });
	if (required && !existsSync(path)) throw Error("A configuration file is required to run this script.");
	const { ...settings } = await prompt(prompts);
	const { output: o } = await prompt({ name: "output", type: "text", message: "Output File", initial: join(process.cwd(), ".local", "output.json") });
	const config = existsSync(path) ? JSON.parse(readFileSync(path, { encoding: "utf-8" })) : {};
	return { details, minify, ...config, ...settings, output: o };
}

export function createLevelIndex(data) {
	const c = Object.values(CHARACTERISTICS).indexOf(data.characteristic);
	const d = Object.values(DIFFICULTIES).indexOf(data.difficulty);
	return c * 5 + d;
}

export function importDuration(value) {
	const [x, milliseconds] = value.split(".");
	const [seconds, minutes, hours] = x
		.split(":")
		.reverse()
		.map((e) => Number(e));
	return (seconds ?? 0) + (minutes ?? 0) * 60 + (hours ?? 0) * 3600 + (milliseconds ? Number(milliseconds.padEnd(3, "0") ?? 0) / 1000 : 0);
}

/**
 * @param {ArrayBufferLike} buffer
 */
export async function extract(buffer) {
	const zip = await JSZip.loadAsync(buffer);
	const files = Object.values(zip.files);
	const entries = await Promise.all(files.filter((entry) => entry.name.endsWith(".dat")));
	const formatted = await Promise.all(
		entries.map(async (entry) => {
			const file = await entry.async("text");
			return { name: entry.name, contents: JSON.parse(file) };
		})
	);
	return fromEntries(formatted);
}

/**
 * @param {string} id
 * @param {{ name: string, contents: unknown }[]} entries
 */
export function fromEntries(entries) {
	const info = entries.find((e) => e.name.toLowerCase() === "info.dat");
	const beatmaps = info.contents._difficultyBeatmapSets.flatMap((s) => s._difficultyBeatmaps.map((x) => ({ ...x, ...s })));
	/** @type {{ name: string, contents: { beatmap: unknown, data: unknown } }[]} */
	const levels = beatmaps.map((beatmap) => {
		const entry = entries.find((entry) => entry.name === beatmap._beatmapFilename);
		if (!entry) throw Error("");
		return { name: entry.name, contents: { beatmap, data: entry.contents } };
	});
	const valid = levels.filter((x) => x !== undefined);
	return valid.map((level) => ({ name: level.name, info: info.contents, level: level.contents }));
}

export const isV2 = (data) => {
	const version = data._version;
	if (typeof version !== "string") return false;
	return version.split(".")[0] == 2;
};
export const isV3 = (data) => {
	const version = data.version;
	if (typeof version !== "string") return false;
	return version.split(".")[0] == 3;
};

export function resolveLevelStats(data, details = false) {
	if (isV2(data)) {
		const colorNotes = data._notes?.filter((x) => x && [0, 1].includes(x._type));
		const bombNotes = data._notes?.filter((x) => x && [3].includes(x._type));
		const basicBeatmapEvents = data._events?.filter((x) => x && ![5, 14, 15, 100].includes(x._type));
		const colorBoostBeatmapEvents = data._events?.filter((x) => x && [5].includes(x._type));
		const rotationEvents = data._events?.filter((x) => x && [14, 15].includes(x._type));
		const bpmEvents = data._events?.filter((x) => x && [100].includes(x._type));
		return {
			colorNotes: {
				total: colorNotes?.length ?? 0,
			},
			bombNotes: {
				total: bombNotes?.length ?? 0,
			},
			obstacles: {
				total: data._obstacles?.length ?? 0,
			},
			sliders: {
				total: data._sliders?.length ?? 0,
			},
			basicBeatmapEvents: {
				total: basicBeatmapEvents?.length ?? 0,
			},
			colorBoostBeatmapEvents: {
				total: colorBoostBeatmapEvents?.length ?? 0,
			},
			rotationEvents: {
				total: rotationEvents?.length ?? 0,
			},
			bpmEvents: {
				total: bpmEvents?.length ?? 0,
			},
			waypoints: {
				total: data._waypoints?.length ?? 0,
			},
			basicEventTypesWithKeywords: {
				total: data._specialEventsKeywordFilters?._keywords.map((filter) => filter._specialEvents).filter(predicates.unique).length ?? 0,
			},
		};
	}
	if (isV3(data)) {
		return {
			colorNotes: {
				total: data.colorNotes?.length ?? 0,
			},
			bombNotes: {
				total: data.bombNotes?.length ?? 0,
			},
			obstacles: {
				total: data.obstacles?.length ?? 0,
			},
			sliders: {
				total: data.sliders?.length ?? 0,
			},
			burstSliders: {
				total: data.burstSliders?.length ?? 0,
			},
			basicBeatmapEvents: {
				total: data.basicBeatmapEvents?.length ?? 0,
			},
			colorBoostBeatmapEvents: {
				total: data.colorBoostBeatmapEvents?.length ?? 0,
			},
			rotationEvents: {
				total: data.rotationEvents?.length ?? 0,
			},
			bpmEvents: {
				total: data.bpmEvents?.length ?? 0,
			},
			lightColorEventBoxGroups: {
				total: data.lightColorEventBoxGroups?.length ?? 0,
			},
			lightRotationEventBoxGroups: {
				total: data.lightRotationEventBoxGroups?.length ?? 0,
			},
			lightTranslationEventBoxGroups: {
				total: data.lightTranslationEventBoxGroups?.length ?? 0,
			},
			waypoints: {
				total: data.waypoints?.length,
			},
			basicEventTypesWithKeywords: {
				total: data.basicEventTypesWithKeywords?.d?.map((filter) => filter.e).filter(predicates.unique).length,
			},
		};
	}
}
