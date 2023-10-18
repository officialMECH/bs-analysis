import { Badge, Dialog, Icon, UnstyledInput } from "$/components";
import { metadata } from "$/constants";
import { parsers } from "$/helpers";
import { useDatasets } from "$/hooks";
import { Path, useNavigate } from "$/router";
import { css, cva, cx } from "$/styles/css";
import { hstack, scrollable, wrap } from "$/styles/patterns";
import { ChangeEvent, Fragment, useState } from "react";
import ManualDatasetForm from "./form/dataset";

interface Props {
	layout?: "home" | "basic" | "data" | "level";
}

export default function Nav({ layout = "basic" }: Props) {
	const pathname = location.pathname.replace(import.meta.env.BASE_URL, "");
	const param = pathname.split("/")[0];
	const navigate = useNavigate();
	const [current, setCurrent] = useState<string>(param);

	const { state, dispatch } = useDatasets();
	const keys = Object.keys(state);

	function handleChangeKey(e: ChangeEvent<HTMLSelectElement>) {
		setCurrent(e.target.value);
		return navigate(`/${pathname.replace(param, e.target.value)}` as Path);
	}
	function handleImport(event: ChangeEvent<HTMLInputElement>) {
		const files = event.target.files;
		if (!files) return;
		for (let i = 0; i < files.length; i++) {
			parsers.dataset.file(files[i], (id, dataset) => dispatch({ type: "UPDATE", payload: { id, dataset, overwrite: true } }));
		}
	}

	return (
		<div className={styles.wrapper({ center: layout === "home" })}>
			<div className={styles.row}>
				{layout !== "home" && (
					<Icon asChild className={cx("fa-solid fa-home", styles.icon)}>
						<a href={import.meta.env.BASE_URL} />
					</Icon>
				)}
				<Icon asChild title="Repository" className={cx("fa-brands fa-github", styles.icon)}>
					<a href={metadata.repository} target="_blank" />
				</Icon>
				{layout === "home" && (
					<div className={styles.list}>
						{keys.map((key) => {
							const dataset = state[key];
							return (
								<Badge key={key} color={dataset?.color ?? undefined} href={import.meta.env.BASE_URL.concat(key)}>
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
						<Icon asChild title="Overview" className={cx("fa-solid fa-circle-info", styles.icon)}>
							<a href={import.meta.env.BASE_URL.concat(current)} />
						</Icon>
						<Icon asChild title="Data" className={cx("fa-solid fa-table", styles.icon)}>
							<a href={import.meta.env.BASE_URL.concat(`${current}/data`)} />
						</Icon>
					</Fragment>
				)}
			</div>
			<div className={styles.row}>
				{layout !== "level" && (
					<Fragment>
						<Dialog render={({ close }) => <ManualDatasetForm onSubmit={() => close()} />}>
							<Icon variant="primary" title="Create Dataset" className={cx("fa-solid fa-add", styles.icon)} />
						</Dialog>
						<UnstyledInput type="file" id="file" accept="application/json,text/plain" onChange={handleImport} multiple>
							<Icon variant="primary" title="Import Datasets" className={cx("fa-solid fa-upload", styles.icon)} />
						</UnstyledInput>
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
	row: hstack({ gap: 3 }),
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
	icon: css({ fontSize: "2xl" }),
};
