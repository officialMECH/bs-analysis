import { FloatableOptions } from "$/hooks";
import { css } from "$/styles/css";
import { FloatingFocusManager, FloatingPortal, autoUpdate, flip, offset, shift, useMergeRefs } from "@floating-ui/react";
import { HTMLProps, PropsWithChildren, ReactNode, forwardRef, useContext } from "react";
import { FloatingContext, FloatingProvider } from "../context/floating";
import Trigger from "./trigger";

interface Props extends Omit<FloatableOptions, "interactions"> {
	render: () => ReactNode;
}

const Content = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(({ style, ...props }, propRef) => {
	const context = useContext(FloatingContext);
	if (!context) throw Error("All floating elements must be wrapped in <FloatingProvider />");
	const ref = useMergeRefs([context.refs.setFloating, propRef]);
	if (!context.open) return null;
	return (
		<FloatingPortal>
			<FloatingFocusManager context={context.context}>
				<div ref={ref} className={styles.content} style={{ ...context.floatingStyles, ...style }} {...context.getFloatingProps(props)}>
					{props.children}
				</div>
			</FloatingFocusManager>
		</FloatingPortal>
	);
});

export default function Popover({ options = { placement: "top" }, render, children }: PropsWithChildren<Props>) {
	const interactions: FloatableOptions["interactions"] = {
		click: { enabled: true },
		hover: { enabled: false },
		focus: { enabled: false },
		dismiss: { enabled: true },
		role: {},
	};
	const defaultOptions: FloatableOptions["options"] = {
		whileElementsMounted: autoUpdate,
		middleware: [offset(5), flip({ crossAxis: options.placement?.includes("-"), fallbackAxisSideDirection: "end", padding: 5 }), shift({ padding: 5 })],
	};
	return (
		<FloatingProvider interactions={interactions} options={{ ...options, ...defaultOptions }}>
			<Trigger>{children}</Trigger>
			<Content>{render()}</Content>
		</FloatingProvider>
	);
}

const styles = {
	content: css({
		zIndex: 1,
		width: "max-content",
		backgroundColor: "container",
		color: "white",
		fontSize: "sm",
		paddingY: 2,
		paddingX: 4,
	}),
};
