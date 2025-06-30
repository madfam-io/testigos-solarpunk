# 🚀 Deployment Guide - Testigos de Solarpunk

This guide covers the dual deployment strategy for the Testigos de Solarpunk project, supporting both GitHub Pages and Vercel deployments.

## 📋 Table of Contents

- [Overview](#overview)
- [Environments](#environments)
- [GitHub Pages Deployment](#github-pages-deployment)
- [Vercel Deployment](#vercel-deployment)
- [Environment Variables](#environment-variables)
- [Custom Domain Setup](#custom-domain-setup)
- [Troubleshooting](#troubleshooting)

## 🌐 Overview

The project is configured for automatic deployment to two platforms:

1. **GitHub Pages** - Primary deployment for the main site
2. **Vercel** - Alternative deployment with preview environments

Both deployments are triggered automatically via GitHub Actions on push to the `main` branch.

## 🏗️ Environments

### Production Environments

1. **GitHub Pages Production**

   - URL: https://madfam-io.github.io/testigos-solarpunk/
   - Base path: `/testigos-solarpunk`
   - Auto-deploys from `main` branch

2. **Vercel Production**

   - URL: https://testigos-solarpunk.vercel.app
   - Base path: `/`
   - Auto-deploys from `main` branch

3. **Custom Domain (Future)**
   - URL: https://universo.testigosdesolarpunk.mx
   - Will point to either GitHub Pages or Vercel

### Preview Environments

- **Vercel Preview**: Automatic deployment for each pull request
- **GitHub Pages**: No preview environments (production only)

## 📦 GitHub Pages Deployment

### Automatic Deployment

GitHub Pages deployment is handled by `.github/workflows/deploy.yml`:

```bash
# Automatic deployment on push to main
git push origin main
```

### Manual Deployment

```bash
# Build and deploy to GitHub Pages
npm run deploy:github

# Or using the standard deploy command
npm run deploy
```

### Configuration

- Config file: `astro.config.mjs`
- Base path: `/testigos-solarpunk`
- Output: Static HTML in `dist/` directory

### GitHub Settings

1. Go to Settings → Pages
2. Source: GitHub Actions (already configured)
3. Custom domain: Add when ready

## 🔺 Vercel Deployment

### Initial Setup

1. **Connect Repository to Vercel**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Link project
   vercel link
   ```

2. **Set Environment Variables in Vercel Dashboard**

   - `NODE_ENV=production`
   - Any API keys or secrets

3. **Add GitHub Secrets**
   Required for GitHub Actions:
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `VERCEL_TOKEN`

### Automatic Deployment

Vercel deployment is handled by `.github/workflows/deploy-vercel.yml`:

- **Production**: Automatic on push to `main`
- **Preview**: Automatic on pull requests

### Manual Deployment

```bash
# Deploy to Vercel production
npm run deploy:vercel

# Or using Vercel CLI directly
vercel --prod
```

### Configuration

- Config file: `astro.config.vercel.mjs`
- Base path: `/` (no base path)
- Settings: `vercel.json`

## 🔐 Environment Variables

### Local Development

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Fill in required values

### GitHub Secrets

Add these in Settings → Secrets and variables → Actions:

```
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
VERCEL_TOKEN=your-token
```

### Vercel Environment Variables

Set in Vercel Dashboard → Settings → Environment Variables:

- Production, Preview, and Development environments
- Sensitive values should be encrypted

## 🌍 Custom Domain Setup

### For GitHub Pages

1. Add CNAME file:

   ```bash
   echo "universo.testigosdesolarpunk.mx" > public/CNAME
   ```

2. Configure DNS:

   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   CNAME www   madfam-io.github.io
   ```

3. Enable HTTPS in GitHub Pages settings

### For Vercel

1. Add domain in Vercel Dashboard → Settings → Domains
2. Follow Vercel's DNS configuration instructions
3. SSL is automatic

## 🛠️ Build Commands

### Development

```bash
# Local development (GitHub Pages config)
npm run dev

# Local development (Vercel config)
npm run dev:vercel

# Local development (custom config)
npm run dev:local
```

### Production Builds

```bash
# Build for GitHub Pages
npm run build:github

# Build for Vercel
npm run build:vercel

# Standard build (uses default config)
npm run build
```

### Preview

```bash
# Preview GitHub Pages build
npm run preview

# Preview Vercel build
npm run preview:vercel
```

## 🚨 Troubleshooting

### GitHub Pages Issues

1. **404 errors**: Check base path configuration
2. **Assets not loading**: Verify asset paths include base path
3. **Deploy failing**: Check GitHub Actions logs

### Vercel Issues

1. **Build errors**: Check build logs in Vercel dashboard
2. **Environment variables**: Ensure all required vars are set
3. **Domain issues**: Verify DNS propagation

### Common Issues

1. **Different behavior between deployments**

   - Check config differences between `astro.config.mjs` and `astro.config.vercel.mjs`
   - Verify environment variables

2. **CI/CD Pipeline Failures**

   - Check GitHub Actions logs
   - Ensure all secrets are properly set
   - Verify npm packages are up to date

3. **Performance Differences**
   - GitHub Pages uses CDN automatically
   - Vercel requires configuration for optimal caching

## 📊 Monitoring

### GitHub Pages

- Monitor via GitHub Actions runs
- Check deployment status in Settings → Pages

### Vercel

- Real-time logs in Vercel dashboard
- Analytics and performance metrics available
- Set up alerts for failures

## 🔄 Rollback Procedures

### GitHub Pages

```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

### Vercel

1. Use Vercel Dashboard → Deployments
2. Click "..." menu on previous deployment
3. Select "Promote to Production"

## 📝 Best Practices

1. **Always test locally** before deploying
2. **Use preview deployments** for testing changes
3. **Monitor both deployments** after updates
4. **Keep configurations in sync** when possible
5. **Document any platform-specific changes**

## 🆘 Support

- GitHub Pages: [GitHub Pages Documentation](https://docs.github.com/pages)
- Vercel: [Vercel Documentation](https://vercel.com/docs)
- Project Issues: [GitHub Issues](https://github.com/madfam-io/testigos-solarpunk/issues)

---

_Last updated: December 2024_
