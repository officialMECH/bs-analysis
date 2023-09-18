import { hstack, vstack } from "$/styles/patterns";
import { Fragment } from "react";

interface Props {
	name: string;
	display?: string;
	role: string;
}

export default function Profile({ name, display, role }: Props) {
	return (
		<a href={`https://github.com/${name}`} target="_blank" className={styles.profile}>
			<img src={`https://github.com/${name}.png`} width={64} />
			<strong>{display ?? name}</strong>
			<small>
				{role.split(",").map((x, i, a) => (
					<Fragment key={x}>
						{x}
						{a.length - 1 !== i ? <br /> : null}
					</Fragment>
				))}
			</small>
		</a>
	);
}

const styles = {
	profile: vstack({
		width: 32,
		textAlign: "center",
		"& small": {
			color: "text",
		},
	}),
	icons: hstack({}),
};
