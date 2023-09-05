import { Templates } from "$/components";
import { css, cva } from "$/styles/css";
import { flex, hstack, vstack } from "$/styles/patterns";
import { PropsWithChildren } from "react";

function Section({ heading, direction, gap = 8, children }: PropsWithChildren<{ heading?: string; gap?: number; direction?: "column" | "row" }>) {
	return (
		<section className={styles.section.wrapper}>
			{heading && <h2 className={styles.heading({ size: 2 })}>{heading}</h2>}
			<div className={styles.section.content({ direction })} style={{ gap: gap * 4 }}>
				{children}
			</div>
		</section>
	);
}

function Feature({ heading, icons, children }: PropsWithChildren<{ heading: string; icons: string[] }>) {
	return (
		<div className={styles.feature.wrapper}>
			<h3 className={styles.heading({ size: 3 })}>{heading}</h3>
			<p>{children}</p>
			<div className={styles.feature.icons}>
				{icons.map((name) => (
					<i key={name} className={`fa-solid fa-${name}`} style={{ fontSize: 24 }} />
				))}
			</div>
		</div>
	);
}

export default function App() {
	return (
		<Templates.Content layout={"home"} title={<span className={styles.title}>Beat Saber Map Analysis</span>}>
			<Section direction="column" gap={0}>
				<p>This website provides a comprehensive interface for statistical analysis of Beat Saber maps.</p>
				<p>
					This also serves as a successor to the{" "}
					<a href="https://docs.google.com/spreadsheets/d/13wyoviJAplYOrsMocOA7YNXJxVRHd74G7z4U2jhCZa4" target="_blank">
						original tracker
					</a>
					, aiming to provide new capabilities and improvements:
				</p>
			</Section>
			<Section>
				<Feature heading="Better Coverage" icons={["magnifying-glass"]}>
					New pages are available for more comprehensive breakdowns.
				</Feature>
				<Feature heading="Custom Datasets" icons={["table", "file", "globe"]}>
					You can create your own arbitrary datasets from a variety of sources.
				</Feature>
				<Feature heading="New Presentation" icons={["wand-magic-sparkles"]}>
					Better infrastructure makes it easier to present the info you need.
				</Feature>
			</Section>
			<Section heading="Credits">
				<Templates.Profile name="officialMECH" role="Lead Developer, Maintainer"></Templates.Profile>
			</Section>
		</Templates.Content>
	);
}

const styles = {
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
	section: {
		wrapper: css({
			textAlign: "center",
		}),
		content: cva({
			base: flex.raw({
				flexDirection: { base: "column", sm: "row" },
				width: "full",
				justifyContent: "center",
			}),
			variants: {
				direction: {
					column: { flexDirection: "column" },
					row: { flexDirection: "row" },
				},
			},
		}),
	},
	feature: {
		wrapper: vstack({
			width: "full",
			textAlign: "center",
		}),
		icons: hstack({
			gap: 4,
		}),
	},
};
