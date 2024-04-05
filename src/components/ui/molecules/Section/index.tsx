import { Heading } from "$/components/ui/atoms";
import { cva } from "$/styles/css";
import { flex } from "$/styles/patterns";
import { RecipeVariantProps } from "$/styles/types";
import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"section"> {
	heading?: string;
	gap?: number;
}

const Component = ({ heading, center, direction = "column", gap = 1, children, ...rest }: Props & RecipeVariantProps<typeof cn.content>) => {
	return (
		<section className={cn.root({ center })} {...rest}>
			{heading && <Heading size={2}>{heading}</Heading>}
			<div className={cn.content({ direction, center })} style={{ gap: gap * 16 }}>
				{children}
			</div>
		</section>
	);
};

const cn = {
	root: cva({
		base: {
			width: "full",
			textAlign: "start",
		},
		variants: {
			center: {
				true: { textAlign: "center" },
			},
		},
	}),
	content: cva({
		base: flex.raw({
			flexDirection: { base: "column", sm: "row" },
			width: "full",
		}),
		variants: {
			center: {
				true: { justifyContent: "center" },
				false: { justifyContent: "start" },
			},
			direction: {
				column: { flexDirection: "column" },
				row: { flexDirection: "row" },
			},
		},
	}),
};

export { Component };
