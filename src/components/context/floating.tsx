import { FloatableOptions, useFloatable } from "$/hooks";
import { PropsWithChildren, createContext } from "react";

const FloatingContext = createContext<ReturnType<typeof useFloatable> | null>(null);

function FloatingProvider({ children, ...restOptions }: PropsWithChildren<FloatableOptions>) {
	// This can accept any props as options, e.g. `placement`,
	// or other positioning options.
	const popover = useFloatable({ ...restOptions });
	return <FloatingContext.Provider value={popover}>{children}</FloatingContext.Provider>;
}

export { FloatingContext, FloatingProvider };
