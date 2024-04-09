import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
	const [active, setActive] = useState(false);
	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		setActive(mediaQuery.matches);
		mediaQuery.addEventListener("change", (evt) => setActive(evt.matches));
	}, [query]);
	return active;
}

export const useDark = () => useMediaQuery("(prefers-color-scheme: dark)");
