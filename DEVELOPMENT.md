# 🛠️ Development Guide - Testigos de Solarpunk

## Quick Start for Developers

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Git**: Latest version
- **VSCode**: Recommended editor with extensions

### Initial Setup

```bash
# Clone repository
git clone https://github.com/madfam-io/testigos-solarpunk.git
cd testigos-solarpunk

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:4321/testigos-solarpunk/
```

## 🏗️ Project Architecture

### Tech Stack

- **Framework**: [Astro.js 5.x](https://astro.build) - Static site generator with component islands
- **Language**: TypeScript with strict mode
- **Styling**: CSS with custom properties (CSS Variables)
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Build**: Vite-powered bundling
- **Deployment**: GitHub Pages with Actions

### Directory Structure

```
testigos-solarpunk/
├── .github/workflows/     # CI/CD pipelines
├── public/                # Static assets
│   ├── images/           # Images and media
│   ├── downloads/        # Downloadable resources
│   └── fonts/           # Web fonts
├── src/
│   ├── components/       # Reusable Astro components
│   ├── layouts/         # Page layouts
│   ├── pages/           # File-based routing
│   ├── styles/          # CSS files and design system
│   └── content/         # Content collections (optional)
├── tests/               # Test suites
│   ├── unit/           # Vitest unit tests
│   └── e2e/            # Playwright E2E tests
└── docs/               # Additional documentation
```

## 🎨 Design System Integration

### CSS Architecture

The project uses a modular CSS approach with design tokens:

```css
/* src/styles/madfam-tokens.css - Design tokens */
:root {
  --madfam-yellow: #ffc107; /* Solar energy */
  --madfam-green: #4caf50; /* Sustainability */
  --madfam-blue: #2196f3; /* Technology */
  --madfam-orange: #ff6f35; /* Community */
}

/* src/styles/global.css - Global styles */
/* src/styles/unified-dark-theme.css - Dark theme */
/* src/styles/content-strategy.css - Content-specific styles */
/* src/styles/emoji-magazine-cutout.css - DIY aesthetic */
```

### Magazine Cutout Emoji System

**Critical**: All emojis must use the magazine cutout aesthetic:

```astro
<!-- Correct implementation -->
<span class="emoji-cutout emoji-lg theme-solar flutter">☀️</span>

<!-- Available classes -->
<!-- Sizes: emoji-sm, emoji-md, emoji-lg, emoji-xl -->
<!-- Themes: theme-solar, theme-green, theme-purple, theme-community -->
<!-- Effects: flutter, interactive -->
<!-- Context: emoji-nav, emoji-hero, emoji-card, emoji-button -->
```

## 🧪 Testing Strategy

### Unit Testing with Vitest

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Example test structure:**

```typescript
// tests/unit/components/SketchCard.test.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import SketchCard from '../../../src/components/SketchCard.astro';

describe('SketchCard', () => {
  it('renders with magazine cutout emojis', () => {
    const { container } = render(SketchCard, {
      props: { titulo: 'Test Sketch' },
    });
    expect(container.querySelector('.emoji-cutout')).toBeTruthy();
  });
});
```

### E2E Testing with Playwright

```bash
# Run E2E tests
npm run test:e2e

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run specific test
npx playwright test --grep "navigation"
```

**Example E2E test:**

```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('navigation has magazine cutout emojis', async ({ page }) => {
  await page.goto('/testigos-solarpunk/');

  // Check emoji cutout classes are applied
  const navEmojis = page.locator('.nav-menu .emoji-cutout');
  await expect(navEmojis).toHaveCount(6);

  // Verify specific emoji styling
  const sketchEmoji = page.locator('text=🎬').first();
  await expect(sketchEmoji).toHaveClass(/emoji-cutout/);
});
```

## 🔧 Development Workflow

### Daily Development

```bash
# 1. Pull latest changes
git pull origin main

# 2. Create feature branch
git checkout -b feature/new-emoji-styling

# 3. Start development
npm run dev

# 4. Make changes and test
npm run check:all

# 5. Commit and push
git add .
git commit -m "feat: add magazine cutout styling to new emojis"
git push origin feature/new-emoji-styling
```

### Code Quality Checks

All commits must pass these checks:

```bash
# Linting (ESLint + Astro)
npm run lint

# Type checking (TypeScript)
npm run typecheck

# Format checking (Prettier)
npm run format:check

# All checks combined
npm run check:all
```

### Pre-commit Hooks

The project uses Husky for automated quality checks:

- **pre-commit**: Runs linting and formatting
- **commit-msg**: Validates commit message format
- **pre-push**: Runs full test suite

## 🌐 Routing and Pages

### File-based Routing

Astro uses file-based routing in `src/pages/`:

```
src/pages/
├── index.astro                    # /testigos-solarpunk/
├── proyecto.astro                 # /testigos-solarpunk/proyecto/
├── comunidad.astro               # /testigos-solarpunk/comunidad/
├── impacto.astro                 # /testigos-solarpunk/impacto/
└── contenido/
    ├── index.astro               # /testigos-solarpunk/contenido/
    ├── sketches.astro            # /testigos-solarpunk/contenido/sketches/
    ├── podcast.astro             # /testigos-solarpunk/contenido/podcast/
    └── madlab.astro              # /testigos-solarpunk/contenido/madlab/
```

### Base Path Configuration

**Important**: All URLs include `/testigos-solarpunk` prefix for GitHub Pages:

```typescript
// In Astro components
let basePath = import.meta.env.BASE_URL !== ''
  ? import.meta.env.BASE_URL
  : '/testigos-solarpunk';

// Remove trailing slash
if (basePath.endsWith('/')) {
  basePath = basePath.slice(0, -1);
}

// Use in href attributes
<a href={`${basePath}/proyecto/`}>El Proyecto</a>
```

## 🔄 Component Development

### Astro Component Pattern

```astro
---
// Component script (runs at build time)
export interface Props {
  titulo: string;
  descripcion?: string;
  tema?: 'sostenibilidad' | 'tecnologia' | 'social';
}

const { titulo, descripcion, tema = 'sostenibilidad' } = Astro.props;
---

<!-- Component template -->
<article class="sketch-card" data-tema={tema}>
  <div class="sketch-content">
    <h3>{titulo}</h3>
    {descripcion && <p>{descripcion}</p>}

    <!-- Always use magazine cutout emojis -->
    <span class={`emoji-cutout emoji-md theme-${tema}`}>
      {tema === 'sostenibilidad' && '🌱'}
      {tema === 'tecnologia' && '💡'}
      {tema === 'social' && '🤝'}
    </span>
  </div>
</article>

<style>
  .sketch-card {
    background: var(--bg-secondary);
    border-radius: 8px;
    padding: var(--space-lg);
  }

  .sketch-card[data-tema='sostenibilidad'] {
    border-left: 4px solid var(--madfam-green);
  }
</style>
```

### Component Best Practices

1. **Props Validation**: Always define TypeScript interfaces
2. **Emoji Usage**: Use magazine cutout system consistently
3. **Styling**: Leverage design tokens from `madfam-tokens.css`
4. **Accessibility**: Include ARIA labels and semantic HTML
5. **Performance**: Minimize client-side JavaScript

## 📦 Build and Deployment

### Build Process

```bash
# Development build
npm run build

# Preview production build
npm run preview

# Check bundle size
npm run build:analyze
```

### GitHub Pages Deployment

Deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`):

1. **Trigger**: Push to `main` branch
2. **Build**: `npm run build` with base path `/testigos-solarpunk`
3. **Test**: Run full test suite
4. **Deploy**: Upload to `gh-pages` branch
5. **Verify**: Accessibility and performance checks

### Environment Variables

```bash
# .env.local (for local development)
BASE_URL=/testigos-solarpunk
SITE=https://madfam-io.github.io

# Production (set in GitHub Actions)
BASE_URL=/testigos-solarpunk
SITE=https://madfam-io.github.io
```

## 🐛 Debugging Guide

### Common Issues and Solutions

#### 404 Errors in Development

```bash
# Problem: Routes not working locally
# Solution: Check base path configuration
npm run dev:local  # Starts without base path for easier local dev
```

#### Emoji Styling Not Applied

```typescript
// Problem: Emojis appear without magazine cutout effect
// Solution: Check class application
<span class="emoji-cutout emoji-lg theme-solar">☀️</span>

// Verify CSS import in BaseLayout.astro
import '../styles/emoji-magazine-cutout.css';
```

#### Build Failures

```bash
# Check TypeScript errors
npm run typecheck

# Check linting issues
npm run lint

# Check tests
npm run test

# Full check
npm run check:all
```

### Debugging Tools

- **Astro Dev Toolbar**: Built-in debugging interface
- **Browser DevTools**: Inspect magazine cutout clip-paths
- **VS Code Extensions**:
  - Astro official extension
  - TypeScript Hero
  - Error Lens

## 📚 Learning Resources

### Astro-Specific

- [Astro Documentation](https://docs.astro.build)
- [Astro Component Patterns](https://docs.astro.build/en/core-concepts/astro-components/)
- [Astro Islands Architecture](https://docs.astro.build/en/concepts/islands/)

### Design System

- [CSS Custom Properties Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Magazine Cutout Implementation](./API_REFERENCE.md#emoji-components)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Testing

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Testing Astro Components](https://docs.astro.build/en/guides/testing/)

---

**Next Steps**:

1. Set up development environment
2. Read through [API_REFERENCE.md](./API_REFERENCE.md)
3. Check [ACCESSIBILITY.md](./ACCESSIBILITY.md) for compliance
4. Start with a small feature to understand workflow
5. Join team Discord for real-time support

**Support**: development@madfam.io | [GitHub Issues](https://github.com/madfam-io/testigos-solarpunk/issues)
