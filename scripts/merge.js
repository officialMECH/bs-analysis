/* eslint-disable */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "./helpers.js";

const { metadata, directory, output } = await config(false, [
	{ name: "directory", type: "text", message: "Directory" }, //
]);

const files = readdirSync(directory, { withFileTypes: true }).filter((entry) => entry.isFile());

function sort([_a, a], [_b, b]) {
	return a.released && b.released ? Date.parse(a.released.toString()).valueOf() - Date.parse(b.released.toString()).valueOf() : 0;
}

const dataset = files.reduce((original, entry) => {
	if (entry.name === "config.json") return original;
	const path = join(directory, entry.name);
	const raw = JSON.parse(readFileSync(path, { encoding: "utf-8" }));
	return [original, raw.data].reduce((record, current) => {
		const entries = Object.entries(current).sort(sort);
		entries.forEach(([key, value]) => {
			record[key] ??= {};
			record[key] = { ...record[key], ...value };
		});
		return record;
	}, {});
}, {});

writeFileSync(output, JSON.stringify({ ...metadata, data: dataset, updated: new Date().toISOString() }, null, 2));
