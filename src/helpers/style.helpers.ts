export const units = {
	ratio: (x = 1) => `${x * 100}%`,
	rem: (x = 1) => `${x}rem`,
};

export const params = (...units: string[]) => units.join(" ");
export const list = (...units: string[]) => units.join(",");
