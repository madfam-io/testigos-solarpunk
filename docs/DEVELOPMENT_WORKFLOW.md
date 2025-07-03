# 🚀 Development Workflow - Testigos de Solarpunk

Guía completa del flujo de desarrollo para mantener la calidad y consistencia del proyecto.

## 🏁 Quick Start

```bash
# Setup inicial
npm install
npm run dev

# Verificar todo antes de commit
npm run check:all

# Testing local
npm run test:watch
npm run lighthouse:local
```

## 📋 Pre-Development Checklist

Antes de empezar cualquier desarrollo:

1. **Leer contexto**: Revisar `CLAUDE.md` y issues relacionados
2. **Ambiente local**: `npm run dev` funcionando en `http://localhost:4321/testigos-solarpunk/`
3. **Tests baseline**: `npm run test` sin errores
4. **Dependencies actualizadas**: `npm audit` limpio

## 🔄 Flujo de Desarrollo

### 1. Feature Development

```bash
# 1. Crear rama de feature
git checkout -b feature/nueva-funcionalidad

# 2. Desarrollo iterativo
npm run dev                    # Server local
npm run test:watch            # Tests en watch mode
npm run lint                  # Verificar código

# 3. Verificación continua
npm run health:check          # Health checks
npm run lighthouse:local      # Performance local
```

### 2. Quality Gates

#### Pre-Commit (Automático)

```bash
# Ejecutado por husky/lint-staged
npm run lint                  # ESLint
npm run format               # Prettier
npm run type-check           # TypeScript
```

#### Pre-Push (Manual)

```bash
npm run check:all            # Suite completa
npm run test:coverage        # Coverage >95%
npm run lighthouse          # Performance audit
```

### 3. Testing Strategy

#### Unit Tests

```bash
# Ejecutar tests específicos
npm run test -- src/utils/theme-manager
npm run test -- --coverage
npm run test:ui             # Interfaz visual
```

#### Integration Tests

```bash
# Tests de páginas completas
npm run test -- tests/unit/pages/
npm run test -- tests/unit/i18n/
```

#### Performance Testing

```bash
# Local lighthouse
npm run lighthouse:local

# Multi-page testing
npm run lighthouse:multi

# CI simulation
npm run lighthouse
```

## 🎨 Conventions y Estándares

### Código TypeScript/JavaScript

```typescript
// ✅ Correcto
interface UserProps {
  name: string;
  email: string;
}

function getUser(id: number): Promise<UserProps> {
  // Implementación con tipos explícitos
}

// ❌ Evitar
function getUser(id: any): any {
  // No usar 'any'
}
```

### Astro Components

```astro
---
// ✅ Props tipadas
interface Props {
  title: string;
  description?: string;
}

const { title, description = '' } = Astro.props;
---

<article>
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</article>
```

### CSS y Styling

```css
/* ✅ Usar variables del design system */
.component {
  color: var(--madfam-blue-primary);
  background: var(--theme-bg-primary);
}

/* ❌ Evitar valores hardcodeados */
.component {
  color: #1976d2;
  background: #ffffff;
}
```

### Magazine Cutout Aesthetic

```astro
---
// ✅ Siempre usar clases del sistema emoji
---

<button class="emoji-button emoji-md">
  <span class="emoji-magazine-cutout">🚀</span>
  Lanzar Proyecto
</button>
```

## 🧪 Testing Best Practices

### Mocking Browser APIs

```typescript
// Setup en beforeEach
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    },
    writable: true,
  });
});
```

### Async Testing

```typescript
// ✅ Correcto
it('should load user data', async () => {
  const user = await getUserData(123);
  expect(user).toMatchObject({ id: 123 });
});

// ✅ Con timeout para operaciones lentas
it('should generate sitemap', async () => {
  const sitemap = await generateSitemap();
  expect(sitemap).toContain('<urlset>');
}, 10000); // 10s timeout
```

