# Quick Start Guide: Update preview-builder.yml and generate-index.js

## 🎯 Goal
Update the `preview-builder.yml` workflow file and `generate-index.js` script on 2 outdated branches to match the versions on main.

## 📍 Branches Needing Updates
- `feature-dot-navigation`
- `feature-test-preview`

## ⚡ Fastest Solution (Recommended)

### Using GitHub Actions (30 seconds)

1. Open your browser and go to the repository
2. Click the **"Actions"** tab
3. Click **"Sync Preview Builder Workflow"** in the left sidebar
4. Click **"Run workflow"** button (top right)
5. Select:
   - Branch: `main` (or keep default)
   - dry_run: **`false`**
6. Click **"Run workflow"** again to confirm
7. Wait ~1 minute for completion
8. ✅ Done! Both branches are now updated

### Verify the Update

```bash
./verify-preview-builder.sh
```

All branches should show "✓ matches main"

## 🔧 Alternative Solutions

### Option 2: Command Line Script

```bash
./update-preview-builder.sh
```

Follow the prompts to update all outdated branches.

### Option 3: Manual Update

See `UPDATE_INSTRUCTIONS.md` for step-by-step manual instructions.

## 📚 More Information

| Document | Description |
|----------|-------------|
| `TASK_SUMMARY.md` | Complete overview of the solution |
| `WORKFLOW_COMPARISON.md` | Side-by-side comparison of old vs new |
| `UPDATE_INSTRUCTIONS.md` | Detailed manual update instructions |
| `README.md` | General repository documentation |

## ❓ Need Help?

1. Check if GitHub Actions workflow exists:
   - Go to `.github/workflows/sync-preview-builder.yml`
   - If it exists, you're good to go!

2. Run verification to check current status:
   ```bash
   ./verify-preview-builder.sh
   ```

3. Read the full task summary:
   ```bash
   cat TASK_SUMMARY.md
   ```

## ✨ What Gets Updated?

The workflow file and index generation script will be updated with:
- ✅ Better preview preservation
- ✅ Improved directory structure
- ✅ Enhanced error handling
- ✅ Clearer documentation
- ✅ More robust deployment
- ✅ Consistent generate-index.js across all branches

Only `.github/workflows/preview-builder.yml` and `generate-index.js` on the 2 outdated branches are modified.

---

**Time to complete:** ~1 minute using GitHub Actions

**Risk level:** Low (only affects workflow automation, not site content)

**Rollback:** Easy (git revert or restore old workflow file)
