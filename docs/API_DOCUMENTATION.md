# 📚 API Documentation - Testigos de Solarpunk

Documentación técnica de las utilidades, componentes y funciones principales del proyecto.

## 🌐 Internacionalización (i18n)

### `/src/i18n/config.ts`

#### `t(key: string, lang?: Language): string`

Función principal de traducción.

```typescript
import { t } from '@/i18n/config';

// Uso básico
const title = t('nav.home'); // "Inicio" | "Home"

// Con idioma específico
const title = t('nav.home', 'en'); // "Home"
```

#### `getTranslatedRoute(route: string, lang: Language): string`

Convierte rutas entre idiomas.

```typescript
// Convertir ruta española a inglesa
const enRoute = getTranslatedRoute('/es/proyecto', 'en');
// Resultado: '/en/project'
```

#### `detectLanguage(): Language`

Detecta idioma preferido del usuario.

```typescript
const userLang = detectLanguage();
// Detecta desde: URL → localStorage → navigator.language → 'es'
```

#### `isValidLanguage(lang: string): boolean`

Valida si un idioma es soportado.

```typescript
isValidLanguage('es'); // true
isValidLanguage('fr'); // false
```

## 🎨 Sistema de Themes

### `/src/utils/theme-manager.ts`

#### `ThemeManager`

Clase singleton para gestión de themes.

```typescript
import { ThemeManager } from '@/utils/theme-manager';

const themeManager = ThemeManager.getInstance();

// Cambiar theme
await themeManager.setTheme('dark');

// Obtener theme actual
const currentTheme = themeManager.getCurrentTheme(); // 'light' | 'dark'

// Detectar preferencia del sistema
const systemTheme = themeManager.getSystemTheme();

// Escuchar cambios
themeManager.onThemeChange((theme) => {
  console.log(`Theme changed to: ${theme}`);
});
```

#### Métodos Disponibles

| Método                    | Descripción             | Retorno             |
| ------------------------- | ----------------------- | ------------------- |
| `setTheme(theme)`         | Cambia theme y persiste | `Promise<void>`     |
| `getCurrentTheme()`       | Theme actual            | `'light' \| 'dark'` |
| `getSystemTheme()`        | Preferencia del sistema | `'light' \| 'dark'` |
| `toggleTheme()`           | Alterna entre themes    | `Promise<void>`     |
| `onThemeChange(callback)` | Escucha cambios         | `void`              |

## 📊 Telemetría y Analytics

### `/src/utils/telemetry.ts`

#### `Telemetry`

Sistema de analytics privacy-first.

```typescript
import { Telemetry } from '@/utils/telemetry';

const telemetry = Telemetry.getInstance();

// Trackear evento
telemetry.track('page_view', {
  page: '/proyecto',
  referrer: document.referrer,
});

// Trackear error
telemetry.trackError(new Error('API failed'), {
  endpoint: '/api/data',
  context: 'user_action',
});

// Métricas de performance
telemetry.trackPerformance('page_load', {
  url: window.location.href,
  loadTime: 1250,
});
```

#### Eventos Predefinidos

| Evento             | Descripción      | Datos                           |
| ------------------ | ---------------- | ------------------------------- |
| `page_view`        | Vista de página  | `{ page, referrer, timestamp }` |
| `theme_change`     | Cambio de theme  | `{ from, to, method }`          |
| `language_change`  | Cambio idioma    | `{ from, to, method }`          |
| `navigation_click` | Click navegación | `{ target, source }`            |
| `error_occurred`   | Error capturado  | `{ message, stack, context }`   |

## ♿ Accesibilidad

### `/src/utils/accessibility.ts`

#### `AccessibilityManager`

Herramientas de accesibilidad mejoradas.

```typescript
import { AccessibilityManager } from '@/utils/accessibility';

const a11y = AccessibilityManager.getInstance();

// Configurar navegación por teclado
a11y.enableKeyboardNavigation();

// Anunciar cambios a screen readers
a11y.announce('Contenido actualizado', 'polite');

// Gestionar focus
a11y.trapFocus(modalElement);
a11y.restoreFocus();

// Validar contraste
const isValid = a11y.checkColorContrast('#1976d2', '#ffffff');
// true si cumple WCAG AA
```

#### Métodos de Validación

```typescript
// Validar estructura ARIA
a11y.validateARIA(element);

// Verificar landmarks
a11y.validateLandmarks(document);

// Audit completo
const audit = await a11y.runAccessibilityAudit();
```

## 🗂️ Cache Management

### `/src/utils/cache-buster.ts`

#### `CacheBuster`

Gestión inteligente de cache del navegador.

```typescript
import { CacheBuster } from '@/utils/cache-buster';

const cache = new CacheBuster();

// Limpiar cache específico
await cache.clearCache('api-responses');

// Invalidar por pattern
await cache.invalidatePattern('/api/users/*');

// Estrategia de cache
cache.setStrategy('api-responses', {
  maxAge: 300000, // 5 minutos
  maxEntries: 100,
});

// Service Worker management
await cache.updateServiceWorker();
```

## 📝 Logging System

### `/src/utils/logger.ts`

#### `Logger`

Sistema de logging production-safe.

