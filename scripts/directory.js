/* eslint-disable */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { default as prompt } from "prompts";
import slugify from "slugify";
import { config, createLevelIndex, fromEntries, resolveBeatmapStats } from "./helpers.js";

const { details, directory, metadata, output, minify } = await config(false, [
	{ name: "directory", type: "text", message: "Directory" }, //
]);

const files = readdirSync(directory, { withFileTypes: true }).filter((entry) => entry.isFile() && entry.name.endsWith(".dat"));
const entries = fromEntries(files.map((entry) => ({ name: entry.name, contents: JSON.parse(readFileSync(join(directory, entry.name), { encoding: "utf-8" })) })));

const id = prompt({ name: "sid", type: "text", message: "ID", initial: slugify(entries[0].contents.title) });

const dataset = await entries.reduce(async (record, entry) => {
	const {
		contents: { beatmap },
		data: metadata,
	} = entry;
	const bid = createLevelIndex({ characteristic: contents.characteristic, difficulty: contents.difficulty });
	const { sid } = await id;
	const data = {
		id: sid,
		...metadata,
		...resolveBeatmapStats(beatmap, details),
	};
	return { ...(await record), [`${sid}/${bid}`]: data };
}, Promise.resolve({}));

writeFileSync(output, JSON.stringify({ ...metadata, data: dataset, updated: new Date().toISOString() }, null, minify ? 0 : 2));
