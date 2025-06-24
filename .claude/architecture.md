# 🏗️ Arquitectura del Proyecto

## Visión General

Testigos de Solarpunk está construido con Astro, un framework moderno que prioriza el rendimiento mediante la generación de sitios estáticos con hidratación parcial opcional.

## Stack Tecnológico

### Core

- **Astro 5.x**: Framework principal para SSG
- **TypeScript**: Tipado estático para mayor seguridad
- **Vite**: Bundler rápido para desarrollo

### Calidad de Código

- **ESLint**: Linting con reglas estrictas
- **Prettier**: Formateo consistente
- **Husky**: Git hooks para calidad
- **lint-staged**: Verificación incremental

### Testing

- **Vitest**: Framework de testing rápido
- **@testing-library**: Utilidades de testing
- **Coverage**: Meta >90% en todas las métricas

### Optimización

- **Sharp**: Procesamiento de imágenes
- **PurgeCSS**: Eliminación de CSS no usado
- **Critters**: Critical CSS inlining
- **Compress**: Compresión de assets

## Arquitectura de Componentes

```
src/components/
├── ui/                    # Componentes base reutilizables
│   ├── Button.astro      # Botón con variantes MADFAM
│   ├── Card.astro        # Tarjeta contenedora
│   └── Modal.astro       # Modal accesible
├── layout/               # Componentes de estructura
│   ├── Header.astro      # Cabecera con navegación
│   ├── Footer.astro      # Pie con links y créditos
│   └── Navigation.astro  # Navegación responsive
└── features/             # Componentes específicos del dominio
    ├── CharacterCard.astro    # Tarjeta de personaje
    ├── ScriptViewer.astro     # Visor de guiones
    └── LocationMap.astro      # Mapa de ubicaciones
```

### Principios de Diseño de Componentes

1. **Composición sobre herencia**: Componentes pequeños y componibles
2. **Props tipadas**: Interfaces TypeScript para todas las props
3. **Slots nombrados**: Para máxima flexibilidad
4. **CSS scoped**: Estilos encapsulados por componente
5. **Accesibilidad**: ARIA labels y navegación por teclado

## Sistema de Contenido

### Content Collections

```typescript
// src/content/config.ts
export const collections = {
  characters: defineCollection({
    type: 'data',
    schema: z.object({
      nombre: z.string(),
      titulo: z.string(),
      // ... campos evangelista paródicos
      cita_biblica_parodia: z.string(),
      sermon_ecologico: z.string().optional(),
    }),
  }),
  scripts: defineCollection({
    type: 'content',
    schema: z.object({
      titulo: z.string(),
      episodio: z.number(),
      plataforma: z.enum(['TT', 'YT', 'IG', 'FB']),
      // ... metadata viral
      momentos_virales: z.array(z.string()),
    }),
  }),
};
```

### Flujo de Datos

1. **Fuente**: Archivos YAML/Markdown en `src/content/`
2. **Validación**: Zod schemas en tiempo de build
3. **Transformación**: Astro procesa y optimiza
4. **Renderizado**: Componentes consumen datos tipados

## Sistema de Estilos

### Design Tokens

```css
/* src/styles/madfam-tokens.css */
:root {
  /* Colores MADFAM */
  --madfam-yellow: #ffc107;
  --madfam-green: #4caf50;
  --madfam-purple: #663399;

  /* Espaciado (8px base) */
  --space-xs: 0.25rem; /* 4px */
  --space-sm: 0.5rem; /* 8px */
  --space-md: 1rem; /* 16px */
  --space-lg: 2rem; /* 32px */
  --space-xl: 4rem; /* 64px */
}
```

### Arquitectura CSS

1. **Reset**: Normalización cross-browser
2. **Tokens**: Variables CSS para consistencia
3. **Utilities**: Clases helper (.text-center, .mt-4)
4. **Components**: Estilos específicos por componente
5. **Themes**: Modo claro/oscuro automático

## Performance

### Estrategias de Optimización

1. **Static Generation**: Pre-renderizado en build time
2. **Image Optimization**: Sharp con formatos modernos
3. **Code Splitting**: Chunks automáticos por ruta
4. **Tree Shaking**: Eliminación de código muerto
5. **Compression**: Gzip/Brotli en servidor

### Métricas Objetivo

- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **TTI**: < 3.8s (Time to Interactive)

## Seguridad

### Headers de Seguridad

```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### Mejores Prácticas

1. **Dependencias**: Actualizadas regularmente
2. **Secrets**: Nunca en el código
3. **Validación**: Inputs sanitizados
4. **HTTPS**: Forzado en producción

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
jobs:
  quality-checks:
    - Lint
    - Type Check
    - Unit Tests
    - Integration Tests
    - Build
    - Lighthouse CI

  deploy:
    - Build optimizado
    - Deploy a GitHub Pages
    - Verificación post-deploy
```

### Ambientes

- **Development**: Local con hot reload
- **Preview**: PRs con deploy preview
- **Production**: GitHub Pages

## Monitoreo

### Analytics

- Web Vitals tracking
- Error tracking con Sentry (opcional)
- Analytics de uso (privacy-first)

### Alertas

- Build failures
- Performance degradation
- Security vulnerabilities

## Escalabilidad

### Consideraciones

1. **Contenido**: Estructura preparada para 1000+ items
2. **Build Time**: Optimizado para builds incrementales
3. **CDN**: Assets servidos desde edge
4. **i18n**: Preparado para múltiples idiomas

### Límites Conocidos

- Build time aumenta con contenido
- Búsqueda client-side limitada
- Sin backend dinámico

## Decisiones Arquitectónicas

### ADR-001: Astro sobre Next.js

**Contexto**: Necesitamos un framework para contenido estático
**Decisión**: Astro por su enfoque en performance
**Consecuencias**: Mejor performance, menos complejidad

### ADR-002: CSS Puro sobre Tailwind

**Contexto**: Sistema de estilos mantenible
**Decisión**: CSS con design tokens
**Consecuencias**: Mayor control, bundle más pequeño

### ADR-003: Vitest sobre Jest

**Contexto**: Framework de testing
**Decisión**: Vitest por velocidad y compatibilidad con Vite
**Consecuencias**: Tests más rápidos, mejor DX
