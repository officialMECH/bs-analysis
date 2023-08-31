import { css } from "$/styles/css";
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useClick, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";
import { Fragment, PropsWithChildren, useState } from "react";

export interface DialogContentProps {
	close: () => void;
}

interface Props {
	open?: boolean;
	render: (props: DialogContentProps) => React.ReactNode;
}

export default function Dialog({ render, open: passedOpen = false, children }: PropsWithChildren<Props>) {
	const [isOpen, setIsOpen] = useState(passedOpen);

	const { refs, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
	});

	const click = useClick(context);
	const role = useRole(context);
	const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

	const { getReferenceProps, getFloatingProps } = useInteractions([click, role, dismiss]);

	return (
		<Fragment>
			<div ref={refs.setReference} {...getReferenceProps()}>
				{children}
			</div>
			<FloatingPortal>
				{isOpen && (
					<FloatingOverlay className={styles.wrapper} lockScroll>
						<FloatingFocusManager context={context}>
							<div className={styles.content} {...getFloatingProps()}>
								{render({ close: () => setIsOpen(false) })}
							</div>
						</FloatingFocusManager>
					</FloatingOverlay>
				)}
			</FloatingPortal>
		</Fragment>
	);
}

const styles = {
	wrapper: css({
		position: "fixed",
		zIndex: 1,
		paddingTop: 10,
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
		maxWidth: "2xl",
	}),
};
