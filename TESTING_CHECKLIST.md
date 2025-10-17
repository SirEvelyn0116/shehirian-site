# Testing Checklist for Merged Static Language Switcher + Recipes Layout

## Branch Information
- **Branch**: `preview-static-language-switcher-with-recipes`
- **Also Available**: `copilot/merge-static-language-and-recipes`
- **Preview URL**: Will be available at `https://SirEvelyn0116.github.io/shehirian-site/preview-static-language-switcher-with-recipes/` (after push)

## Pre-Testing Setup
- [ ] Ensure all files are present: index.html, mockup-4.css, assets/css/recipes-layout.css, scroll-nav.js
- [ ] Open the site in a modern browser (Chrome, Firefox, Safari, Edge)

## Language Switcher Tests

### English (EN)
- [ ] Click EN button
- [ ] Verify button highlights as active
- [ ] Check all sections display in English
- [ ] Verify text direction is LTR (left-to-right)
- [ ] Check navigation labels are in English
- [ ] Verify recipe titles and ingredients are in English

### French (FR)
- [ ] Click FR button
- [ ] Verify button highlights as active
- [ ] Check "Accueil" appears in navigation
- [ ] Check "À propos de nous" appears in About section
- [ ] Check "Nos Produits" appears in Products section
- [ ] Check "Recettes en vedette" appears in Recipes section
- [ ] Verify all content is translated to French
- [ ] Verify text direction remains LTR

### Arabic (AR)
- [ ] Click AR button
- [ ] Verify button highlights as active
- [ ] Check "الرئيسية" appears in navigation
- [ ] Check "معلومات عنا" appears in About section
- [ ] Check "منتجاتنا" appears in Products section
- [ ] Check "وصفات مميزة" appears in Recipes section
- [ ] **Verify text direction changes to RTL (right-to-left)**
- [ ] Check Arabic text renders correctly

## Dot Navigation Tests

### Visual Elements
- [ ] Dot navigation appears on right side of screen
- [ ] Five dots are visible (Home, About, Products, Recipes, Contact)
- [ ] Dots have proper hover effects
- [ ] Labels appear on hover showing section names
- [ ] Active dot is highlighted

### Navigation Functionality
- [ ] Click Home dot - scrolls to Home section
- [ ] Click About dot - scrolls to About Us section
- [ ] Click Products dot - scrolls to Products section
- [ ] Click Recipes dot - scrolls to Recipes section
- [ ] Click Contact dot - scrolls to Contact section
- [ ] Verify smooth scrolling between sections

### Auto-highlight
- [ ] Scroll down manually through sections
- [ ] Verify active dot updates based on current section in viewport
- [ ] Check Home section highlights home dot
- [ ] Check About section highlights about dot
- [ ] Check Products section highlights products dot
- [ ] Check Recipes section highlights recipes dot
- [ ] Check Contact section highlights contact dot

## Section Content Tests

### Home Section
- [ ] Company title "shehirian bulgor inc." is visible
- [ ] Navigation links work (Home, About, Products, Recipes, Contact)
- [ ] Background image displays correctly

### About Us Section
- [ ] Title displays correctly
- [ ] "Family owned and operated since 1958" text is visible
- [ ] Call-to-action text is present

### Products Section
- [ ] Product carousel is visible
- [ ] Seven product variations are shown:
  - [ ] Fine soft wheat
  - [ ] Medium soft wheat
  - [ ] Coarse soft wheat
  - [ ] Extra coarse soft wheat
  - [ ] Fine red wheat
  - [ ] Medium red wheat
  - [ ] Coarse red wheat
- [ ] Product images load correctly (for soft wheat variants)
- [ ] Tooltips appear on hover

### Recipes Section
- [ ] "Featured Recipes" heading is visible
- [ ] Recipe grid displays two recipes side by side
- [ ] **Bulgur Wheat Salad** recipe card shows:
  - [ ] Title
  - [ ] Description
  - [ ] 6 ingredients listed
- [ ] **Spiced Lentil Soup** recipe card shows:
  - [ ] Title
  - [ ] Description
  - [ ] 5 ingredients listed
