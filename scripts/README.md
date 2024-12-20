# Generator Scripts

While the web app _does_ offer native support for creating and modifying datasets, these specialized scripts can provide a means of generating compatible datasets from a variety of external sources, such as local files or external spreadsheets.

[Node.js](https://nodejs.dev/en/learn/) is required to compile/run these scripts. You can install dependencies using [Yarn](https://yarnpkg.com/getting-started) (if you're cloning locally) or your preferred package manager (if you'd rather yoink these scripts and use them in your own preferred engine/framework).

If you're cloning the repository, you can enter the following command to run any of the respective scripts in the root terminal:

```sh
> node scripts/[name].js
```

In addition, _all scripts are self-contained and operate independently from the rest of the application._ This means you're welcome to just grab the snippets you need if you don't feel like cloning the entire repository or prefer using a different environment/framework for parsing external schemas.

## Available Scripts

- `merge.js`: Used to combine multiple datasets together, merging fields on related entries and overriding stale properties. Useful if your data is fragmented across multiple sources.
- `tsv.js`: Generate a dataset from a `.tsv` file.
- `directory.js`: Generate a dataset from a valid map directory.
- `archive.js`: Generate a dataset from a `.zip` archive of a valid map directory.
- `beatsaver.js`: Generate a dataset from a collection of maps available on BeatSaver. Support is also available to pool _all_ maps from specified users if provided.

> **NOTE**: `helpers.js` is not a script file, but rather a collection of helper functions used across these scripts.

## Arguments

The following arguments are supported in _all_ the available scripts:

- `--minify` (`-m`): Will minify the output to a single line and trim available whitespace. Useful to reduce filesize for larger datasets.

## Configuration File

The configuration file is used to specify additional parameters for generation, such as metadata and other script-specific processes. You can refer to the following syntax:

```ts
{
  "metadata": {
    "name": string,
    "description": string,
    "contributors": string[],
    'updated': Date
  },
  ...
}
```

- `name`: The display name for the dataset.
- `description`: A brief description of your dataset. For line breaks, use the `\n` character.
- `contributors`: A list of people who helped contribute to the dataset.
- `updated`: A timestamp for when your dataset was last updated. This field will be assigned automatically when generating your dataset, but you can override it here.

While each script will prompt you for a configuration file, it's technically not required for most scripts and can be safely omitted, **except for the following cases**:

### `beatsaver.js`

The `beatsaver` field allows you to set finite limits on the number of API requests to make when pooling user collections of maps, which may be necessary for those with a _very_ large collection of maps. You can refer to the [BeatSaver API Docs](https://api.beatsaver.com/docs) for more information.

```ts
{
  ...,
  "beatsaver": {
    "users": {
      "start": number,
      "requests": number
    },
  }
}
```

- `users.start` _(optional)_: The starting page for the API to request from. As a tip, each page will contain no more than **20** maps at a time sorted by the most recent upload.
- `users.requests` _(optional)_: The number of requests to make to the API for the particular run. You may need to set this to a lower value if you end up hitting the rate limit too quickly.

### `tsv.js`

The `tsv` field provides the necessary parameters to parse each cell of the table to their respective properties. You can refer to the following syntax:

```ts
{
  ...,
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

- `indices`: The properties to be extracted from the table. For each `key`, the provided tuple will match the column index of the cell (`number`) and supplied transformer (`type`) to its corresponding data property. See the reference table below for the list of supported keys and their respective types.
- `start` _(optional)_: The starting row index for filtering. Useful if you have blank/header cells that you want to exclude.
- `end` _(optional)_: The ending row index for filtering. Useful if you have blank/footer cells that you want to exclude.
- `ids` _(optional)_: If an `id` column is not available within your table, you can supply an array of strings here to retroactively apply `id` mappings to your entries (each `id` will be remapped according to the index of all unique entries in the `title` column that are available after serialization). If this field is not present in the configuration file, the script will instead ask you to manually provide the appropriate `id` for each individual song.

#### Transformer Reference

| key                            | type     |
| ------------------------------ | -------- |
| id                             | string   |
| title                          | string   |
| pack                           | string   |
| released                       | date     |
| bpm                            | number   |
| length                         | duration |
| characteristic                 | string   |
| difficulty                     | string   |
| colorNotes                     | entity   |
| bombNotes                      | entity   |
| obstacles                      | entity   |
| sliders                        | entity   |
| burstSliders                   | entity   |
| rotationEvents                 | entity   |
| bpmEvents                      | entity   |
| njsEvents                      | entity   |
| basicBeatmapEvents             | entity   |
| colorBoostBeatmapEvents        | entity   |
| lightColorEventBoxGroups       | entity   |
| lightRotationEventBoxGroups    | entity   |
| lightTranslationEventBoxGroups | entity   |
| vfxEventBoxGroups              | entity   |
| waypoints                      | entity   |
| basicEventTypesWithKeywords    | entity   |
| jumpSpeed                      | number   |
| jumpOffset                     | number   |
| mappers                        | array    |
| lighters                       | array    |
