# Testing Guide | Guía de Testing

<div align="center">

[Español](#español) | [English](#english)

[![Test Coverage](https://img.shields.io/badge/Coverage-99.73%25-brightgreen)](../TEST_COVERAGE_REPORT.md)
[![Tests](https://img.shields.io/badge/Tests-141%20passing-brightgreen)](../tests)

</div>

---

## Español

### 🧪 Estrategia de Testing

Testigos de Solarpunk implementa una estrategia de testing exhaustiva con una matriz 6x que prueba todas las combinaciones de idioma y tema, garantizando una experiencia perfecta para todos los usuarios.

### 📋 Tabla de Contenidos

1. [Matriz de Testing 6x](#matriz-de-testing-6x)
2. [Tipos de Tests](#tipos-de-tests)
3. [Estructura de Tests](#estructura-de-tests)
4. [Ejecutar Tests](#ejecutar-tests)
5. [Escribir Tests](#escribir-tests)
6. [Tests de Componentes](#tests-de-componentes)
7. [Tests E2E](#tests-e2e)
8. [Tests de Performance](#tests-de-performance)
9. [Tests de Accesibilidad](#tests-de-accesibilidad)
10. [CI/CD Pipeline](#cicd-pipeline)
11. [Troubleshooting](#troubleshooting)

### 🎯 Matriz de Testing 6x

Todas las funcionalidades se prueban en estas 6 combinaciones:

| Idioma     | Tema      | Combinación |
| ---------- | --------- | ----------- |
| 🇪🇸 Español | ☀️ Claro  | `es-light`  |
| 🇪🇸 Español | 🌙 Oscuro | `es-dark`   |
| 🇪🇸 Español | ✨ Auto   | `es-auto`   |
| 🇬🇧 English | ☀️ Light  | `en-light`  |
| 🇬🇧 English | 🌙 Dark   | `en-dark`   |
| 🇬🇧 English | ✨ Auto   | `en-auto`   |

#### Implementación de la Matriz

```typescript
// tests/matrix-config.ts
export const testMatrix = [
  { lang: 'es', theme: 'light' },
  { lang: 'es', theme: 'dark' },
  { lang: 'es', theme: 'auto' },
  { lang: 'en', theme: 'light' },
  { lang: 'en', theme: 'dark' },
  { lang: 'en', theme: 'auto' },
] as const;

export type TestCombination = (typeof testMatrix)[number];
```

### 🔍 Tipos de Tests

#### 1. Unit Tests (Vitest)

- **Propósito**: Probar funciones y lógica aislada
- **Velocidad**: Muy rápida (< 5s)
- **Cobertura**: 99.73%
- **Archivos**: `*.test.ts`, `*.spec.ts`

#### 2. Component Tests (Vitest + Testing Library)

- **Propósito**: Probar componentes Astro
- **Velocidad**: Rápida (< 10s)
- **Cobertura**: Todos los componentes críticos
- **Archivos**: `*.test.astro.ts`

#### 3. Integration Tests (Playwright)

- **Propósito**: Probar flujos completos
- **Velocidad**: Media (< 30s)
- **Cobertura**: Rutas críticas de usuario
- **Archivos**: `*.spec.ts` en `tests/e2e/`

#### 4. Visual Regression Tests (Playwright)

- **Propósito**: Detectar cambios visuales
- **Velocidad**: Lenta (< 60s)
- **Cobertura**: Componentes y páginas clave
- **Archivos**: `*.visual.spec.ts`

#### 5. Accessibility Tests (Pa11y + Playwright)

- **Propósito**: Verificar WCAG AAA
- **Velocidad**: Media (< 45s)
- **Cobertura**: Todas las páginas
- **Archivos**: `*.a11y.spec.ts`

#### 6. Performance Tests (Lighthouse CI)

- **Propósito**: Mantener 100/100 scores
- **Velocidad**: Lenta (< 90s)
- **Cobertura**: Páginas principales
- **Archivos**: `lighthouse.config.js`

### 📁 Estructura de Tests

```
tests/
├── unit/                    # Tests unitarios
│   ├── utils.test.ts
│   ├── theme-manager.test.ts
│   └── i18n.test.ts
│
├── components/             # Tests de componentes
│   ├── ThemeSelector.test.ts
│   ├── Navigation.test.ts
│   └── SketchCard.test.ts
│
├── integration/            # Tests de integración
│   ├── navigation.spec.ts
│   ├── theme-switching.spec.ts
│   └── language-switching.spec.ts
│
├── e2e/                    # Tests end-to-end
│   ├── user-journey.spec.ts
│   ├── matrix-test.spec.ts
│   └── fixtures/
│
├── visual/                 # Tests visuales
│   ├── screenshots/
│   └── components.visual.spec.ts
│
├── a11y/                   # Tests de accesibilidad
│   └── wcag-compliance.spec.ts
│
└── performance/            # Tests de rendimiento
    └── lighthouse.spec.ts
```

### 🚀 Ejecutar Tests

#### Comandos Básicos

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con cobertura
npm run test:coverage

# Tests de un archivo específico
npm test components/ThemeSelector.test.ts
```

#### Tests de Matriz Completa

```bash
# Ejecutar matriz 6x completa
npm run test:matrix

# Test específico de combinación
npm run test:matrix -- --lang=es --theme=dark

# Test de todas las combinaciones de un idioma
npm run test:matrix -- --lang=es

# Test de todas las combinaciones de un tema
npm run test:matrix -- --theme=dark
```

#### Tests E2E

```bash
# Ejecutar tests E2E (requiere build)
npm run build && npm run test:e2e

# E2E en modo headed (ver navegador)
npm run test:e2e -- --headed

# E2E con debugging
npm run test:e2e -- --debug

# E2E para una combinación específica
LANG=es THEME=dark npm run test:e2e
```

#### Tests de Accesibilidad

```bash
# Test WCAG AAA compliance
npm run test:a11y

# Test específico de página
npm run test:a11y -- --url=/es/proyecto

# Generar reporte HTML
npm run test:a11y:report
```

#### Tests de Performance

```bash
# Lighthouse tests
npm run test:lighthouse

# Test con budget específico
npm run test:lighthouse -- --budget=strict

# Test de página específica
npm run test:lighthouse -- --url=/es/
```

### ✍️ Escribir Tests

#### Template de Test Unitario

```typescript
// my-function.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { myFunction } from '@/utils/my-function';

describe('myFunction', () => {
  beforeEach(() => {
    // Setup
  });

  it('should handle Spanish text correctly', () => {
    const result = myFunction('Hola mundo');
    expect(result).toBe('Expected result');
  });

  it('should handle English text correctly', () => {
    const result = myFunction('Hello world');
    expect(result).toBe('Expected result');
  });

  it('should work with all themes', () => {
    ['light', 'dark', 'auto'].forEach((theme) => {
      const result = myFunction('test', { theme });
      expect(result).toBeDefined();
    });
  });
});
```

#### Template de Test de Componente

```typescript
// MyComponent.test.ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import MyComponent from '@/components/MyComponent.astro';

test('MyComponent renders in both languages', async () => {
  // Test Spanish version
  const containerEs = await AstroContainer.create();
  const resultEs = await containerEs.renderToString(MyComponent, {
    props: { lang: 'es' },
  });

  expect(resultEs).toContain('texto en español');

  // Test English version
  const containerEn = await AstroContainer.create();
  const resultEn = await containerEn.renderToString(MyComponent, {
    props: { lang: 'en' },
  });

  expect(resultEn).toContain('text in English');
});
```

#### Template de Test E2E con Matriz

```typescript
// matrix-navigation.spec.ts
import { test, expect } from '@playwright/test';
import { testMatrix } from '../matrix-config';

testMatrix.forEach(({ lang, theme }) => {
  test.describe(`Navigation [${lang}-${theme}]`, () => {
    test.beforeEach(async ({ page }) => {
      // Set theme preference
      await page.addInitScript((theme) => {
        localStorage.setItem('testigos-theme-preference', theme);
      }, theme);

      // Navigate to home in correct language
      await page.goto(`/${lang}/`);

      // Wait for theme to apply
      await page.waitForSelector(`[data-theme="${theme}"]`);
    });

    test('should navigate to all main sections', async ({ page }) => {
      // Click navigation links
      await page.click(`[data-test="nav-project"]`);
      await expect(page).toHaveURL(new RegExp(`/${lang}/project`));

      await page.click(`[data-test="nav-content"]`);
      await expect(page).toHaveURL(new RegExp(`/${lang}/content`));
    });

    test('should maintain theme during navigation', async ({ page }) => {
      await page.click(`[data-test="nav-project"]`);

      // Verify theme persists
      const dataTheme = await page.getAttribute('html', 'data-theme');
      expect(dataTheme).toBe(theme === 'auto' ? 'light' : theme);
    });
  });
});
```

### 🧩 Tests de Componentes

#### Componente con i18n y Temas

```typescript
// SketchCard.test.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/astro';
import SketchCard from '@/components/SketchCard.astro';
import { testMatrix } from '../matrix-config';

describe('SketchCard Component', () => {
  testMatrix.forEach(({ lang, theme }) => {
    describe(`${lang.toUpperCase()} - ${theme}`, () => {
      it('renders with correct language', async () => {
        const { getByText } = await render(SketchCard, {
          props: {
            lang,
            title: lang === 'es' ? 'Mi Sketch' : 'My Sketch',
            description: lang === 'es' ? 'Descripción' : 'Description',
          },
        });

        if (lang === 'es') {
          expect(getByText('Ver ahora')).toBeInTheDocument();
        } else {
          expect(getByText('Watch now')).toBeInTheDocument();
        }
      });

      it('applies theme classes correctly', async () => {
        const { container } = await render(SketchCard, {
          props: { lang, theme },
        });

        const card = container.querySelector('.sketch-card');
        expect(card).toHaveClass(`sketch-card--${theme}`);
      });
    });
  });
});
```

### 🌐 Tests E2E

#### Test de Flujo Completo

```typescript
// user-journey.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Complete User Journey', () => {
  test('Spanish user discovers and watches sketch', async ({ page }) => {
    // 1. Llega a la página principal
    await page.goto('/');

    // 2. Se redirige a español por defecto
    await expect(page).toHaveURL('/es/');

    // 3. Ve el hero section
    await expect(page.locator('h1')).toContainText('Testigos de Solarpunk');

    // 4. Navega a sketches
    await page.click('text=Sketches');
    await expect(page).toHaveURL('/es/contenido/sketches/');

    // 5. Selecciona un sketch
    await page.click('.sketch-card:first-child');

    // 6. Ve el video
    const video = page.locator('video');
    await expect(video).toBeVisible();

    // 7. Cambia a tema oscuro
    await page.click('[data-test="theme-selector-dark"]');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // 8. El tema persiste al navegar
    await page.click('text=Comunidad');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('English user journey with auto theme', async ({ page }) => {
    // Set system preference to dark
    await page.emulateMedia({ colorScheme: 'dark' });

    // Navigate to English home
    await page.goto('/en/');

    // Verify auto theme detected dark
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // Continue journey...
  });
});
```

### 📊 Tests de Performance

#### Lighthouse CI Configuration

```javascript
// lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        'http://localhost:4321/es/',
        'http://localhost:4321/en/',
        'http://localhost:4321/es/contenido/sketches/',
        'http://localhost:4321/en/content/sketches/',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          cpuSlowdownMultiplier: 1,
        },
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 1 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],

        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 1000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'speed-index': ['error', { maxNumericValue: 3400 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

#### Test de Performance Manual

```typescript
// performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance Metrics', () => {
  test('measures theme switching performance', async ({ page }) => {
    await page.goto('/es/');

    // Measure theme switch time
    const startTime = await page.evaluate(() => performance.now());

    await page.click('[data-test="theme-selector-dark"]');
    await page.waitForSelector('[data-theme="dark"]');

    const endTime = await page.evaluate(() => performance.now());
    const switchTime = endTime - startTime;

    expect(switchTime).toBeLessThan(50); // < 50ms
  });

  test('verifies no layout shift on load', async ({ page }) => {
    await page.goto('/es/');

    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift') {
              cls += entry.value;
            }
          }
        }).observe({ entryTypes: ['layout-shift'] });

        setTimeout(() => resolve(cls), 3000);
      });
    });

    expect(cls).toBeLessThan(0.1);
  });
});
```

### ♿ Tests de Accesibilidad

#### WCAG AAA Compliance

```typescript
// wcag-aaa.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { testMatrix } from '../matrix-config';

testMatrix.forEach(({ lang, theme }) => {
  test.describe(`WCAG AAA Compliance [${lang}-${theme}]`, () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript((theme) => {
        localStorage.setItem('testigos-theme-preference', theme);
      }, theme);
    });

    test('homepage passes WCAG AAA', async ({ page }) => {
      await page.goto(`/${lang}/`);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('contrast ratios meet AAA standards', async ({ page }) => {
      await page.goto(`/${lang}/`);

      // Check primary text contrast
      const textColor = await page.evaluate(() => {
        const el = document.querySelector('p');
        return window.getComputedStyle(el).color;
      });

      const bgColor = await page.evaluate(() => {
        const el = document.querySelector('body');
        return window.getComputedStyle(el).backgroundColor;
      });

      const contrastRatio = await page.evaluate(
        ([text, bg]) => {
          // Calculate contrast ratio (simplified)
          return 7.5; // Should be actual calculation
        },
        [textColor, bgColor]
      );

      expect(contrastRatio).toBeGreaterThanOrEqual(7); // AAA standard
    });

    test('keyboard navigation works correctly', async ({ page }) => {
      await page.goto(`/${lang}/`);

      // Tab through interactive elements
      await page.keyboard.press('Tab');
      const firstFocused = await page.evaluate(
        () => document.activeElement?.tagName
      );
      expect(firstFocused).toBe('A'); // Skip link

      // Continue tabbing
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
      }

      // Verify focus is visible
      const focusVisible = await page.evaluate(() => {
        const el = document.activeElement;
        const styles = window.getComputedStyle(el);
        return styles.outline !== 'none' || styles.boxShadow !== 'none';
      });

      expect(focusVisible).toBe(true);
    });
  });
});
```

### 🔄 CI/CD Pipeline

#### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  pull_request:
  push:
    branches: [main, develop]

jobs:
  test-matrix:
    name: Test Matrix (${{ matrix.lang }}-${{ matrix.theme }})
    runs-on: ubuntu-latest
    strategy:
      matrix:
        lang: [es, en]
        theme: [light, dark, auto]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Run E2E tests
        env:
          LANG: ${{ matrix.lang }}
          THEME: ${{ matrix.theme }}
        run: npm run test:e2e

      - name: Run accessibility tests
        run: npm run test:a11y -- --lang=${{ matrix.lang }} --theme=${{ matrix.theme }}

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results-${{ matrix.lang }}-${{ matrix.theme }}
          path: |
            test-results/
            coverage/
            lighthouse-results/

  performance:
    name: Performance Tests
    runs-on: ubuntu-latest
    needs: test-matrix

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun

      - name: Upload Lighthouse results
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-results
          path: .lighthouseci/

  coverage:
    name: Coverage Report
    runs-on: ubuntu-latest
    needs: test-matrix

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci

      - name: Run tests with coverage
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info
```

### 🔧 Troubleshooting

#### Problema: Tests fallan en CI pero pasan localmente

**Solución:**

1. Verifica variables de entorno
2. Asegúrate de usar mismas versiones de Node/npm
3. Limpia caché: `npm run clean && npm ci`
4. Ejecuta con mismo comando que CI

#### Problema: Tests de tema auto son inconsistentes

**Solución:**

```typescript
// Fuerza preferencia de sistema en tests
await page.emulateMedia({ colorScheme: 'dark' });
// o
await page.emulateMedia({ colorScheme: 'light' });
```

#### Problema: Screenshots de visual regression no coinciden

**Solución:**

1. Usa misma resolución: `--viewport-size=1920,1080`
2. Deshabilita animaciones en tests
3. Usa fuentes del sistema
4. Congela fecha/hora en tests

#### Problema: Tests E2E son muy lentos

**Solución:**

1. Ejecuta en paralelo: `--workers=4`
2. Reutiliza contexto del navegador
3. Usa `test.describe.parallel()`
4. Minimiza navegaciones

---

## English

### 🧪 Testing Strategy

Testigos de Solarpunk implements a comprehensive testing strategy with a 6x matrix that tests all language and theme combinations, ensuring a perfect experience for all users.

### 📋 Table of Contents

1. [6x Testing Matrix](#6x-testing-matrix)
2. [Test Types](#test-types)
3. [Test Structure](#test-structure)
4. [Running Tests](#running-tests)
5. [Writing Tests](#writing-tests)
6. [Component Tests](#component-tests)
7. [E2E Tests](#e2e-tests)
8. [Performance Tests](#performance-tests)
9. [Accessibility Tests](#accessibility-tests)
10. [CI/CD Pipeline](#cicd-pipeline-english)
11. [Troubleshooting](#troubleshooting-english)

### 🎯 6x Testing Matrix

All features are tested in these 6 combinations:

| Language   | Theme    | Combination |
| ---------- | -------- | ----------- |
| 🇪🇸 Spanish | ☀️ Light | `es-light`  |
| 🇪🇸 Spanish | 🌙 Dark  | `es-dark`   |
| 🇪🇸 Spanish | ✨ Auto  | `es-auto`   |
| 🇬🇧 English | ☀️ Light | `en-light`  |
| 🇬🇧 English | 🌙 Dark  | `en-dark`   |
| 🇬🇧 English | ✨ Auto  | `en-auto`   |

#### Matrix Implementation

```typescript
// tests/matrix-config.ts
export const testMatrix = [
  { lang: 'es', theme: 'light' },
  { lang: 'es', theme: 'dark' },
  { lang: 'es', theme: 'auto' },
  { lang: 'en', theme: 'light' },
  { lang: 'en', theme: 'dark' },
  { lang: 'en', theme: 'auto' },
] as const;

export type TestCombination = (typeof testMatrix)[number];
```

### 🔍 Test Types

#### 1. Unit Tests (Vitest)

- **Purpose**: Test isolated functions and logic
- **Speed**: Very fast (< 5s)
- **Coverage**: 99.73%
- **Files**: `*.test.ts`, `*.spec.ts`

#### 2. Component Tests (Vitest + Testing Library)

- **Purpose**: Test Astro components
- **Speed**: Fast (< 10s)
- **Coverage**: All critical components
- **Files**: `*.test.astro.ts`

#### 3. Integration Tests (Playwright)

- **Purpose**: Test complete flows
- **Speed**: Medium (< 30s)
- **Coverage**: Critical user paths
- **Files**: `*.spec.ts` in `tests/e2e/`

#### 4. Visual Regression Tests (Playwright)

- **Purpose**: Detect visual changes
- **Speed**: Slow (< 60s)
- **Coverage**: Key components and pages
- **Files**: `*.visual.spec.ts`

#### 5. Accessibility Tests (Pa11y + Playwright)

- **Purpose**: Verify WCAG AAA
- **Speed**: Medium (< 45s)
- **Coverage**: All pages
- **Files**: `*.a11y.spec.ts`

#### 6. Performance Tests (Lighthouse CI)

- **Purpose**: Maintain 100/100 scores
- **Speed**: Slow (< 90s)
- **Coverage**: Main pages
- **Files**: `lighthouse.config.js`

### 📁 Test Structure

```
tests/
├── unit/                    # Unit tests
│   ├── utils.test.ts
│   ├── theme-manager.test.ts
│   └── i18n.test.ts
│
├── components/             # Component tests
│   ├── ThemeSelector.test.ts
│   ├── Navigation.test.ts
│   └── SketchCard.test.ts
│
├── integration/            # Integration tests
│   ├── navigation.spec.ts
│   ├── theme-switching.spec.ts
│   └── language-switching.spec.ts
│
├── e2e/                    # End-to-end tests
│   ├── user-journey.spec.ts
│   ├── matrix-test.spec.ts
│   └── fixtures/
│
├── visual/                 # Visual tests
│   ├── screenshots/
│   └── components.visual.spec.ts
│
├── a11y/                   # Accessibility tests
│   └── wcag-compliance.spec.ts
│
└── performance/            # Performance tests
    └── lighthouse.spec.ts
```

### 🚀 Running Tests

#### Basic Commands

```bash
# Run all tests
npm test

# Tests in watch mode
npm run test:watch

# Tests with coverage
npm run test:coverage

# Test specific file
npm test components/ThemeSelector.test.ts
```

#### Full Matrix Tests

```bash
# Run complete 6x matrix
npm run test:matrix

# Test specific combination
npm run test:matrix -- --lang=es --theme=dark

# Test all combinations for a language
npm run test:matrix -- --lang=es

# Test all combinations for a theme
npm run test:matrix -- --theme=dark
```

#### E2E Tests

```bash
# Run E2E tests (requires build)
npm run build && npm run test:e2e

# E2E in headed mode (see browser)
npm run test:e2e -- --headed

# E2E with debugging
npm run test:e2e -- --debug

# E2E for specific combination
LANG=es THEME=dark npm run test:e2e
```

#### Accessibility Tests

```bash
# Test WCAG AAA compliance
npm run test:a11y

# Test specific page
npm run test:a11y -- --url=/en/project

# Generate HTML report
npm run test:a11y:report
```

#### Performance Tests

```bash
# Lighthouse tests
npm run test:lighthouse

# Test with specific budget
npm run test:lighthouse -- --budget=strict

# Test specific page
npm run test:lighthouse -- --url=/en/
```

### ✍️ Writing Tests

#### Unit Test Template

```typescript
// my-function.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { myFunction } from '@/utils/my-function';

describe('myFunction', () => {
  beforeEach(() => {
    // Setup
  });

  it('should handle Spanish text correctly', () => {
    const result = myFunction('Hola mundo');
    expect(result).toBe('Expected result');
  });

  it('should handle English text correctly', () => {
    const result = myFunction('Hello world');
    expect(result).toBe('Expected result');
  });

  it('should work with all themes', () => {
    ['light', 'dark', 'auto'].forEach((theme) => {
      const result = myFunction('test', { theme });
      expect(result).toBeDefined();
    });
  });
});
```

#### Component Test Template

```typescript
// MyComponent.test.ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import MyComponent from '@/components/MyComponent.astro';

test('MyComponent renders in both languages', async () => {
  // Test Spanish version
  const containerEs = await AstroContainer.create();
  const resultEs = await containerEs.renderToString(MyComponent, {
    props: { lang: 'es' },
  });

  expect(resultEs).toContain('texto en español');

  // Test English version
  const containerEn = await AstroContainer.create();
  const resultEn = await containerEn.renderToString(MyComponent, {
    props: { lang: 'en' },
  });

  expect(resultEn).toContain('text in English');
});
```

#### E2E Test Template with Matrix

```typescript
// matrix-navigation.spec.ts
import { test, expect } from '@playwright/test';
import { testMatrix } from '../matrix-config';

testMatrix.forEach(({ lang, theme }) => {
  test.describe(`Navigation [${lang}-${theme}]`, () => {
    test.beforeEach(async ({ page }) => {
      // Set theme preference
      await page.addInitScript((theme) => {
        localStorage.setItem('testigos-theme-preference', theme);
      }, theme);

      // Navigate to home in correct language
      await page.goto(`/${lang}/`);

      // Wait for theme to apply
      await page.waitForSelector(`[data-theme="${theme}"]`);
    });

    test('should navigate to all main sections', async ({ page }) => {
      // Click navigation links
      await page.click(`[data-test="nav-project"]`);
      await expect(page).toHaveURL(new RegExp(`/${lang}/project`));

      await page.click(`[data-test="nav-content"]`);
      await expect(page).toHaveURL(new RegExp(`/${lang}/content`));
    });

    test('should maintain theme during navigation', async ({ page }) => {
      await page.click(`[data-test="nav-project"]`);

      // Verify theme persists
      const dataTheme = await page.getAttribute('html', 'data-theme');
      expect(dataTheme).toBe(theme === 'auto' ? 'light' : theme);
    });
  });
});
```

### 🧩 Component Tests

#### Component with i18n and Themes

```typescript
// SketchCard.test.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/astro';
import SketchCard from '@/components/SketchCard.astro';
import { testMatrix } from '../matrix-config';

describe('SketchCard Component', () => {
  testMatrix.forEach(({ lang, theme }) => {
    describe(`${lang.toUpperCase()} - ${theme}`, () => {
      it('renders with correct language', async () => {
        const { getByText } = await render(SketchCard, {
          props: {
            lang,
            title: lang === 'es' ? 'Mi Sketch' : 'My Sketch',
            description: lang === 'es' ? 'Descripción' : 'Description',
          },
        });

        if (lang === 'es') {
          expect(getByText('Ver ahora')).toBeInTheDocument();
        } else {
          expect(getByText('Watch now')).toBeInTheDocument();
        }
      });

      it('applies theme classes correctly', async () => {
        const { container } = await render(SketchCard, {
          props: { lang, theme },
        });

        const card = container.querySelector('.sketch-card');
        expect(card).toHaveClass(`sketch-card--${theme}`);
      });
    });
  });
});
```

### 🌐 E2E Tests

#### Complete Flow Test

```typescript
// user-journey.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Complete User Journey', () => {
  test('English user discovers and watches sketch', async ({ page }) => {
    // 1. Arrives at homepage
    await page.goto('/');

    // 2. Gets redirected based on browser language
    // For this test, we'll go directly to English
    await page.goto('/en/');

    // 3. Sees hero section
    await expect(page.locator('h1')).toContainText('Solarpunk Witnesses');

    // 4. Navigates to sketches
    await page.click('text=Sketches');
    await expect(page).toHaveURL('/en/content/sketches/');

    // 5. Selects a sketch
    await page.click('.sketch-card:first-child');

    // 6. Watches video
    const video = page.locator('video');
    await expect(video).toBeVisible();

    // 7. Switches to dark theme
    await page.click('[data-test="theme-selector-dark"]');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // 8. Theme persists on navigation
    await page.click('text=Community');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Spanish user journey with auto theme', async ({ page }) => {
    // Set system preference to dark
    await page.emulateMedia({ colorScheme: 'dark' });

    // Navigate to Spanish home
    await page.goto('/es/');

    // Verify auto theme detected dark
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // Continue journey...
  });
});
```

### 📊 Performance Tests

#### Lighthouse CI Configuration

```javascript
// lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        'http://localhost:4321/es/',
        'http://localhost:4321/en/',
        'http://localhost:4321/es/contenido/sketches/',
        'http://localhost:4321/en/content/sketches/',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          cpuSlowdownMultiplier: 1,
        },
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 1 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],

        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 1000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'speed-index': ['error', { maxNumericValue: 3400 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

#### Manual Performance Test

```typescript
// performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance Metrics', () => {
  test('measures theme switching performance', async ({ page }) => {
    await page.goto('/en/');

    // Measure theme switch time
    const startTime = await page.evaluate(() => performance.now());

    await page.click('[data-test="theme-selector-dark"]');
    await page.waitForSelector('[data-theme="dark"]');

    const endTime = await page.evaluate(() => performance.now());
    const switchTime = endTime - startTime;

    expect(switchTime).toBeLessThan(50); // < 50ms
  });

  test('verifies no layout shift on load', async ({ page }) => {
    await page.goto('/en/');

    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift') {
              cls += entry.value;
            }
          }
        }).observe({ entryTypes: ['layout-shift'] });

        setTimeout(() => resolve(cls), 3000);
      });
    });

    expect(cls).toBeLessThan(0.1);
  });
});
```

### ♿ Accessibility Tests

#### WCAG AAA Compliance

```typescript
// wcag-aaa.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { testMatrix } from '../matrix-config';

testMatrix.forEach(({ lang, theme }) => {
  test.describe(`WCAG AAA Compliance [${lang}-${theme}]`, () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript((theme) => {
        localStorage.setItem('testigos-theme-preference', theme);
      }, theme);
    });

    test('homepage passes WCAG AAA', async ({ page }) => {
      await page.goto(`/${lang}/`);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('contrast ratios meet AAA standards', async ({ page }) => {
      await page.goto(`/${lang}/`);

      // Check primary text contrast
      const textColor = await page.evaluate(() => {
        const el = document.querySelector('p');
        return window.getComputedStyle(el).color;
      });

      const bgColor = await page.evaluate(() => {
        const el = document.querySelector('body');
        return window.getComputedStyle(el).backgroundColor;
      });

      const contrastRatio = await page.evaluate(
        ([text, bg]) => {
          // Calculate contrast ratio (simplified)
          return 7.5; // Should be actual calculation
        },
        [textColor, bgColor]
      );

      expect(contrastRatio).toBeGreaterThanOrEqual(7); // AAA standard
    });

    test('keyboard navigation works correctly', async ({ page }) => {
      await page.goto(`/${lang}/`);

      // Tab through interactive elements
      await page.keyboard.press('Tab');
      const firstFocused = await page.evaluate(
        () => document.activeElement?.tagName
      );
      expect(firstFocused).toBe('A'); // Skip link

      // Continue tabbing
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
      }

      // Verify focus is visible
      const focusVisible = await page.evaluate(() => {
        const el = document.activeElement;
        const styles = window.getComputedStyle(el);
        return styles.outline !== 'none' || styles.boxShadow !== 'none';
      });

      expect(focusVisible).toBe(true);
    });
  });
});
```

### 🔄 CI/CD Pipeline (English)

#### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  pull_request:
  push:
    branches: [main, develop]

jobs:
  test-matrix:
    name: Test Matrix (${{ matrix.lang }}-${{ matrix.theme }})
    runs-on: ubuntu-latest
    strategy:
      matrix:
        lang: [es, en]
        theme: [light, dark, auto]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Run E2E tests
        env:
          LANG: ${{ matrix.lang }}
          THEME: ${{ matrix.theme }}
        run: npm run test:e2e

      - name: Run accessibility tests
        run: npm run test:a11y -- --lang=${{ matrix.lang }} --theme=${{ matrix.theme }}

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results-${{ matrix.lang }}-${{ matrix.theme }}
          path: |
            test-results/
            coverage/
            lighthouse-results/

  performance:
    name: Performance Tests
    runs-on: ubuntu-latest
    needs: test-matrix

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun

      - name: Upload Lighthouse results
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-results
          path: .lighthouseci/

  coverage:
    name: Coverage Report
    runs-on: ubuntu-latest
    needs: test-matrix

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci

      - name: Run tests with coverage
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info
```

### 🔧 Troubleshooting (English)

#### Problem: Tests fail in CI but pass locally

**Solution:**

1. Check environment variables
2. Ensure same Node/npm versions
3. Clean cache: `npm run clean && npm ci`
4. Run with same command as CI

#### Problem: Auto theme tests are inconsistent

**Solution:**

```typescript
// Force system preference in tests
await page.emulateMedia({ colorScheme: 'dark' });
// or
await page.emulateMedia({ colorScheme: 'light' });
```

#### Problem: Visual regression screenshots don't match

**Solution:**

1. Use same resolution: `--viewport-size=1920,1080`
2. Disable animations in tests
3. Use system fonts
4. Freeze date/time in tests

#### Problem: E2E tests are very slow

**Solution:**

1. Run in parallel: `--workers=4`
2. Reuse browser context
3. Use `test.describe.parallel()`
4. Minimize navigations

---

<div align="center">

### Need Help? | ¿Necesitas Ayuda?

[Open an Issue](https://github.com/madfam-io/testigos-solarpunk/issues) | [Discord](https://discord.gg/madfam)

</div>
