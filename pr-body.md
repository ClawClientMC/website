## Summary

Hardens accessibility, responsive behavior, and web performance for launch as specified in CLA-49.

### Changes

**Accessibility:**
- Add aria-current="page" for active navigation links
- Improve keyboard focus states with :focus-visible and high-contrast outlines
- Add role="list" and aria-label to FAQ accordion
- Add skip-link focus styling
- Ensure brand logo has priority for LCP

**Responsive:**
- Add very small screen responsive styles (< 23.5rem / ~376px)
- Adjust typography, spacing, and component sizing for narrow viewports
- Ensure launcher preview scales gracefully on small screens

**Performance:**
- Add font-display: swap for system font stack
- Add performance budget check script (250 kB max chunk, 500 kB max page)
- Add accessibility check script for CI
- Update CI workflow to run both checks

**CI:**
- npm run check:accessibility validates semantic HTML and ARIA attributes
- npm run check:performance validates JS chunk and page size budgets
- Both run in the existing quality CI job

### Performance Budgets
- Max JS chunk: 250 kB (Next.js + React runtime ~220 kB)
- Max page size: 500 kB
- Current largest chunk: 223.5 kB

### Test Plan
- [x] Lint passes
- [x] Typecheck passes
- [x] Tests pass
- [x] Production build succeeds
- [x] Accessibility check passes
- [x] Performance budget check passes
