import type { Scope } from "@radix-ui/react-context";
import { ReactNode } from "react";

export type ScopedProps<P> = P & { __scope?: Scope };

export interface RenderProps<P = {}> {
	render: (props: { close: (props?: P) => void }) => ReactNode;
}

export interface IField {
	label: string;
	icon?: ReactNode;
}
