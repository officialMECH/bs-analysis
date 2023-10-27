import { cx } from "$/styles/css";
import { useMergeRefs } from "@floating-ui/react";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, HTMLProps, useContext } from "react";
import { FloatingContext } from "../context/floating";

const Trigger = forwardRef<HTMLElement, HTMLProps<HTMLDivElement> & { asChild?: boolean }>(({ children, asChild, className, ...props }, propRef) => {
	const context = useContext(FloatingContext);
	if (!context) throw Error("All floating elements must be wrapped in <FloatingProvider />");
	const ref = useMergeRefs([context.refs.setReference, propRef]);
	const As = asChild ? Slot : "span";
	return (
		<As ref={ref} className={cx(className)} data-state={context.open ? "open" : "closed"} {...context.getReferenceProps(props)}>
			{children}
		</As>
	);
});

export default Trigger;
