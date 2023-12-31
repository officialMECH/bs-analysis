/* eslint-disable */

import { writeFileSync } from "node:fs";
import { config, createLevelIndex, extract, nonempty, resolveLevelStats } from "./helpers.js";

const { details, users, ids, beatsaver, metadata, output, minify } = await config(false, [
	{ name: "users", type: "list", message: "User ID(s)" },
	{ name: "ids", type: "list", message: "Map ID(s)" },
]);

const maps = [];

if (users.filter(nonempty).length > 0) {
	const fromUsers = await Promise.all(
		await users.filter(nonempty).map(async (id) => {
			const maps = [];
			let range = [];
			if (beatsaver?.users) {
				range[0] = beatsaver.users.start ?? 0;
				range[1] = (beatsaver.users.start ?? 0) + (beatsaver.users.requests ?? 1) - 1;
			} else {
				const user = await fetch(`https://api.beatsaver.com/users/id/${id}`).then((r) => r.json());
				range[1] = Math.ceil(user.stats.totalMaps / 20);
			}
			for (let page = range[0]; page <= range[1]; page++) {
				const search = await fetch(`https://api.beatsaver.com/maps/uploader/${id}/${page}`).then((r) => r.json());
				search.docs.forEach((detail) => maps.push(detail));
			}
			return maps;
		})
	).then((d) => d.flat());
	maps.push(...fromUsers);
}

if (ids.filter(nonempty).length > 0) {
	const fromIds = await Promise.all(
		await ids.filter(nonempty).map(async (id) => {
			const map = await fetch(`https://api.beatsaver.com/maps/id/${id}`).then((r) => r.json());
			return map;
		})
	).then((d) => d.flat());
	maps.push(...fromIds);
}

const entries = await Promise.all(
	maps.map(async (detail) => {
		const buffer = await fetch(detail.versions[0].downloadURL).then((x) => x.arrayBuffer());
		const levels = await extract(buffer);
		const entries = levels.map((level) => ({ detail, ...level }));
		return entries;
	})
).then((x) => x.flat());

const dataset = await entries.reduce(async (record, entry) => {
	const { detail, info, level } = entry;
	const characteristic = level.beatmap._beatmapCharacteristicName;
	const difficulty = level.beatmap._difficulty;
	const bid = createLevelIndex({ characteristic, difficulty });
	const title = info._songName ?? detail.metadata.songName;
	const data = {
		id: detail.id,
		title,
		released: new Date(detail.updatedAt).toISOString(),
		length: detail.metadata.duration,
		bpm: Number((info._beatsPerMinute ?? detail.metadata.bpm).toFixed(3)),
		characteristic,
		difficulty,
		...resolveLevelStats(level.data, details),
		jumpSpeed: level.beatmap._noteJumpMovementSpeed,
		jumpOffset: level.beatmap._noteJumpStartBeatOffset,
	};
	return { ...(await record), [`${detail.id}/${bid}`]: data };
}, Promise.resolve({}));

writeFileSync(output, JSON.stringify({ ...metadata, data: dataset, updated: new Date().toISOString() }, null, minify ? 0 : 2));
