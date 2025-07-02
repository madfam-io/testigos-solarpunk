# Development Workflow | Flujo de Desarrollo

<div align="center">

[Español](#español) | [English](#english)

</div>

## Español

### 🔧 Configuración Inicial

#### Prerrequisitos

- Node.js 18+ (recomendado 20.x)
- npm 9+ o pnpm 8+
- Git
- Editor con soporte para Astro (VS Code recomendado)

#### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/madfam-io/testigos-solarpunk.git
cd testigos-solarpunk

# Instalar dependencias
npm install

# Configurar hooks de Git
npm run prepare

# Verificar instalación
npm run check:all
```

#### Configuración del Editor (VS Code)

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "astro.language-server.path": "node_modules/@astrojs/language-server",
  "[astro]": {
    "editor.defaultFormatter": "astro-build.astro-vscode"
  }
}
```

#### Extensiones Recomendadas

- Astro (oficial)
- ESLint
- Prettier
- CSS Variable Autocomplete
- i18n Ally (para traducciones)

### 🌳 Estrategia de Branches

```
main
├── develop (integración)
├── feature/nombre-feature
├── fix/nombre-bug
├── docs/actualización-docs
├── refactor/nombre-refactor
└── release/v0.X.0
```

#### Flujo de Trabajo

1. **Nueva Feature**

```bash
# Crear branch desde develop
git checkout develop
git pull origin develop
git checkout -b feature/mi-nueva-feature

# Trabajar en la feature
npm run dev

# Commit con convención
git add .
git commit -m "feat: agregar sistema de notificaciones

- Implementar componente Toast
- Agregar traducciones ES/EN
- Incluir tests unitarios"

# Push y crear PR
git push origin feature/mi-nueva-feature
```

2. **Bug Fix**

```bash
# Para bugs en producción, branch desde main
git checkout main
git pull origin main
git checkout -b fix/corregir-contraste-dark-mode

# Para bugs en desarrollo, branch desde develop
git checkout develop
git checkout -b fix/error-language-toggle
```

3. **Release**

```bash
# Crear branch de release
git checkout develop
git checkout -b release/v0.5.0

# Actualizar versión
npm version minor

# Generar changelog
npm run changelog

# Merge a main y develop
```

### 📝 Convención de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description [lang/theme]

[optional body]

[optional footer(s)]
```

#### Types

- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan código)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento
- `perf`: Mejoras de performance
- `ci`: Cambios en CI/CD
- `build`: Cambios en sistema de build

#### Scopes

- `i18n`: Sistema de internacionalización
- `theme`: Sistema de temas
- `component`: Componentes específicos
- `pwa`: Funcionalidad PWA
- `a11y`: Accesibilidad
- `seo`: Optimización SEO

#### Ejemplos

```bash
# Feature con alcance
feat(i18n): agregar soporte para fechas localizadas

# Fix con contexto de tema
fix(theme): corregir contraste en dark mode [dark]

# Docs con idioma
docs: actualizar guía de componentes [es]

# Breaking change
feat(api)!: cambiar estructura de respuesta

BREAKING CHANGE: La API ahora retorna objetos anidados

# Multiple commits relacionados
refactor(component): optimizar SketchCard
- Reducir re-renders innecesarios
- Implementar memo para props pesadas
- Mejorar performance en mobile
```

### 🚀 Comandos de Desarrollo

#### Desarrollo Local

```bash
# Desarrollo con detección de idioma
npm run dev

# Desarrollo en español
npm run dev:es

# Desarrollo en inglés
npm run dev:en

# Desarrollo con host network (para mobile)
npm run dev -- --host
```

#### Building y Preview

```bash
# Build de producción
npm run build

# Preview del build
npm run preview

# Build con análisis de bundle
npm run build:analyze
```

#### Testing

```bash
# Todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:coverage

# Tests de matriz completa (6 combinaciones)
npm run test:matrix

# Tests específicos
npm run test:unit
npm run test:integration
npm run test:e2e
```

#### Validación y Linting

```bash
# Verificación completa
npm run check:all

# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Validación i18n
npm run i18n:validate
npm run i18n:unused
npm run i18n:extract
```

#### Utilidades

```bash
# Formatear código
npm run format

# Limpiar cache y build
npm run clean

# Generar manifest.json
npm run generate:manifest

# Actualizar Service Worker
npm run build:sw
```

### 🧪 Flujo de Testing

#### 1. Antes de Commit

```bash
# Ejecutar verificación completa
npm run check:all

# Si hay errores de formato
npm run format

# Si hay errores de lint
npm run lint:fix
```

#### 2. Testing por Feature

```bash
# Para componentes nuevos
npm run test:component MyComponent

# Para páginas nuevas
npm run test:page es/nueva-pagina

# Para cambios de tema
npm run test:theme

# Para cambios i18n
npm run test:i18n
```

#### 3. Testing de Integración

```bash
# Test matriz completa
npm run test:matrix

# Test de accesibilidad
npm run test:a11y

# Test de performance
npm run test:lighthouse
```

### 🌐 Trabajando con i18n

#### Agregar Nueva Traducción

1. **Agregar clave en translations.ts**

```typescript
// src/i18n/translations.ts
export const ui = {
  es: {
    'feature.new.title': 'Nueva Funcionalidad',
    'feature.new.description': 'Descripción aquí',
  },
  en: {
    'feature.new.title': 'New Feature',
    'feature.new.description': 'Description here',
  },
};
```

2. **Validar traducciones**

```bash
npm run i18n:validate
```

3. **Usar en componente**

```astro
const t = useTranslations(lang);
<h2>{t('feature.new.title')}</h2>
```

#### Crear Nueva Página Bilingüe

1. **Crear archivos**

```bash
touch src/pages/es/nueva-pagina.astro
touch src/pages/en/new-page.astro
```

2. **Implementar con layout**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
const lang = 'es'; // o 'en'
---

<BaseLayout title="Título" lang={lang}>
  <!-- Contenido -->
</BaseLayout>
```

### 🎨 Trabajando con Temas

#### Agregar Nueva Variable

1. **Definir en todos los temas**

```css
/* src/styles/critical.css */
[data-theme='light'] {
  --mi-nuevo-color: #2196f3;
}

[data-theme='dark'] {
  --mi-nuevo-color: #42a5f5;
}
```

2. **Usar en componente**

```css
.mi-componente {
  background: var(--mi-nuevo-color);
}
```

3. **Verificar contraste**

```bash
npm run test:contrast
```

### 📦 Proceso de Release

#### 1. Preparación

```bash
# Asegurar que develop está actualizado
git checkout develop
git pull origin develop

# Crear branch de release
git checkout -b release/v0.5.0

# Actualizar versión
npm version minor --no-git-tag-version
```

#### 2. Validación Final

```bash
# Tests completos
npm run test:matrix

# Build de producción
npm run build

# Preview y testing manual
npm run preview
```

#### 3. Documentación

```bash
# Generar changelog
npm run changelog

# Actualizar README si es necesario
# Actualizar CLAUDE.md con nuevas features
```

#### 4. Merge y Tag

```bash
# Merge a main
git checkout main
git merge --no-ff release/v0.5.0

# Crear tag
git tag -a v0.5.0 -m "Release version 0.5.0"

# Push con tags
git push origin main --tags

# Merge back a develop
git checkout develop
git merge main
git push origin develop
```

### 🐛 Debugging

#### Problemas Comunes

**1. Error de tipos TypeScript**

```bash
# Limpiar cache de TypeScript
rm -rf node_modules/.cache
npm run type-check
```

**2. Problemas de build**

```bash
# Limpiar y reconstruir
npm run clean
npm install
npm run build
```

**3. Tests fallando**

```bash
# Ejecutar test específico con debug
npm test -- --reporter=verbose MyComponent.test
```

**4. Problemas de performance**

```bash
# Analizar bundle
npm run build:analyze

# Profiling en desarrollo
npm run dev -- --profile
```

#### Herramientas de Debug

1. **Chrome DevTools**

   - Performance tab para profiling
   - Network tab para requests
   - Lighthouse para auditorías

2. **React Developer Tools**

   - Para componentes React en islas

3. **Astro Dev Toolbar**
   - Información de islas
   - Métricas de hidratación

### 📊 Métricas de Calidad

#### Criterios de Aceptación

- ✅ Coverage de tests > 80%
- ✅ Lighthouse 100/100 en todas las métricas
- ✅ Sin errores de TypeScript
- ✅ Sin warnings de ESLint
- ✅ WCAG AAA compliance
- ✅ Bundle size < 200KB por ruta
- ✅ Time to Interactive < 3s en 3G

#### Monitoreo Continuo

```bash
# Dashboard de métricas
npm run metrics:dashboard

# Reporte de calidad
npm run quality:report
```

### 🔐 Seguridad

#### Auditoría de Dependencias

```bash
# Verificar vulnerabilidades
npm audit

# Fix automático (con cuidado)
npm audit fix

# Actualizar dependencias
npm update
```

#### Headers de Seguridad

Verificar en `astro.config.mjs`:

- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

---

## English

### 🔧 Initial Setup

#### Prerequisites

- Node.js 18+ (20.x recommended)
- npm 9+ or pnpm 8+
- Git
- Editor with Astro support (VS Code recommended)

#### Installation

```bash
# Clone repository
git clone https://github.com/madfam-io/testigos-solarpunk.git
cd testigos-solarpunk

# Install dependencies
npm install

# Setup Git hooks
npm run prepare

# Verify installation
npm run check:all
```

#### Editor Setup (VS Code)

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "astro.language-server.path": "node_modules/@astrojs/language-server",
  "[astro]": {
    "editor.defaultFormatter": "astro-build.astro-vscode"
  }
}
```

#### Recommended Extensions

- Astro (official)
- ESLint
- Prettier
- CSS Variable Autocomplete
- i18n Ally (for translations)

### 🌳 Branch Strategy

```
main
├── develop (integration)
├── feature/feature-name
├── fix/bug-name
├── docs/docs-update
├── refactor/refactor-name
└── release/v0.X.0
```

#### Workflow

1. **New Feature**

```bash
# Create branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/my-new-feature

