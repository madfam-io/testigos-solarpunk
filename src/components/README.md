# Component Library | Biblioteca de Componentes

<div align="center">

[Español](#español) | [English](#english)

</div>

---

## Español

### 📚 Guía de Componentes

Esta es la biblioteca completa de componentes de Testigos de Solarpunk. Todos los componentes son i18n-aware, theme-aware, y siguen los estándares de accesibilidad WCAG AAA.

### 🎯 Principios de Diseño

1. **i18n First**: Todos los componentes aceptan prop `lang`
2. **Theme Aware**: Adaptativos a los 3 temas (light, dark, auto)
3. **Accesibilidad AAA**: ARIA completo y navegación por teclado
4. **Magazine Cutout**: Estética DIY integrada
5. **Performance**: Lazy loading y optimización
6. **TypeScript**: Interfaces tipadas para todas las props

### 📋 Template de Componente

```astro
---
// ComponentName.astro
import { useTranslations } from '@/i18n/config';
import type { HTMLAttributes } from 'astro/types';

export interface Props extends HTMLAttributes<'div'> {
  lang: 'es' | 'en';
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  // ... props específicas del componente
}

const {
  lang,
  variant = 'primary',
  size = 'md',
  class: className,
  ...rest
} = Astro.props;

const t = useTranslations(lang);
---

<div
  class={`component-name component-name--${variant} component-name--${size} ${className || ''}`}
  lang={lang}
  {...rest}
>
  <!-- Contenido del componente -->
  <span class="emoji-cutout emoji-${size}">{emoji}</span>
  <h3>{t('component.title')}</h3>
</div>

<style>
  .component-name {
    /* Variables de tema */
    background: var(--bg-secondary);
    color: var(--text-primary);
    padding: var(--space-md);
    border-radius: var(--radius-md);

    /* Magazine cutout */
    position: relative;
    box-shadow: var(--cutout-shadow);
  }

  /* Variantes */
  .component-name--primary {
    background: var(--color-primary);
    color: var(--text-on-primary);
  }

  .component-name--secondary {
    background: var(--color-secondary);
    color: var(--text-on-primary);
  }

  /* Tamaños */
  .component-name--sm {
    padding: var(--space-sm);
  }
  .component-name--md {
    padding: var(--space-md);
  }
  .component-name--lg {
    padding: var(--space-lg);
  }

  /* Estados interactivos */
  .component-name:hover {
    transform: translateY(-2px);
    box-shadow:
      var(--cutout-shadow),
      0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Tema oscuro específico */
  [data-theme='dark'] .component-name:hover {
    box-shadow:
      var(--cutout-shadow),
      0 4px 12px rgba(255, 255, 255, 0.1);
  }
</style>
```

### 🧩 Catálogo de Componentes

## Navegación

### Navigation.astro

**Descripción**: Barra de navegación principal con selección de idioma y tema.

```astro
<Navigation lang="es" currentPath="/es/proyecto/" />
```

**Props**:

- `lang`: 'es' | 'en' (requerido)
- `currentPath`: string (requerido) - Ruta actual para highlighting
- `sticky?`: boolean - Navegación pegajosa
- `compact?`: boolean - Versión compacta

### LanguageSelector.astro

**Descripción**: Selector de idioma con detección automática.

```astro
<LanguageSelector lang="es" currentPath="/es/proyecto/" />
```

**Props**:

- `lang`: 'es' | 'en' (requerido)
- `currentPath`: string (requerido)
- `showFlags?`: boolean - Mostrar banderas

### ThemeSelector.astro

**Descripción**: Selector de tema con persistencia y auto-detección.

```astro
<ThemeSelector lang="es" />
```

**Props**:

- `lang`: 'es' | 'en' (requerido)
- `showLabels?`: boolean - Mostrar etiquetas de texto
- `variant?`: 'dropdown' | 'buttons' - Estilo de UI

## Contenido

### Hero.astro

**Descripción**: Sección hero principal con animaciones y CTA.

```astro
<Hero
  lang="es"
  title="Testigos de Solarpunk"
  subtitle="Humor que transforma"
  ctaText="Conoce más"
  ctaLink="/es/proyecto/"
/>
```

**Props**:

- `lang`: 'es' | 'en' (requerido)
- `title`: string (requerido)
- `subtitle?`: string
- `ctaText?`: string
- `ctaLink?`: string
- `backgroundImage?`: string
- `variant?`: 'default' | 'video' | 'split'

### SketchCard.astro

**Descripción**: Tarjeta para mostrar sketches con preview y metadata.

```astro
<SketchCard
  lang="es"
  sketch={{
    title: 'El Eco-Ansioso',
    description: 'Cuando quieres salvar el mundo...',
    thumbnail: '/images/sketch-1.jpg',
    duration: '1:30',
    episode: 1,
  }}
/>
```

**Props**:

- `lang`: 'es' | 'en' (requerido)
- `sketch`: SketchData (requerido)
  - `title`: string
  - `description`: string
  - `thumbnail`: string
  - `duration`: string
  - `episode`: number
  - `videoUrl?`: string
- `featured?`: boolean - Estilo destacado
- `horizontal?`: boolean - Layout horizontal

### CharacterCard.astro

**Descripción**: Tarjeta de personaje con animación y detalles.

```astro
<CharacterCard
  lang="es"
  character={{
    name: 'Gaby',
    role: 'La Eco-Estresada',
    description: 'Millennial que intenta salvar el mundo...',
    image: '/images/gaby.png',
    traits: ['Ansiosa', 'Determinada', 'Creativa'],
  }}
/>
```

**Props**:

- `lang`: 'es' | 'en' (requerido)
- `character`: CharacterData (requerido)
  - `name`: string
  - `role`: string
  - `description`: string
  - `image`: string
  - `traits`: string[]
  - `color?`: string
- `interactive?`: boolean - Hover effects
- `size?`: 'sm' | 'md' | 'lg'

### PhaseCard.astro

**Descripción**: Tarjeta para mostrar las 3 fases del proyecto.

```astro
<PhaseCard
  lang="es"
  phase={1}
  title="Atracción"
  description="Sketches virales que conectan"
  icon="🎭"
  status="active"
/>
```

**Props**:

- `lang`: 'es' | 'en' (requerido)
- `phase`: 1 | 2 | 3 (requerido)
- `title`: string (requerido)
- `description`: string (requerido)
- `icon`: string (requerido)
- `status`: 'active' | 'coming' | 'planning'
- `features?`: string[] - Lista de características

### MetricCard.astro

**Descripción**: Tarjeta para mostrar métricas con animación.

```astro
<MetricCard
  lang="es"
  value="500K+"
  label="Vistas totales"
  icon="👁️"
  trend="+15%"
/>
```

**Props**:

- `lang`: 'es' | 'en' (requerido)
- `value`: string | number (requerido)
- `label`: string (requerido)
- `icon?`: string
- `trend?`: string - Indicador de tendencia
- `animate?`: boolean - Animación de contador

## Layout

### Section.astro

**Descripción**: Wrapper de sección con spacing y estilos consistentes.

```astro
<Section
  lang="es"
  title="Nuestros Personajes"
  subtitle="Conoce al cast"
  background="subtle"
>
  <!-- Contenido -->
</Section>
```

**Props**:

- `lang`: 'es' | 'en' (requerido)
- `title?`: string
- `subtitle?`: string
- `background?`: 'default' | 'subtle' | 'accent'
- `spacing?`: 'compact' | 'normal' | 'large'
- `centered?`: boolean

### Grid.astro

**Descripción**: Sistema de grid responsive y flexible.

```astro
<Grid columns={3} gap="lg" responsive>
  <!-- Items -->
</Grid>
```

**Props**:

- `columns?`: 1 | 2 | 3 | 4 | 6 | 12
- `gap?`: 'sm' | 'md' | 'lg' | 'xl'
- `responsive?`: boolean - Auto-ajuste en móvil
- `alignItems?`: 'start' | 'center' | 'end' | 'stretch'

### Container.astro

**Descripción**: Container con max-width y padding responsive.

```astro
<Container size="lg" padding>
  <!-- Contenido -->
</Container>
```

**Props**:

- `size?`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `padding?`: boolean
- `centered?`: boolean

## Interactivos

### Button.astro

**Descripción**: Botón con variantes y estados accesibles.

```astro
<Button lang="es" variant="primary" size="md" href="/es/proyecto/">
  Conoce más
</Button>
```

**Props**:

- `lang`: 'es' | 'en' (requerido)
- `variant?`: 'primary' | 'secondary' | 'ghost' | 'danger'
- `size?`: 'sm' | 'md' | 'lg'
- `href?`: string - Convierte en link
- `disabled?`: boolean
- `loading?`: boolean
- `icon?`: string - Emoji o icono

### Modal.astro

**Descripción**: Modal accesible con gestión de focus.

```astro
<Modal lang="es" id="video-modal" title="Ver Sketch">
  <!-- Contenido del modal -->
</Modal>
```

**Props**:

- `lang`: 'es' | 'en' (requerido)
- `id`: string (requerido)
- `title`: string (requerido)
- `size?`: 'sm' | 'md' | 'lg' | 'full'
- `closeOnOverlay?`: boolean

### Tabs.astro

**Descripción**: Sistema de tabs accesible con navegación por teclado.

```astro
<Tabs
  lang="es"
  tabs={[
    { id: 'sketches', label: 'Sketches', content: '...' },
    { id: 'podcast', label: 'Podcast', content: '...' },
  ]}
  defaultTab="sketches"
/>
```

**Props**:

- `lang`: 'es' | 'en' (requerido)
- `tabs`: TabData[] (requerido)
- `defaultTab?`: string
- `variant?`: 'line' | 'pills' | 'enclosed'

## Utilidades

### LoadingSpinner.astro

**Descripción**: Indicador de carga accesible.

```astro
<LoadingSpinner lang="es" size="md" message="Cargando contenido..." />
```

**Props**:

- `lang`: 'es' | 'en' (requerido)
- `size?`: 'sm' | 'md' | 'lg'
- `message?`: string - Texto para screen readers
- `fullScreen?`: boolean

### ErrorBoundary.astro

**Descripción**: Manejo de errores con fallback UI.

```astro
<ErrorBoundary lang="es" fallback="Algo salió mal">
  <!-- Contenido que puede fallar -->
</ErrorBoundary>
```

**Props**:

- `lang`: 'es' | 'en' (requerido)
- `fallback?`: string | AstroComponent
- `onError?`: (error: Error) => void

### Icon.astro

**Descripción**: Sistema de iconos con emojis magazine cutout.

```astro
<Icon name="eco-green" size="lg" animated />
```

**Props**:

- `name`: string (requerido) - Nombre del emoji/icono
- `size?`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `animated?`: boolean - Animación flutter
- `color?`: string - Override color

## Magazine Cutout

### MagazineCutoutImage.astro

**Descripción**: Imagen con efecto de recorte de revista.

```astro
<MagazineCutoutImage
  src="/images/hero.jpg"
  alt="Descripción de imagen"
  tape="corner"
/>
```

**Props**:

- `src`: string (requerido)
- `alt`: string (requerido)
- `tape?`: 'none' | 'corner' | 'top' | 'random'
- `rotation?`: number - Grados de rotación
- `shadow?`: boolean

### EmojiCutout.astro

**Descripción**: Emoji con estilo de recorte y animación.

```astro
<EmojiCutout emoji="🌱" size="xl" context="hero" animated />
```

**Props**:

- `emoji`: string (requerido)
- `size?`: 'sm' | 'md' | 'lg' | 'xl'
- `context?`: 'nav' | 'hero' | 'card' | 'inline'
- `animated?`: boolean
- `rotation?`: number

### TapeDecoration.astro

**Descripción**: Decoración de cinta adhesiva.

```astro
<TapeDecoration variant="horizontal" color="yellow" position="top-left" />
```

**Props**:

- `variant?`: 'horizontal' | 'vertical' | 'diagonal'
- `color?`: 'default' | 'yellow' | 'green' | 'purple'
- `position?`: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

---

## English

### 📚 Component Guidelines

This is the complete component library for Testigos de Solarpunk. All components are i18n-aware, theme-aware, and follow WCAG AAA accessibility standards.

### 🎯 Design Principles

1. **i18n First**: All components accept `lang` prop
2. **Theme Aware**: Adaptive to all 3 themes (light, dark, auto)
3. **AAA Accessibility**: Complete ARIA and keyboard navigation
4. **Magazine Cutout**: Integrated DIY aesthetic
5. **Performance**: Lazy loading and optimization
6. **TypeScript**: Typed interfaces for all props

### 📋 Component Template

```astro
---
// ComponentName.astro
import { useTranslations } from '@/i18n/config';
import type { HTMLAttributes } from 'astro/types';

export interface Props extends HTMLAttributes<'div'> {
  lang: 'es' | 'en';
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  // ... component specific props
}

const {
  lang,
  variant = 'primary',
  size = 'md',
  class: className,
  ...rest
} = Astro.props;

const t = useTranslations(lang);
---

<div
  class={`component-name component-name--${variant} component-name--${size} ${className || ''}`}
  lang={lang}
  {...rest}
>
  <!-- Component content -->
  <span class="emoji-cutout emoji-${size}">{emoji}</span>
  <h3>{t('component.title')}</h3>
</div>

<style>
  .component-name {
    /* Theme variables */
    background: var(--bg-secondary);
    color: var(--text-primary);
    padding: var(--space-md);
    border-radius: var(--radius-md);

    /* Magazine cutout */
    position: relative;
    box-shadow: var(--cutout-shadow);
  }

  /* Variants */
  .component-name--primary {
    background: var(--color-primary);
    color: var(--text-on-primary);
  }

  .component-name--secondary {
    background: var(--color-secondary);
    color: var(--text-on-primary);
  }

  /* Sizes */
  .component-name--sm {
    padding: var(--space-sm);
  }
  .component-name--md {
    padding: var(--space-md);
  }
  .component-name--lg {
    padding: var(--space-lg);
  }

  /* Interactive states */
  .component-name:hover {
    transform: translateY(-2px);
    box-shadow:
      var(--cutout-shadow),
      0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Dark theme specific */
  [data-theme='dark'] .component-name:hover {
    box-shadow:
      var(--cutout-shadow),
      0 4px 12px rgba(255, 255, 255, 0.1);
  }
</style>
```

### 🧩 Component Catalog

## Navigation

### Navigation.astro

**Description**: Main navigation bar with language and theme selection.

```astro
<Navigation lang="en" currentPath="/en/project/" />
```

**Props**:

- `lang`: 'es' | 'en' (required)
- `currentPath`: string (required) - Current route for highlighting
- `sticky?`: boolean - Sticky navigation
- `compact?`: boolean - Compact version

### LanguageSelector.astro

**Description**: Language selector with automatic detection.

```astro
<LanguageSelector lang="en" currentPath="/en/project/" />
```

**Props**:

- `lang`: 'es' | 'en' (required)
- `currentPath`: string (required)
- `showFlags?`: boolean - Show flags

### ThemeSelector.astro

**Description**: Theme selector with persistence and auto-detection.

```astro
<ThemeSelector lang="en" />
```

**Props**:

- `lang`: 'es' | 'en' (required)
- `showLabels?`: boolean - Show text labels
- `variant?`: 'dropdown' | 'buttons' - UI style

## Content

### Hero.astro

**Description**: Main hero section with animations and CTA.

```astro
<Hero
  lang="en"
  title="Solarpunk Witnesses"
  subtitle="Humor that transforms"
  ctaText="Learn more"
  ctaLink="/en/project/"
/>
```

**Props**:

- `lang`: 'es' | 'en' (required)
- `title`: string (required)
- `subtitle?`: string
- `ctaText?`: string
- `ctaLink?`: string
- `backgroundImage?`: string
- `variant?`: 'default' | 'video' | 'split'

### SketchCard.astro

**Description**: Card for displaying sketches with preview and metadata.

```astro
<SketchCard
  lang="en"
  sketch={{
    title: 'The Eco-Anxious',
    description: 'When you want to save the world...',
    thumbnail: '/images/sketch-1.jpg',
    duration: '1:30',
    episode: 1,
  }}
/>
```

**Props**:

- `lang`: 'es' | 'en' (required)
- `sketch`: SketchData (required)
  - `title`: string
  - `description`: string
  - `thumbnail`: string
  - `duration`: string
  - `episode`: number
  - `videoUrl?`: string
- `featured?`: boolean - Featured style
- `horizontal?`: boolean - Horizontal layout

### CharacterCard.astro

**Description**: Character card with animation and details.

```astro
<CharacterCard
  lang="en"
  character={{
    name: 'Gaby',
    role: 'The Eco-Stressed',
    description: 'Millennial trying to save the world...',
    image: '/images/gaby.png',
    traits: ['Anxious', 'Determined', 'Creative'],
  }}
/>
```

**Props**:

- `lang`: 'es' | 'en' (required)
- `character`: CharacterData (required)
  - `name`: string
  - `role`: string
  - `description`: string
  - `image`: string
  - `traits`: string[]
  - `color?`: string
- `interactive?`: boolean - Hover effects
- `size?`: 'sm' | 'md' | 'lg'

### PhaseCard.astro

**Description**: Card for displaying the 3 project phases.

```astro
<PhaseCard
  lang="en"
  phase={1}
  title="Attraction"
  description="Viral sketches that connect"
  icon="🎭"
  status="active"
/>
```

**Props**:

- `lang`: 'es' | 'en' (required)
- `phase`: 1 | 2 | 3 (required)
- `title`: string (required)
- `description`: string (required)
- `icon`: string (required)
- `status`: 'active' | 'coming' | 'planning'
- `features?`: string[] - Feature list

### MetricCard.astro

**Description**: Card for displaying metrics with animation.

```astro
<MetricCard
  lang="en"
  value="500K+"
  label="Total views"
  icon="👁️"
  trend="+15%"
/>
```

**Props**:

- `lang`: 'es' | 'en' (required)
- `value`: string | number (required)
- `label`: string (required)
- `icon?`: string
- `trend?`: string - Trend indicator
- `animate?`: boolean - Counter animation

## Layout

### Section.astro

**Description**: Section wrapper with consistent spacing and styles.

```astro
<Section
  lang="en"
  title="Our Characters"
  subtitle="Meet the cast"
  background="subtle"
>
  <!-- Content -->
</Section>
```

**Props**:

- `lang`: 'es' | 'en' (required)
- `title?`: string
- `subtitle?`: string
- `background?`: 'default' | 'subtle' | 'accent'
- `spacing?`: 'compact' | 'normal' | 'large'
- `centered?`: boolean

### Grid.astro

**Description**: Responsive and flexible grid system.

```astro
<Grid columns={3} gap="lg" responsive>
  <!-- Items -->
</Grid>
```

**Props**:

- `columns?`: 1 | 2 | 3 | 4 | 6 | 12
- `gap?`: 'sm' | 'md' | 'lg' | 'xl'
- `responsive?`: boolean - Auto-adjust on mobile
- `alignItems?`: 'start' | 'center' | 'end' | 'stretch'

### Container.astro

**Description**: Container with max-width and responsive padding.

```astro
<Container size="lg" padding>
  <!-- Content -->
</Container>
```

**Props**:

- `size?`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `padding?`: boolean
- `centered?`: boolean

## Interactive

### Button.astro

**Description**: Button with variants and accessible states.

```astro
<Button lang="en" variant="primary" size="md" href="/en/project/">
  Learn more
</Button>
```

**Props**:

- `lang`: 'es' | 'en' (required)
- `variant?`: 'primary' | 'secondary' | 'ghost' | 'danger'
- `size?`: 'sm' | 'md' | 'lg'
- `href?`: string - Converts to link
- `disabled?`: boolean
- `loading?`: boolean
- `icon?`: string - Emoji or icon

### Modal.astro

**Description**: Accessible modal with focus management.

```astro
<Modal lang="en" id="video-modal" title="Watch Sketch">
  <!-- Modal content -->
</Modal>
```

**Props**:

- `lang`: 'es' | 'en' (required)
- `id`: string (required)
- `title`: string (required)
- `size?`: 'sm' | 'md' | 'lg' | 'full'
- `closeOnOverlay?`: boolean

### Tabs.astro

**Description**: Accessible tab system with keyboard navigation.

```astro
<Tabs
  lang="en"
  tabs={[
    { id: 'sketches', label: 'Sketches', content: '...' },
    { id: 'podcast', label: 'Podcast', content: '...' },
  ]}
  defaultTab="sketches"
/>
```

**Props**:

- `lang`: 'es' | 'en' (required)
- `tabs`: TabData[] (required)
- `defaultTab?`: string
- `variant?`: 'line' | 'pills' | 'enclosed'

## Utilities

### LoadingSpinner.astro

**Description**: Accessible loading indicator.

```astro
<LoadingSpinner lang="en" size="md" message="Loading content..." />
```

**Props**:

- `lang`: 'es' | 'en' (required)
- `size?`: 'sm' | 'md' | 'lg'
- `message?`: string - Text for screen readers
- `fullScreen?`: boolean

### ErrorBoundary.astro

**Description**: Error handling with fallback UI.

```astro
<ErrorBoundary lang="en" fallback="Something went wrong">
  <!-- Content that might fail -->
</ErrorBoundary>
```

**Props**:

- `lang`: 'es' | 'en' (required)
- `fallback?`: string | AstroComponent
- `onError?`: (error: Error) => void

### Icon.astro

**Description**: Icon system with magazine cutout emojis.

```astro
<Icon name="eco-green" size="lg" animated />
```

**Props**:

- `name`: string (required) - Emoji/icon name
- `size?`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `animated?`: boolean - Flutter animation
- `color?`: string - Override color

## Magazine Cutout

### MagazineCutoutImage.astro

**Description**: Image with magazine cutout effect.

```astro
<MagazineCutoutImage
  src="/images/hero.jpg"
  alt="Image description"
  tape="corner"
/>
```

**Props**:

- `src`: string (required)
- `alt`: string (required)
- `tape?`: 'none' | 'corner' | 'top' | 'random'
- `rotation?`: number - Rotation degrees
- `shadow?`: boolean

### EmojiCutout.astro

**Description**: Emoji with cutout style and animation.

```astro
<EmojiCutout emoji="🌱" size="xl" context="hero" animated />
```

**Props**:

- `emoji`: string (required)
- `size?`: 'sm' | 'md' | 'lg' | 'xl'
- `context?`: 'nav' | 'hero' | 'card' | 'inline'
- `animated?`: boolean
- `rotation?`: number

### TapeDecoration.astro

**Description**: Adhesive tape decoration.

```astro
<TapeDecoration variant="horizontal" color="yellow" position="top-left" />
```

**Props**:

- `variant?`: 'horizontal' | 'vertical' | 'diagonal'
- `color?`: 'default' | 'yellow' | 'green' | 'purple'
- `position?`: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

---

## Usage Examples | Ejemplos de Uso

### Complete Page Example

```astro
---
// pages/[lang]/example.astro
import Layout from '@/layouts/BaseLayout.astro';
import Hero from '@/components/Hero.astro';
import Section from '@/components/Section.astro';
import Grid from '@/components/Grid.astro';
import SketchCard from '@/components/SketchCard.astro';
import { useTranslations } from '@/i18n/config';

const { lang } = Astro.params;
const t = useTranslations(lang);

const sketches = await getCollection('sketches', ({ id }) =>
  id.startsWith(lang)
);
---

<Layout title={t('page.example.title')} lang={lang}>
  <Hero
    lang={lang}
    title={t('hero.title')}
    subtitle={t('hero.subtitle')}
    ctaText={t('hero.cta')}
    ctaLink={`/${lang}/contenido/sketches/`}
  />

  <Section lang={lang} title={t('section.sketches.title')} background="subtle">
    <Grid columns={3} gap="lg" responsive>
      {
        sketches.map((sketch) => (
          <SketchCard lang={lang} sketch={sketch.data} />
        ))
      }
    </Grid>
  </Section>
</Layout>
```

### Component Composition

```astro
---
// Custom component using library components
import Container from '@/components/Container.astro';
import Button from '@/components/Button.astro';
import EmojiCutout from '@/components/EmojiCutout.astro';

const { lang } = Astro.props;
---

<Container size="md" centered>
  <div class="custom-component">
    <EmojiCutout emoji="🌟" size="xl" animated />
    <h2>Custom Feature</h2>
    <p>Description text</p>
    <Button lang={lang} variant="primary" href="/learn-more">
      Learn More
    </Button>
  </div>
</Container>

<style>
  .custom-component {
    text-align: center;
    padding: var(--space-xl);
  }
</style>
```

---

<div align="center">

### Contributing Components | Contribuir Componentes

See [CONTRIBUTING.md](../../CONTRIBUTING.md#components) for component contribution guidelines.

</div>
