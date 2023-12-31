import { FloatableOptions } from "$/hooks";
import { css } from "$/styles/css";
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useMergeRefs } from "@floating-ui/react";
import { HTMLProps, PropsWithChildren, ReactNode, forwardRef, useContext, useState } from "react";
import { FloatingContext, FloatingProvider } from "../context/floating";
import Trigger from "./trigger";

interface DialogProps {
	close: () => void;
}

interface Props extends Omit<FloatableOptions, "open" | "onOpenChange" | "interactions"> {
	render: (props: DialogProps) => ReactNode;
}

const Content = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(({ ...props }, propRef) => {
	const context = useContext(FloatingContext);
	if (!context) throw Error("All floating elements must be wrapped in <FloatingProvider />");
	const ref = useMergeRefs([context.refs.setFloating, propRef]);
	if (!context.open) return null;
	return (
		<FloatingPortal>
			<FloatingOverlay className={styles.wrapper} lockScroll>
				<FloatingFocusManager context={context.context}>
					<div ref={ref} className={styles.content} {...context.getFloatingProps(props)}>
						{props.children}
					</div>
				</FloatingFocusManager>
			</FloatingOverlay>
		</FloatingPortal>
	);
});

export default function Dialog({ options, render, children }: PropsWithChildren<Props>) {
	const [open, setOpen] = useState(false);
	const interactions: FloatableOptions["interactions"] = {
		click: { enabled: true },
		hover: { enabled: false },
		focus: { enabled: false },
		dismiss: { enabled: true },
		role: { role: "dialog" },
	};
	const defaultOptions: FloatableOptions["options"] = {};
	return (
		<FloatingProvider interactions={interactions} options={{ ...options, ...defaultOptions }} open={open} onOpenChange={setOpen}>
			<Trigger>{children}</Trigger>
			<Content>{render({ close: () => setOpen(false) })}</Content>
		</FloatingProvider>
	);
}

const styles = {
	wrapper: css({
		position: "fixed",
		zIndex: 1,
		padding: 8,
		left: 0,
		top: 0,
		width: "full",
		height: "full",
		overflow: "auto",
		backgroundColor: "rgba(0, 0, 0, 0.75)",
	}),
	content: css({
		backgroundColor: "background",
		marginX: "auto",
		padding: 6,
		maxWidth: "4xl",
	}),
};
