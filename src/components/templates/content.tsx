import { units } from "$/helpers";
import { join } from "$/utils";
import { Fragment, PropsWithChildren, ReactNode } from "react";
import { Spacer } from "../containers";
import Nav from "./nav";

interface Props {
	title: ReactNode;
	center?: boolean;
	nav?: boolean;
	controls?: boolean;
}

export default function Content({ title, center, nav = true, controls, children }: PropsWithChildren<Props>) {
	return (
		<main>
			<Spacer as={"h1"} size={2} style={{ textAlign: center ? "center" : undefined, padding: join(units.rem(0.125)), justifyContent: center ? "center" : "space-between" }} className={join("hide-webkit", !center && "horizontal-scroll")}>
				{title}
			</Spacer>
			<hr />
			{nav && (
				<Fragment>
					<Nav controls={controls} />
					<hr />
				</Fragment>
			)}
			{children}
		</main>
	);
}
