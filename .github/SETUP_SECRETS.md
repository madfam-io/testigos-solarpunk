# 🔐 GitHub Secrets Setup for CI/CD

This guide explains how to set up the required GitHub secrets for the CI/CD pipelines.

## Required Secrets for Vercel Deployment

To enable Vercel deployment via GitHub Actions, you need to add these secrets:

### 1. VERCEL_TOKEN

- Go to [Vercel Dashboard](https://vercel.com/account/tokens)
- Create a new token with full access
- Add it as `VERCEL_TOKEN` in GitHub secrets

### 2. VERCEL_ORG_ID

- Go to your Vercel dashboard
- Navigate to Settings → General
- Copy your "Team ID" (or personal account ID)
- Add it as `VERCEL_ORG_ID` in GitHub secrets

### 3. VERCEL_PROJECT_ID

- Go to your project in Vercel
- Navigate to Settings → General
- Copy your "Project ID"
- Add it as `VERCEL_PROJECT_ID` in GitHub secrets

## How to Add Secrets to GitHub

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret with its name and value
6. Click **Add secret**

## Verifying Setup

After adding all secrets, you can verify they're working by:

1. Making a small change to any file
2. Creating a pull request
3. Checking the Actions tab to see if the workflows run successfully

## Security Best Practices

- Never commit secrets to your repository
- Rotate tokens periodically
- Use least-privilege access when possible
- Review who has access to your repository secrets

## Troubleshooting

If deployments fail:

1. Check the Actions logs for specific errors
2. Verify all secrets are set correctly (no extra spaces)
3. Ensure your Vercel project is properly linked
4. Check that tokens haven't expired

---

For more help, see the [deployment documentation](../docs/DEPLOYMENT.md).