# Work on feature
npm run dev

# Commit with convention
git add .
git commit -m "feat: add notification system

- Implement Toast component
- Add ES/EN translations
- Include unit tests"

# Push and create PR
git push origin feature/my-new-feature
```

2. **Bug Fix**

```bash
# For production bugs, branch from main
git checkout main
git pull origin main
git checkout -b fix/fix-dark-mode-contrast

# For development bugs, branch from develop
git checkout develop
git checkout -b fix/language-toggle-error
```

3. **Release**

```bash
# Create release branch
git checkout develop
git checkout -b release/v0.5.0

# Update version
npm version minor

# Generate changelog
npm run changelog

# Merge to main and develop
```

### 📝 Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description [lang/theme]

[optional body]

[optional footer(s)]
```

#### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting changes (no code changes)
- `refactor`: Code refactoring
- `test`: Add or modify tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes

#### Scopes

- `i18n`: Internationalization system
- `theme`: Theme system
- `component`: Specific components
- `pwa`: PWA functionality
- `a11y`: Accessibility
- `seo`: SEO optimization

#### Examples

```bash
# Feature with scope
feat(i18n): add support for localized dates

# Fix with theme context
fix(theme): correct contrast in dark mode [dark]

# Docs with language
docs: update component guide [en]

# Breaking change
feat(api)!: change response structure

BREAKING CHANGE: API now returns nested objects

# Multiple related commits
refactor(component): optimize SketchCard
- Reduce unnecessary re-renders
- Implement memo for heavy props
- Improve mobile performance
```

