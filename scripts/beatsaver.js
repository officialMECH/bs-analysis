/* eslint-disable */

import { writeFileSync } from "node:fs";
import { CHARACTERISTICS, DIFFICULTIES, config, createLevelIndex, extract, nonempty, resolveLevelStats } from "./helpers.js";

const { details, users, ids, metadata, output, minify } = await config(false, [
	{ name: "users", type: "list", message: "User ID(s)" },
	{ name: "ids", type: "list", message: "Map ID(s)" },
]);

const maps = [];

if (users.filter(nonempty).length > 0) {
	const fromUsers = await Promise.all(
		users.filter(nonempty).map(async (id) => {
			const maps = [];
			const user = JSON.parse(await fetch(`https://api.beatsaver.com/users/id/${id}`).then((r) => r.text()));
			const pages = Math.ceil(user.stats.totalMaps / 20);
			for (let page = 0; page <= pages; page++) {
				const search = JSON.parse(await fetch(`https://api.beatsaver.com/maps/uploader/${id}/${page}`).then((r) => r.text()));
				search.docs.forEach((detail) => maps.push(detail));
			}
			return maps;
		})
	).then((d) => d.flat());
	maps.push(...fromUsers);
}

if (ids.filter(nonempty).length > 0) {
	const fromIds = await Promise.all(
		ids.filter(nonempty).map(async (id) => {
			const map = JSON.parse(await fetch(`https://api.beatsaver.com/maps/id/${id}`).then((r) => r.text()));
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
	const characteristic = CHARACTERISTICS[level.beatmap._beatmapCharacteristicName];
	const difficulty = DIFFICULTIES[level.beatmap._difficulty];
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
