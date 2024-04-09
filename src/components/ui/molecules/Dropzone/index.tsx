import { css, cx } from "$/styles/css";
import { center, interactable } from "$/styles/patterns";
import { InputHTMLAttributes, ReactNode, useCallback, useEffect, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "accept"> {
	files?: File[];
	onFileChange?: (files: File[]) => void;
	render?: (file: File) => ReactNode;
}

function Component({ id, files: defaultFiles, onFileChange, ...rest }: DropzoneOptions & Props) {
	const [files, setFiles] = useState<File[] | null>(defaultFiles ?? null);

	const handleDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (rest.onDrop) handleDrop(acceptedFiles);
			setFiles(acceptedFiles);
		},
		[rest.onDrop]
	);

	useEffect(() => {
		if (!files) return;
		if (onFileChange) onFileChange(files);
	}, [files]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop, ...rest });

	if (files && files.length > 0) {
		return (
			<div className={cx(cn.root, center())} {...getRootProps()}>
				{<small>{files[0].name}</small>}
			</div>
		);
	}
	return (
		<div className={cx(cn.root, center())} {...getRootProps()}>
			<input id={id} {...getInputProps()} />
			{files && files.length > 0 && <small>{files.length}</small>}
			{isDragActive ? <small className={cn.label}>...</small> : <small className={cn.label}>Drag 'n' drop some files here, or click to select files.</small>}
		</div>
	);
}

const cn = {
	root: interactable({
		padding: 4,
		backgroundColor: "container",
		border: "0.125em dashed",
		borderColor: "element",
		width: "full",
		height: "4rem",
	}),
	label: css({
		color: "subtext",
	}),
};

export { Component };
