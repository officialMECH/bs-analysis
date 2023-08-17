import { Badge, Spacer, Templates } from "$/components";
import { units } from "$/helpers";
import { useDatasets } from "$/hooks";
import { join } from "$/utils";

export default function App() {
	const { state } = useDatasets();
	return (
		<Templates.Content center nav={false} title={<span style={{ fontSize: units.rem(3) }}>Beat Saber Map Analysis</span>}>
			<Spacer as={"nav"} center direction="row" className={join("hide-webkit")} style={{ padding: units.rem(0.125), flexWrap: "wrap" }}>
				<Spacer as={"div"} direction="row">
					{Object.keys(state).map((key) => {
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
			<Spacer as={"div"} center>
				<button>Import Dataset</button>
			</Spacer>
		</Templates.Content>
	);
}
