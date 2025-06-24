# GitHub Pages Setup Instructions

If the site is showing a 404 error at https://madfam-io.github.io/testigos-solarpunk/, please check the following:

## 1. Enable GitHub Pages in Repository Settings

1. Go to https://github.com/madfam-io/testigos-solarpunk/settings/pages
2. Under "Source", select "GitHub Actions" (not "Deploy from a branch")
3. Save the changes

## 2. Verify Deployment

The deployment workflow is already set up correctly and running. After enabling GitHub Pages:

1. Wait for the next deployment to complete
2. Visit https://madfam-io.github.io/testigos-solarpunk/
3. If you still see a 404, try these test URLs:
   - https://madfam-io.github.io/testigos-solarpunk/test.html
   - https://madfam-io.github.io/testigos-solarpunk/index-test.html

## 3. Alternative: Manual Deployment

If GitHub Actions deployment isn't working, you can switch to branch deployment:

1. Run `npm run deploy` locally (this uses gh-pages package)
2. In repository settings, change source to "Deploy from a branch"
3. Select the `gh-pages` branch

## 4. Troubleshooting

- Ensure the repository is public
- Check that GitHub Pages is not disabled at the organization level
- Try clearing your browser cache or using incognito mode
- The site may take up to 10 minutes to become available after first enabling

## Current Configuration

- Site URL: https://madfam-io.github.io
- Base path: /testigos-solarpunk
- Build output: dist/
- Deployment method: GitHub Actions (actions/upload-pages-artifact@v4)
