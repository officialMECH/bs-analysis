import { ECharts, EChartsOption, SetOptionOpts, getInstanceByDom, init } from "echarts";
import { CSSProperties, useEffect, useRef } from "react";

interface Props {
	option: EChartsOption;
	style?: CSSProperties;
	settings?: SetOptionOpts;
	show?: boolean;
	loading?: boolean;
	theme?: string;
}

export default function Chart({ option, style, settings, show = true, loading, theme }: Props): JSX.Element | null {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let chart: ECharts | undefined;
		if (ref.current !== null) {
			chart = init(ref.current, theme);
		}

		function resizeChart() {
			chart?.resize();
		}
		window.addEventListener("resize", resizeChart);

		return () => {
			chart?.dispose();
			window.removeEventListener("resize", resizeChart);
		};
	}, [theme]);

	useEffect(() => {
		if (ref.current !== null) {
			const chart = getInstanceByDom(ref.current);
			chart!.setOption(option, settings);
		}
	}, [option, settings, theme]);

	useEffect(() => {
		if (ref.current !== null) {
			const chart = getInstanceByDom(ref.current);
			loading === true ? chart!.showLoading() : chart!.hideLoading();
		}
	}, [loading, theme]);

	if (!show) return null;
	return <div ref={ref} style={{ width: "100%", height: "100%", ...style }} />;
}
