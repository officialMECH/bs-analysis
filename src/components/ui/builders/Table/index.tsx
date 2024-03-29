import { createPrimitive } from "$/components/primitives";
import { css, cx } from "$/styles/css";
import { scrollable } from "$/styles/patterns";

const Root = createPrimitive("table", (Element, { asChild, ...rest }) => {
	return (
		<div className={cx(cn.wrapper)}>
			<Element className={cx(cn.container)} {...rest} />
		</div>
	);
});

const Header = createPrimitive("thead");

const Body = createPrimitive("tbody");

const Footer = createPrimitive("tfoot");

const Row = createPrimitive("tr");

const Head = createPrimitive("th");

const Cell = createPrimitive("td");

const cn = {
	wrapper: scrollable({ width: "full" }),
	container: css({ margin: "auto" }),
};

export { Body, Cell, Footer, Head, Header, Root, Row };
