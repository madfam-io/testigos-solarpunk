# E2E Tests

This directory is reserved for end-to-end tests using tools like Playwright or Cypress.

## Potential E2E Test Scenarios

1. **Navigation Flow**
   - Test navigation between all pages
   - Verify menu functionality
   - Check responsive navigation

2. **Character Browsing**
   - Browse character list
   - Click on character cards
   - View character details

3. **Script Viewing**
   - Navigate to scripts section
   - Open script viewer
   - Verify script content display

4. **PWA Installation**
   - Test PWA installation prompt
   - Verify offline functionality
   - Check service worker registration

5. **Performance**
   - Test page load times
   - Verify lazy loading of images
   - Check bundle sizes

## Setup Instructions

To set up E2E tests:

1. Install Playwright: `npm install -D @playwright/test`
2. Create `playwright.config.ts`
3. Write test files with `.e2e.ts` extension
4. Run tests with `npx playwright test`

## Example Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Testigos de Solarpunk/);
  });
});
```