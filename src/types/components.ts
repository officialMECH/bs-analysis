import { ElementType } from "react";

export type AsChildProps<T extends ElementType> = React.ComponentPropsWithoutRef<T> & { asChild?: boolean };

export type PayloadAction<T, K = string> = { type: K; payload: T };
