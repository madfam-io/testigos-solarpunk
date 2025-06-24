# GitHub Pages 404 Error - IMPORTANT

The 404 error at https://madfam-io.github.io/testigos-solarpunk/ is likely due to one of these issues:

## 1. GitHub Pages Not Enabled (Most Likely)

Go to: https://github.com/madfam-io/testigos-solarpunk/settings/pages

Check that:
- **Source**: Should be set to "GitHub Actions" (NOT "Deploy from a branch")
- **Status**: Should show as active/enabled

## 2. Permissions Issue

The repository needs proper permissions for GitHub Pages deployment:
- Go to Settings → Actions → General
- Under "Workflow permissions", ensure "Read and write permissions" is selected
- Save the settings

## 3. First Deployment

If this is the first time deploying:
- It can take up to 10 minutes for the site to become available
- GitHub needs to provision the Pages infrastructure

## 4. Verify Deployment Status

Check the Actions tab: https://github.com/madfam-io/testigos-solarpunk/actions
- Look for the latest deployment workflow run
- Check if the "Deploy to GitHub Pages" job completed successfully
- Click on the deployment to see the URL

## Current Workflow Status

The workflow is correctly configured with:
- ✅ Build step that creates the dist/ folder
- ✅ Upload of build artifacts using actions/upload-pages-artifact@v4
- ✅ Deploy step using actions/deploy-pages@v4
- ✅ Proper permissions in the deploy job

Once GitHub Pages is enabled in the repository settings, the site should be accessible at the URL.