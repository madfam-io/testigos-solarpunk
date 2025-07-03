# Utilities Documentation

## Overview

The utilities directory contains essential helper functions and services that power the Testigos de Solarpunk platform. These utilities are designed with performance, accessibility, and developer experience in mind.

## Core Utilities

### Theme Manager (`theme-manager.ts`)

Manages the application's theme system with support for light, dark, and cosmic themes.

- **Features**: Automatic system preference detection, smooth transitions, localStorage persistence
- **Usage**: Imported automatically in BaseLayout.astro
- **Coverage**: 99.11%

### Logger (`logger.ts`)

Provides structured logging with multiple levels and history tracking.

- **Features**: Color-coded output, context tracking, error boundaries
- **Usage**: `import { log } from '@/utils/logger'`
- **Coverage**: 81.37% (lower due to browser-specific code)

### Telemetry (`telemetry.ts`)

Privacy-first analytics system for tracking performance and user interactions.

- **Features**: Web Vitals tracking, custom events, consent management
- **Usage**: `import telemetry from '@/utils/telemetry'`
- **Coverage**: 67.02% (lower due to production-only features)

### Accessibility Helpers (`accessibility-helpers.ts`)

Enhances accessibility across the application.

- **Features**: Skip navigation, keyboard focus management, ARIA improvements
- **Usage**: Called automatically in BaseLayout
- **Coverage**: 100%

### Image Lazy Loading (`image-lazy-load.ts`)

Optimizes image loading performance.

- **Features**: Native lazy loading support, Intersection Observer fallback
- **Usage**: Applied to all images with `data-lazy` attribute
- **Coverage**: 100%

### Cache Buster (`cache-buster.ts`)

Provides utilities for clearing caches and forcing updates.

- **Features**: Service worker management, cache clearing, force refresh
- **Usage**: Available globally as `window.cacheBuster`
- **Coverage**: 100%

## Best Practices

1. **Import Aliases**: Use `@/utils/` for consistent imports
2. **Error Handling**: All utilities include proper error boundaries
3. **Type Safety**: Full TypeScript coverage with strict mode
4. **Performance**: Utilities are tree-shakeable and optimized
5. **Testing**: Comprehensive unit tests for all public APIs

## Performance Considerations

- Theme Manager uses CSS variables for instant theme switching
- Logger batches console operations in production
- Telemetry respects user privacy and consent
- Image lazy loading reduces initial page weight
- Cache buster ensures users get latest updates

## Browser Support

All utilities support modern browsers with graceful fallbacks:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)
