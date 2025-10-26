# Copilot Instructions for Shehirian Website

## Repository Overview

This is a static website for Shehirian, a family-owned bulgur wheat company operating since 1958. The site showcases their products with multi-language support (English, French, Arabic) and uses a modern, clean design.

## Tech Stack

- **Frontend**: Pure HTML, CSS, and vanilla JavaScript (no frameworks)
- **Deployment**: GitHub Pages with automated branch preview system
- **CI/CD**: GitHub Actions workflows for automated deployments
- **Node.js**: Used only for build/deployment scripts (generate-index.js)

## Project Structure

### Core Pages
- `index.html` - Main landing page with dot navigation
- `about.html` - Company information page
- `contact.html` - Contact form and information
- `mockup-*.html` - Various design mockups and experiments
- `recipes-*.html` - Recipe layout experiments
- `kiosk*.html` - Kiosk integration prototypes

### Assets
- `assets/css/` - Stylesheets (style.css, styles.css, recipes-*.css, mockup-*.css)
- `assets/js/` - JavaScript files (script.js, scripts.js, recipes-main.js)
- `assets/img/` - Product images (bulgur wheat varieties)
- `img/` - Additional image directory
- `fonts/` - Custom font files

### Configuration & Scripts
- `.github/workflows/` - GitHub Actions workflows
  - `preview-builder.yml` - Deploys feature branches to GitHub Pages
  - `sync-preview-builder.yml` - Syncs workflow across all branches
- `generate-index.js` - Creates index page listing all branch previews
- `update-preview-builder.sh` - Script to update workflow across branches
- `verify-preview-builder.sh` - Verifies workflow consistency

### Documentation
- `README.md` - Main project documentation
- `TASK_SUMMARY.md` - Overview of preview builder implementation
- `UPDATE_INSTRUCTIONS.md` - Detailed workflow update instructions
- `WORKFLOW_COMPARISON.md` - Comparison of old vs new workflow versions
- `QUICK_START.md` - Quick start guide for workflow updates

## Code Style & Conventions

### HTML
- Use semantic HTML5 elements
- Maintain consistent indentation (2 spaces)
- Include proper meta tags and charset declarations
- Use descriptive `alt` attributes for images
- Follow accessibility best practices (ARIA labels where appropriate)

### CSS
- Multiple stylesheet approaches exist (normalize before making changes)
- Modern CSS features used (flexbox, grid, CSS variables)
- Responsive design with mobile-first approach
- Font families: Poppins, PP Neue Montreal, Elgar, Montserrat

### JavaScript
- Use vanilla JavaScript (no jQuery or frameworks)
- Implement internationalization (i18n) for multi-language support
- Store translations in JSON objects
- Use data-i18n attributes for translatable elements
- ES6+ syntax is acceptable

### Multi-Language Support
- Languages: English (en), French (fr), Arabic (ar)
- RTL support for Arabic text
- Use `data-i18n` attributes for translatable content
- Store translations in script objects or JSON files (e.g., `armenian-style-lentil-soup.json`)

## Branch Preview System

### How It Works
- Each feature branch automatically deploys to `https://<username>.github.io/<repo>/<branch-name>/`
- An index page at the root lists all available previews
- Managed by `.github/workflows/preview-builder.yml`
- Uses dual checkout strategy (current branch + gh-pages)

### Important Notes
- The main branch does NOT trigger the preview builder
- Preview builder uses rsync to merge branch content into gh-pages
- The `generate-index.js` script creates the preview index
- Two branches currently use outdated workflow: `feature-dot-navigation` and `feature-test-preview`

### Maintaining Workflows
When modifying `.github/workflows/preview-builder.yml`:
1. Make changes on the main branch first
2. Use the "Sync Preview Builder Workflow" action to propagate changes
3. Or run `./update-preview-builder.sh` locally
4. Verify with `./verify-preview-builder.sh`

## Development Guidelines

### When Adding New Features
- Test responsiveness across mobile, tablet, and desktop
- Ensure multi-language support if adding text content
- Keep the static nature of the site (no backend required)
- Use existing design patterns and color schemes
- Maintain consistency with existing pages

### Design System
- **Primary Color**: #596E47 (green)
- **Secondary Color**: #A67B5B (brown)
- **Background**: #FAF9F6 (off-white)
- **Text**: #333 (dark gray)
- **Font Stack**: Modern sans-serif fonts (Poppins, PP Neue Montreal, Montserrat)

### Testing
- No automated test suite exists (static site)
- Manual testing required for:
  - Visual consistency across pages
  - Language switcher functionality
  - Responsive behavior
  - Navigation and links
  - Form validation (contact page)

### Deployment
- GitHub Pages deployment is automated via workflows
- Main branch should be stable and production-ready
- Feature branches get automatic previews
- No build step required (static files)

## Common Tasks

### Adding a New Page
1. Create HTML file in root directory
2. Link appropriate CSS file from `assets/css/`
3. Add navigation links in header
4. Include proper i18n data attributes if translatable
5. Test in branch preview before merging

### Adding Product Images
1. Place images in `assets/img/` or `img/`
2. Use descriptive filenames (e.g., `fine-bulgor-soft-wheat.jpg`)
3. Ensure images are optimized for web
4. Include proper alt text for accessibility

### Updating Translations
1. Locate the i18n object in the relevant HTML file
2. Add translations for all supported languages (en, fr, ar)
3. Use data-i18n attributes to connect HTML elements
4. Test language switcher functionality

### Working with GitHub Actions
- Preview builder triggers on push to any branch except main
- Sync workflow can be manually triggered from Actions tab
- Check workflow runs for deployment status
- Logs available in GitHub Actions tab

## Important Considerations

### File Organization
- Multiple mockup files exist for experimentation
- Not all HTML files are production pages
- Some files use different CSS approaches (dot-styles.css, mockup-*.css)
- Recipe-related files are experimental features

### External Dependencies
- Google Fonts for typography
- cdnfonts.com for some custom fonts
- No npm packages or build dependencies
- Node.js only needed for deployment scripts

### Known Issues & Limitations
- Two branches have outdated workflows (documented in TASK_SUMMARY.md)
- Multiple stylesheet files with overlapping purposes
- Some experimental features may not be fully implemented
- Arabic RTL layout may need refinement

## Git Workflow

### Branch Naming
- Feature branches: `feature-*`
- Mockup branches: `mock-up*` or `mockup*`
- Copilot branches: `copilot/*`
- Navigation features: `dot-navigation*`

### Commit Messages
- Use clear, descriptive commit messages
- Reference issue numbers when applicable
- Keep commits focused and atomic

### Pull Requests
- Test in branch preview before requesting review
- Ensure all languages work if text changes made
- Check responsive behavior
- Document any breaking changes

## Resources

- Original site: http://shehirian.com
- GitHub Pages: https://<username>.github.io/<repo>/
- Best practices doc referenced in issues: https://gh.io/copilot-coding-agent-tips

## Questions or Issues?

- Check documentation files (README.md, TASK_SUMMARY.md, etc.)
- Review existing code patterns in similar pages
- Test changes in branch preview before merging
- Use the verify script to check workflow consistency
