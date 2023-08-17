import { colors } from "$/constants";
import { units } from "$/helpers";
import { useDatasets } from "$/hooks";
import { Path, useNavigate } from "$/router";
import { schemas } from "$/types";
import { join } from "$/utils";
import { ChangeEvent, Fragment, useRef, useState } from "react";
import { Icon, Spacer } from "../containers";

export default function Nav() {
	const param = location.pathname.split("/")[1];
	const [current, setCurrent] = useState<string>(param);
	const navigate = useNavigate();

	const { state, dispatch } = useDatasets();
	const keys = Object.keys(state);

	const input = useRef<HTMLInputElement | null>(null);

	function handleChangeKey(e: ChangeEvent<HTMLSelectElement>) {
		setCurrent(e.target.value);
		return navigate(location.pathname.replace(param, e.target.value) as Path);
	}
	function handleImport(event: ChangeEvent<HTMLInputElement>) {
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
		<Spacer as={"nav"} direction="row" className={join("hide-webkit", "horizontal-scroll")} style={{ justifyContent: "space-between" }}>
			<Spacer as={"div"} direction="row">
				<Icon as={"a"} href={`/`} style={{ padding: units.rem(0.25), fontSize: units.rem(1.25) }}>
					<i title="Home" className="fa-solid fa-home"></i>
				</Icon>
				<select className="nav" value={current} onChange={handleChangeKey}>
					{!state[param] && <option value={undefined} />}
					{keys.map((key) => {
						const dataset = state[key];
						return (
							<option key={key} value={key} style={{ backgroundColor: dataset?.color ?? undefined }}>
								{dataset?.name ?? key}
							</option>
						);
					})}
				</select>
				{state[param] && (
					<Fragment>
						<Icon as={"a"} href={`/${current}`} style={{ padding: units.rem(0.25), fontSize: units.rem(1.25) }}>
							<i title="Overview" className="fa-solid fa-circle-info"></i>
						</Icon>
						<Icon as={"a"} href={`/${current}/data`} style={{ padding: units.rem(0.25), fontSize: units.rem(1.25) }}>
							<i title="Dataset" className="fa-solid fa-table"></i>
						</Icon>
					</Fragment>
				)}
			</Spacer>
			<Spacer as={"div"} direction="row">
				<Icon as={"button"} onClick={() => input.current?.click()} style={{ padding: units.rem(0.25), fontSize: units.rem(1.5), color: colors.accent }}>
					<i title="Import Datasets" className="fa-solid fa-upload"></i>
				</Icon>
				<input ref={input} type="file" id="file" style={{ display: "none" }} onChange={handleImport} multiple />
			</Spacer>
		</Spacer>
	);
}
