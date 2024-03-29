import { Tabs as Builder } from "$/components/ui/builders";
import { css, cva } from "$/styles/css";
import { flex, interactable, vstack } from "$/styles/patterns";
import { Fragment, ReactNode } from "react";

interface Props extends Builder.TabsProps {
	items: Record<string, ReactNode>;
}

function Component({ items, ...rest }: Props) {
	const entries = Object.entries(items);
	return (
		<Builder.Root className={cn.root} {...rest}>
			<Builder.List className={cn.list.wrapper}>
				{entries.map(([id]) => (
					<Builder.Trigger key={id} value={id} className={cn.list.item({ active: rest.value === id })}>
						{id}
					</Builder.Trigger>
				))}
			</Builder.List>
			<div className={cn.outlet}>
				{entries.map(([id, child]) => {
					return (
						<Builder.Content key={id} value={id} className={cn.content}>
							<Fragment>{child}</Fragment>
						</Builder.Content>
					);
				})}
			</div>
		</Builder.Root>
	);
}

const cn = {
	root: vstack({
		width: "full",
		gap: 0,
	}),
	list: {
		wrapper: flex({
			gap: 2,
			width: "full",
		}),
		item: cva({
			base: interactable.raw({
				fontWeight: "bold",
				paddingY: 1,
				paddingX: 4,
				backgroundColor: "element",
				cursor: "pointer",
				'&[data-state="active"]': {
					backgroundColor: "neutral",
					color: "white",
				},
			}),
		}),
	},
	outlet: vstack({
		alignItems: "start",
		backgroundColor: "container",
		padding: 4,
		width: "full",
	}),
	content: css({ width: "full" }),
};

export { Component };
