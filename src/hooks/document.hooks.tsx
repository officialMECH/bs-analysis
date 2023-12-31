import { metadata } from "$/constants";
import { useEffect } from "react";

export function useTitle(title?: string) {
	useEffect(() => {
		document.title = title ? `${title} | ${metadata.title}` : metadata.title;
	}, [title]);
}
