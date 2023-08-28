import { debounce } from "$/utils";
import { useEffect, useMemo, useRef } from "react";

export function useDebounce(callback: () => unknown, delay: number) {
	const ref = useRef<typeof callback>();

	useEffect(() => {
		ref.current = callback;
	}, [callback]);

	const debouncedCallback = useMemo(() => {
		const func = () => ref.current?.();
		return debounce(func, delay);
	}, [delay]);

	return debouncedCallback;
}
