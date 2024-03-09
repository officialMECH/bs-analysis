/* eslint-disable */

import { readFileSync, writeFileSync } from "node:fs";
import { default as prompt } from "prompts";
import slugify from "slugify";
import { config, createLevelIndex, extract, resolveAudioStats, resolveBeatmapStats, resolveLightshowStats } from "./helpers.js";

const { details, input, metadata, output, minify } = await config(false, [
	{ name: "input", type: "text", message: "Map Archive (File or URL)", hint: ".zip" }, //
]);

const source = input.startsWith("http") ? await fetch(input).then((r) => r.arrayBuffer()) : readFileSync(input.replaceAll('"', "")).buffer;
const entries = await extract(source);

const id = prompt({ name: "sid", type: "text", message: "ID", initial: slugify(entries[0].contents.title) });

const dataset = await entries.reduce(async (record, entry) => {
	const {
		contents: { audio, beatmap, lightshow },
		data: metadata,
	} = entry;
	const bid = createLevelIndex({ characteristic: contents.characteristic, difficulty: contents.difficulty });
	const { sid } = await id;
	const data = {
		id: sid,
		...metadata,
		...resolveAudioStats(audio?.contents ?? {}, details),
		...resolveBeatmapStats(beatmap?.contents ?? {}, details),
		...resolveLightshowStats(lightshow?.contents ?? {}, details),
	};
	return { ...(await record), [`${sid}/${bid}`]: data };
}, Promise.resolve({}));

writeFileSync(output, JSON.stringify({ ...metadata, data: dataset, updated: new Date().toISOString() }, null, minify ? 0 : 2));
