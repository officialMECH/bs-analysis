import { colors } from "$/constants";
import { parsers, units } from "$/helpers";
import { useDatasets } from "$/hooks";
import { Path, useNavigate } from "$/router";
import { join } from "$/utils";
import { ChangeEvent, Fragment, useRef, useState } from "react";
import { Icon, Spacer } from "../containers";

interface Props {
	controls?: boolean;
}

export default function Nav({ controls }: Props) {
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
			parsers.file(files[i], (id, dataset) => dispatch({ type: "UPDATE", payload: { id, dataset } }));
		}
	}

	return (
		<Spacer as={"nav"} direction="row" className={join("hide-webkit", "horizontal-scroll")} style={{ padding: units.rem(0.125), justifyContent: "space-between" }}>
			<Spacer as={"div"} size={0.5} direction="row">
				<Icon as={"a"} href={`/`} style={{ fontSize: units.rem(1.5) }}>
					<i title="Home" className="fa-solid fa-home"></i>
				</Icon>
				{controls && keys.length > 0 && (
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
				)}
				<Icon as={"a"} href={`/${current}`} style={{ fontSize: units.rem(1.5) }}>
					<i title="Overview" className="fa-solid fa-circle-info"></i>
				</Icon>
				<Icon as={"a"} href={`/${current}/data`} style={{ fontSize: units.rem(1.5) }}>
					<i title="Dataset" className="fa-solid fa-table"></i>
				</Icon>
			</Spacer>
			<Spacer as={"div"} direction="row">
				{controls && (
					<Fragment>
						<Icon as={"button"} onClick={() => input.current?.click()} style={{ fontSize: units.rem(1.5), color: colors.accent }}>
							<i title="Import Datasets" className="fa-solid fa-upload"></i>
						</Icon>
						<input ref={input} type="file" id="file" style={{ display: "none" }} onChange={handleImport} multiple />
					</Fragment>
				)}
			</Spacer>
		</Spacer>
	);
}
