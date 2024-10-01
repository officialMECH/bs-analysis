import { Icon } from "$/components/ui/atoms";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ComponentProps, Fragment, PropsWithChildren, ReactNode, useMemo } from "react";
import { hstack } from "styled-system/patterns";

interface Item {
	icon: IconProp;
	condition?: () => boolean;
	render: (icon: typeof Icon, props: ComponentProps<typeof Icon>) => ReactNode;
}
interface Props {
	items: Record<string, Item>;
	spacing?: number;
}

function Component({ items, spacing = 2 }: PropsWithChildren<Props>) {
	const entries = useMemo(() => Object.entries(items), [items]);
	return (
		<div className={cn.row} style={{ gap: `${spacing / 4}em` }}>
			{entries.map(([key, { icon, render, condition }]) => {
				if (condition && !condition()) return;
				return <Fragment key={key}>{render(Icon, { icon: icon })}</Fragment>;
			})}
		</div>
	);
}

const cn = {
	row: hstack({ padding: 0 }),
};

export { Component, type Item };
