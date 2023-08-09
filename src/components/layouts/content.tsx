import { units } from "$/helpers";
import { join } from "$/utils";
import { Fragment, PropsWithChildren, ReactNode } from "react";
import { Nav } from "..";
import { Spacer } from "../containers";

interface Props {
	title: { left: ReactNode; right?: ReactNode };
	nav?: boolean;
}

export default function Content({ title, nav = true, children }: PropsWithChildren<Props>) {
	return (
		<main>
			<Spacer size={4} as={"h1"} style={{ padding: join(units.rem(0.125)), justifyContent: "space-between" }} className={join("hide-webkit", "horizontal-scroll")}>
				<Spacer direction="row">{title.left}</Spacer>
				{title.right && <Spacer direction="row">{title.right}</Spacer>}
			</Spacer>
			<hr />
			{nav && (
				<Fragment>
					<Nav />
					<hr />
				</Fragment>
			)}
			{children}
		</main>
	);
}
