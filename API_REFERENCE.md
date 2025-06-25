# 📚 API Reference - Testigos de Solarpunk

## Component Library

Esta documentación describe los componentes reutilizables del proyecto y sus APIs.

## 🎭 Emoji Components

### Magazine Cutout Emojis

Todos los emojis del proyecto utilizan el sistema de recortes de revista DIY.

#### CSS Classes

```css
/* Clase base */
.emoji-cutout {
  /* Estilo base de recorte de revista */
}

/* Tamaños */
.emoji-sm   /* Pequeño - navegación */
.emoji-md   /* Mediano - botones */
.emoji-lg   /* Grande - tarjetas */
.emoji-xl   /* Extra grande - héroes */

/* Contextos */
.emoji-nav      /* Navegación */
.emoji-hero     /* Secciones principales */
.emoji-card     /* Tarjetas */
.emoji-button   /* Botones */

/* Temas de color */
.theme-solar     /* Amarillo solar */
.theme-green     /* Verde sostenible */
.theme-purple    /* Púrpura tecnológico */
.theme-community /* Naranja comunidad */

/* Efectos especiales */
.flutter        /* Animación de aleteo */
.interactive    /* Efectos de hover */
```

#### Usage Example

```astro
<!-- Emoji básico con recorte -->
<span class="emoji-cutout emoji-md theme-solar">☀️</span>

<!-- Emoji de navegación con animación -->
<span class="emoji-cutout emoji-nav emoji-sm flutter">🎬</span>

<!-- Emoji interactivo grande -->
<span class="emoji-cutout emoji-hero emoji-xl theme-community interactive"
  >🤝</span
>
```

## 🏗️ Layout Components

### BaseLayout

Layout principal del sitio con navegación y meta tags.

#### Props

```typescript
interface BaseLayoutProps {
  title: string; // Título de la página
  description: string; // Descripción meta
  canonicalURL?: string; // URL canónica (opcional)
  ogImage?: string; // Imagen Open Graph (opcional)
}
```

#### Usage

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Mi Página" description="Descripción de mi página">
  <h1>Contenido aquí</h1>
</BaseLayout>
```

## 🃏 Card Components

### PhaseCard

Tarjeta para mostrar las fases del proyecto.

#### Props

```typescript
interface PhaseCardProps {
  fase: 1 | 2 | 3; // Número de fase
  titulo: string; // Título de la fase
  descripcion: string; // Descripción
  estado: 'activo' | 'proximamente' | 'desarrollo';
  icono: string; // Emoji para la fase
  link?: string; // Enlace opcional
}
```

### SketchCard

Tarjeta para mostrar sketches de video.

#### Props

```typescript
interface SketchCardProps {
  titulo: string; // Título del sketch
  descripcion: string; // Descripción breve
  duracion: string; // Duración (ej: "1:30")
  thumbnail: string; // URL de la miniatura
  tema: 'sostenibilidad' | 'tecnologia' | 'social';
  personajes: string[]; // Lista de personajes
  views: string; // Número de vistas
  likes: string; // Número de likes
}
```

## 🎨 Design System

### Color Variables

```css
:root {
  /* Colores principales */
  --amarillo-solar: #ffc107;
  --verde-sostenible: #4caf50;
  --azul-tecnologico: #2196f3;
  --naranja-comunidad: #ff6f35;

  /* Colores del tema */
  --fondo-primario: #121212;
  --fondo-secundario: #1e1e1e;
  --texto-primario: #ffffff;
  --texto-secundario: #cccccc;

  /* Espaciado */
  --espacio-xs: 0.25rem;
  --espacio-sm: 0.5rem;
  --espacio-md: 1rem;
  --espacio-lg: 1.5rem;
  --espacio-xl: 2rem;
  --espacio-xxl: 3rem;
}
```

### Typography Scale

```css
/* Headings */
h1 {
  font-size: 3rem;
} /* 48px */
h2 {
  font-size: 2.5rem;
} /* 40px */
h3 {
  font-size: 2rem;
} /* 32px */
h4 {
  font-size: 1.5rem;
} /* 24px */
h5 {
  font-size: 1.25rem;
} /* 20px */
h6 {
  font-size: 1.125rem;
} /* 18px */

