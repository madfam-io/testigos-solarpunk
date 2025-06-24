# 📐 Convenciones y Estándares

## Convenciones de Código

### TypeScript

#### Nombrado
```typescript
// Interfaces: PascalCase con prefijo 'I'
interface ICharacter {
  name: string;
  role: CharacterRole;
}

// Types: PascalCase
type CharacterRole = 'protagonist' | 'antagonist' | 'supporting';

// Enums: PascalCase con valores SCREAMING_SNAKE_CASE
enum Platform {
  TIKTOK = 'TT',
  YOUTUBE = 'YT',
  INSTAGRAM = 'IG',
}

// Funciones: camelCase, verbos descriptivos
function calculateSolarOutput(panels: number): number {
  return panels * 250; // watts
}

// Constantes: SCREAMING_SNAKE_CASE
const MAX_EPISODE_DURATION = 180; // seconds

// Variables: camelCase
let currentEpisode = 1;
```

#### Estructura de Archivos
```typescript
// 1. Imports (ordenados: externos, internos, relativos)
import { defineCollection } from 'astro:content';
import type { ICharacter } from '@/types';
import { formatDate } from '../utils';

// 2. Types/Interfaces
interface Props {
  character: ICharacter;
}

// 3. Constantes
const DEFAULT_IMAGE = '/placeholder.webp';

// 4. Componente/Función principal
export default function Component({ character }: Props) {
  // ...
}

// 5. Funciones auxiliares
function helper() {
  // ...
}
```

### Componentes Astro

#### Estructura
```astro
---
// 1. Imports
import Layout from '@/layouts/Layout.astro';
import type { ICharacter } from '@/types';

// 2. Props interface
interface Props {
  character: ICharacter;
  showDetails?: boolean;
}

// 3. Props destructuring
const { character, showDetails = false } = Astro.props;

// 4. Data fetching/processing
const relatedCharacters = await getRelatedCharacters(character.id);

// 5. Helper functions
function getCharacterClass(role: string) {
  return `character--${role.toLowerCase()}`;
}
---

<!-- prettier-ignore-start -->
```astro
<!-- 6. Template -->
<article class={`character ${getCharacterClass(character.role)}`}>
  <h2>{character.name}</h2>
  {showDetails && (
    <div class="character__details">
      <!-- Detalles -->
    </div>
  )}
</article>
```
<!-- prettier-ignore-end -->

<style>
  /* 7. Estilos scopeados */
  .character {
    /* Usar design tokens */
    padding: var(--space-md);
    background: var(--color-surface);
  }
  
  .character--protagonist {
    border-left: 4px solid var(--madfam-yellow);
  }
</style>

<script>
  /* 8. Scripts (si necesario) */
  // Preferir vanilla JS para componentes simples
</script>
```

### CSS

#### BEM Naming
```css
/* Block */
.character-card { }

/* Element */
.character-card__title { }
.character-card__image { }

/* Modifier */
.character-card--featured { }
.character-card--evangelista { }

/* State */
.character-card.is-loading { }
.character-card.is-expanded { }
```

#### Organización
```css
/* 1. Custom properties */
.component {
  --component-padding: var(--space-md);
  --component-radius: 8px;
}

/* 2. Layout */
.component {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-md);
}

/* 3. Spacing */
.component {
  padding: var(--component-padding);
  margin-block-end: var(--space-lg);
}

/* 4. Typography */
.component {
  font-family: var(--font-primary);
  font-size: var(--text-md);
  line-height: 1.6;
}

/* 5. Visual */
.component {
  background: var(--color-surface);
  border-radius: var(--component-radius);
  box-shadow: var(--shadow-sm);
}

/* 6. Animation */
.component {
  transition: transform var(--transition-base);
}

/* 7. Media queries (mobile-first) */
@media (min-width: 768px) {
  .component {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Git

#### Commit Messages
```bash
# Formato: tipo(alcance): descripción

# ✅ Buenos ejemplos
feat(characters): add Hermana Panelia character profile
fix(navigation): correct mobile menu z-index issue
docs(readme): update installation instructions
style(global): apply new MADFAM color tokens
refactor(utils): simplify date formatting logic
test(character-card): add evangelista variant tests
chore(deps): update Astro to v5.10.1
perf(images): implement lazy loading for character gallery

# ❌ Malos ejemplos
update files
fix bug
WIP
changes
```

#### Branch Naming
```bash
# Formato: tipo/descripcion-breve

feature/evangelista-characters
bugfix/mobile-navigation
hotfix/build-error
refactor/component-structure
docs/api-documentation
test/integration-suite
```

### Estructura de Archivos

#### Nombrado de Archivos
```
# Componentes: PascalCase
CharacterCard.astro
NavigationMenu.astro

# Utilidades: camelCase
formatDate.ts
slugify.ts

# Configuración: kebab-case
astro.config.mjs
vitest.config.ts

# Contenido: kebab-case
hermana-panelia.yaml
EP001-TT.md

