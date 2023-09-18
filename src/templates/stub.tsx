import { metadata } from "$/constants";
import { hstack, vstack } from "$/styles/patterns";

export default function Stub() {
	return (
		<small className={styles.container}>
			<span>This is a stub section.</span>
			<span>
				If you have suggestions for content you'd like to see included here, join the{" "}
				<a href={metadata.repository.concat("/discussions")} target="_blank">
					discussions
				</a>{" "}
				and leave your thoughts!
			</span>
		</small>
	);
}

const styles = {
	container: vstack({
		gap: 1,
		alignItems: "start",
		width: "full",
		padding: 4,
		backgroundColor: "container",
	}),
	heading: hstack({ gap: 2, marginBottom: 1 }),
};
