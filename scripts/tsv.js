/* eslint-disable */

import { readFileSync, writeFileSync } from "node:fs";
import prompt from "prompts";
import slugify from "slugify";
import { config, createLevelIndex, importDuration, predicates } from "./helpers.js";

const { input, tsv, metadata, output } = await config(true, [
	{ name: "input", type: "text", message: "Source (File or URL)" }, //
]);

const source = input.startsWith("http") ? await fetch(input).then((r) => r.text()) : readFileSync(input, { encoding: "utf-8" });
const lines = source.split("\n").slice(tsv.start, tsv.end);

const remap = Object.entries(tsv.indices).reduce(
	(record, [key, [index, transformer]]) => {
		return { indices: { ...record.indices, [key]: index }, transformers: { ...record.transformers, [key]: transformer } };
	},
	{ indices: {}, transformers: {} }
);

const transformers = {
	string: (value) => value.toString(),
	number: (value) => Number(value),
	entity: (value) => ({ total: Number(value) }),
	array: (value) => Array.from(value.trim().split(",")),
	date: (value) => new Date(value).toISOString(),
	duration: (value) => importDuration(value),
};

function cell(cells, key, type = "string") {
	return remap.indices[key] ? transformers[type](cells[remap.indices[key]]) : undefined;
}

const titles = lines.map((line) => line.split("\t")[remap.indices["title"]]).filter((x, i, a) => x !== "" && predicates.unique(x, i, a));
const sids = await Promise.all(
	titles.map(async (title) => {
		const id = tsv.ids[titles.indexOf(title)];
		if (!id) {
			const { rid } = await prompt({ name: "rid", type: "text", message: `Please provide a valid ID for "${title}"`, initial: slugify(title, { trim: true }) });
			return rid;
		}
		return id;
	})
);

const dataset = await lines.reduce(async (record, line) => {
	const cells = line.split("\t");
	const id = cell(cells, "id");
	const title = cell(cells, "title");
	const characteristic = cell(cells, "characteristic");
	const difficulty = cell(cells, "difficulty");
	if (!characteristic || !difficulty) return record;
	const data = Object.keys(tsv.indices).reduce((record, key) => {
		return { ...record, [key]: cell(cells, key, remap.transformers[key]) };
	}, {});
	const bid = createLevelIndex({ characteristic, difficulty });
	let sid = id ?? sids[titles.indexOf(title)];
	return { ...(await record), [`${sid}/${bid}`]: { id: sid, ...data } };
}, Promise.resolve({}));

writeFileSync(output, JSON.stringify({ ...metadata, data: dataset, updated: new Date().toISOString() }, null, 2));
