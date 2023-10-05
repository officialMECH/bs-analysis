/* eslint-disable */

import { readFileSync, writeFileSync } from "node:fs";
import { default as prompt } from "prompts";
import slugify from "slugify";
import { CHARACTERISTICS, DIFFICULTIES, config, createLevelIndex, extract, resolveLevelStats } from "./helpers.js";

const { details, input, metadata, output, minify } = await config(false, [
	{ name: "input", type: "text", message: "Map Archive (File or URL)", hint: ".zip" }, //
]);

const source = input.startsWith("http") ? await fetch(input).then((r) => r.arrayBuffer()) : readFileSync(input.replaceAll('"', "")).buffer;
const entries = await extract(source);

const id = prompt({ name: "sid", type: "text", message: "ID", initial: slugify(entries[0].info._songName) });

const dataset = await entries.reduce(async (record, entry) => {
	const { info, level } = entry;
	const characteristic = CHARACTERISTICS[level.beatmap._beatmapCharacteristicName];
	const difficulty = DIFFICULTIES[level.beatmap._difficulty];
	const bid = createLevelIndex({ characteristic, difficulty });
	const title = info._songName;
	const { sid } = await id;
	const data = {
		id: sid,
		title,
		bpm: Number(info._beatsPerMinute.toFixed(3)),
		characteristic,
		difficulty,
		...resolveLevelStats(level.data, details),
		jumpSpeed: level.beatmap._noteJumpMovementSpeed,
		jumpOffset: level.beatmap._noteJumpStartBeatOffset,
	};
	return { ...(await record), [`${sid}/${bid}`]: data };
}, Promise.resolve({}));

writeFileSync(output, JSON.stringify({ ...metadata, data: dataset, updated: new Date().toISOString() }, null, minify ? 0 : 2));
