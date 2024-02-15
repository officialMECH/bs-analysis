/* eslint-disable */

import JSZip from "jszip";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { default as prompt } from "prompts";

export const CHARACTERISTICS = ["Standard", "NoArrows", "OneSaber", "Legacy", "360Degree", "90Degree", "Lightshow", "Lawless"];
export const DIFFICULTIES = ["Easy", "Normal", "Hard", "Expert", "ExpertPlus"];

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
	const c = CHARACTERISTICS.indexOf(data.characteristic);
	const d = DIFFICULTIES.indexOf(data.difficulty);
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
	const entries = await Promise.all(files);
	const formatted = await Promise.all(
		entries.map(async (entry) => {
			if (entry.name.endsWith(".dat")) {
				const text = await entry.async("text");
				return { name: entry.name, contents: JSON.parse(text) };
			}
			const buffer = await entry.async("arraybuffer");
			return { name: entry.name, contents: buffer };
		})
	);
	return fromEntries(formatted);
}

export const isV1 = (data) => {
	if (!data) return false;
	const version = data._version;
	if (!version && "_notes" in data) return true;
	return false;
};
export const isV2 = (data) => {
	if (!data) return false;
	const version = data._version;
	if (typeof version !== "string") return false;
	return version.split(".")[0] == 2;
};
export const isV3 = (data) => {
	if (!data) return false;
	const version = data.version;
	if (typeof version !== "string") return false;
	return version.split(".")[0] == 3;
};
export const isV4 = (data) => {
	if (!data) return false;
	const version = data.version;
	if (typeof version !== "string") return false;
	return version.split(".")[0] == 4;
};

/**
 * @param {{ name: string, contents: unknown }[]} entries
 */
export function fromEntries(entries, filenames = { info: "Info.dat", audio: "BPMInfo.dat" }) {
	const info = entries.find((e) => e.name.toLowerCase() === filenames.info.toLowerCase());
	if (!info) throw Error();
	if (isV2(info.contents)) {
		const data = info.contents;
		const audio = entries.find((e) => e.name.toLowerCase() === filenames.audio.toLowerCase());
		const l = data._difficultyBeatmapSets.flatMap((s) => s._difficultyBeatmaps.map((x) => ({ ...omit(s, "_difficultyBeatmaps"), ...x })));
		const levels = l.map((level) => {
			const beatmap = entries.find((e) => e.name === level._beatmapFilename);
			if (!beatmap) throw Error(`Missing beatmap file for ${level._beatmapCharacteristicName}/${level._difficulty}`);
			return { name: beatmap.name, contents: { audio, beatmap }, data: { ...level } };
		});
		const valid = levels.filter((x) => x !== undefined);
		return valid.map((level) => {
			return {
				name: level.name,
				contents: level.contents,
				data: {
					title: data._songName,
					bpm: data._beatsPerMinute,
					characteristic: level.data._beatmapCharacteristicName,
					difficulty: level.data._difficulty,
					jumpSpeed: level.data._noteJumpMovementSpeed,
					jumpOffset: level.data._noteJumpStartBeatOffset,
				},
			};
		});
	}
	if (isV4(info.contents)) {
		const data = info.contents;
		const audio = entries.find((e) => e.name === data.audio.audioDataFilename);
		if (!audio) throw Error(`Missing audio file`);
		const levels = data.difficultyBeatmaps.map((level) => {
			const beatmap = entries.find((e) => e.name === level.beatmapDataFilename);
			const lightshow = entries.find((e) => e.name === level.lightshowDataFilename);
			if (!beatmap) throw Error(`Missing beatmap file for ${level.characteristic}/${level.difficulty}`);
			if (!lightshow) throw Error(`Missing lightshow file for ${level.characteristic}/${level.difficulty}`);
			return { name: beatmap.name, contents: { audio, beatmap, lightshow }, data: { ...level } };
		});
		const valid = levels.filter((x) => x !== undefined);
		return valid.map((level) => {
			return {
				name: level.name,
				contents: level.contents,
				data: {
					title: data.song.title,
					bpm: data.audio.bpm,
					length: data.audio.songDuration,
					characteristic: level.data.characteristic,
					difficulty: level.data.difficulty,
					jumpSpeed: level.data.noteJumpMovementSpeed,
					jumpOffset: level.data.noteJumpStartBeatOffset,
					mappers: level.data.beatmapAuthors.mappers,
					lighters: level.data.beatmapAuthors.lighters,
				},
			};
		});
	}
	throw Error("The file provided is not a valid map file.");
}

