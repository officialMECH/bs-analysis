import { Entry, IDataset, schemas } from "$/types";
import JSZip from "jszip";

const resolvers = {
	file: (filename: string) => filename.split(".")[0],
	url: (url: string) => url.split("?")[0].split("/")[url.split("/").length - 1].split(".")[0],
};

function parseDataset(data: { id: string; object: unknown }, callback: (id: string, value: IDataset) => void) {
	const result = schemas.dataset.safeParse(data.object);
	if (result.success) return callback(data.id, result.data);
	// filter out union errors, as they always flag an error regardless of whether they already passed validation
	const union = result.error.issues.find((issue) => issue.code === "invalid_union");
	if (union && union.code === "invalid_union") {
		const errors = union.unionErrors.filter((ue) => !ue.issues.some((ui) => ui.path.length === 1 && ui.path[0] === "data"));
		errors.forEach((e) => {
			throw e;
		});
	}
	throw result.error;
}

async function parseAudio(audio: Blob): Promise<AudioBuffer | undefined> {
	// @ts-ignore
	const audioContext = new (window.AudioContext || window.webkitAudioContext)();
	if (!audioContext) {
		console.warn("Unable to parse audio file, as AudioContext is not available in this environment.");
		return undefined;
	}
	const buffer = await audio.arrayBuffer();
	return await audioContext.decodeAudioData(buffer, (decoded) => {
		return {
			duration: decoded.duration,
		};
	});
}

async function parseArchive(data: { id: string; buffer: ArrayBuffer }, callback: (id: string, entries: Entry<unknown>[]) => void) {
	const zip = await JSZip.loadAsync(data.buffer);
	const files = Object.values(zip.files);
	const formatted = await Promise.all(
		files.map(async (entry) => {
			if ([".ogg", ".egg", ".wav"].some((x) => entry.name.endsWith(x))) {
				const file = await entry.async("blob");
				const contents = await parseAudio(file);
				return { name: entry.name, contents: contents } as Entry<AudioBuffer | undefined>;
			}
			if ([".jpeg", ".jpg", ".png"].some((x) => entry.name.endsWith(x))) {
				const file = await entry.async("blob");
				return { name: entry.name, contents: file } as Entry<Blob>;
			}
			if ([".dat"].some((x) => entry.name.endsWith(x))) {
				const file = await entry.async("text");
				const contents = JSON.parse(file) as unknown;
				return { name: entry.name, contents: contents } as Entry<typeof contents>;
			}
			throw Error(`Unsupported file found in .zip: ${entry.name}`);
		})
	);
	callback(data.id, formatted);
}

export default {
	dataset: {
		raw: parseDataset,
		file: (file: File, callback: (id: string, value: IDataset) => void) => {
			const id = resolvers.file(file.name);
			void file.text().then((contents) => parseDataset({ id, object: JSON.parse(contents) }, callback));
		},
		url: (url: string, callback: (id: string, value: IDataset) => void) => {
			const id = resolvers.url(url);
			void fetch(url).then((response) => {
				void response.text().then((contents) => parseDataset({ id, object: JSON.parse(contents) }, callback));
			});
		},
	},
	archive: {
		raw: parseArchive,
		file: (file: File, callback: (id: string, value: Entry<unknown>[]) => void) => {
			const id = resolvers.file(file.name);
			void file.arrayBuffer().then((contents) => parseArchive({ id, buffer: contents }, callback));
		},
		url: (url: string, callback: (id: string, value: Entry<unknown>[]) => void, onStart?: () => void) => {
			const id = resolvers.url(url);
			if (onStart) onStart();
			void fetch(url).then((response) => {
				void response.blob().then((blob) => {
					void blob.arrayBuffer().then((contents) => parseArchive({ id, buffer: contents }, callback));
				});
			});
		},
	},
};
