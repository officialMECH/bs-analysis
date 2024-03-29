import { Icon } from "$/components/ui/atoms";
import { css, cx } from "$/styles/css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ComponentProps } from "react";

function Component({ className }: ComponentProps<"i">) {
	return <Icon icon={faSpinner} className={cx(cn.root, className)} />;
}

const cn = {
	root: css({
		animation: "spin 1s linear infinite",
	}),
};

export { Component };
