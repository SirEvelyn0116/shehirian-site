#!/bin/bash

# Script to update preview-builder.yml across all branches to match main branch
# This script updates the .github/workflows/preview-builder.yml file on branches
# that have outdated versions

set -e

echo "=== Preview Builder Update Script ==="
echo ""

# Branches that need updating
BRANCHES_TO_UPDATE=("feature-dot-navigation" "feature-test-preview")

# Current branch to return to
ORIGINAL_BRANCH=$(git branch --show-current)

echo "Original branch: $ORIGINAL_BRANCH"
echo ""
echo "Branches to update:"
for branch in "${BRANCHES_TO_UPDATE[@]}"; do
  echo "  - $branch"
done
echo ""

# Confirm before proceeding
read -p "Do you want to proceed with the update? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Update cancelled."
  exit 0
fi

echo ""
echo "Starting update process..."
echo ""

# Update each branch
for branch in "${BRANCHES_TO_UPDATE[@]}"; do
  echo "=== Updating $branch ==="
  
  # Checkout the branch
  echo "  Checking out $branch..."
  git checkout "$branch"
  
  # Copy the file from main
  echo "  Copying preview-builder.yml from main..."
  git show main:.github/workflows/preview-builder.yml > .github/workflows/preview-builder.yml
  
  # Check if there are changes
  if git diff --quiet .github/workflows/preview-builder.yml; then
    echo "  ✓ No changes needed (already up to date)"
  else
    # Commit the changes
    echo "  Committing changes..."
    git add .github/workflows/preview-builder.yml
    git commit -m "Update preview-builder.yml to match main branch"
    
    # Push the changes
    echo "  Pushing to remote..."
    git push origin "$branch"
    
    echo "  ✓ Successfully updated $branch"
  fi
  
  echo ""
done

# Return to original branch
echo "Returning to original branch: $ORIGINAL_BRANCH"
git checkout "$ORIGINAL_BRANCH"

echo ""
echo "=== Update Complete ==="
echo ""
echo "Summary:"
echo "  Updated ${#BRANCHES_TO_UPDATE[@]} branches"
echo ""
echo "Verification:"
echo "  To verify the changes, run:"
echo "  git diff main:.github/workflows/preview-builder.yml <branch>:.github/workflows/preview-builder.yml"
echo ""
