import shared from "./shared";
import stats from "./stats";

export * from "./components";
export * from "./shared";
export * from "./stats";

export const schemas = { ...shared, ...stats };
