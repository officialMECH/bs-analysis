import { Badge, Icon, Input, Select } from "$/components/ui/atoms";
import { Dialog } from "$/components/ui/molecules";
import { ManualDatasetForm } from "$/components/ui/templates";
import { metadata } from "$/constants";
import { parsers } from "$/helpers";
import { useDatasets } from "$/hooks";
import { Link, Path, useNavigate } from "$/router";
import { css, cva, cx } from "$/styles/css";
import { hstack, scrollable, wrap } from "$/styles/patterns";
import { IDataset } from "$/types";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faAdd, faCircleInfo, faHome, faTable, faUpload } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, Fragment, useState } from "react";

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
			parsers.text.file<IDataset>(files[i], (id, dataset) => dispatch({ type: "UPDATE", payload: { id, dataset, overwrite: true } }));
		}
	}

	return (
		<div className={cn.wrapper({ center: layout === "home" })}>
			<div className={cn.row}>
				{layout !== "home" && (
					<Link to={"/"}>
						<Icon icon={faHome} variant="link" className={cx(cn.icon)} />
					</Link>
				)}
				<a href={metadata.repository} target="_blank">
					<Icon icon={faGithub} variant="link" title="Repository" className={cx(cn.icon)} />
				</a>
				{layout === "home" && (
					<div className={cn.list}>
						{keys.map((key) => {
							const dataset = state[key];
							return (
								<Badge href={import.meta.env.BASE_URL.concat(key)} key={key} color={dataset?.color ?? undefined}>
									{dataset?.name ?? key}
								</Badge>
							);
						})}
					</div>
				)}
				{["data"].includes(layout) && keys.length > 0 && (
					<Select className={cn.select} value={current} onChange={handleChangeKey}>
						{!state[param] && <option value={undefined} />}
						{keys.map((key) => {
							const dataset = state[key];
							return (
								<option key={key} value={key}>
									{dataset?.name ?? key}
								</option>
							);
						})}
					</Select>
				)}
				{["data", "level"].includes(layout) && (
					<Fragment>
						<Link to={"/:key"} params={{ key: current }}>
							<Icon icon={faCircleInfo} variant="link" title="Overview" className={cx(cn.icon)} />
						</Link>
						<Link to={"/:key/data"} params={{ key: current }}>
							<Icon icon={faTable} variant="link" title="Data" className={cx(cn.icon)} />
						</Link>
					</Fragment>
				)}
			</div>
			<div className={cn.row}>
				{layout !== "level" && (
					<Fragment>
						<Dialog render={({ close }) => <ManualDatasetForm onSubmit={() => close()} />}>
							<Icon icon={faAdd} variant="primary" title="Create Dataset" className={cx(cn.icon)} />
						</Dialog>
						<Input asChild type="file" id="file" accept="application/json,text/plain" onChange={handleImport} multiple>
							<Icon icon={faUpload} variant="primary" title="Import Datasets" className={cx(cn.icon)} />
						</Input>
					</Fragment>
				)}
			</div>
		</div>
	);
}

const cn = {
	wrapper: cva({
		base: scrollable.raw({
			direction: "horizontal",
			hideScrollbar: true,
			padding: 0.5,
		}),
		variants: {
			center: {
				true: wrap.raw({
					justifyContent: "center",
				}),
				false: hstack.raw({
					gap: 6,
					justifyContent: "space-between",
				}),
			},
		},
	}),
	list: wrap({}),
	row: hstack({
		gap: 3,
	}),
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
	icon: css({
		fontSize: "2xl",
	}),
};
