# Generator Scripts

These scripts will provide a means of generating datasets from a variety of sources that are compatible with the web app. There are plans to eventually have support for creating new datasets from within the app, but this should hopefully serve as a temporary solution.

[Node.js](https://nodejs.dev/en/learn/) is required to compile/run these scripts. You can install dependencies using [Yarn](https://yarnpkg.com/getting-started) (if you're cloning locally) or your preferred package manager (if you'd rather yoink these scripts and use them in your own preferred engine/framework).

In addition, _all scripts are self-contained and operate independently from the rest of the application._ This means you're welcome to just grab the snippets you need if you don't feel like cloning the entire repository or you prefer using a different environment/framework for parsing external schemas.

## Available Scripts

- `merge.ts`: Used to combine multiple datasets together, merging fields on related entries and overriding stale properties. Useful if your data is fragmented across multiple sources.
- `tsv.ts`: Generate a dataset from a `.tsv` file.
- `directory.ts`: Generate a dataset from a valid map directory.
- `archive.ts`: Generate a dataset from a `.zip` archive of a valid map directory.
- `beatsaver.ts`: Generate a dataset from a collection of maps available on BeatSaver. Support is also available to pool _all_ maps from specified user(s) if provided.

> **NOTE**: `helpers.js` is not a script file, but rather a collection of helper functions used across these scripts.

## Configuration File

The configuration file is used to specify additional parameters for generation, such as metadata and other script-specific processes.

```json
{
	"metadata": {
		"name": string,
		"description": string,
		"contributors": string[],
		'updated': Date
	}
}
```

- `name`: The display name for the dataset.
- `description`: A brief description of your dataset. For line breaks, use the `\n` character.
- `contributors`: A list of people who helped contribute to the dataset.
- `updated`: A timestamp for when your dataset was last updated. This field will be assigned automatically when generating your dataset, but you can override it here.

While each script will prompt you for a configuration file, it's technically not required for most scripts and can be safely omitted, **except for the following cases**:

### `tsv.js`

The `tsv` field provides the necessary parameters to parse each cell of the table to their respective properties. You can refer to the following syntax.

```json
{
	"tsv": {
		"indices": {
			[key]: [number, type]
		},
		"start": number,
		"end": number,
		"ids": string[]
	}
}
```

- `indices`: The properties to be extracted from the table. For each key, the provided tuple will match the column index of the cell (`[0]`) and supplied transformer (`[1]`) to its corresponding data property. See the reference table below for the correct keys.
- `start`: The starting row index for filtering. Useful if you have blank/header cells that you want to exclude.
- `end`: The ending row index for filtering. Useful if you have blank/footer cells that you want to exclude.
- `ids`: If an `id` column is not available within your table, you can supply an array of strings here to retroactively apply `id` mappings to your entries (each `id` will be remapped according to the index of all unique entries in the `title` column that are available after serialization). If this field is not present in the configuration file, the script will instead ask you to manually provide the appropriate `id` for each individual song.

#### Transformer Reference

| key                            | type   |
| ------------------------------ | ------ |
| id                             | string |
| title                          | string |
| pack                           | string |
| released                       | date   |
| bpm                            | number |
| length                         | number |
| characteristic                 | string |
| difficulty                     | string |
| colorNotes                     | entity |
| bombNotes                      | entity |
| obstacles                      | entity |
| sliders                        | entity |
| burstSliders                   | entity |
| basicBeatmapEvents             | entity |
| colorBoostBeatmapEvents        | entity |
| rotationEvents                 | entity |
| bpmEvents                      | entity |
| lightColorEventBoxGroups       | entity |
| lightRotationEventBoxGroups    | entity |
| lightTranslationEventBoxGroups | entity |
| waypoints                      | entity |
| basicEventTypesWithKeywords    | entity |
| jumpSpeed                      | number |
| jumpOffset                     | number |
| mappers                        | array  |
| lighters                       | array  |
