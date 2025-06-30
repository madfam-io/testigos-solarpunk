# 👩‍💻 Developer Guide - Testigos de Solarpunk

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Standards](#code-standards)
4. [Component Development](#component-development)
5. [Content Management](#content-management)
6. [Testing Guide](#testing-guide)
7. [Performance Guidelines](#performance-guidelines)
8. [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git
- VS Code (recommended)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/madfam-io/testigos-solarpunk.git
cd testigos-solarpunk

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:4321/testigos-solarpunk/
```

### Essential Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test            # Run all tests
npm run check:all    # Run all quality checks
npm run lint         # Lint code
npm run typecheck    # Check TypeScript types
```

## Development Workflow

### 1. Branch Strategy

```bash
# Create feature branch
git checkout -b feature/nombre-descriptivo

# Create bugfix branch
git checkout -b fix/descripcion-del-bug

# Create documentation branch
git checkout -b docs/que-se-documenta
```

### 2. Pre-Commit Checklist

Always run before committing:

```bash
npm run check:all
```

This runs:

- ESLint
- TypeScript type checking
- All tests
- Build verification

### 3. Commit Messages

Follow conventional commits:

```
feat: agregar nueva funcionalidad
fix: corregir bug específico
docs: actualizar documentación
style: cambios de formato
refactor: mejorar código sin cambiar funcionalidad
test: agregar o modificar tests
chore: tareas de mantenimiento
```

## Code Standards

### TypeScript

```typescript
// ✅ GOOD: Explicit types
export function formatDate(date: Date | string): string {
  // implementation
}

// ❌ BAD: Implicit any
export function formatDate(date) {
  // implementation
}

// ✅ GOOD: Interface for props
interface Props {
  title: string;
  description?: string;
}

// ❌ BAD: Inline type
const Component = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {};
```

### Astro Components

```astro
---
/**
 * @fileoverview Component description
 */

// ✅ GOOD: Typed props
export interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
}

const { title, variant = 'primary' } = Astro.props;

// ✅ GOOD: Base path handling
const basePath = import.meta.env.BASE_URL || '/testigos-solarpunk';
---

<!-- Component HTML -->
```

### CSS Conventions

```css
/* ✅ GOOD: Use design tokens */
.component {
  color: var(--text-primary);
  margin: var(--space-md);
}

/* ❌ BAD: Hard-coded values */
.component {
  color: #333;
  margin: 16px;
}

/* ✅ GOOD: Mobile-first */
.component {
  font-size: 1rem;
}

@media (min-width: 768px) {
  .component {
    font-size: 1.25rem;
  }
}
```

## Component Development

### 1. Creating a New Component

```bash
# 1. Create component file
touch src/components/NewComponent.astro

# 2. Add basic structure
```

```astro
---
/**
 * @fileoverview Brief description
 *
 * Detailed component description
 *
 * @component
 * @example
 * <NewComponent title="Example" />
 */

export interface Props {
  title: string;
  // other props
}

const { title } = Astro.props;
---

<div class="new-component">
  <h2>{title}</h2>
</div>

<style>
  .new-component {
    /* styles */
  }
</style>
```

### 2. Using the Magazine Cutout System

```astro
<!-- Basic emoji with cutout effect -->
<span class="emoji-cutout emoji-md">🌱</span>

<!-- Themed emoji -->
<span class="emoji-cutout emoji-lg theme-solar">☀️</span>

<!-- Animated emoji -->
<span class="emoji-cutout emoji-xl flutter">✨</span>

<!-- In specific contexts -->
<span class="emoji-cutout emoji-nav">🏠</span>
<span class="emoji-cutout emoji-hero">🌟</span>
<span class="emoji-cutout emoji-card">🎭</span>
```

### 3. Using AI Placeholders

```astro
---
import MagazineCutoutImage from '@/components/MagazineCutoutImage.astro';
---

<!-- With source image -->
<MagazineCutoutImage
  src="/images/character.jpg"
  alt="Character description"
  width={400}
  height={300}
/>

<!-- AI-generated placeholder -->
<MagazineCutoutImage
  alt="Hermana Panelia predicando"
  width={400}
  height={300}
  type="character"
/>
```

## Content Management

### 1. Adding a Character

```bash
# Use the interactive CLI
npm run new:character

# Or manually create
touch src/content/characters/nuevo-personaje.yaml
```

```yaml
id: nuevo-personaje
nombre: 'Nombre del Personaje'
slug: 'nombre-url'
rol: 'evangelista'
edad: 35
pronombres: 'ella/la'
ocupacion: 'Descripción del trabajo'
colorTema: 'solar'
descripcionBreve: 'Resumen en una línea'
historia: |
  Historia detallada del personaje...
frases:
  - '¡Frase característica!'
rasgos:
  - 'Rasgo 1'
  - 'Rasgo 2'
relaciones:
  - personaje: 'otro-personaje'
    tipo: 'amigo'
    descripcion: 'Descripción de la relación'
```

### 2. Adding a Script

```markdown
---
episodio: 'S01E10'
titulo: 'Título del Episodio'
plataforma: 'TikTok'
duracion: '1:30'
personajes: ['hermana-panelia', 'hermano-compostino']
temas: ['energia-solar', 'comunidad']
ubicacion: 'parque-revolucion'
fecha: 2024-03-15
estado: 'borrador'
---

## GUIÓN

**ESCENA 1**
_Descripción de la escena_

**HERMANA PANELIA**: Diálogo...

**HERMANO COMPOSTINO**: Respuesta...

[Continuar con el guión...]
```

### 3. Content Validation

All content is validated with Zod schemas:

```typescript
// Character schema (automatic)
const character = z.object({
  nombre: z.string(),
  edad: z.number(),
  // ... other fields
});

// Validation happens at build time
// Errors appear in console with clear messages
```

## Testing Guide

### 1. Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test CharacterCard

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### 2. Writing Tests

```typescript
/**
 * @fileoverview Tests for utility function
 */

import { describe, it, expect } from 'vitest';
import { formatDate } from '@/lib/utils';

describe('formatDate', () => {
  it('formats date in Spanish', () => {
    const date = new Date('2024-03-15');
    expect(formatDate(date)).toBe('15 de marzo de 2024');
  });

  it('handles string input', () => {
    expect(formatDate('2024-03-15')).toBe('15 de marzo de 2024');
  });
});
```

### 3. Component Testing

```typescript
describe('CharacterCard', () => {
  it('renders with required props', () => {
    const html = generateCharacterCardHTML({
      character: mockCharacter,
      basePath: '/testigos-solarpunk',
    });

    const doc = parser.parseFromString(html, 'text/html');

    expect(doc.querySelector('.character-name')?.textContent).toBe(
      'Hermana Panelia'
    );
  });
});
```

## Performance Guidelines

### 1. Image Optimization

```astro
<!-- ✅ GOOD: Specify dimensions -->
<MagazineCutoutImage
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
/>

<!-- ❌ BAD: No dimensions -->
<img src="/image.jpg" alt="Description" />
```

### 2. Component Performance

```astro
---
// ✅ GOOD: Import only what you need
import { formatDate } from '@/lib/utils';

// ❌ BAD: Import entire module
import * as utils from '@/lib/utils';
---
```

### 3. CSS Performance

```css
/* ✅ GOOD: Use CSS custom properties */
.component {
  background: var(--color-primary);
}

/* ✅ GOOD: Avoid complex selectors */
.component-title {
  /* styles */
}

/* ❌ BAD: Overly specific */
div.wrapper > section.content > h2.component-title {
  /* styles */
}
```

## Troubleshooting

### Common Issues

#### 1. Build Failures

```bash
# Clear cache and rebuild
rm -rf dist .astro node_modules/.vite
npm install
npm run build
```

#### 2. Type Errors

```bash
# Check for type errors
npm run typecheck

# Common fixes:
# - Ensure all props are typed
# - Check import paths
# - Verify content schema matches
```

#### 3. Test Failures

```bash
# Run specific test with debug
npm test -- --reporter=verbose CharacterCard

# Update snapshots if needed
npm test -- -u
```

#### 4. Navigation Issues

```bash
# Audit navigation
npm run audit:nav

# Check generated reports:
# - broken-links.json
# - site-navigation.json
# - missing-pages.md
```

### Development Tips

1. **Use VS Code Extensions**:

   - Astro
   - ESLint
   - Prettier
   - Error Lens

2. **Browser DevTools**:

   - Check for console errors
   - Verify responsive design
   - Test accessibility

3. **Performance Testing**:

   ```bash
   # Build and analyze
   npm run build

   # Check bundle size
   ls -la dist/

   # Run Lighthouse
   npm run preview
   # Then use Chrome DevTools Lighthouse
   ```

### Getting Help

1. Check existing documentation:

   - README.md
   - CLAUDE.md
   - ARCHITECTURE.md

2. Search codebase:

   ```bash
   # Find usage examples
   grep -r "ComponentName" src/

   # Find similar patterns
   grep -r "pattern" src/
   ```

3. Run diagnostics:

   ```bash
   # Check accessibility
   npm run check:a11y

   # Verify all systems
   npm run check:all
   ```

## Best Practices Summary

### Do's ✅

- Always run `npm run check:all` before committing
- Use TypeScript types explicitly
- Follow the magazine cutout design system
- Write tests for new features
- Document complex logic
- Use semantic HTML
- Optimize images
- Handle errors gracefully

### Don'ts ❌

- Don't use `any` type
- Don't hardcode values (use constants)
- Don't skip accessibility checks
- Don't commit without testing
- Don't use inline styles
- Don't ignore console warnings
- Don't duplicate code
- Don't forget mobile testing

## Resources

- [Astro Documentation](https://docs.astro.build)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vitest Documentation](https://vitest.dev)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

_Happy coding! Remember: "¡El código limpio brilla para todos!" 🌟_
