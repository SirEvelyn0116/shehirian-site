# Workflow Comparison: Old vs. New preview-builder.yml

## Overview

This document shows the differences between the old and new versions of the `preview-builder.yml` workflow file.

## Affected Branches

- **feature-dot-navigation** - Has old version
- **feature-test-preview** - Has old version

## Side-by-Side Comparison

### Old Version (Current on outdated branches)

```yaml
name: Branch Preview Builder

on:
  push:
    branches-ignore:
      - main

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Prepare preview folder
        run: |
          BRANCH_NAME=$(echo "${GITHUB_REF##*/}" | tr '[:upper:]' '[:lower:]')
          mkdir -p previews/$BRANCH_NAME
          rsync -av --exclude='previews' --exclude='.git' ./ previews/$BRANCH_NAME/

      - name: Generate index.html
        run: node generate-index.js

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./previews
          destination_dir: ./
```

### New Version (Current on main branch)

```yaml
name: Branch Preview Builder

on:
  push:
    branches-ignore:
      - main

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    steps:
      # Step 1: Checkout current branch (e.g., feature-preview-x)
      - uses: actions/checkout@v3
        with:
          path: current

      # Step 2: Checkout gh-pages branch to preserve existing previews
      - uses: actions/checkout@v3
        with:
          ref: gh-pages
          path: gh-pages

      # Step 3: Merge current branch's static files into gh-pages/branch-name/
      - name: Merge new preview into gh-pages folder
        run: |
          BRANCH_NAME=$(echo "${GITHUB_REF##*/}" | tr '[:upper:]' '[:lower:]')
          mkdir -p gh-pages/$BRANCH_NAME
          rsync -av --exclude='.git' --exclude='gh-pages' current/ gh-pages/$BRANCH_NAME/

      # Step 4: Generate index.html with links to all previews
      - name: Copy generate-index.js to gh-pages root
        run: cp current/generate-index.js gh-pages/generate-index.js
      
      - name: Generate index.html
        run: |
          cd gh-pages
          node generate-index.js

      # Step 5: Deploy updated gh-pages folder
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./gh-pages
```

## Key Differences

| Aspect | Old Version | New Version |
|--------|-------------|-------------|
| **Checkout Strategy** | Single checkout | Dual checkout (current + gh-pages) |
| **Directory Structure** | `previews/` | `gh-pages/` |
| **Preview Preservation** | Overwrites on each run | Preserves existing previews |
| **Index Generation** | Runs in root directory | Runs in gh-pages directory |
| **File Copying** | Direct copy | Explicit copy of generate-index.js |
| **Rsync Exclusions** | `--exclude='previews' --exclude='.git'` | `--exclude='.git' --exclude='gh-pages'` |
| **Publish Directory** | `./previews` | `./gh-pages` |
| **Destination Dir** | `./` | (not specified - uses root) |
| **Comments** | Minimal | Detailed step comments |

## Benefits of New Version

1. **Better Isolation**: Dual checkout keeps current branch separate from gh-pages
2. **Preview Preservation**: Existing branch previews are maintained across updates
3. **Clearer Structure**: More explicit steps with detailed comments
4. **Consistency**: Matches the workflow used on main and other updated branches
5. **Robustness**: More reliable deployment process

## Impact

The new version ensures that:
- All branch previews remain accessible after updates
- The preview index page always shows all available branches
- Workflow behavior is consistent across all branches
- Future maintenance is easier due to better documentation

## How to Apply

See `TASK_SUMMARY.md` for instructions on applying these changes to outdated branches.
