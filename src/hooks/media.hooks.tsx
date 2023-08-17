import { useEffect, useState } from "react";

export default function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(window.matchMedia(`(${query})`).matches);

	useEffect(() => {
		window.matchMedia(`(${query})`).addEventListener("change", (e) => setMatches(e.matches));
	}, [query]);

	return matches;
}
