import { Button } from "$/components/ui/atoms";
import { Details, Dropzone, Field, Spinner, Tabs } from "$/components/ui/molecules";
import { Form } from "$/components/ui/organisms";
import { formatters, fromEntries, parsers, resolveAudioStats, resolveBeatmapStats, resolveLightshowStats } from "$/helpers";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { Entry, IEntry } from "$/types";
import { useCallback, useEffect, useState } from "react";
import slugify from "slugify";
import { scrollable } from "styled-system/patterns";

interface Props {
	onSubmit?: (update: IEntry[]) => void;
}

function Component({ onSubmit }: Props) {
	const { key } = useParams("/:key");
	const { state } = useDataset(key);
	const [data, setData] = useState<IEntry[]>([]);
	const [fetching, setFetching] = useState(false);
	const [id, setId] = useState("");
	const [url, setURL] = useState("");

	function handleChangeTab() {
		setFetching(false);
		setData([]);
	}

	const process = useCallback(
		(sid: string, entries: Entry<unknown>[]) => {
			const data = fromEntries(entries).map(({ contents: { audio, beatmap, lightshow }, data: metadata }) => {
				return {
					id: id === "" ? slugify(sid) : id,
					...metadata,
					...resolveAudioStats(audio?.contents ?? {}),
					...resolveBeatmapStats(beatmap?.contents ?? {}),
					...resolveLightshowStats(lightshow?.contents ?? {}),
				} as IEntry;
			});
			setId(sid);
			setData(data);
		},
		[id],
	);

	function handleChangeFile(files: File[]) {
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
			() => setFetching(true),
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

	function State() {
		return (
			<pre className={cn.container}>
				{JSON.stringify(
					data.reduce((r, x) => ({ ...r, [formatters.id(x)]: x }), {}),
					null,
					2,
				)}
			</pre>
		);
	}

	return (
		<Form.Root title={"Import Entries from Map Archive"}>
			<Form.Row>
				<Tabs
					defaultValue="File"
					onValueChange={handleChangeTab}
					items={{
						File: (
							<Field.Wrapper id="map-file" heading={"Source"} subheading="(.zip)">
								<Field.Input asChild>
									<Dropzone accept={{ "application/zip": [".zip"] }} maxFiles={1} onFileChange={(files) => handleChangeFile(files)} />
								</Field.Input>
							</Field.Wrapper>
						),
						URL: (
							<Field.Wrapper id="map-url" heading={"Source"} subheading="(URL)">
								<Field.Input type="text" value={url} onChange={(e) => setURL(e.target.value)} />
								<Button disabled={fetching} onClick={() => handleFetch()}>
									<Spinner loading={fetching}>Fetch</Spinner>
								</Button>
							</Field.Wrapper>
						),
					}}
				/>
			</Form.Row>
			<Form.Row>
				<Field.Wrapper id="dataset-id" heading={"ID"}>
					<Field.Input value={id} onChange={(e) => setId(e.target.value)} style={{ width: "100%" }} />
				</Field.Wrapper>
			</Form.Row>
			<Details render={() => <State />}>
				<span>Entries ({data.length})</span>
			</Details>
			<Button disabled={data.length === 0 || id === ""} onClick={() => handleSubmit()}>
				Submit
			</Button>
		</Form.Root>
	);
}

const cn = {
	container: scrollable({ width: "full", maxHeight: 64, direction: "vertical", padding: 4, backgroundColor: "container" }),
};

export { Component };
