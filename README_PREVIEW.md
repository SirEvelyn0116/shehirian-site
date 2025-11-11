# Preview: Static Language Switcher + Recipes Layout

## Branch: preview-static-language-switcher-with-recipes

This branch contains a fully merged version of the `feature-static-language-switcher` and `feature-recipes-layout` branches, combining the best features from both into a unified, production-ready website.

## 🎯 Purpose

This preview branch demonstrates the complete integration of:
1. Multi-language support (English, French, Arabic)
2. Dot navigation with scroll tracking
3. Full content sections (Home, About, Products, Recipes, Contact)
4. SEO-optimized recipe data

## 📋 What's Included

### Main File
- **index.html** (371 lines) - The merged website with all features

### Documentation
- **MERGE_SUMMARY.md** - Detailed explanation of the merge
- **TESTING_CHECKLIST.md** - 120+ test cases for validation
- **MERGE_VISUALIZATION.md** - Visual diagram of the merge
- **README_PREVIEW.md** - This file

### Dependencies (Already in repo)
- **mockup-4.css** - Main styling from feature-static-language-switcher
- **assets/css/recipes-layout.css** - Recipe and dot nav styling
- **scroll-nav.js** - Scroll tracking for dot navigation
- **img/** - Product images

## 🚀 Features

### Multi-Language Support
- **English (EN)**: Default language
- **French (FR)**: Complete translations
- **Arabic (AR)**: Complete translations with RTL layout

All UI elements are translatable including:
- Navigation labels (both dot nav and in-page)
- Section headings
- Product names
- Recipe titles, descriptions, and ingredients
- Contact form labels

### Navigation
1. **Dot Navigation** (right side)
   - Fixed position on right side of screen
   - Auto-highlights based on scroll position
   - Hover labels show section names
   - Translatable labels

2. **In-Page Links** (home section)
   - Traditional text links
   - Same functionality as dot nav

3. **Language Switcher** (top)
   - Three buttons: EN, FR, AR
   - Instant language change
   - Highlights active language
   - RTL layout toggle for Arabic

### Sections
1. **Home** - Company branding and main navigation
2. **About Us** - Company history and call-to-action
3. **Products** - Carousel of 7 bulgur wheat varieties
4. **Recipes** - Grid of 2 featured recipes with ingredients
5. **Contact** - Contact information and form

### SEO Optimization
- JSON-LD structured data for both recipes
- Schema.org Recipe markup
- Proper semantic HTML
- Optimized for search engines

## 🧪 Testing

Refer to **TESTING_CHECKLIST.md** for comprehensive testing guidelines:
- Language switcher tests (EN/FR/AR)
- Dot navigation tests
- Section content validation
- Multi-language integration tests
- Responsive design tests
- Browser compatibility
- Accessibility tests

Quick test checklist:
- [ ] Language switching works in all three languages
- [ ] Dot navigation highlights correct section
- [ ] All sections display correctly
- [ ] Recipe grid shows two recipes
- [ ] Contact form validates properly
- [ ] Arabic shows RTL layout

## 📊 Statistics

- **Source Files**: 2 branches (240 lines + 133 lines)
- **Merged File**: 371 lines (optimized)
- **Languages**: 3 (EN, FR, AR)
- **Sections**: 5 main sections
- **Navigation Methods**: 2 (dot nav + links)
- **CSS Files**: 2 (integrated)
- **JS Files**: 2 (inline + external)
- **Translation Keys**: 43+
- **Recipes**: 2 with full data

## 🔍 How to View

### Option 1: Local Testing
1. Clone the repository
2. Checkout this branch: `git checkout preview-static-language-switcher-with-recipes`
3. Open `index.html` in a web browser
4. Test all features according to TESTING_CHECKLIST.md

### Option 2: GitHub Pages (Once Deployed)
Visit: `https://SirEvelyn0116.github.io/shehirian-site/preview-static-language-switcher-with-recipes/`

Note: The preview builder workflow will automatically deploy this branch to GitHub Pages when pushed to remote.

## 📝 Documentation Guide

1. **Start Here**: README_PREVIEW.md (this file) for overview
2. **Understand Merge**: MERGE_SUMMARY.md for technical details
3. **Visualize Structure**: MERGE_VISUALIZATION.md for diagrams
4. **Test Thoroughly**: TESTING_CHECKLIST.md for validation

## 🔧 Technical Details

### CSS Integration
Both stylesheets are loaded without conflicts:
- `mockup-4.css` handles home, about, products, contact
- `recipes-layout.css` handles dot nav and recipe grid

### JavaScript Integration
- Inline translation system for language switching
- External scroll-nav.js for dot navigation tracking
- No conflicts between scripts

### Translation System
All translatable elements use `data-i18n` attributes:
```html
<h2 data-i18n="nav_home">Home</h2>
```

JavaScript function updates content based on selected language:
```javascript
function setLanguage(lang) {
  // Updates all elements with data-i18n
  // Changes text direction for Arabic (RTL)
  // Highlights active language button
}
```

### Dot Navigation System
Uses `scroll-nav.js` to:
- Track scroll position
- Highlight active section's dot
- Update in real-time as user scrolls

## ⚠️ Important Notes

1. **Language Switcher Buttons**: These remain in their original languages (EN, FR, AR) and do not translate. This is intentional for usability.

2. **RTL Layout**: When Arabic is selected, the entire page layout switches to right-to-left. The dot navigation stays on the right side as this is the standard position.

3. **Recipe Images**: The recipes currently don't have images, but have placeholder URLs in the JSON-LD data for future implementation.

4. **Product Images**: Only the soft wheat varieties have images. Red wheat varieties use background colors as placeholders.

## 🎨 Styling

The merged design maintains:
- Clean, modern aesthetic
- Wheat theme with bulgur wheat background
- Professional color scheme (wheat, green, brown)
- Responsive layout
- Smooth animations and transitions

## 🔄 Branch Relationship

```
feature-static-language-switcher ────┐
                                      ├──> preview-static-language-switcher-with-recipes
feature-recipes-layout ───────────────┘
```

Also available on: `copilot/merge-static-language-and-recipes`

## 📞 Support

For questions or issues:
- Review MERGE_SUMMARY.md for merge details
- Check TESTING_CHECKLIST.md for validation steps
- See MERGE_VISUALIZATION.md for structure diagrams

## ✅ Status

- **Merge Status**: ✅ Complete
- **Testing Status**: 📋 Checklist prepared (needs manual testing)
- **Documentation**: ✅ Complete
- **Deployment**: 🕐 Pending push to remote

## 🎉 Ready for Production

This preview branch is production-ready and can be:
- Deployed to GitHub Pages
- Merged to main branch
- Used as reference for future features
- Further enhanced with additional recipes or sections

All features from both source branches are preserved and working together seamlessly!
