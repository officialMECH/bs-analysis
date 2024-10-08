import { Icon } from "$/components/ui/atoms";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { PropsWithChildren } from "react";
import { css, cx } from "styled-system/css";

interface Props extends PropsWithChildren {
	loading?: boolean;
}

function Component({ children, loading }: Props) {
	if (children && !loading) return children;
	return <Icon icon={faSpinner} className={cx(cn.root)} />;
}

const cn = {
	root: css({
		animation: "spin 1s linear infinite",
	}),
};

export { Component };