### 🚀 Development Commands

#### Local Development

```bash
# Development with language detection
npm run dev

# Development in Spanish
npm run dev:es

# Development in English
npm run dev:en

# Development with network host (for mobile)
npm run dev -- --host
```

#### Building and Preview

```bash
# Production build
npm run build

# Preview build
npm run preview

# Build with bundle analysis
npm run build:analyze
```

#### Testing

```bash
# All tests
npm test

# Tests in watch mode
npm run test:watch

# Tests with coverage
npm run test:coverage

# Full matrix tests (6 combinations)
npm run test:matrix

# Specific tests
npm run test:unit
npm run test:integration
npm run test:e2e
```

#### Validation and Linting

```bash
# Complete check
npm run check:all

# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# i18n validation
npm run i18n:validate
npm run i18n:unused
npm run i18n:extract
```

#### Utilities

```bash
# Format code
npm run format

# Clean cache and build
npm run clean

# Generate manifest.json
npm run generate:manifest

# Update Service Worker
npm run build:sw
```

### 🧪 Testing Flow

#### 1. Before Commit

```bash
# Run complete check
npm run check:all

# If format errors
npm run format

# If lint errors
npm run lint:fix
```

#### 2. Feature Testing

```bash
# For new components
npm run test:component MyComponent

# For new pages
npm run test:page en/new-page

# For theme changes
npm run test:theme

# For i18n changes
npm run test:i18n
```

