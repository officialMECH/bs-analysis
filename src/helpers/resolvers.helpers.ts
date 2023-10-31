import { Characteristic, Difficulty, schemas } from "$/types";
import { predicates } from "$/utils";

export function createLevelIndex(data: { characteristic: Characteristic; difficulty: Difficulty }) {
	const c = Object.values(schemas.characteristic.Values).indexOf(data.characteristic);
	const d = Object.values(schemas.difficulty.Values).indexOf(data.difficulty);
	return c * 5 + d;
}

export function resolveLevelIndex(value: number) {
	const c = Math.floor(value / 5);
	const d = value % 5;
	return {
		characteristic: Object.values(schemas.characteristic.Values)[c],
		difficulty: Object.values(schemas.difficulty.Values)[d],
	};
}

interface FileEntry<T> {
	name: string;
	contents: T;
}

export function fromEntries(entries: FileEntry<unknown>[]) {
	const entry = entries.find((e) => e.name.toLowerCase() === "info.dat");
	if (!entry) throw Error("");
	const info = schemas.metadata.info.parse(entry.contents);
	const beatmaps = info._difficultyBeatmapSets.flatMap((s) => s._difficultyBeatmaps.map((x) => ({ ...x, ...s })));
	const audio = entries.find((e) => e.name === info._songFilename);
	if (!audio) throw Error("");
	const levels = beatmaps.map((beatmap) => {
		const entry = entries.find((e) => e.name === beatmap._beatmapFilename);
		if (!entry) throw Error("");
		return { name: entry.name, contents: { beatmap, data: entry.contents } };
	});
	const valid = levels.filter((x) => x !== undefined);
	return valid.map((level) => {
		return { name: level.name, audio: audio.contents as AudioBuffer | undefined, info: info, level: level.contents };
	});
}

export function resolveLevelStats(data: unknown, details = false) {
	const isV2 = schemas.metadata.v2.safeParse(data);
	const isV3 = schemas.metadata.v3.safeParse(data);
	if (isV2.success) {
		const colorNotes = isV2.data._notes.filter((x) => x && [0, 1].includes(x._type));
		const bombNotes = isV2.data._notes.filter((x) => x && [3].includes(x._type));
		const basicBeatmapEvents = isV2.data._events.filter((x) => x && ![5, 14, 15, 100].includes(x._type));
		const colorBoostBeatmapEvents = isV2.data._events.filter((x) => x && [5].includes(x._type));
		const rotationEvents = isV2.data._events.filter((x) => x && [14, 15].includes(x._type));
		const bpmEvents = isV2.data._events.filter((x) => x && [100].includes(x._type));
		return {
			colorNotes: { total: colorNotes.length },
			bombNotes: { total: bombNotes.length },
			obstacles: { total: isV2.data._obstacles.length },
			sliders: isV2.data._sliders ? { total: isV2.data._sliders.length } : undefined,
			basicBeatmapEvents: { total: basicBeatmapEvents.length },
			colorBoostBeatmapEvents: { total: colorBoostBeatmapEvents.length },
			rotationEvents: { total: rotationEvents.length },
			bpmEvents: { total: bpmEvents.length },
			waypoints: isV2.data._waypoints ? { total: isV2.data._waypoints.length } : undefined,
			basicEventTypesWithKeywords: isV2.data._specialEventsKeywordFilters ? { total: isV2.data._specialEventsKeywordFilters._keywords?.map((filter) => filter._specialEvents).filter(predicates.unique).length ?? 0 } : undefined,
		};
	}
	if (isV3.success) {
		return {
			colorNotes: { total: isV3.data.colorNotes.length },
			bombNotes: { total: isV3.data.bombNotes.length },
			obstacles: { total: isV3.data.obstacles.length },
			sliders: { total: isV3.data.sliders.length },
			burstSliders: { total: isV3.data.burstSliders.length },
			basicBeatmapEvents: { total: isV3.data.basicBeatmapEvents.length },
			colorBoostBeatmapEvents: { total: isV3.data.colorBoostBeatmapEvents.length },
			rotationEvents: { total: isV3.data.rotationEvents.length },
			bpmEvents: { total: isV3.data.bpmEvents.length },
			lightColorEventBoxGroups: { total: isV3.data.lightColorEventBoxGroups.length },
			lightRotationEventBoxGroups: { total: isV3.data.lightRotationEventBoxGroups.length },
			lightTranslationEventBoxGroups: isV3.data.lightTranslationEventBoxGroups ? { total: isV3.data.lightTranslationEventBoxGroups.length } : undefined,
			vfxEventBoxGroups: isV3.data.vfxEventBoxGroups ? { total: isV3.data.vfxEventBoxGroups.length } : undefined,
			waypoints: { total: isV3.data.waypoints.length },
			basicEventTypesWithKeywords: { total: isV3.data.basicEventTypesWithKeywords.d?.map((filter) => filter.e).filter(predicates.unique).length ?? 0 },
		};
	}
}
