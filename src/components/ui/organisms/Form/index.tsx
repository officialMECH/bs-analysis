import { Heading } from "$/components/ui/atoms";
import { FormHTMLAttributes, Fragment, PropsWithChildren } from "react";
import { cva } from "styled-system/css";
import { vstack } from "styled-system/patterns";

interface Props {
	title?: string;
}

function Component({ title, children, ...rest }: PropsWithChildren<Props> & FormHTMLAttributes<HTMLElement>) {
	return (
		<Fragment>
			<Heading size={2}>{title}</Heading>
			<hr />
			<form className={cn.contents} {...rest}>
				{children}
			</form>
		</Fragment>
	);
}

function Row({ children, size = "sm" }: PropsWithChildren<{ size?: "sm" | "md" | "lg" | "xl" }>) {
	return (
		<Fragment>
			<div className={cn.row({ size })}>{children}</div>
		</Fragment>
	);
}

const cn = {
	contents: vstack({
		alignItems: "start",
		gap: 4,
	}),
	row: cva({
		base: {
			display: "grid",
			width: "full",
			gridTemplateColumns: "repeat(auto-fit, minmax(48px, 1fr))",
			gridRowGap: 4,
			gridColumnGap: 2,
		},
		variants: {
			size: {
				sm: { gridTemplateColumns: "repeat(auto-fit, minmax(48px, 1fr))" },
				md: { gridTemplateColumns: "repeat(auto-fit, minmax(96px, 1fr))" },
				lg: { gridTemplateColumns: "repeat(auto-fit, minmax(144px, 1fr))" },
				xl: { gridTemplateColumns: "repeat(auto-fit, minmax(192px, 1fr))" },
			},
		},
	}),
};

export { Component as Root, Row };