#### 3. Integration Testing

```bash
# Full matrix test
npm run test:matrix

# Accessibility test
npm run test:a11y

# Performance test
npm run test:lighthouse
```

### 🌐 Working with i18n

#### Add New Translation

1. **Add key in translations.ts**

```typescript
// src/i18n/translations.ts
export const ui = {
  es: {
    'feature.new.title': 'Nueva Funcionalidad',
    'feature.new.description': 'Descripción aquí',
  },
  en: {
    'feature.new.title': 'New Feature',
    'feature.new.description': 'Description here',
  },
};
```

2. **Validate translations**

```bash
npm run i18n:validate
```

3. **Use in component**

```astro
const t = useTranslations(lang);
<h2>{t('feature.new.title')}</h2>
```

#### Create New Bilingual Page

1. **Create files**

```bash
touch src/pages/es/nueva-pagina.astro
touch src/pages/en/new-page.astro
```

2. **Implement with layout**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
const lang = 'en'; // or 'es'
---

<BaseLayout title="Title" lang={lang}>
  <!-- Content -->
</BaseLayout>
```

### 🎨 Working with Themes

#### Add New Variable

1. **Define in all themes**

```css
/* src/styles/critical.css */
[data-theme='light'] {
  --my-new-color: #2196f3;
}

[data-theme='dark'] {
  --my-new-color: #42a5f5;
}
```

2. **Use in component**

```css
.my-component {
  background: var(--my-new-color);
}
```

3. **Verify contrast**

```bash
npm run test:contrast
```

### 📦 Release Process

#### 1. Preparation

```bash
# Ensure develop is updated
git checkout develop
git pull origin develop

# Create release branch
git checkout -b release/v0.5.0

# Update version
npm version minor --no-git-tag-version
```

#### 2. Final Validation

```bash
# Complete tests
npm run test:matrix

# Production build
npm run build

# Preview and manual testing
npm run preview
```

#### 3. Documentation

```bash
# Generate changelog
npm run changelog

# Update README if necessary
# Update CLAUDE.md with new features
```

#### 4. Merge and Tag

```bash
# Merge to main
git checkout main
git merge --no-ff release/v0.5.0

# Create tag
git tag -a v0.5.0 -m "Release version 0.5.0"

# Push with tags
git push origin main --tags

# Merge back to develop
git checkout develop
git merge main
git push origin develop
```

### 🐛 Debugging

#### Common Issues

**1. TypeScript type errors**

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run type-check
```

**2. Build problems**

```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

**3. Failing tests**

```bash
# Run specific test with debug
npm test -- --reporter=verbose MyComponent.test
```

**4. Performance issues**

```bash
# Analyze bundle
npm run build:analyze

# Profiling in development
npm run dev -- --profile
```

#### Debug Tools

1. **Chrome DevTools**

   - Performance tab for profiling
   - Network tab for requests
   - Lighthouse for audits

2. **React Developer Tools**

   - For React components in islands

3. **Astro Dev Toolbar**
   - Island information
   - Hydration metrics

### 📊 Quality Metrics

#### Acceptance Criteria

- ✅ Test coverage > 80%
- ✅ Lighthouse 100/100 on all metrics
- ✅ No TypeScript errors
- ✅ No ESLint warnings
- ✅ WCAG AAA compliance
- ✅ Bundle size < 200KB per route
- ✅ Time to Interactive < 3s on 3G

#### Continuous Monitoring

```bash
# Metrics dashboard
npm run metrics:dashboard

# Quality report
npm run quality:report
```

### 🔐 Security

#### Dependency Audit

```bash
# Check vulnerabilities
npm audit

# Auto fix (carefully)
npm audit fix

# Update dependencies
npm update
```

#### Security Headers

Check in `astro.config.mjs`:

- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

---

<div align="center">

[⬅️ Back to Docs](./README.md) | [Testing Guide ➡️](./TESTING.md)

</div>