### Performance Testing

```typescript
it('should complete operation within threshold', async () => {
  const start = performance.now();
  await heavyOperation();
  const duration = performance.now() - start;

  expect(duration).toBeLessThan(100); // 100ms max
});
```

## 🚦 Configuración de CI/CD

### GitHub Actions

```yaml
# Lighthouse audit en cada PR
- name: Lighthouse CI
  run: |
    npm run build
    npm run lighthouse
```

### Vercel Deployment

```bash
# Build específico para Vercel
npm run build:vercel

# Preview deployment
vercel --prod=false

# Production deployment
vercel --prod
```

## 🔍 Debugging y Troubleshooting

### Tests Failing

```bash
# Debug modo interactivo
npm run test:ui

# Verbose output
npm run test -- --reporter=verbose

# Specific test file
npm run test -- accessibility.test.ts
```

### Performance Issues

```bash
# Bundle analysis
npm run analyze:bundle

# Lighthouse debugging
DEBUG=lhci:* npm run lighthouse
```

### Development Server Issues

```bash
# Clear cache
npm run clean
rm -rf node_modules/.vite

# Reinstall dependencies
npm install

# Check port conflicts
lsof -ti:4321
```

## 📊 Métricas y Monitoring

### Coverage Targets

- **Unit Tests**: >95%
- **Integration Tests**: >80%
- **E2E Tests**: Key user flows

### Performance Budgets

```javascript
// lighthouserc.js
'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
```

### Bundle Size Limits

- **Total JS**: <400KB
- **Total CSS**: <100KB
- **Critical CSS**: <50KB

## 🔒 Security Workflow

### Headers Validation

```bash
# Local testing
curl -I http://localhost:4321/testigos-solarpunk/

# Expected headers
Content-Security-Policy: default-src 'self'...
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
```

### Dependency Auditing

```bash
# Security audit
npm audit

# Update vulnerable packages
npm audit fix

# Check for updates
npm run update-deps
```

## 📝 Commit Standards

### Conventional Commits

```bash
# Feature implementation
git commit -m "feat: agregar sistema de notificaciones push"

# Bug fixes
git commit -m "fix: corregir navegación mobile en iOS"

# Performance improvements
git commit -m "perf: optimizar carga de imágenes con lazy loading"

# Documentation
git commit -m "docs: actualizar guía de desarrollo"
```

### Release Triggers

```bash
# Patch release (feature completa)
git commit -m "release: implementar dashboard de métricas"

# Minor release (conjunto de features)
git commit -m "feat!: completar fase 2 - plataforma podcast

MINOR RELEASE: Sistema completo con reproductor integrado"
```

## 🎯 Definition of Done

Una feature está completa cuando:

- [ ] **Funcionalidad**: Implementada según requirements
- [ ] **Tests**: Coverage >95% para nuevo código
- [ ] **Types**: Sin errores de TypeScript
- [ ] **Lint**: Sin warnings de ESLint
- [ ] **Performance**: Lighthouse >90%
- [ ] **Accessibility**: Sin violaciones WCAG
- [ ] **i18n**: Textos traducibles externalizados
- [ ] **Mobile**: Responsive design verificado
- [ ] **Documentation**: Actualizada si necesario

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] `npm run check:all` exitoso
- [ ] Tests de smoke en preview environment
- [ ] Performance audit aprobado
- [ ] Security headers validados

### Post-Deployment

- [ ] Monitoring de errores activo
- [ ] Core metrics estables
- [ ] User acceptance testing
- [ ] Rollback plan preparado

## 📚 Recursos Adicionales

- **Astro Docs**: https://docs.astro.build
- **Vitest Guide**: https://vitest.dev/guide/
- **Lighthouse Best Practices**: https://web.dev/lighthouse-best-practices/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

_Workflow establecido durante refactoring v0.4.0_
_MADFAM - Testigos de Solarpunk_
