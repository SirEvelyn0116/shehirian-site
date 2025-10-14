#!/bin/bash

# Script to verify which branches have preview-builder.yml matching main branch

set -e

echo "=== Preview Builder Verification Script ==="
echo ""

# Fetch latest from remote
echo "Fetching latest from remote..."
git fetch --all --quiet

echo ""
echo "Comparing preview-builder.yml on all branches with main:"
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
  # Check if file exists
  if ! git show "$branch:.github/workflows/preview-builder.yml" &>/dev/null; then
    echo "  ✗ $branch - MISSING preview-builder.yml"
    MISSING+=("$branch")
    continue
  fi
  
  # Compare with main
  if diff <(git show main:.github/workflows/preview-builder.yml) <(git show "$branch:.github/workflows/preview-builder.yml") &>/dev/null; then
    echo "  ✓ $branch - matches main"
    UPDATED+=("$branch")
  else
    echo "  ✗ $branch - OUTDATED"
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
  echo "Branches missing preview-builder.yml:"
  for branch in "${MISSING[@]}"; do
    echo "  - $branch"
  done
fi

echo ""
