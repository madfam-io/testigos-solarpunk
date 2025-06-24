# Prompt: Optimizar Performance del Sitio

## Objetivo
Alcanzar puntuación de 100 en todas las métricas de Lighthouse y tiempo de carga <1s.

## Análisis Inicial

1. **Ejecutar auditoría base**:
```bash
# Construir el sitio
npm run build

# Ejecutar Lighthouse
npm run lighthouse

# Analizar bundle
npm run analyze
```

2. **Revisar métricas actuales**:
- Performance Score
- Accessibility Score  
- Best Practices Score
- SEO Score
- PWA Score

## Optimizaciones por Categoría

### 1. Performance

#### Imágenes
```bash
# Optimizar todas las imágenes
node scripts/optimize-images.js
```

Verificar:
- [ ] Formatos modernos (WebP/AVIF)
- [ ] Lazy loading implementado
- [ ] Dimensiones especificadas
- [ ] Srcset para responsive

#### CSS

Critical CSS inline:
<style>
  /* Solo estilos above-the-fold */
  :root { /* tokens */ }
  body { /* reset básico */ }
  .header { /* navegación visible */ }
</style>

<!-- Resto del CSS diferido -->
<link rel="preload" href="/styles.css" as="style">
<link rel="stylesheet" href="/styles.css" media="print" onload="this.media='all'">
```

#### JavaScript
```javascript
// Diferir scripts no críticos
<script src="/script.js" defer></script>

// Dividir bundles grandes
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['astro'],
          'utils': ['./src/lib/utils'],
        }
      }
    }
  }
}
```

#### Fonts
```html
<!-- Preconectar a Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload fonts críticas -->
<link rel="preload" href="/fonts/poppins-v20-latin-regular.woff2" as="font" type="font/woff2" crossorigin>

<!-- Font-display swap -->
<style>
  @font-face {
    font-family: 'Poppins';
    font-display: swap;
    src: url('/fonts/poppins.woff2') format('woff2');
  }
</style>
```

### 2. Accessibility

#### Verificaciones HTML
```html
<!-- Estructura semántica -->
<header role="banner">
  <nav role="navigation" aria-label="Principal">
    <!-- ... -->
  </nav>
</header>

<main role="main" id="main-content">
  <h1>Título único por página</h1>
</main>

<footer role="contentinfo">
  <!-- ... -->
</footer>

<!-- Skip links -->
<a href="#main-content" class="skip-link">
  Saltar al contenido principal
</a>
```

#### Contraste y Colores
```css
/* Verificar ratios WCAG AAA */
:root {
  /* Contraste mínimo 7:1 para texto normal */
  --text-on-yellow: #000000; /* No #FFFFFF */
  --text-on-purple: #FFFFFF;
  
  /* Contraste mínimo 4.5:1 para texto grande */
  --heading-on-light: #212121;
}

/* Focus visible */
:focus {
  outline: 3px solid var(--madfam-purple);
  outline-offset: 2px;
}
```

#### ARIA Labels
```astro
<!-- Componente CharacterCard.astro -->
<article 
  role="article"
  aria-label={`Perfil de ${character.nombre}`}
>
  <img 
    src={character.imagen} 
    alt={`Fotografía de ${character.nombre}, ${character.descripcion_corta}`}
    loading="lazy"
    decoding="async"
  />
  
  <button
    aria-label={`Ver más detalles de ${character.nombre}`}
    aria-expanded="false"
    aria-controls={`details-${character.id}`}
  >
    Ver más
  </button>
</article>
```

### 3. Best Practices

#### HTTPS y Seguridad
```javascript
// astro.config.mjs
export default {
  vite: {
    server: {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
      }
    }
  }
}
```

#### Modernización
```html
<!-- Eliminar APIs obsoletas -->
<!-- ❌ No usar -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- ✅ Usar -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 4. SEO

