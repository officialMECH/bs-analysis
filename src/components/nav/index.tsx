import { units } from "$/helpers";
import { useDatasets } from "$/hooks";
import { join } from "$/utils";
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
	const { state } = useDatasets();
	const keys = Object.keys(state);

	if (keys.length === 0) return <strong>No Available Datasets</strong>;
	return (
		<Spacer as={"nav"} center={center} direction="row" className={join("hide-webkit", !center && "horizontal-scroll")} style={{ padding: units.rem(0.125), flexWrap: center ? "wrap" : undefined }}>
			{!center && (
				<Icon as={"a"} href={`/`} style={{ fontSize: units.rem(1.25) }}>
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
		</Spacer>
	);
}
