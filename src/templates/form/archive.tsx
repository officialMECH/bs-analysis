import { Field, Tabs } from "$/components";
import { createLevelIndex, fromEntries, parsers, resolveLevelStats } from "$/helpers";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { scrollable } from "$/styles/patterns";
import { Entry, IData, schemas } from "$/types";
import { ChangeEvent, useEffect, useState } from "react";
import slugify from "slugify";
import { Form } from ".";

interface Props {
	onSubmit?: () => void;
}

export default function ArchiveDataForm({ onSubmit }: Props) {
	const { key } = useParams("/:key/data");
	const { state, dispatch } = useDataset(key);
	const [data, setData] = useState<IData[]>([]);
	const [id, setId] = useState("");
	const [url, setURL] = useState("");

	function handleChangeTab() {
		setData([]);
	}

	function process(sid: string, entries: Entry<unknown>[]) {
		const data = fromEntries(entries).map(({ audio, info, level }) => {
			return {
				id: id === "" ? slugify(sid) : id,
				title: info._songName,
				bpm: Number(info._beatsPerMinute.toFixed(3)),
				length: audio ? Number(audio.duration.toFixed(3)) : undefined,
				characteristic: Object.values(schemas.characteristic.Values)[Object.values(schemas.metadata.characteristic.Values).indexOf(level.beatmap._beatmapCharacteristicName)],
				difficulty: Object.values(schemas.difficulty.Values)[Object.values(schemas.metadata.difficulty.Values).indexOf(level.beatmap._difficulty)],
				...resolveLevelStats(level.data),
				jumpSpeed: level.beatmap._noteJumpMovementSpeed,
				jumpOffset: level.beatmap._noteJumpStartBeatOffset,
			};
		});
		setId(sid);
		setData(data);
	}

	function handleChangeFile(event: ChangeEvent<HTMLInputElement>) {
		const files = event.target.files;
		if (!files) return;
		for (let i = 0; i < files.length; i++) {
			parsers.archive.file(files[i], (sid, entries) => process(sid, entries));
		}
	}

	function handleFetch() {
		parsers.archive.url(url, (sid, entries) => process(sid, entries));
	}

	useEffect(() => {
		setData((data) => data.map((x) => ({ ...x, id: slugify(id) })));
	}, [id]);

	function handleSubmit() {
		if (!state) throw Error("An unexpected error occured.");
		parsers.dataset.raw({ id: key, object: { ...state, data: state.data.concat(data), updated: new Date().toISOString() } }, (id, dataset) => {
			dispatch({ type: "UPDATE", payload: { id, dataset, overwrite: true } });
			if (onSubmit) onSubmit();
		});
	}

	return (
		<Form.Template title={"Import Entries from Map Archive"}>
			<Form.Row>
				<Tabs
					initial="File"
					onChange={handleChangeTab}
					render={{
						File: (
							<Field heading={"Source"} subheading="(.zip)">
								<input type="file" accept="application/zip" onChange={handleChangeFile} />
							</Field>
						),
						URL: (
							<Field heading={"Source"} subheading="(URL)">
								<input type="text" value={url} onChange={(e) => setURL(e.target.value)} />
								<button onClick={() => handleFetch()}>Fetch</button>
							</Field>
						),
					}}
				/>
			</Form.Row>
			<Form.Row>
				<Field heading={"ID"}>
					<input value={id} onChange={(e) => setId(e.target.value)} style={{ width: "100%" }} />
				</Field>
			</Form.Row>
			<details>
				<summary>Entries ({data.length})</summary>
				<pre className={styles.container}>
					{JSON.stringify(
						data.reduce((r, x) => ({ ...r, [`${x.id}/${createLevelIndex(x)}`]: x }), {}),
						null,
						2
					)}
				</pre>
			</details>
			<button disabled={data.length === 0 || id === ""} onClick={() => handleSubmit()}>
				{"Submit"}
			</button>
		</Form.Template>
	);
}

const styles = {
	container: scrollable({ width: "full", maxHeight: 64, direction: "vertical", padding: 4, backgroundColor: "container" }),
};
