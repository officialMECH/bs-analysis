import { ElementType } from "react";
import { default as beatmap } from "./beatmap";
import { default as data } from "./dataset";
import { default as artificial } from "./input";
import { default as shared } from "./shared";

export * from "./beatmap";
export * from "./dataset";
export * from "./shared";

export type AsChildProps<T extends ElementType> = React.ComponentPropsWithoutRef<T> & { asChild?: boolean };
export type Entry<T> = { name: string; contents: T };
export type PayloadAction<T, K = string> = { type: K; payload: T };

export const schemas = { artificial, ...beatmap, ...data, ...shared };
