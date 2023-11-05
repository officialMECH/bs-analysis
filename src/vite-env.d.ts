/// <reference types="vite/client" />

import { SortingFn } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
	interface SortingFns {
		characteristic: SortingFn<unknown>;
		difficulty: SortingFn<unknown>;
	}
	interface ColumnMeta {
		type?: string;
	}
}
