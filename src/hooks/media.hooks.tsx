import { units } from "$/helpers";
import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(window.matchMedia(`(${query})`).matches);

	useEffect(() => {
		window.matchMedia(`(${query})`).addEventListener("change", (e) => setMatches(e.matches));
	}, [query]);

	return matches;
}

export const useDark = () => useMediaQuery("prefers-color-scheme: dark");
export const useMobile = () => useMediaQuery(`max-width: ${units.px(480)}`);