# Tests: mismo nombre + .test/.spec
CharacterCard.test.ts
formatDate.spec.ts
```

#### Organización de Carpetas
```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes genéricos
│   ├── layout/         # Componentes de estructura
│   └── features/       # Componentes específicos del dominio
├── layouts/            # Layouts de página
├── pages/              # Rutas del sitio
├── content/            # Contenido estructurado
├── styles/             # Estilos globales
├── lib/                # Utilidades y helpers
├── types/              # TypeScript types/interfaces
└── tests/              # Tests organizados por tipo
```

### Contenido

#### YAML (Personajes)
```yaml
# Estructura consistente para personajes
nombre: "Hermana Panelia"
titulo: "La Profeta de los Paneles Sagrados"
slug: "hermana-panelia"

# Información básica
descripcion_corta: "Evangelista de la energía solar"
rol_principal: "Protagonista"
edad: 45
ocupacion: "Predicadora Solar"

# Arrays con items consistentes
habilidades:
  - "Instalación de paneles divinos"
  - "Sermones fotovoltaicos"
  - "Sanación con luz solar"

# Campos opcionales claramente marcados
historia_origen: |
  Texto largo con formato Markdown...
  
# Campos evangelista paródicos
cita_biblica_parodia: "Y dijo el Sol: Hágase la luz renovable"
milagro_verde_signature: "Conversión de techos en huertos solares"
```

#### Markdown (Scripts)
```markdown
---
# Frontmatter con metadata estructurada
titulo: "El Despertar Solar"
episodio: 1
temporada: 1
duracion: 180
plataforma: "TT"
fecha_publicacion: 2024-03-20
hashtags:
  - "#TestigosDeSolarpunk"
  - "#MilagroVerde"
  - "#HermanaPanelia"
---

# Estructura del guión

## ESCENA 1 - INTRO
[Ubicación: Azotea Verde]
[Música: Himno Solar Electrónico]

**HERMANA PANELIA**: ¡Aleluya solar, hermanos!

[MOMENTO VIRAL] *Se arrodilla ante un panel solar*

## Convenciones de formato

- **PERSONAJE**: Diálogos en negritas
- *Acciones en cursiva*
- [Notas de producción entre corchetes]
- MOMENTOS VIRALES claramente marcados
```

### Testing

#### Estructura de Tests
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ComponentName', () => {
  // Setup compartido
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Agrupar por funcionalidad
  describe('rendering', () => {
    it('should render with required props', () => {
      // Arrange
      const props = { name: 'Test' };
      
      // Act
      const result = render(Component, props);
      
      // Assert
      expect(result).toContain('Test');
    });

    it('should handle missing optional props', () => {
      // Test de edge cases
    });
  });

  describe('interactions', () => {
    it('should handle click events', async () => {
      // Tests de interacción
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA labels', () => {
      // Tests de a11y
    });
  });
});
```

### Documentación

#### JSDoc para Funciones
```typescript
/**
 * Calcula la producción de energía solar basada en las condiciones
 * @param panels - Número de paneles solares instalados
 * @param hours - Horas de sol directo al día
 * @param efficiency - Eficiencia del panel (0-1)
 * @returns Producción estimada en kWh
 * @example
 * ```ts
 * const production = calculateSolarProduction(10, 5, 0.85);
 * console.log(`Producción: ${production} kWh`);
 * ```
 */
export function calculateSolarProduction(
  panels: number,
  hours: number,
  efficiency: number = 0.85
): number {
  const PANEL_CAPACITY = 0.25; // kW por panel
  return panels * PANEL_CAPACITY * hours * efficiency;
}
```

#### README para Features
```markdown
# Feature: Sistema de Personajes Evangelistas

## Propósito
Gestionar los perfiles de personajes con temática evangelista paródica.

## Uso
```astro
---
import { getCollection } from 'astro:content';
import CharacterCard from '@/components/CharacterCard.astro';

const characters = await getCollection('characters');
---

{characters.map(char => (
  <CharacterCard character={char} variant="evangelista" />
))}
```

## Campos Especiales
- `cita_biblica_parodia`: Cita estilo bíblico con tema ecológico
- `milagro_verde_signature`: Transformación ecológica característica
- `sermon_ecologico`: Mensaje evangelista verde
```

## Estándares de Calidad

### Checklist Pre-Commit
- [ ] Código formateado con Prettier
- [ ] Sin errores de ESLint
- [ ] Tests pasando con >90% cobertura
- [ ] TypeScript sin errores
- [ ] Documentación actualizada
- [ ] Commit message siguiendo convención

### Revisión de Código
- [ ] Código legible y autodocumentado
- [ ] Sin duplicación (DRY)
- [ ] Manejo de errores apropiado
- [ ] Performance considerada
- [ ] Accesibilidad verificada
- [ ] Responsive design probado

### Definition of Done
1. Funcionalidad implementada según specs
2. Tests unitarios y de integración
3. Documentación actualizada
4. Code review aprobado
5. CI/CD pasando
6. Desplegado en producción