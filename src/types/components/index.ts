import type { Scope } from "@radix-ui/react-context";
import { ReactNode } from "react";

export type AsChildProps = { asChild?: boolean };

export type ScopedProps<P> = P & { __scope?: Scope };

export interface RenderProps<P = {}> {
	render: (props: P) => ReactNode;
}

export interface IField {
	label: string;
	icon?: ReactNode;
}
