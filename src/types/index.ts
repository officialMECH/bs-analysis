import { ElementType } from "react";
import { default as stats } from "./dataset";
import { default as artificial } from "./input";
import { default as metadata } from "./metadata";
import { default as shared } from "./shared";

export * from "./dataset";
export * from "./metadata";
export * from "./shared";

export type AsChildProps<T extends ElementType> = React.ComponentPropsWithoutRef<T> & { asChild?: boolean };
export type Entry<T> = { name: string; contents: T };
export type PayloadAction<T, K = string> = { type: K; payload: T };

export const schemas = { artificial, ...shared, ...stats, metadata };
