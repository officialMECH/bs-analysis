export function pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
	const draft = { ...obj };
	keys.forEach((key) => {
		draft[key] = obj[key];
	});
	return draft;
}
export function omit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
	const draft = { ...obj };
	keys.forEach((key) => delete draft[key]);
	return draft;
}

export function common<T extends Record<string, unknown>>(a: T, b: T): T {
	const result = Object.keys(a).reduce((result: T, key: keyof typeof a) => {
		const value = a[key];
		const other = b[key];
		if (Array.isArray(value) && Array.isArray(other) && value.every((x, i) => other[i] === x)) return { ...result, [key]: value };
		if (typeof value === "object" && typeof other === "object" && !Array.isArray(value) && !Array.isArray(value)) {
			type N = Record<typeof key, T[typeof key]>;
			return { ...result, [key]: common<N>(value as N, other as N) };
		}
		if (value === other) return { ...result, [key]: value };
		return result;
	}, {} as T);
	return result;
}

export function difference<T extends Record<string, unknown>>(a: T, b: T): [T, T] {
	return Object.keys(b).reduce(
		(result, key: keyof typeof a) => {
			const value = a[key];
			const other = b[key];
			if (Array.isArray(value) && Array.isArray(other) && value.every((x, i) => other[i] === x)) return result;
			if (typeof value === "object" && typeof other === "object" && !Array.isArray(value) && !Array.isArray(value)) {
				type N = Record<typeof key, T[typeof key]>;
				return [
					{ ...result[0], [key]: difference<N>(value as N, other as N)[0] }, //
					{ ...result[1], [key]: difference<N>(value as N, other as N)[1] },
				];
			}
			if (value === other) return result;
			return [
				{ ...result[0], [key]: value },
				{ ...result[1], [key]: other },
			];
		},
		[{}, {}] as [T, T],
	);
}

export function prune<T extends Record<string, unknown>>(o: T): T {
	return Object.keys(o).reduce((result, key) => {
		const inner = o[key];
		if (!inner && inner !== 0) return result;
		if (typeof inner === "string" && inner === "") return result;
		if (typeof inner === "object" && !Array.isArray(inner)) {
			type N = Record<typeof key, T[typeof key]>;
			const nested = { ...result, [key]: prune<N>(inner as N) };
			if (Object.keys(nested[key]).length === 0) return result;
			if (Object.keys(inner).length === 0) return result;
			return { ...result, [key]: prune<N>(inner as N) };
		}
		if (Array.isArray(inner)) {
			if (Object.values(inner).length === 0) return result;
			return { ...result, [key]: o[key] };
		}
		return { ...result, [key]: o[key] };
	}, {} as T);
}