/* Body */
.text-lg {
  font-size: 1.125rem;
} /* 18px */
.text-base {
  font-size: 1rem;
} /* 16px */
.text-sm {
  font-size: 0.875rem;
} /* 14px */
.text-xs {
  font-size: 0.75rem;
} /* 12px */
```

## 🔧 Utility Classes

### Layout Utilities

```css
.container     /* Contenedor responsivo */
.grid          /* CSS Grid básico */
.grid-2        /* Grid de 2 columnas */
.grid-3        /* Grid de 3 columnas */
.flex          /* Flexbox */
.text-center   /* Texto centrado */
```

### Spacing Utilities

```css
.mt-{size}     /* Margin top */
.mb-{size}     /* Margin bottom */
.ml-{size}     /* Margin left */
.mr-{size}     /* Margin right */
.p-{size}      /* Padding */
.gap-{size}    /* Gap en flexbox/grid */
```

### Animation Classes

```css
.fade-in       /* Fade in básico */
.slide-up      /* Deslizar hacia arriba */
.bounce        /* Efecto bounce */
.flutter       /* Animación de aleteo para emojis */
```

## 🎯 Interactive Components

### Button Variants

```css
.btn           /* Botón base */
.btn-primary   /* Botón principal */
.btn-secondary /* Botón secundario */
.btn-outline   /* Botón con borde */
.btn-ghost     /* Botón transparente */
```

### Form Components

```css
.form-input    /* Input básico */
.form-textarea /* Textarea */
.form-select   /* Select dropdown */
.form-checkbox /* Checkbox customizado */
```

## 📱 Responsive Behavior

### Breakpoints

```css
/* Mobile First */
@media (min-width: 768px) {
  /* Tablet */
}
@media (min-width: 1024px) {
  /* Desktop */
}
@media (min-width: 1280px) {
  /* Large Desktop */
}
```

### Responsive Patterns

```css
/* Grid responsivo */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--espacio-lg);
}

/* Espaciado responsivo */
.responsive-spacing {
  padding: var(--espacio-md);
}

@media (min-width: 768px) {
  .responsive-spacing {
    padding: var(--espacio-xl);
  }
}
```

## 🔗 Navigation API

### Main Navigation Structure

```typescript
interface NavItem {
  label: string;
  href: string;
  icon?: string; // Emoji opcional
  children?: NavItem[]; // Submenú opcional
}

const navigation: NavItem[] = [
  { label: 'El Proyecto', href: '/proyecto/' },
  {
    label: 'Contenido',
    href: '/contenido/',
    children: [
      { label: 'Sketches', href: '/contenido/sketches/', icon: '🎬' },
      { label: 'Podcast', href: '/contenido/podcast/', icon: '🎙️' },
      { label: 'MADLAB', href: '/contenido/madlab/', icon: '🔬' },
    ],
  },
  // ... más items
];
```

## 🎪 Animation System

### Keyframe Animations

```css
@keyframes flutter {
  0%,
  100% {
    transform: rotate(-2deg) scale(1);
  }
  50% {
    transform: rotate(2deg) scale(1.05);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Usage in Components

```css
.emoji-cutout.flutter {
  animation: flutter 3s ease-in-out infinite;
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
```

## 🧪 Testing Utilities

### Test Selectors

```typescript
// Usar data-testid para elementos en tests
<button data-testid="sketch-play-button">Play</button>

// En tests
const playButton = screen.getByTestId('sketch-play-button');
```

### Accessibility Testing

```typescript
// Verificar roles ARIA
expect(element).toHaveAttribute('aria-label', 'Play sketch');

// Verificar navegación por teclado
fireEvent.keyDown(element, { key: 'Enter' });
```

## 📝 Content API

### Sketch Data Structure

```typescript
interface Sketch {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  thumbnail: string;
  tema: SketchTema;
  personajes: string[];
  views: string;
  likes: string;
  episodio: string;
}

type SketchTema = 'sostenibilidad' | 'tecnologia' | 'social';
```

### Persona Data Structure

```typescript
interface Persona {
  id: string;
  nombre: string;
  apodo: string;
  edad: number;
  ocupacion: string;
  descripcion: string;
  dolor: string;
  sketch: string;
}
```

---

**Nota**: Esta documentación se actualiza automáticamente con cada release. Para contribuir con nuevos componentes, seguir las convenciones establecidas y documentar todas las props e interfaces.
