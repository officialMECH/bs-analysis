/* eslint-disable */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { default as prompt } from "prompts";
import slugify from "slugify";
import { CHARACTERISTICS, DIFFICULTIES, config, createLevelIndex, fromEntries, resolveLevelStats } from "./helpers.js";

const { details, directory, metadata, output, minify } = await config(false, [
	{ name: "directory", type: "text", message: "Directory" }, //
]);

const files = readdirSync(directory, { withFileTypes: true }).filter((entry) => entry.isFile() && entry.name.endsWith(".dat"));
const entries = fromEntries(files.map((entry) => ({ name: entry.name, contents: JSON.parse(readFileSync(join(directory, entry.name), { encoding: "utf-8" })) })));

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
