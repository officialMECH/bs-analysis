import { colors } from "$/constants";
import { units } from "$/helpers";
import { useDatasets } from "$/hooks";
import { schemas } from "$/types";
import { join } from "$/utils";
import { ChangeEvent, Fragment, useRef } from "react";
import Badge from "../badge";
import { Spacer } from "../containers";
import Icon from "../icon";

interface Props {
	center?: boolean;
	filter?: (key: string) => boolean;
}

const param = location.pathname.split("/")[1];

function active(key: string) {
	return param === key;
}

export default function Nav({ center, filter = (key) => !active(key) }: Props) {
	const { state, dispatch } = useDatasets();
	const keys = Object.keys(state);
	const input = useRef<HTMLInputElement | null>(null);

	function handleImportClick() {
		const current = input.current;
		if (!current) return;
		current.click();
	}
	function handleImportChange(event: ChangeEvent<HTMLInputElement>) {
		const files = event.target.files;
		if (!files) return;
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const id = file.name.split(".")[0];
			const raw = file.text();
			void raw.then((contents) => {
				const result = schemas.dataset.safeParse(JSON.parse(contents));
				if (!result.success) {
					result.error.issues.forEach((issue) => console.error(`${issue.path.toString()} | ${issue.message}`));
				} else {
					dispatch({ type: "UPDATE", payload: { id, dataset: result.data } });
				}
			});
		}
	}

	return (
		<Spacer as={"nav"} size={0.5} center={center} direction="row" className={join("hide-webkit", !center && "horizontal-scroll")} style={{ padding: units.rem(0.125), flexWrap: center ? "wrap" : undefined }}>
			{!center && (
				<Icon as={"a"} href={`/`} style={{ padding: units.rem(0.25), fontSize: units.rem(1.25) }}>
					<i title="Home" className="fa-solid fa-home"></i>
				</Icon>
			)}
			{keys.filter(filter).map((key) => {
				const dataset = state[key];
				const href = location.pathname.replace(param, key);
				return (
					<Badge key={key} color={dataset?.color ?? undefined} href={`${href}`} style={{ color: "white", cursor: active(key) ? "default" : undefined }}>
						{dataset?.name ?? key}
					</Badge>
				);
			})}
			<Fragment>
				<Icon as={"button"} onClick={handleImportClick} style={{ padding: units.rem(0.25), fontSize: units.rem(1.5), color: colors.accent }}>
					<i title="Import Datasets" className="fa-solid fa-upload"></i>
				</Icon>
				<input type="file" id="file" ref={input} style={{ display: "none" }} onChange={handleImportChange} multiple />
			</Fragment>
		</Spacer>
	);
}
