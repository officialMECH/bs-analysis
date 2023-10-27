import { UseClickProps, UseDismissProps, UseFloatingOptions, UseFocusProps, UseHoverProps, UseRoleProps, useClick, useDismiss, useFloating, useFocus, useHover, useInteractions, useRole } from "@floating-ui/react";
import { useMemo, useState } from "react";

export interface FloatableOptions {
	initialOpen?: boolean;
	options?: UseFloatingOptions;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	interactions: Partial<{
		click: UseClickProps;
		hover: UseHoverProps;
		focus: UseFocusProps;
		dismiss: UseDismissProps;
		role: UseRoleProps;
	}>;
}

export function useFloatable({ initialOpen = false, interactions, options = { placement: "top" }, open: controlledOpen, onOpenChange: setControlledOpen }: FloatableOptions) {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

	const open = controlledOpen ?? uncontrolledOpen;
	const onOpenChange = setControlledOpen ?? setUncontrolledOpen;

	const { context, ...data } = useFloating({ open, onOpenChange, ...options });

	const click = useClick(context, { ...interactions.click, enabled: interactions.click?.enabled });
	const hover = useHover(context, { ...interactions.hover, enabled: interactions.hover?.enabled });
	const focus = useFocus(context, { ...interactions.focus, enabled: interactions.focus?.enabled });
	const dismiss = useDismiss(context, { ...interactions.dismiss, enabled: interactions.dismiss?.enabled });
	const role = useRole(context, { ...interactions.role, enabled: interactions.role?.enabled });

	const getters = useInteractions([
		interactions.click ? click : {}, //
		interactions.hover ? hover : {},
		interactions.focus ? focus : {},
		interactions.dismiss ? dismiss : {},
		interactions.role ? role : {},
	]);

	return useMemo(() => ({ open, onOpenChange, ...getters, context, ...data }), [open, onOpenChange, getters, context, data]);
}
