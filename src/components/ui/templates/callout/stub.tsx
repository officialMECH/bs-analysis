import { Callout } from "$/components/ui/molecules";
import { metadata } from "$/constants";

function Component() {
	return (
		<Callout title="INFO">
			This is a stub section.
			<br />
			If you have suggestions for content you'd like to see included here, join the{" "}
			<a href={metadata.repository.concat("/discussions")} target="_blank">
				discussions
			</a>{" "}
			and leave your thoughts!
		</Callout>
	);
}

export { Component };
