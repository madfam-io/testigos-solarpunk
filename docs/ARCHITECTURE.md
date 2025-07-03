# 🏗️ Architecture Overview - Testigos de Solarpunk

## Project Structure

```
testigos-solarpunk/
├── src/
│   ├── components/          # Reusable Astro components
│   ├── layouts/            # Page layouts (BaseLayout.astro)
│   ├── pages/              # Route-based pages
│   │   ├── es/            # Spanish content
│   │   └── en/            # English content
│   ├── styles/            # Global CSS and design tokens
│   ├── utils/             # Helper functions and utilities
│   ├── services/          # Business logic services
│   ├── i18n/              # Internationalization config
│   └── lib/               # Shared constants
├── public/                # Static assets
│   ├── images/           # Optimized images
│   ├── fonts/            # Web fonts
│   └── sw.js             # Service worker
├── tests/                # Test suites
└── scripts/              # Build and optimization scripts
```

## Key Design Decisions

### 1. Framework: Astro

- **Why**: Static site generation with optimal performance
- **Benefits**: Zero JS by default, island architecture, built-in i18n
- **Trade-offs**: Limited interactivity (mitigated with Astro islands)

### 2. Styling: CSS with Design Tokens

- **Why**: Performance and maintainability
- **Benefits**: No runtime overhead, easy theming, browser-native
- **Implementation**: CSS custom properties for dynamic theming

### 3. Internationalization

- **Strategy**: Path-based routing (/es/, /en/)
- **Default**: Spanish (es-MX)
- **Implementation**: Custom i18n system with route mapping

### 4. Performance Optimizations

- **Bundle Size**: <400KB target achieved
- **Critical CSS**: Inline for above-fold content
- **Images**: WebP with fallbacks, lazy loading
- **Caching**: Multi-tier service worker strategy

### 5. Magazine Cutout Aesthetic

- **Implementation**: Pure CSS with clip-path and transforms
- **Performance**: Split into critical and async styles
- **Consistency**: Utility classes for reusable effects

## Component Architecture

### Base Components

- `BaseLayout.astro`: Main layout with theme, i18n, and PWA support
- `MagazineCutoutImage.astro`: Image component with cutout effects
- `CharacterCard.astro`: Reusable character display component

### Utility Systems

- **Theme Manager**: Handles light/dark/cosmic themes
- **Logger**: Environment-aware logging with telemetry
- **Telemetry**: Privacy-first analytics
- **Accessibility**: Automated ARIA and focus management

## Performance Strategy

### Build-time Optimizations

1. **Tree Shaking**: Remove unused code
2. **Minification**: Terser with aggressive settings
3. **Compression**: Brotli and Gzip for all assets
4. **Code Splitting**: Manual chunks for better caching

### Runtime Optimizations

1. **Service Worker**: Offline support and intelligent caching
2. **Resource Hints**: Preconnect and DNS prefetch
3. **Lazy Loading**: Images and non-critical resources
4. **Font Loading**: FOUT strategy with system fallbacks

## Security Considerations

1. **CSP Headers**: Restrictive content security policy
2. **No External Dependencies**: Minimal attack surface
3. **Input Sanitization**: All user inputs validated
4. **HTTPS Only**: Enforced via redirects

## Testing Strategy

- **Unit Tests**: Vitest for utilities and components
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Playwright for critical user paths
- **Coverage Target**: 95%+ for critical code

## Deployment

- **Platform**: GitHub Pages
- **CI/CD**: GitHub Actions with automated testing
- **Preview**: Branch deployments for PRs
- **Monitoring**: Built-in telemetry system

## Future Considerations

1. **Edge Functions**: For dynamic content when needed
2. **View Transitions**: Native Astro support when stable
3. **Incremental Static Regeneration**: For frequently updated content
4. **Web Components**: For highly interactive features

## Development Guidelines

1. **Component First**: Build reusable components
2. **Performance Budget**: Every KB counts
3. **Accessibility First**: WCAG 2.1 AA compliance
4. **Mobile First**: Design for smallest screens
5. **Progressive Enhancement**: Core functionality without JS
