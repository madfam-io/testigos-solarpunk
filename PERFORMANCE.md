# ⚡ Performance Guide - Testigos de Solarpunk

## 🎯 Performance Targets

### Lighthouse Scores (Mobile)

- **Performance**: ≥95
- **Accessibility**: ≥98 (AAA compliance)
- **Best Practices**: ≥95
- **SEO**: ≥95

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1

### Bundle Size Targets

- **Total JavaScript**: <100KB gzipped
- **Critical CSS**: <14KB inlined
- **Images**: WebP format, optimized compression
- **Fonts**: Subset and preloaded

## 🏗️ Architecture Optimizations

### Astro Islands Strategy

Astro's islands architecture provides zero JavaScript by default:

```astro
---
// This runs at build time, not in browser
const data = await fetch('https://api.example.com/data');
---

{/* Static HTML, no JavaScript */}
<div class="sketch-grid">
  {
    sketches.map((sketch) => (
      <article class="sketch-card">
        <h3>{sketch.title}</h3>
        {/* Magazine cutout emojis are pure CSS */}
        <span class="emoji-cutout emoji-lg theme-solar">{sketch.emoji}</span>
      </article>
    ))
  }
</div>

{/* Interactive island only when needed */}
<FilterComponent client:load />
```

### CSS Optimization Strategy

#### Critical CSS Inlining

```html
<!-- BaseLayout.astro automatically inlines critical CSS -->
<style is:inline>
  /* Above-the-fold styles */
  nav,
  .hero-section,
  .skip-link {
    /* ... */
  }
</style>

<!-- Non-critical CSS loads asynchronously -->
<link
  rel="preload"
  href="/styles/non-critical.css"
  as="style"
  onload="this.rel='stylesheet'"
/>
```

#### CSS Custom Properties Performance

```css
/* Efficient: Using CSS variables for theming */
.emoji-cutout.theme-solar {
  --emoji-bg: var(--madfam-yellow);
  --emoji-shadow: rgba(255, 193, 7, 0.3);
  background: var(--emoji-bg);
  box-shadow: 0 4px 12px var(--emoji-shadow);
}

/* Avoid: Repeated property declarations */
.emoji-cutout.theme-solar {
  background: #ffc107;
  box-shadow: 0 4px 12px rgba(255, 193, 7, 0.3);
}
```

## 🖼️ Image Optimization

### Format Strategy

```bash
# Use WebP with AVIF fallback
<picture>
  <source srcset="/images/sketch-hero.avif" type="image/avif">
  <source srcset="/images/sketch-hero.webp" type="image/webp">
  <img src="/images/sketch-hero.jpg" alt="Sketch preview" loading="lazy">
</picture>
```

### Responsive Images

```astro
---
// Generate responsive image variants
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image
  src={heroImage}
  alt="Hero image"
  width={800}
  height={400}
  format="webp"
  quality={85}
  loading="eager"
  Above
  fold
  fetchpriority="high"
/>
```

### Image Loading Strategy

- **Above the fold**: `loading="eager"` + `fetchpriority="high"`
- **Below the fold**: `loading="lazy"`
- **Decorative**: `alt=""` or `role="presentation"`

## 🔤 Font Optimization

### Font Loading Strategy

```html
<!-- Preload critical fonts -->
<link
  rel="preload"
  href="/fonts/poppins-v20-latin-regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>

<!-- Font display optimization -->
<style>
  @font-face {
    font-family: 'Poppins';
    src: url('/fonts/poppins-v20-latin-regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap; /* Prevents invisible text during font load */
  }
</style>
```

### Font Subsetting

```bash
# Only load characters actually used
# Current subset: Latin basic + numbers + common punctuation
# Savings: ~40% reduction in font file size
```

## 🚀 JavaScript Optimization

### Lazy Loading Interactive Components

```astro
<!-- Load only when needed -->
<SketchFilter client:visible />
<!-- When scrolled into view -->
<ShareButton client:idle />
<!-- When main thread is idle -->
<ContactForm client:media="(max-width: 768px)" />
<!-- Media query -->
```

### Bundle Splitting

```javascript
// Dynamic imports for large features
const heavyLibrary = await import('./heavy-library.js');

// Split by route
if (window.location.pathname.includes('/sketches/')) {
  await import('./sketch-features.js');
}
```

### Third-party Script Optimization

```html
<!-- Defer non-critical scripts -->
<script defer src="/js/analytics.js"></script>

<!-- Use service worker for offline functionality -->
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
</script>
```

## 📱 Mobile Performance

### Responsive Design Performance

```css
/* Mobile-first approach reduces CSS */
.sketch-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

/* Progressive enhancement for larger screens */
@media (min-width: 768px) {
  .sketch-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .sketch-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Touch Optimization

```css
/* Larger touch targets on mobile */
@media (max-width: 768px) {
  .btn,
  .nav-menu a {
    min-height: 48px; /* 48px minimum for accessibility */
    padding: var(--space-md) var(--space-lg);
  }
}

