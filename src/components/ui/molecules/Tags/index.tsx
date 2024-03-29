import { Icon } from "$/components/ui/atoms";
import { Tags as Builder } from "$/components/ui/builders";
import { center, flex, wrap } from "$/styles/patterns";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ComponentPropsWithoutRef } from "react";

function Component({ id, value = [], onValueChange, ...rest }: ComponentPropsWithoutRef<typeof Builder.Root>) {
	return (
		<Builder.Root className={cn.root} style={{ width: "100%" }} value={value} onValueChange={onValueChange} {...rest}>
			<Builder.List className={cn.list}>
				{value.map((tag) => (
					<Builder.Item key={tag} value={tag} className={cn.tag}>
						<Builder.ItemText>{tag}</Builder.ItemText>
						<Builder.ItemClose asChild value={tag}>
							<Icon icon={faXmark} />
						</Builder.ItemClose>
					</Builder.Item>
				))}
			</Builder.List>
			<Builder.Control id={id} type="text" className={cn.input} />
		</Builder.Root>
	);
}

const cn = {
	root: wrap({ gap: 1 }),
	list: wrap({ flexDir: "row", gap: 1 }),
	tag: center({ display: "inline-flex", backgroundColor: "neutral", paddingX: 2, gap: 2 }),
	input: flex({ width: "full", grow: 1, basis: 16, hideWebkit: true }),
};

export { Component };
