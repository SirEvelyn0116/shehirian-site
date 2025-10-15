#!/bin/bash

# Script to verify which branches have preview-builder.yml and generate-index.js matching main branch

set -e

echo "=== Preview Builder Verification Script ==="
echo ""

# Fetch latest from remote
echo "Fetching latest from remote..."
git fetch --all --quiet

echo ""
echo "Comparing preview-builder.yml and generate-index.js on all branches with main:"
echo ""

# List of all branches to check
BRANCHES=(
  "dot-navigation-mock-up"
  "feature-dot-navigation"
  "feature-language-switcher-failed"
  "feature-recipes-layout"
  "feature-static-language-switcher"
  "feature-test-preview"
  "first-mockup"
  "mock-up"
  "copilot/update-preview-builder-yml"
)

OUTDATED=()
UPDATED=()
MISSING=()

for branch in "${BRANCHES[@]}"; do
  # Check if preview-builder.yml exists
  WORKFLOW_EXISTS=true
  if ! git show "$branch:.github/workflows/preview-builder.yml" &>/dev/null; then
    WORKFLOW_EXISTS=false
  fi
  
  # Check if generate-index.js exists
  GENERATE_INDEX_EXISTS=true
  if ! git show "$branch:generate-index.js" &>/dev/null; then
    GENERATE_INDEX_EXISTS=false
  fi
  
  # If either file is missing, mark as missing
  if [ "$WORKFLOW_EXISTS" = false ] || [ "$GENERATE_INDEX_EXISTS" = false ]; then
    MISSING_FILES=()
    [ "$WORKFLOW_EXISTS" = false ] && MISSING_FILES+=("preview-builder.yml")
    [ "$GENERATE_INDEX_EXISTS" = false ] && MISSING_FILES+=("generate-index.js")
    echo "  ✗ $branch - MISSING: ${MISSING_FILES[*]}"
    MISSING+=("$branch")
    continue
  fi
  
  # Compare preview-builder.yml with main
  WORKFLOW_MATCHES=false
  if diff <(git show main:.github/workflows/preview-builder.yml) <(git show "$branch:.github/workflows/preview-builder.yml") &>/dev/null; then
    WORKFLOW_MATCHES=true
  fi
  
  # Compare generate-index.js with main
  GENERATE_INDEX_MATCHES=false
  if diff <(git show main:generate-index.js) <(git show "$branch:generate-index.js") &>/dev/null; then
    GENERATE_INDEX_MATCHES=true
  fi
  
  # If both match, mark as up to date
  if [ "$WORKFLOW_MATCHES" = true ] && [ "$GENERATE_INDEX_MATCHES" = true ]; then
    echo "  ✓ $branch - matches main"
    UPDATED+=("$branch")
  else
    # Determine what's outdated
    OUTDATED_FILES=()
    [ "$WORKFLOW_MATCHES" = false ] && OUTDATED_FILES+=("preview-builder.yml")
    [ "$GENERATE_INDEX_MATCHES" = false ] && OUTDATED_FILES+=("generate-index.js")
    echo "  ✗ $branch - OUTDATED: ${OUTDATED_FILES[*]}"
    OUTDATED+=("$branch")
  fi
done

echo ""
echo "=== Summary ==="
echo "  Up to date: ${#UPDATED[@]} branches"
echo "  Outdated: ${#OUTDATED[@]} branches"
echo "  Missing: ${#MISSING[@]} branches"

if [ ${#OUTDATED[@]} -gt 0 ]; then
  echo ""
  echo "Branches that need updating:"
  for branch in "${OUTDATED[@]}"; do
    echo "  - $branch"
  done
fi

if [ ${#MISSING[@]} -gt 0 ]; then
  echo ""
  echo "Branches with missing files:"
  for branch in "${MISSING[@]}"; do
    echo "  - $branch"
  done
fi

echo ""
