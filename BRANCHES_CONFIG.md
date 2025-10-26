# Branch Configuration Management

This document explains how to manage branch previews and feature tests using the `branches.json` configuration file.

## Overview

The preview builder system now separates branches into two categories:
- **Previews**: Production-ready features or designs that stakeholders should review
- **Feature Tests**: Work-in-progress or experimental branches for testing purposes

## branches.json Structure

The `branches.json` file contains metadata for each branch:

```json
{
  "branches": [
    {
      "name": "feature-dot-navigation",
      "type": "preview",
      "created": "2025-10-15T12:00:00-04:00",
      "lastModified": "2025-10-15T12:00:00-04:00"
    },
    {
      "name": "feature-test-preview",
      "type": "feature",
      "created": "2025-10-16T10:00:00-04:00",
      "lastModified": "2025-10-16T10:00:00-04:00"
    }
  ]
}
```

### Fields

- **name**: Branch name (must match the actual Git branch name)
- **type**: Either `"preview"` or `"feature"`
  - `"preview"`: Shows in the "Previews" section - use for stakeholder-ready features
  - `"feature"`: Shows in the "Feature Tests" section - use for work-in-progress
- **created**: ISO 8601 timestamp when the branch was first created (in EST/EDT timezone)
- **lastModified**: ISO 8601 timestamp of the last update (automatically updated by the workflow)

## How It Works

### Automatic Updates

When you push to a branch, the GitHub Actions workflow automatically:
1. Pulls the latest `generate-index.js` and `branches.json` from the main branch
2. Updates the `lastModified` timestamp for your branch
3. If your branch isn't in `branches.json`, it adds it as a "feature" type by default
4. Generates a new index page with separated sections

### Manual Updates

To change a branch from "feature" to "preview" or vice versa:

1. Edit `branches.json` on the main branch
2. Find the branch entry
3. Change the `"type"` field to either `"preview"` or `"feature"`
4. Commit and push the changes

Example:
```json
{
  "name": "feature-recipes-layout",
  "type": "preview",  // Changed from "feature" to "preview"
  "created": "2025-10-10T11:00:00-04:00",
  "lastModified": "2025-10-10T11:00:00-04:00"
}
```

## Adding a New Branch

When you create a new branch and push it:
1. The workflow automatically adds it to `branches.json` as type "feature"
2. If you want it to be a "preview" instead, edit `branches.json` on main
3. The next time any branch is pushed, the index will reflect your changes

## Removing a Branch

To remove a branch from the preview index:
1. Delete the branch's directory from gh-pages
2. Remove the entry from `branches.json` on the main branch
3. The next build will regenerate the index without that branch

## Generated Index Page

The index page at `https://yourusername.github.io/shehirian-site/` displays:

### Previews Section
- Shows branches marked as type "preview"
- Sorted by most recently modified first
- Ideal for stakeholder reviews

### Feature Tests Section  
- Shows branches marked as type "feature"
- Sorted by most recently modified first
- For internal development and testing

### Information Displayed
Each branch shows:
- Branch name (clickable link)
- Created date in EST/EDT timezone
- Last modified date in EST/EDT timezone
- Time since last modification (e.g., "2 days ago")

## Best Practices

1. **Mark stakeholder-ready work as "preview"**: Use the preview type for branches that are ready for external review
2. **Keep "feature" for WIP**: Use feature type for experimental or in-progress work
3. **Update main regularly**: Edit `branches.json` on main when branch purposes change
4. **Clean up old branches**: Remove entries from `branches.json` when branches are deleted or merged

## Troubleshooting

### Branch not showing up
- Ensure the branch has been pushed and the workflow has completed
- Check that the branch directory in gh-pages contains an `index.html` file
- Verify `branches.json` on gh-pages includes your branch

### Wrong section (preview vs feature)
- Edit `branches.json` on the main branch
- Push any branch to trigger a rebuild
- The index will be regenerated with the correct categorization

### Timestamps in wrong timezone
- All timestamps are automatically displayed in EST/EDT
- The workflow stores timestamps in ISO 8601 UTC format
- Conversion to EST/EDT happens during index generation
