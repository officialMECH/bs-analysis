export default {
	array: (values: string | (string | number)[]) => {
		if (typeof values === "string") values = values.trim().split(",");
		return values.map((name, i) => {
			if (i === values.length - 1) return name.toString();
			return `${name.toString()}, `;
		}, null);
	},
};
