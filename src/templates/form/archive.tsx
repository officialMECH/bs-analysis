import { Field, Tabs } from "$/components";
import Spinner from "$/components/spinner";
import { formatters, fromEntries, parsers, resolveLevelStats } from "$/helpers";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { scrollable } from "$/styles/patterns";
import { Entry, IData } from "$/types";
import { ChangeEvent, useEffect, useState } from "react";
import slugify from "slugify";
import { Form } from ".";

interface Props {
	onSubmit?: (update: IData[]) => void;
}

export default function ArchiveDataForm({ onSubmit }: Props) {
	const { key } = useParams("/:key");
	const { state } = useDataset(key);
	const [data, setData] = useState<IData[]>([]);
	const [fetching, setFetching] = useState(false);
	const [id, setId] = useState("");
	const [url, setURL] = useState("");

	function handleChangeTab() {
		setFetching(false);
		setData([]);
	}

	function process(sid: string, entries: Entry<unknown>[]) {
		const data = fromEntries(entries).map(({ audio, info, level }) => {
			return {
				id: id === "" ? slugify(sid) : id,
				title: info._songName,
				bpm: Number(info._beatsPerMinute.toFixed(3)),
				length: audio ? Number(audio.duration.toFixed(3)) : undefined,
				characteristic: level.beatmap._beatmapCharacteristicName,
				difficulty: level.beatmap._difficulty,
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
		parsers.archive.url(
			url,
			(sid, entries) => {
				process(sid, entries);
				setFetching(false);
			},
			() => setFetching(true)
		);
	}

	useEffect(() => {
		setData((data) => data.map((x) => ({ ...x, id: slugify(id) })));
	}, [id]);

	function handleSubmit() {
		if (!state) throw Error("You cannot create new entries in a dataset that does not exist.");
		if (state.data.some((x) => data.some((d) => x.id === d.id && x.characteristic === d.characteristic && x.difficulty === d.difficulty))) {
			if (!confirm("Some entries already exist in the dataset, so any existing data may be overwritten. Are you sure you want to continue?")) return;
		}
		if (onSubmit) onSubmit(data);
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
								<button disabled={fetching} onClick={() => handleFetch()}>
									{fetching ? <Spinner /> : "Fetch"}
								</button>
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
						data.reduce((r, x) => ({ ...r, [formatters.id(x)]: x }), {}),
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
