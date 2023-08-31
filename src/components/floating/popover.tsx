import { css } from "$/styles/css";
import { FlipOptions, FloatingPortal, OffsetOptions, Placement, ShiftOptions, autoUpdate, flip, offset, shift, useClick, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";
import { Fragment, PropsWithChildren, ReactNode, useState } from "react";

interface Props {
	render: () => ReactNode;
	options?: Partial<{
		placement?: Placement;
		offset: OffsetOptions;
		flip: FlipOptions;
		shift: ShiftOptions;
	}>;
}

export default function Popover({ render, options = { placement: "top", offset: 4 }, children }: PropsWithChildren<Props>) {
	const [isOpen, setIsOpen] = useState(false);

	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		placement: options.placement,
		whileElementsMounted: autoUpdate,
		middleware: [offset(options.offset), flip(options.flip), shift(options.shift)],
	});

	const click = useClick(context);
	const dismiss = useDismiss(context);
	const role = useRole(context, { role: "tooltip" });

	// Merge all the interactions into prop getters
	const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

	return (
		<Fragment>
			<div ref={refs.setReference} {...getReferenceProps()} onClick={() => setIsOpen((v) => !v)}>
				{children}
			</div>
			<FloatingPortal>
				{isOpen && (
					<div className={styles.wrapper} ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
						{render()}
					</div>
				)}
			</FloatingPortal>
		</Fragment>
	);
}

const styles = {
	wrapper: css({
		zIndex: 1,
		width: "max-content",
		backgroundColor: "container",
		color: "white",
		fontSize: "sm",
		paddingY: 2,
		paddingX: 4,
	}),
};