/* Reduce animation complexity on mobile */
@media (prefers-reduced-motion: reduce) {
  .emoji-cutout.flutter {
    animation: none;
  }
}
```

### Network-aware Loading

```javascript
// Reduce functionality on slow connections
if (navigator.connection && navigator.connection.effectiveType === '2g') {
  document.body.classList.add('slow-connection');
}
```

## 🎨 CSS Performance

### Magazine Cutout Optimization

```css
/* Efficient clip-path implementation */
.emoji-cutout {
  /* Use transform3d to leverage GPU */
  transform: translate3d(0, 0, 0);

  /* Optimize will-change for animations */
  will-change: transform;

  /* Contain layout and paint */
  contain: layout style paint;
}

.emoji-cutout.flutter {
  /* Efficient animation using transform only */
  animation: flutter 3s ease-in-out infinite;
}

@keyframes flutter {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(-1deg);
  }
  50% {
    transform: translate3d(0, -2px, 0) rotate(1deg);
  }
}
```

### CSS Containment

```css
/* Isolate layout impacts */
.sketch-card {
  contain: layout style;
}

.emoji-cutout {
  contain: layout style paint;
}

/* For components with many child elements */
.sketches-grid {
  contain: layout;
}
```

## 🔍 Performance Monitoring

### Build-time Analysis

```bash
# Bundle size analysis
npm run build:analyze

# Performance budget check
npm run lighthouse:ci

# Critical CSS extraction
npm run critical:css
```

### Runtime Monitoring

```javascript
// Core Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);

// Custom performance marks
performance.mark('emoji-cutout-start');
// ... emoji rendering code
performance.mark('emoji-cutout-end');
performance.measure(
  'emoji-cutout-render',
  'emoji-cutout-start',
  'emoji-cutout-end'
);
```

### Lighthouse CI Integration

```yaml
# .github/workflows/performance.yml
- name: Lighthouse CI
  run: |
    npm install -g @lhci/cli
    lhci autorun
  env:
    LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

## 🛠️ Development Performance Tools

### Local Testing

```bash
# Test production build locally
npm run build
npm run preview

# Lighthouse CLI
npx lighthouse http://localhost:4321/testigos-solarpunk/ --view

# Bundle analyzer
npx vite-bundle-analyzer dist/

# Core Web Vitals testing
npx @web/dev-server --open --watch
```

### Browser DevTools

- **Performance Panel**: Profile magazine cutout animations
- **Network Panel**: Monitor resource loading
- **Coverage Panel**: Identify unused CSS/JS
- **Memory Panel**: Check for memory leaks

## 📊 Performance Budget

### File Size Limits

```json
{
  "budget": {
    "javascript": "100kb",
    "css": "50kb",
    "images": "500kb",
    "fonts": "100kb",
    "total": "1mb"
  }
}
```

### Performance Metrics Budget

```yaml
performance:
  lighthouse:
    performance: 95
    accessibility: 98
    best-practices: 95
    seo: 95
  core-web-vitals:
    lcp: 2500 # ms
    fid: 100 # ms
    cls: 0.1 # score
```

## 🚀 Optimization Checklist

### Pre-deployment ✅

- [ ] Lighthouse score >95 on all metrics
- [ ] All images optimized (WebP/AVIF)
- [ ] Critical CSS inlined
- [ ] Fonts preloaded and subset
- [ ] JavaScript tree-shaken and minified
- [ ] Service worker configured
- [ ] Magazine cutout animations optimized

### Post-deployment ✅

- [ ] Real User Monitoring (RUM) data collected
- [ ] Core Web Vitals under thresholds
- [ ] CDN cache hit rate >90%
- [ ] Time to Interactive <3s
- [ ] Bundle size within budget
- [ ] Accessibility score maintained

## 🔄 Continuous Optimization

### Automated Performance Testing

```javascript
// Performance regression testing
describe('Performance', () => {
  it('should load homepage under 2 seconds', async () => {
    const metrics = await lighthouse('/', {
      preset: 'perf',
      onlyCategories: ['performance'],
    });

    expect(metrics.lcp).toBeLessThan(2500);
    expect(metrics.fid).toBeLessThan(100);
  });
});
```

### Performance Reviews

- **Weekly**: Review Core Web Vitals dashboard
- **Monthly**: Bundle size analysis and optimization
- **Quarterly**: Complete performance audit
- **Per Release**: Lighthouse CI checks required

---

**Performance Champions**: Cada desarrollador es responsable del performance
**Tools**: Lighthouse, Web Vitals, Bundle Analyzer
**Budget**: Strict limits to maintain UX quality
**Monitoring**: Continuous tracking of user experience metrics
