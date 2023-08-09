export * from "./components";
export * from "./shared";
export * from "./stats";

import shared from "./shared";
import stats from "./stats";

export type PayloadAction<T, K = string> = { type: K; payload: T };

export const schemas = { ...shared, ...stats };
