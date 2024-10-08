import { Fragment } from "react";
import { hstack, vstack } from "styled-system/patterns";

interface Props {
	name: string;
	display?: string;
	role: string;
}

function Component({ name, display, role }: Props) {
	return (
		<a href={`https://github.com/${name}`} target="_blank" className={cn.profile}>
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

const cn = {
	profile: vstack({
		width: 32,
		textAlign: "center",
		"& small": {
			color: "text",
		},
	}),
	icons: hstack({}),
};

export { Component };
