import { Heading, Icon } from "$/components/ui/atoms";
import { IconLookup, IconProp } from "@fortawesome/fontawesome-svg-core";
import { PropsWithChildren } from "react";
import { hstack, vstack } from "styled-system/patterns";

interface Props {
	title: string;
	icons: IconProp[];
}

function Component({ title, icons, children }: PropsWithChildren<Props>) {
	return (
		<div className={cn.root}>
			<Heading size={3}>{title}</Heading>
			<p>{children}</p>
			<div className={cn.icons}>
				{icons.map((name) => {
					const key = (name as IconLookup).iconName;
					return <Icon key={key} icon={name} style={{ fontSize: 24 }} />;
				})}
			</div>
		</div>
	);
}

const cn = {
	root: vstack({
		width: "full",
		textAlign: "center",
	}),
	icons: hstack({
		gap: 4,
	}),
};

export { Component };
