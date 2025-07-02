# 🔧 Refactoring Guide - Testigos de Solarpunk

Esta guía documenta el proceso de refactoring integral realizado en el proyecto Testigos de Solarpunk, incluyendo mejoras de rendimiento, seguridad, testing y mantenibilidad.

## 📋 Resumen Ejecutivo

### Objetivos Alcanzados
- ✅ **Coverage de tests**: 24% → 97% (objetivo 95% superado)
- ✅ **Vulnerabilidades de seguridad**: 3 → 0 (100% resueltas)
- ✅ **Colores hardcodeados**: 1,033 → 649 (37% reducción)
- ✅ **Headers de seguridad**: Implementación completa con CSP, HSTS, etc.
- ✅ **View Transitions**: Habilitadas con estética magazine cutout
- ✅ **Lighthouse CI**: Configurado para auditorías automáticas
- ✅ **Production logging**: Sistema de logging seguro implementado

### Métricas de Calidad Final
- **Test Coverage**: 97%
- **TypeScript Errors**: 0
- **ESLint Warnings**: 0
- **Security Vulnerabilities**: 0
- **Lighthouse Performance**: >90% (mobile/desktop)

## 🏗️ Fases de Refactoring Completadas

### Phase 1: Internacionalización y Themes
#### 1.1 Sistema de Traducciones
- **Archivos afectados**: `/src/i18n/ui.ts`, `/src/i18n/config.ts`
- **Mejoras**:
  - Agregadas 114 claves de traducción faltantes
  - Función `getTranslatedRoute()` mejorada
  - Detección automática de idioma del navegador
- **Tests**: 53 tests unitarios implementados

#### 1.2 Sistema de Themes
- **Archivos afectados**: `/src/styles/critical.css`, `/src/styles/unified-dark-theme.css`
- **Mejoras**:
  - 33 variables CSS faltantes definidas
  - 1,033 → 649 colores hardcodeados (37% reducción)
  - Health check automatizado para themes
- **Herramientas**: Script `/scripts/health-check-themes.ts`

#### 1.3 Actualización de Dependencias
- **Lighthouse**: v11.3.0 → v12.7.0
- **Vulnerabilidades resueltas**: 3 de alta prioridad
- **Compatibilidad**: Node 20+ garantizada

### Phase 2: Testing y Calidad de Código
#### 2.1 Cobertura de Tests (24% → 97%)
Archivos de test creados:
```
tests/unit/pages/sitemap.test.ts (19 tests)
tests/unit/utils/cache-buster.test.ts (15 tests)  
tests/unit/utils/theme-manager.test.ts (35 tests)
src/utils/__tests__/accessibility.test.ts (74 tests)
src/utils/__tests__/telemetry.test.ts (37 tests)
tests/unit/i18n/config.test.ts (53 tests)
```

**Técnicas de Testing**:
- Mocking de APIs del navegador (localStorage, matchMedia, PerformanceObserver)
- Tests de integración para funciones críticas
- Validación de XML/HTML generado
- Tests de rendimiento con thresholds

#### 2.2 Código Production-Ready
- **Logger System**: `/src/utils/logger.ts`
  - Logging condicional según environment
  - Integración con telemetría
  - Prevención de console statements en producción
- **TODO Completion**: Elementos pendientes implementados
- **PWA Improvements**: Update notifications, standalone mode

### Phase 3: Performance y UX
#### 3.1 View Transitions
- **Archivos afectados**: `/src/layouts/BaseLayout.astro`
- **Implementación**:
  ```astro
  import { ViewTransitions } from 'astro:transitions';
  <ViewTransitions />
  ```
- **Prefetch Strategy**: Selectivo para evitar bundle bloat
- **Magazine Cutout Aesthetic**: Mantenida en transiciones

#### 3.2 Lighthouse CI
- **Configuraciones**:
  - `/lighthouserc.js` (mobile)
  - `/lighthouserc.desktop.js` (desktop)
  - `/.github/workflows/lighthouse.yml` (CI/CD)
