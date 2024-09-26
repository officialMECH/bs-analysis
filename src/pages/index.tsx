import { Section } from "$/components/ui/molecules";
import { Content, Feature, Profile } from "$/components/ui/organisms";
import { faFile, faGlobe, faMagnifyingGlass, faTable, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { css, cva } from "styled-system/css";

export default function App() {
	return (
		<Content layout={"home"} title={<span className={cn.title}>Beat Saber Map Analysis</span>}>
			<Section center direction="column" gap={0}>
				<p>This website provides a comprehensive interface for statistical analysis of Beat Saber maps.</p>
				<p>
					This also serves as a successor to the{" "}
					<a href="https://docs.google.com/spreadsheets/d/13wyoviJAplYOrsMocOA7YNXJxVRHd74G7z4U2jhCZa4" target="_blank">
						original tracker
					</a>
					, aiming to provide new capabilities and improvements:
				</p>
			</Section>
			<Section center direction="row">
				<Feature title="Better Coverage" icons={[faMagnifyingGlass]}>
					New pages are available for more comprehensive breakdowns.
				</Feature>
				<Feature title="Custom Datasets" icons={[faTable, faFile, faGlobe]}>
					You can create your own arbitrary datasets from a variety of sources.
				</Feature>
				<Feature title="New Presentation" icons={[faWandMagicSparkles]}>
					Better infrastructure makes it easier to present the info you need.
				</Feature>
			</Section>
			<Section center direction="row" heading="Credits">
				<Profile name="officialMECH" role="Lead Developer, Maintainer" />
			</Section>
		</Content>
	);
}

const cn = {
	title: css({
		fontSize: "5xl",
	}),
	heading: cva({
		variants: {
			size: {
				2: { fontSize: "3xl", marginY: 4 },
				3: { fontSize: "xl" },
			},
		},
	}),
};
