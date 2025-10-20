#!/bin/bash

# Script to update preview-builder.yml and generate-index.js across all branches to match main branch
# This script updates the .github/workflows/preview-builder.yml and generate-index.js files on branches
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
  
  # Copy preview-builder.yml from main
  echo "  Copying preview-builder.yml from main..."
  git show main:.github/workflows/preview-builder.yml > .github/workflows/preview-builder.yml
  
  # Copy generate-index.js from main
  echo "  Copying generate-index.js from main..."
  git show main:generate-index.js > generate-index.js
  
  # Check if there are changes
  if git diff --quiet .github/workflows/preview-builder.yml generate-index.js; then
    echo "  ✓ No changes needed (already up to date)"
  else
    # Show what files changed
    CHANGED_FILES=()
    if ! git diff --quiet .github/workflows/preview-builder.yml; then
      CHANGED_FILES+=("preview-builder.yml")
    fi
    if ! git diff --quiet generate-index.js; then
      CHANGED_FILES+=("generate-index.js")
    fi
    echo "  Files being updated: ${CHANGED_FILES[*]}"
    
    # Commit the changes
    echo "  Committing changes..."
    git add .github/workflows/preview-builder.yml generate-index.js
    git commit -m "Update preview-builder.yml and generate-index.js to match main branch" \
               -m "Updated files: ${CHANGED_FILES[*]}"
    
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
echo "  git diff main:generate-index.js <branch>:generate-index.js"
echo ""
