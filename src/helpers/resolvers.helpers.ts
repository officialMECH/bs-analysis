import { characteristics, difficulties } from "$/constants/beatmap";
import { Characteristic, Difficulty, schemas } from "$/types";
import { omit, predicates } from "$/utils";
import { is } from "valibot";

export function createLevelIndex(data: { characteristic: Characteristic; difficulty: Difficulty }) {
	const c = characteristics.indexOf(data.characteristic);
	const d = difficulties.indexOf(data.difficulty);
	return c * 5 + d;
}

export function resolveLevelIndex(value: number) {
	const c = Math.floor(value / 5);
	const d = value % 5;
	return { characteristic: characteristics[c], difficulty: difficulties[d] };
}

interface FileEntry<T> {
	name: string;
	contents: T;
}

export function fromEntries(entries: FileEntry<unknown>[]) {
	const entry = entries.find((e) => e.name.toLowerCase() === "info.dat");
	if (!entry) throw Error();
	if (is(schemas.v2.info, entry.contents)) {
		const info = entry.contents;
		const audio = entries.find((e) => e.name === info._songFilename)?.contents as AudioBuffer | undefined;
		const beatmaps = info._difficultyBeatmapSets.flatMap((s) => s._difficultyBeatmaps.map((x) => ({ ...omit(s, "_difficultyBeatmaps"), ...x })));
		const levels = beatmaps.map((beatmap) => {
			const entry = entries.find((e) => e.name === beatmap._beatmapFilename);
			if (!entry) throw Error();
			return { name: entry.name, contents: entry.contents, data: { ...beatmap } };
		});
		const valid = levels.filter((x) => x !== undefined);
		return valid.map((level) => {
			return {
				name: level.name,
				contents: {
					beatmap: level.contents,
				},
				data: {
					title: info._songName,
					bpm: info._beatsPerMinute,
					length: audio ? Number(audio?.duration.toFixed(3)) : undefined,
					characteristic: level.data._beatmapCharacteristicName,
					difficulty: level.data._difficulty,
					jumpSpeed: level.data._noteJumpMovementSpeed,
					jumpOffset: level.data._noteJumpStartBeatOffset,
				},
			};
		});
	}
	throw Error("The file provided is not a valid map file.");
}

export function resolveBeatmapStats(data: unknown, details = false) {
	if (is(schemas.v2.beatmap, data)) {
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
	if (is(schemas.v3.beatmap, data)) {
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
}
