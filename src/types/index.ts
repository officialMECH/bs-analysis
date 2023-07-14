export * from "./shared";
export * from "./stats";

export type PayloadAction<T, K = string> = { type: K; payload: T };
