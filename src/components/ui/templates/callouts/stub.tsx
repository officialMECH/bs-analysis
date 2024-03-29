import { Callout } from "$/components/ui/molecules";
import { metadata } from "$/constants";
import { ComponentPropsWithoutRef } from "react";

export default {
	variant: "info",
	children: (
		<p>
			This is a stub section.
			<br />
			If you have suggestions for content you'd like to see included here, join the{" "}
			<a href={metadata.repository.concat("/discussions")} target="_blank">
				discussions
			</a>{" "}
			and leave your thoughts!
		</p>
	),
} as ComponentPropsWithoutRef<typeof Callout>;
