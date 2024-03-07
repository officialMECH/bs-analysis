import { characteristics, difficulties } from "$/constants/beatmap";
import { Characteristic, Difficulty, IEntry, schemas } from "$/types";
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

interface BeatmapEntry {
	name: string;
	contents: {
		audio?: FileEntry<unknown>;
		beatmap?: FileEntry<unknown>;
		lightshow?: FileEntry<unknown>;
	};
	data: Partial<IEntry>;
}

export function fromEntries(entries: FileEntry<unknown>[], filenames = { info: "Info.dat", audio: "BPMInfo.dat" }): BeatmapEntry[] {
	const info = entries.find((e) => e.name.toLowerCase() === filenames.info.toLowerCase());
	if (!info) throw Error();
	if (is(schemas.v2.info, info.contents)) {
		const data = info.contents;
		const song = entries.find((e) => e.name === data._songFilename)?.contents as AudioBuffer | undefined;
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
					length: song ? Number(song?.duration.toFixed(3)) : undefined,
					characteristic: level.data._beatmapCharacteristicName,
					difficulty: level.data._difficulty,
					jumpSpeed: level.data._noteJumpMovementSpeed,
					jumpOffset: level.data._noteJumpStartBeatOffset,
				},
			};
		});
	}
	if (is(schemas.v4.info, info.contents)) {
		const data = info.contents;
		const song = entries.find((e) => e.name === data.audio.songFilename)?.contents as AudioBuffer | undefined;
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
					length: song ? Number(song.duration.toFixed(3)) : data.audio.songDuration,
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

export function resolveAudioStats(data: unknown, details = false) {
	if (is(schemas.v4.audio, data)) {
		return {
			bpmEvents: { total: data.bpmData?.length ?? 0 },
		};
	}
	return {};
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
	if (is(schemas.v4.beatmap, data)) {
		return {
			colorNotes: { total: data.colorNotes?.length ?? 0 },
			bombNotes: { total: data.bombNotes?.length ?? 0 },
			obstacles: { total: data.obstacles?.length ?? 0 },
			sliders: { total: data.arcs?.length ?? 0 },
			burstSliders: { total: data.chains?.length ?? 0 },
			rotationEvents: { total: data.spawnRotations?.length ?? 0 },
		};
	}
	return {};
}

export function resolveLightshowStats(data: unknown, details = false) {
	if (is(schemas.v4.lightshow, data)) {
		return {
			basicBeatmapEvents: { total: data.basicEvents?.length ?? 0 },
			colorBoostBeatmapEvents: { total: data.colorBoostEvents?.length ?? 0 },
			lightColorEventBoxGroups: { total: data.eventBoxGroups?.filter((x) => x.t === 1).length ?? 0 },
			lightRotationEventBoxGroups: { total: data.eventBoxGroups?.filter((x) => x.t === 2).length ?? 0 },
			lightTranslationEventBoxGroups: { total: data.eventBoxGroups?.filter((x) => x.t === 3).length ?? 0 },
			vfxEventBoxGroups: { total: data.eventBoxGroups?.filter((x) => x.t === 4).length ?? 0 },
			waypoints: { total: data.waypoints?.length ?? 0 },
			basicEventTypesWithKeywords: { total: data.basicEventTypesWithKeywords?.d?.map((filter) => filter.e).filter(predicates.unique).length ?? 0 },
		};
	}
	return {};
}
