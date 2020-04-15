# File Inject - GitHub Action

A GitHub Action to inject text into an exisiting file at a given position.

## Inputs

### `filepath`

**Required:** true

**Description:** Filepath to the file to injet into, relative to the project root

**Example:** `./CHANGELOG.md`

### `content`

**Required:** true

**Description:** The content that should get injected.

### `alignment`

**Default:** `after`

**Description:** should the new text be added before or after the position-regex match? Allowed values: `before`, `after`.

### `position-regexp`

**Default:** `$`

**Description:** RegExp String where the new content should be added. Defaults to the end of the file.

**Example:** `^` for the beginning of the file.

### `regexp-flags`

**Default:** ``

**Description:** [RegExp flags](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/RegExp) to use.

**Example:** `i` for case insensitive regexp matching.

## Outputs

### content

The new file content

## Example Usage

```yaml
name: Append Commit
on: [push]

jobs:
  commit-date:
    runs-on: ubuntu-latest
    steps:
      - name: clone repo
        uses: actions/checkout@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      - name: inject text
        uses: adrianjost/file-inject@master
        with:
          filepath: "./COMMITS.md"
          content: "NEW CONTENT"
      - name: commit COMMITS.md
        uses: stefanzweifel/git-auto-commit-action@v4.1.1
        with:
          commit_message: "update COMMITS.md"
```