export function resolveAudioStats(data, details = false) {
	if (isV4(data)) {
		return {
			bpmEvents: { total: data.bpmData.length },
		};
	}
	return {};
}

export function resolveBeatmapStats(data, details = false) {
	if (isV1(data) || isV2(data)) {
		const colorNotes = data._notes.filter((x) => x && [0, 1].includes(x._type));
		const bombNotes = data._notes.filter((x) => x && [3].includes(x._type));
		const basicBeatmapEvents = data._events.filter((x) => x && ![5, 14, 15, 100].includes(x._type));
		const colorBoostBeatmapEvents = data._events.filter((x) => x && [5].includes(x._type));
		const rotationEvents = data._events.filter((x) => x && [14, 15].includes(x._type));
		const bpmEvents = data._events.filter((x) => x && [100].includes(x._type));
		return {
			colorNotes: { total: colorNotes.length },
			bombNotes: { total: bombNotes.length },
			obstacles: { total: data._obstacles.length },
			sliders: data._sliders ? { total: data._sliders.length } : undefined,
			basicBeatmapEvents: { total: basicBeatmapEvents.length },
			colorBoostBeatmapEvents: { total: colorBoostBeatmapEvents.length },
			rotationEvents: { total: rotationEvents.length },
			bpmEvents: { total: bpmEvents.length },
			waypoints: data._waypoints ? { total: data._waypoints.length } : undefined,
			basicEventTypesWithKeywords: data._specialEventsKeywordFilters ? { total: data._specialEventsKeywordFilters._keywords?.map((filter) => filter._specialEvents).filter(predicates.unique).length ?? 0 } : undefined,
		};
	}
	if (isV3(data)) {
		return {
			colorNotes: { total: data.colorNotes.length },
			bombNotes: { total: data.bombNotes.length },
			obstacles: { total: data.obstacles.length },
			sliders: { total: data.sliders.length },
			burstSliders: { total: data.burstSliders.length },
			basicBeatmapEvents: { total: data.basicBeatmapEvents.length },
			colorBoostBeatmapEvents: { total: data.colorBoostBeatmapEvents.length },
			rotationEvents: { total: data.rotationEvents.length },
			bpmEvents: { total: data.bpmEvents.length },
			lightColorEventBoxGroups: { total: data.lightColorEventBoxGroups.length },
			lightRotationEventBoxGroups: { total: data.lightRotationEventBoxGroups.length },
			lightTranslationEventBoxGroups: data.lightTranslationEventBoxGroups ? { total: data.lightTranslationEventBoxGroups.length } : undefined,
			vfxEventBoxGroups: data.vfxEventBoxGroups ? { total: data.vfxEventBoxGroups.length } : undefined,
			waypoints: { total: data.waypoints.length },
			basicEventTypesWithKeywords: { total: data.basicEventTypesWithKeywords.d?.map((filter) => filter.e).filter(predicates.unique).length ?? 0 },
		};
	}
	if (isV4(data)) {
		return {
			colorNotes: { total: data.colorNotes.length ?? 0 },
			bombNotes: { total: data.bombNotes.length ?? 0 },
			obstacles: { total: data.obstacles.length ?? 0 },
			sliders: { total: data.arcs.length ?? 0 },
			burstSliders: { total: data.chains.length ?? 0 },
			rotationEvents: { total: data.spawnRotations.length ?? 0 },
		};
	}
	return {};
}

export function resolveLightshowStats(data, details = false) {
	if (isV4(data)) {
		return {
			basicBeatmapEvents: { total: data.basicEvents.length ?? 0 },
			colorBoostEvents: { total: data.colorBoostEvents.length ?? 0 },
			lightColorEventBoxGroups: { total: data.eventBoxGroups.filter((x) => x.t === 1).length ?? 0 },
			lightRotationEventBoxGroups: { total: data.eventBoxGroups.filter((x) => x.t === 2).length ?? 0 },
			lightTranslationEventBoxGroups: { total: data.eventBoxGroups.filter((x) => x.t === 3).length ?? 0 },
			vfxEventBoxGroups: { total: data.eventBoxGroups.filter((x) => x.t === 4).length ?? 0 },
			waypoints: { total: data.waypoints.length ?? 0 },
			basicEventTypesWithKeywords: { total: data.basicEventTypesWithKeywords.d?.map((filter) => filter.e).filter(predicates.unique).length ?? 0 },
		};
	}
	return {};
}
