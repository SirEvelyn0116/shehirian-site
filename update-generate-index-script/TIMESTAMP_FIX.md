# Branch Preview Timestamp Fix

## Problem Statement

After PR #35 was merged to add actual commit timestamp tracking, the preview branches index page was still showing the same timestamp for all branches instead of their individual last commit times.

**Issue:** All branches displayed the same timestamp (e.g., "Oct 21, 2025, 04:03 PM") even though they had different last commit times.

## Root Cause Analysis

The issue occurred because of how the GitHub Actions workflow processes branch deployments:

1. **Workflow Step:** The `preview-builder.yml` workflow uses `rsync` to copy branch content to gh-pages:
   ```bash
   rsync -av --exclude='.git' --exclude='gh-pages' current/ gh-pages/$BRANCH_NAME/
   ```

2. **Missing Git History:** The `--exclude='.git'` flag prevents `.git` directories from being copied to the branch directories on gh-pages.

3. **Fallback to mtime:** Without `.git` directories, the `getLastCommitTime()` function in `generate-index.js` had to fall back to directory modification time:
   ```javascript
   const stat = fs.statSync(branchPath);
   return stat.mtime;
   ```

4. **Same Timestamp:** Since all branch directories were updated during the same workflow run, they all had identical modification times, resulting in all branches showing the same timestamp.

## Solution

The fix involves two changes:

### 1. Extract and Store Commit Timestamp (workflow change)

Modified `.github/workflows/preview-builder.yml` to extract the commit timestamp BEFORE rsync and store it as metadata:

```yaml
- name: Merge new preview into gh-pages folder
  run: |
    BRANCH_NAME=$(echo "${GITHUB_REF##*/}" | tr '[:upper:]' '[:lower:]')
    mkdir -p gh-pages/$BRANCH_NAME
    rsync -av --exclude='.git' --exclude='gh-pages' current/ gh-pages/$BRANCH_NAME/
    
    # Store the last commit timestamp for this branch
    cd current
    COMMIT_TIMESTAMP=$(git log -1 --format=%ct)
    echo "$COMMIT_TIMESTAMP" > ../gh-pages/$BRANCH_NAME/.last-commit-time
```

**What this does:**
- Extracts the Unix timestamp of the last commit using `git log -1 --format=%ct`
- Stores it in a `.last-commit-time` file in the branch directory on gh-pages
- This file persists across deployments and is accessible to the index generator

### 2. Read Timestamp from Metadata (script change)

Updated `generate-index.js` to read the timestamp from the metadata file first:

```javascript
function getLastCommitTime(branchPath) {
  try {
    // First, try to read from .last-commit-time metadata file
    const metadataFile = path.join(branchPath, '.last-commit-time');
    if (fs.existsSync(metadataFile)) {
      const timestamp = fs.readFileSync(metadataFile, 'utf8').trim();
      if (timestamp && !isNaN(timestamp)) {
        return new Date(parseInt(timestamp) * 1000);
      }
    }
    
    // Try to get the last commit timestamp from the branch's git history
    const gitDir = path.join(branchPath, '.git');
    if (fs.existsSync(gitDir)) {
      const timestamp = execSync(
        'git log -1 --format=%ct',
        { cwd: branchPath, encoding: 'utf8' }
      ).trim();
      if (timestamp) {
        return new Date(parseInt(timestamp) * 1000);
      }
    }
  } catch (err) {
    // If git command fails, fall back to directory mtime
  }
  
  // Fallback to directory modification time
  const stat = fs.statSync(branchPath);
  return stat.mtime;
}
```

**Fallback Chain:**
1. **Primary:** Read from `.last-commit-time` metadata file (always works after this fix)
2. **Secondary:** Check for `.git` directory and use git log (works for local development)
3. **Fallback:** Use directory modification time (last resort)

## Testing

The solution was tested locally with a mock setup:

```javascript
// Created test directories with different timestamps
const timestamp1 = Math.floor(new Date('2025-10-01T10:00:00Z').getTime() / 1000);
const timestamp2 = Math.floor(new Date('2025-10-10T15:30:00Z').getTime() / 1000);
const timestamp3 = Math.floor(new Date('2025-10-15T08:45:00Z').getTime() / 1000);

// Wrote timestamps to .last-commit-time files
fs.writeFileSync(path.join(branch1, '.last-commit-time'), timestamp1.toString());
// ... etc

// Result: Each branch correctly showed its unique timestamp in EDT
Branch 1: Oct 1, 2025, 06:00 AM
Branch 2: Oct 10, 2025, 11:30 AM
Branch 3: Oct 15, 2025, 04:45 AM
```

## Expected Behavior After Fix

Once this fix is deployed:

1. When any branch is pushed, the workflow will:
   - Extract the commit timestamp from git
   - Store it in `.last-commit-time` in that branch's gh-pages directory
   
2. The index generator will:
   - Read timestamps from `.last-commit-time` files
   - Display each branch with its actual last commit time
   - Show times in EDT (Eastern Daylight Time) / EST (Eastern Standard Time)
   - Use 12-hour format with AM/PM for readability

3. Users will see:
   ```
   feature-abc: Last updated: Oct 15, 2025, 05:45 AM
   feature-xyz: Last updated: Oct 10, 2025, 11:30 AM
   feature-123: Last updated: Oct 1, 2025, 06:00 AM
   ```

## Files Changed

- `.github/workflows/preview-builder.yml` - Added timestamp extraction step
- `generate-index.js` - Added metadata file reading as primary source
- `README.md` - Added documentation about how timestamps work

## Deployment

These changes need to be:

1. Merged to the `main` branch
2. Propagated to all feature branches using the "Sync Preview Builder Workflow" action

Once propagated, the next time any branch is pushed, it will correctly display its actual commit timestamp on the preview index page.

## Benefits

- ✅ Accurate timestamps showing when each branch was last updated
- ✅ No dependency on git history in deployed directories
- ✅ Simple metadata file approach that's easy to debug
- ✅ Maintains backward compatibility with fallback chain
- ✅ Works seamlessly with existing workflow structure
- ✅ Minimal performance impact (simple file read operation)
