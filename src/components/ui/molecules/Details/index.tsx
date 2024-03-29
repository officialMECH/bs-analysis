import { Icon } from "$/components/ui/atoms";
import { Collapsible as Builder } from "$/components/ui/builders";
import { css, cx } from "$/styles/css";
import { interactable } from "$/styles/patterns";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

interface Props extends Builder.CollapsibleProps {
	render: () => ReactNode;
}

function Component({ children, render, className, ...rest }: Props) {
	return (
		<Builder.Root className={cx(cn.root, className)} {...rest}>
			<Builder.Trigger asChild className={cx(cn.trigger)}>
				<summary>
					{children}
					<Icon icon={faCaretDown} />
				</summary>
			</Builder.Trigger>
			<Builder.Content className={cx(cn.content)}>{render()}</Builder.Content>
		</Builder.Root>
	);
}

const cn = {
	root: css({ width: "full" }),
	trigger: css(interactable.raw(), {
		paddingY: 2,
		paddingX: 4,
		display: "flex",
		justifyContent: "space-between",
		gap: 8,
		alignItems: "center",
		fontWeight: "bold",
		fontSize: "xl",
		listStyle: "none",
	}),
	content: css({
		paddingBottom: 2,
	}),
};

export { Component };
