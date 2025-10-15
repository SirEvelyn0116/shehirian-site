# Shehirian Website

This repository contains the static website for Shehirian, restructured and re-styled.

## Structure

- `index.html` — Home page
- `about.html` — About page
- `contact.html` — Contact page
- `assets/css/style.css` — Main stylesheet
- `assets/js/script.js` — Placeholder for JS
- `assets/img/` — Place images here

## How to Use

1. Replace text and images with content from http://shehirian.com.
2. Adjust CSS in `assets/css/style.css` to further match your desired look.
3. Add more pages as needed.

## Deployment

This site can be hosted on GitHub Pages or any static hosting provider.

## Branch Preview System

This repository uses a GitHub Actions workflow to automatically create preview deployments for feature branches:

- Each feature branch is automatically deployed to `https://<username>.github.io/<repo>/<branch-name>/`
- An index page at `https://<username>.github.io/<repo>/` lists all available branch previews
- The preview system is managed by `.github/workflows/preview-builder.yml`

### Maintaining the Preview System

To ensure all branches use the same preview builder workflow:

**Option 1: Automated Update (Recommended)**
- Navigate to the Actions tab
- Run the "Sync Preview Builder Workflow" 
- This will automatically update all branches to match the main branch version

**Option 2: Manual Update**
- Run `./update-preview-builder.sh` from your local repository with push access
- Or follow the instructions in `UPDATE_INSTRUCTIONS.md`

**Option 3: Verify Current State**
- Run `./verify-preview-builder.sh` to check which branches need updates