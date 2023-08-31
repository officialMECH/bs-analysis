import { parsers } from "$/helpers";
import { useDatasets } from "$/hooks";
import { Path, useNavigate } from "$/router";
import { css, cva } from "$/styles/css";
import { hstack, scrollable, wrap } from "$/styles/patterns";
import { ChangeEvent, Fragment, useState } from "react";
import { Badge, Icon, IconInput } from "..";

interface Props {
	layout?: "home" | "basic" | "data" | "level";
}

export default function Nav({ layout = "basic" }: Props) {
	const param = location.pathname.split("/")[1];
	const [current, setCurrent] = useState<string>(param);
	const navigate = useNavigate();

	const { state, dispatch } = useDatasets();
	const keys = Object.keys(state);

	function handleChangeKey(e: ChangeEvent<HTMLSelectElement>) {
		setCurrent(e.target.value);
		return navigate(location.pathname.replace(param, e.target.value) as Path);
	}
	function handleImport(event: ChangeEvent<HTMLInputElement>) {
		const files = event.target.files;
		if (!files) return;
		for (let i = 0; i < files.length; i++) {
			parsers.file(files[i], (id, dataset) => dispatch({ type: "UPDATE", payload: { id, dataset } }));
		}
	}

	return (
		<div className={styles.wrapper({ center: layout === "home" })}>
			<div className={styles.row}>
				{layout !== "home" && (
					<Icon as={"a"} className={styles.icon()} href={`/`}>
						<i title="Home" className="fa-solid fa-home"></i>
					</Icon>
				)}
				{layout === "home" && (
					<div className={styles.list}>
						{keys.map((key) => {
							const dataset = state[key];
							return (
								<Badge key={key} color={dataset?.color ?? undefined} href={`${key}`}>
									{dataset?.name ?? key}
								</Badge>
							);
						})}
					</div>
				)}
				{["data"].includes(layout) && keys.length > 0 && (
					<select className={styles.select} value={current} onChange={handleChangeKey}>
						{!state[param] && <option value={undefined} />}
						{keys.map((key) => {
							const dataset = state[key];
							return (
								<option key={key} value={key}>
									{dataset?.name ?? key}
								</option>
							);
						})}
					</select>
				)}
				{["data", "level"].includes(layout) && (
					<Fragment>
						<Icon as={"a"} className={styles.icon()} href={`/${current}`}>
							<i title="Overview" className="fa-solid fa-circle-info"></i>
						</Icon>
						<Icon as={"a"} className={styles.icon()} href={`/${current}/data`}>
							<i title="Data" className="fa-solid fa-table"></i>
						</Icon>
					</Fragment>
				)}
			</div>
			<div className={styles.row}>
				{layout !== "level" && (
					<Fragment>
						<IconInput className={styles.icon({ type: "primary" })} type="file" id="file" accept="application/json" onChange={handleImport} multiple>
							<i title="Import Datasets" className="fa-solid fa-upload"></i>
						</IconInput>
					</Fragment>
				)}
			</div>
		</div>
	);
}

const styles = {
	wrapper: cva({
		base: scrollable.raw({
			direction: "horizontal",
			hideScrollbar: true,
			padding: 0.5,
		}),
		variants: {
			center: {
				true: wrap.raw({ justifyContent: "center" }),
				false: hstack.raw({ gap: 2, justifyContent: "space-between" }),
			},
		},
	}),
	list: wrap({}),
	row: hstack({ gap: 2 }),
	select: css({
		fontSize: "md",
		fontWeight: "bold",
		backgroundColor: "link",
		border: 0,
		color: "white",
		paddingY: 1,
		paddingX: 4,
		cursor: "pointer",
		transition: "background-color 0.25s",
		"&:not([disabled]):hover": {
			backgroundColor: "indigo.400",
		},
	}),
	icon: cva({
		base: {
			width: 8,
			height: 8,
			fontSize: "2xl",
		},
		variants: {
			type: {
				primary: { color: "primary" },
				error: { color: "error" },
			},
		},
	}),
};
