import { Heading } from "$/components/ui/atoms";
import { cva } from "$/styles/css";
import { flex } from "$/styles/patterns";
import { RecipeVariantProps } from "$/styles/types";
import { HTMLAttributes, forwardRef } from "react";

interface Props {
	heading?: string;
	center?: boolean;
	gap?: number;
}

const Component = forwardRef<HTMLElement, HTMLAttributes<HTMLElement> & RecipeVariantProps<typeof cn.content> & Props>(({ heading, center, direction = "column", gap = 1, children }, ref) => {
	return (
		<section ref={ref} className={cn.root({ center })}>
			{heading && <Heading size={2}>{heading}</Heading>}
			<div className={cn.content({ direction, center })} style={{ gap: gap * 16 }}>
				{children}
			</div>
		</section>
	);
});

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