- [ ] Recipe cards have proper styling and spacing

### Contact Section
- [ ] "Contact Us" heading is visible
- [ ] Contact information displays:
  - [ ] Address: 375 Midwest Rd., Toronto, ON
  - [ ] Phone: (416) 757-9495
  - [ ] Fax: (416) 752-9248
  - [ ] Email: info@shehirian.com
- [ ] Contact form has all fields:
  - [ ] Name field
  - [ ] Email field
  - [ ] Message textarea
  - [ ] Send Message button
- [ ] Form validation works (try submitting empty form)

## Multi-Language Integration Tests

### Language Switch During Navigation
- [ ] Set language to French
- [ ] Navigate to each section using dots
- [ ] Verify French text persists across all sections
- [ ] Switch to Arabic mid-navigation
- [ ] Verify Arabic text and RTL layout work correctly

### Dot Navigation Labels in Different Languages
- [ ] Set language to English - verify dot labels are in English
- [ ] Set language to French - verify dot labels change to French
- [ ] Set language to Arabic - verify dot labels change to Arabic

### Recipe Content Translation
- [ ] Switch to English - verify recipe titles and ingredients in English
- [ ] Switch to French - verify recipe titles and ingredients in French
- [ ] Switch to Arabic - verify recipe titles and ingredients in Arabic

## Technical Tests

### SEO and Structured Data
- [ ] Open browser developer tools
- [ ] Check page source for JSON-LD scripts
- [ ] Verify two Recipe schema.org objects are present
- [ ] Validate JSON-LD using Google's Structured Data Testing Tool (optional)

### Console Errors
- [ ] Open browser console
- [ ] Check for JavaScript errors
- [ ] Check for CSS loading errors
- [ ] Verify scroll-nav.js loads successfully

### Performance
- [ ] Check page load time
- [ ] Verify smooth scrolling performance
- [ ] Check for any layout shifts during scroll
- [ ] Test on slower connection (optional)

## Responsive Design Tests

### Desktop (1920x1080)
- [ ] Layout displays correctly
- [ ] Dot navigation is positioned properly
- [ ] Recipe grid shows two columns
- [ ] All sections fill viewport height

### Tablet (768x1024)
- [ ] Layout adapts appropriately
- [ ] Dot navigation remains visible
- [ ] Recipe grid may stack or adjust
- [ ] Touch scrolling works

### Mobile (375x667)
- [ ] Layout is mobile-friendly
- [ ] Dot navigation is accessible
- [ ] Recipe grid stacks vertically
- [ ] All content is readable
- [ ] Touch navigation works

## Browser Compatibility

### Chrome/Chromium
- [ ] All features work
- [ ] Styling is correct
- [ ] Animations are smooth

### Firefox
- [ ] All features work
- [ ] Styling is correct
- [ ] Animations are smooth

### Safari
- [ ] All features work
- [ ] Styling is correct
- [ ] Animations are smooth

### Edge
- [ ] All features work
- [ ] Styling is correct
- [ ] Animations are smooth

## Accessibility Tests

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Verify focus indicators are visible
- [ ] Test Enter key on buttons and links

### Screen Reader (Optional)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify ARIA labels are announced
- [ ] Check section headings are properly identified

### Color Contrast
- [ ] Verify text has sufficient contrast
- [ ] Check button states are distinguishable
- [ ] Verify dot navigation is visible

## Known Issues to Watch For
- [ ] Language switcher buttons should remain in original language (not translate)
- [ ] RTL layout should not break dot navigation positioning
- [ ] Recipe card styling should work with both CSS files loaded
- [ ] Scroll tracking should work smoothly without lag

## Summary
- Total tests to perform: ~120+
- Critical tests (must pass): Language switching, Dot navigation, Section content display
- Nice-to-have tests: Browser compatibility, Responsive design, Accessibility

## Post-Testing
- [ ] Document any issues found
- [ ] Create screenshots of major sections
- [ ] Note any browser-specific issues
- [ ] Verify on GitHub Pages preview URL once deployed