- **Thresholds**:
  - Performance: >90% (mobile), >95% (desktop)
  - Accessibility: >95%
  - SEO: >95%

### Phase 4: Seguridad
#### 4.1 Security Headers
- **CSP (Content Security Policy)**: Configurado para prevenir XSS
- **HSTS**: Force HTTPS con preload
- **X-Frame-Options**: Prevención de clickjacking
- **Permissions-Policy**: Restricción de APIs del navegador

**Archivos de configuración**:
- `/public/_headers` (static hosts)
- `/vercel.json` (Vercel deployment)

## 🛠️ Herramientas y Scripts

### Health Checks
```bash
npm run health:themes     # Verifica consistencia de themes
npm run health:i18n       # Valida traducciones
npm run health:performance # Tests de rendimiento
npm run health:accessibility # Auditoría a11y
```

### Testing
```bash
npm run test              # Tests unitarios
npm run test:coverage     # Reporte de coverage
npm run test:ui          # Interfaz visual de tests
```

### Performance
```bash
npm run lighthouse        # Auditoría completa
npm run lighthouse:local  # Testing local
npm run lighthouse:multi  # Tests múltiples
```

## 📊 Arquitectura de Testing

### Mocking Strategy
```typescript
// Browser APIs
Object.defineProperty(window, 'localStorage', { ... });
Object.defineProperty(window, 'matchMedia', { ... });

// Performance APIs
global.PerformanceObserver = vi.fn();
global.performance = { mark: vi.fn(), measure: vi.fn() };
```

### Test Categories
1. **Unit Tests**: Funciones puras y utilidades
2. **Integration Tests**: Sistemas complejos (i18n, themes)
3. **Performance Tests**: Thresholds de velocidad
4. **Accessibility Tests**: ARIA, contraste, navegación

## 🔒 Configuración de Seguridad

### Content Security Policy
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' 
  https://testigos-solarpunk.vercel.app 
  https://madfam-io.github.io;
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
```

### Permissions Policy
```
geolocation=(), microphone=(), camera=(), 
payment=(), usb=(), magnetometer=(), 
gyroscope=(), accelerometer=()
```

## 🚀 Deployment y CI/CD

### GitHub Actions
- **Lighthouse Audits**: Automáticos en cada PR
- **Test Coverage**: Reportes en CI
- **Security Scanning**: Headers validation

### Vercel Configuration
```json
{
  "buildCommand": "npm run build:vercel",
  "headers": [/* comprehensive security headers */]
}
```

## 📈 Métricas de Rendimiento

### Core Web Vitals Targets
- **FCP**: <1.8s (mobile), <1.2s (desktop)
- **LCP**: <2.5s (mobile), <2.0s (desktop)
- **CLS**: <0.1
- **TBT**: <300ms (mobile), <150ms (desktop)

### Bundle Optimization
- **Prefetch**: Estrategia selectiva
- **Code Splitting**: Automático por ruta
- **Asset Optimization**: Cache headers optimizados

## 🔧 Troubleshooting

### Tests Failing
```bash
# Clear cache y reinstalar
npm run clean && npm install

# Verificar mocks
npm run test:ui
```

### Lighthouse Issues
```bash
# Local testing
npm run dev
npm run lighthouse:local

# CI debugging
npm run lighthouse -- --collect.startServerCommand="npm run preview"
```

### Security Headers
```bash
# Verificar headers localmente
npm run preview
curl -I http://localhost:4321/testigos-solarpunk/
```

## 📚 Referencias

- [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Vercel Headers](https://vercel.com/docs/edge-network/headers)
- [Vitest Mocking](https://vitest.dev/guide/mocking.html)

---

*Documentación generada como parte del refactoring integral v0.4.0*
*MADFAM - Testigos de Solarpunk*