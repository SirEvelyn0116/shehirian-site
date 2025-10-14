# Instructions to Update preview-builder.yml Across All Branches

## Overview
This document provides instructions to update the `preview-builder.yml` workflow file across all branches to match the version on the `main` branch.

## Branches That Need Updates

The following branches have outdated versions of `.github/workflows/preview-builder.yml` and need to be updated:

1. **feature-dot-navigation**
2. **feature-test-preview**

## Branches Already Up-to-Date

The following branches already have the correct version matching `main`:
- dot-navigation-mock-up
- feature-language-switcher-failed
- feature-recipes-layout
- feature-static-language-switcher
- first-mockup
- mock-up
- copilot/update-preview-builder-yml

## Manual Update Process

For each branch that needs updating, follow these steps:

```bash
# 1. Checkout the branch
git checkout <branch-name>

# 2. Copy the preview-builder.yml from main
git show main:.github/workflows/preview-builder.yml > .github/workflows/preview-builder.yml

# 3. Commit the changes
git add .github/workflows/preview-builder.yml
git commit -m "Update preview-builder.yml to match main branch"

# 4. Push the changes
git push origin <branch-name>
```

## Using the Automated Script

A script `update-preview-builder.sh` has been provided to automate this process:

```bash
./update-preview-builder.sh
```

## Expected Changes

The updated `preview-builder.yml` will have the following improvements over the old version:

### Old Version (feature-dot-navigation & feature-test-preview)
- Single checkout
- Uses `previews/` directory
- Simpler workflow structure

### New Version (from main)
- Dual checkout (current branch + gh-pages)
- Uses `gh-pages/` directory structure
- Better preservation of existing previews
- More detailed comments
- Separate step to copy generate-index.js
- Better organized workflow steps

## Key Differences

The main workflow changes include:
1. **Checkout Strategy**: Changed from single to dual checkout
2. **Directory Structure**: Changed from `previews/` to `gh-pages/`
3. **Rsync Patterns**: Updated exclusion patterns
4. **Index Generation**: Now copies generate-index.js before running it
5. **Publish Directory**: Changed from `./previews` to `./gh-pages`
6. **Removed**: `destination_dir` parameter from deployment step

## Verification

After updating, verify the changes with:

```bash
git diff main:.github/workflows/preview-builder.yml .github/workflows/preview-builder.yml
```

This should show no differences if the update was successful.