#### Meta Tags
```astro
---
// BaseLayout.astro
const { 
  title = 'Testigos de Solarpunk',
  description = 'Universo narrativo evangelista ecológico',
  image = '/og-image.jpg',
  url = Astro.url
} = Astro.props;
---

<head>
  <!-- Básicos -->
  <title>{title} | MADFAM</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />
  
  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={new URL(image, Astro.site)} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={new URL(image, Astro.site)} />
  
  <!-- prettier-ignore-start -->
  <!-- JSON-LD -->
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Testigos de Solarpunk",
    "url": Astro.site,
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": "MADFAM",
      "logo": {
          "@type": "ImageObject",
          "url": new URL('/logo.png', Astro.site)
        }
      }
  })} />
  <!-- prettier-ignore-end -->
</head>
```

#### Sitemap y Robots
```javascript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default {
  integrations: [
    sitemap({
      filter: (page) => !page.includes('404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    })
  ]
}
```

### 5. PWA

#### Manifest.json
```json
{
  "name": "Testigos de Solarpunk - MADFAM",
  "short_name": "Testigos",
  "description": "Universo narrativo solarpunk evangelista",
  "start_url": "/testigos-solarpunk/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#212121",
  "theme_color": "#FFC107",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png", 
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshot1.png",
      "sizes": "1280x720",
      "type": "image/png"
    }
  ]
}
```

#### Service Worker
```javascript
// public/sw.js
const CACHE_NAME = 'testigos-v1';
const urlsToCache = [
  '/',
  '/styles/global.css',
  '/manifest.json',
  '/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/offline.html'))
  );
});
```

## Configuración Astro Optimizada

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import critters from 'astro-critters';
import purgecss from 'astro-purgecss';

export default defineConfig({
  site: 'https://madfam-io.github.io',
  base: '/testigos-solarpunk',
  
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets'
  },
  
  integrations: [
    sitemap(),
    critters(), // Critical CSS
    purgecss(), // Remove unused CSS
    compress({
      CSS: true,
      HTML: {
        removeAttributeQuotes: false,
        removeComments: true
      },
      Image: false,
      JavaScript: true,
      SVG: true
    })
  ],
  
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro'],
            'utils': ['./src/lib/utils']
          }
        }
      }
    }
  }
});
```

## Scripts de Optimización

### Optimizar Imágenes
```javascript
// scripts/optimize-images.js
import sharp from 'sharp';
import { globby } from 'globby';

async function optimizeImages() {
  const images = await globby('src/assets/images/**/*.{jpg,jpeg,png}');
  
  for (const image of images) {
    // Generar WebP
    await sharp(image)
      .webp({ quality: 85 })
      .toFile(image.replace(/\.(jpg|jpeg|png)$/, '.webp'));
    
    // Generar tamaños responsive
    const sizes = [320, 640, 768, 1024, 1280];
    for (const size of sizes) {
      await sharp(image)
        .resize(size, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 85 })
        .toFile(image.replace(/\.(jpg|jpeg|png)$/, `-${size}w.webp`));
    }
  }
}

optimizeImages();
```

## Verificación Final

1. **Ejecutar todas las optimizaciones**:
```bash
# Limpiar y reconstruir
npm run clean
npm install
npm run build

# Verificar métricas
npm run lighthouse

# Verificar tamaño de bundle
du -sh dist/
find dist -name "*.js" -exec ls -lh {} \;
```

2. **Checklist de verificación**:
- [ ] Lighthouse Performance: 100
- [ ] Lighthouse Accessibility: 100
- [ ] Lighthouse Best Practices: 100
- [ ] Lighthouse SEO: 100
- [ ] PWA instalable
- [ ] Tiempo de carga < 1s
- [ ] Bundle JS < 50KB (gzipped)
- [ ] CSS < 20KB (gzipped)
- [ ] Largest Contentful Paint < 2.5s
- [ ] First Input Delay < 100ms
- [ ] Cumulative Layout Shift < 0.1

3. **Monitoreo continuo**:
- Configurar GitHub Action para Lighthouse CI
- Alertas si métricas bajan de 95
- Revisión mensual de dependencias

## Recursos

- [Web.dev Metrics](https://web.dev/metrics/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Image Optimization](https://web.dev/fast/#optimize-your-images)

---

**Meta**: Mantener el sitio como referencia de excelencia en performance web, demostrando que la sostenibilidad digital es posible y necesaria.