```typescript
import { Logger } from '@/utils/logger';

const logger = Logger.getInstance();

// Diferentes niveles
logger.debug('Debug info', { userId: 123 });
logger.info('User action', { action: 'login' });
logger.warn('Deprecated API used', { endpoint: '/old-api' });
logger.error('API Error', error, { context: 'payment' });

// En producción, debug no se muestra
// En desarrollo, todos los niveles visible
```

#### Configuración

```typescript
// Personalizar logger
logger.configure({
  level: 'info',
  enableTelemetry: true,
  maxHistoryEntries: 1000,
});

// Obtener historial
const history = logger.getHistory();
```

## 🏗️ Build Utilities

### `/scripts/generate-manifest.js`

#### Generación de PWA Manifest

```bash
# GitHub Pages
node scripts/generate-manifest.js --github

# Vercel
node scripts/generate-manifest.js --vercel

# Custom domain
node scripts/generate-manifest.js --domain=universo.testigosdesolarpunk.mx
```

### `/scripts/health-check-themes.ts`

#### Health Check de Themes

```typescript
// Verificar consistencia de CSS variables
import { runThemeHealthCheck } from './health-check-themes';

const results = await runThemeHealthCheck();
// {
//   missingVariables: string[],
//   hardcodedColors: Array<{file: string, color: string}>,
//   inconsistencies: string[]
// }
```

## 🔧 Test Utilities

### Browser API Mocking

```typescript
// `/tests/setup.ts`
import { mockBrowserAPIs } from '@/tests/mocks/browser-apis';

beforeEach(() => {
  mockBrowserAPIs();
});
```

#### Mocks Disponibles

- `localStorage` / `sessionStorage`
- `matchMedia` para responsive testing
- `IntersectionObserver` para lazy loading
- `PerformanceObserver` para métricas
- `fetch` para API calls

### Testing Helpers

```typescript
import {
  createMockProps,
  createMockContext,
  waitForElement,
} from '@/tests/helpers';

// Props de componente
const props = createMockProps<ComponentProps>({
  title: 'Test Title',
});

// Context de Astro
const context = createMockContext({
  url: new URL('http://localhost/test'),
});
```

## 🚀 Performance Utilities

### Lazy Loading

```typescript
// Implementación automática en imágenes
import { setupLazyLoading } from '@/utils/lazy-loading';

setupLazyLoading({
  threshold: 0.1,
  rootMargin: '50px',
});
```

### Bundle Analysis

```bash
# Analizar bundle
npm run build:analyze

# Genera report en `dist/stats.html`
```

## 📱 PWA Features

### Service Worker

```typescript
// Registro automático en production
// Manual control disponible
if ('serviceWorker' in navigator) {
  const registration = await navigator.serviceWorker.register('/sw.js');
  // Handle updates
}
```

### Install Prompt

```typescript
// Componente PWAInstaller.astro
// Maneja prompt de instalación automáticamente
// Muestra banner de actualización cuando hay nueva versión
```

## 🔐 Security Utilities

### Content Security Policy

Headers automáticos configurados:

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
```

### Input Sanitization

```typescript
import { sanitizeInput } from '@/utils/security';

// Limpiar input de usuario
const clean = sanitizeInput(userInput);
```

## 📈 Analytics Events

### Tracking Personalizado

```typescript
// Page views (automático)
telemetry.track('page_view', {
  page: '/proyecto',
  referrer: document.referrer,
});

// User interactions
telemetry.track('button_click', {
  button: 'cta-principal',
  location: 'hero',
});

// Performance metrics
telemetry.trackPerformance('resource_load', {
  resource: 'critical.css',
  loadTime: 125,
});
```

## 🌟 Magazine Cutout System

### CSS Classes

```css
/* Tamaños */
.emoji-sm {
  --emoji-size: 1.2rem;
}
.emoji-md {
  --emoji-size: 1.5rem;
}
.emoji-lg {
  --emoji-size: 2rem;
}
.emoji-xl {
  --emoji-size: 2.5rem;
}

/* Contextos */
.emoji-nav {
  /* Navegación */
}
.emoji-hero {
  /* Hero sections */
}
.emoji-card {
  /* Tarjetas */
}
.emoji-button {
  /* Botones */
}

/* Themes */
.emoji-solar {
  --emoji-filter: sepia(1) hue-rotate(45deg);
}
.emoji-eco {
  --emoji-filter: sepia(1) hue-rotate(90deg);
}
.emoji-tech {
  --emoji-filter: sepia(1) hue-rotate(210deg);
}
```

### Uso en Componentes

```astro
<!-- Siempre usar clases del sistema -->
<span class="emoji-magazine-cutout emoji-md emoji-solar">🌞</span>

<!-- Con animación -->
<button class="emoji-button">
  <span class="emoji-magazine-cutout emoji-lg emoji-flutter">🚀</span>
  Acción
</button>
```

## 🔍 Error Handling

### Error Boundaries

```typescript
// Componente con error handling
try {
  const data = await fetchData();
} catch (error) {
  logger.error('Fetch failed', error);
  telemetry.trackError(error, { context: 'data_fetch' });
  // Fallback UI
}
```

### Global Error Handler

```typescript
// src/utils/error-handler.ts
window.addEventListener('error', (event) => {
  logger.error('Global error', event.error);
  telemetry.trackError(event.error, {
    source: 'global_handler',
    filename: event.filename,
    lineno: event.lineno,
  });
});
```

---

_API Documentation generada para v0.4.0_
_MADFAM - Testigos de Solarpunk_
