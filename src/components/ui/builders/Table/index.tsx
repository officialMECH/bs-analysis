import { createPrimitive } from "$/components/primitives";
import { css, cx } from "styled-system/css";
import { scrollable } from "styled-system/patterns";

const Root = createPrimitive("table", (Element, { asChild, ...rest }) => {
	return (
		<div className={cx(cn.wrapper)}>
			<Element className={cx(cn.root)} {...rest} />
		</div>
	);
});

const Header = createPrimitive("thead", (Element, { asChild, ...rest }) => {
	return <Element className={cx(cn.header)} {...rest} />;
});

const Body = createPrimitive("tbody");

const Footer = createPrimitive("tfoot");

const Row = createPrimitive("tr");

const Head = createPrimitive("th");

const Cell = createPrimitive("td");

const cn = {
	wrapper: scrollable({
		width: "full",
	}),
	root: css({
		margin: "auto",
		borderCollapse: "separate",
		borderSpacing: 0.5,
	}),
	header: css({
		fontWeight: "bold",
	}),
};

export { Body, Cell, Footer, Head, Header, Root, Row };
