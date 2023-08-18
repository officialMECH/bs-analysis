import { Badge, Icon, Spacer, Templates } from "$/components";
import { colors } from "$/constants";
import { parsers, units } from "$/helpers";
import { useDatasets } from "$/hooks";
import { join } from "$/utils";
import { ChangeEvent, useRef } from "react";

export default function App() {
	const { state, dispatch } = useDatasets();
	const keys = Object.keys(state);

	const input = useRef<HTMLInputElement | null>(null);

	function handleImport(event: ChangeEvent<HTMLInputElement>) {
		const files = event.target.files;
		if (!files) return;
		for (let i = 0; i < files.length; i++) {
			parsers.file(files[i], (id, dataset) => dispatch({ type: "UPDATE", payload: { id, dataset } }));
		}
	}

	return (
		<Templates.Content center nav={false} title={<span style={{ fontSize: units.rem(3) }}>Beat Saber Map Analysis</span>}>
			<Spacer as={"nav"} center direction="row" className={join("hide-webkit")} style={{ padding: units.rem(0.125), flexWrap: "wrap" }}>
				{keys.length === 0 && <strong>No Available Datasets</strong>}
				<Spacer as={"div"} direction="row">
					{keys.map((key) => {
						const dataset = state[key];
						return (
							<Badge key={key} color={dataset?.color ?? undefined} href={`${key}`} style={{ color: "white" }}>
								{dataset?.name ?? key}
							</Badge>
						);
					})}
				</Spacer>
			</Spacer>
			<hr />
			<br />
			<Spacer as={"div"} center direction="column">
				<Icon as={"button"} onClick={() => input.current?.click()} style={{ fontSize: units.rem(2), color: colors.accent }}>
					<i title="Import Datasets" className="fa-solid fa-upload"></i>
				</Icon>
				<input ref={input} type="file" id="file" style={{ display: "none" }} onChange={handleImport} multiple />
			</Spacer>
		</Templates.Content>
	);
}
