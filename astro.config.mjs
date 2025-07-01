// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages deployment configuration
  site: 'https://madfam-io.github.io',
  base: '/testigos-solarpunk',

  // Internationalization configuration
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true, // Always show /es/ for Spanish
      redirectToDefaultLocale: true, // Enable automatic redirects to /es/
    },
  },

  // Redirects configuration for root paths to Spanish
  // Only non-trailing slash versions needed since trailingSlash: 'always' handles the rest
  redirects: {
    // Main sections
    '/recursos': '/es/recursos/',
    '/recursos/creadores': '/es/recursos/creadores/',
    '/recursos/creadores/plantillas': '/es/recursos/creadores/plantillas/',
    '/recursos/creadores/personajes': '/es/recursos/creadores/personajes/',
    '/recursos/creadores/worldbuilding': '/es/recursos/creadores/worldbuilding/',
    '/recursos/actores': '/es/recursos/actores/',
    '/recursos/actores/personajes': '/es/recursos/actores/personajes/',
    '/recursos/actores/dialogo': '/es/recursos/actores/dialogo/',
    '/recursos/actores/movimiento': '/es/recursos/actores/movimiento/',
    '/recursos/patrocinadores': '/es/recursos/patrocinadores/',
    '/recursos/patrocinadores/valores': '/es/recursos/patrocinadores/valores/',
    '/recursos/patrocinadores/integracion': '/es/recursos/patrocinadores/integracion/',
    '/recursos/patrocinadores/impacto': '/es/recursos/patrocinadores/impacto/',

    // Content sections
    '/contenido': '/es/contenido/',
    '/contenido/sketches': '/es/contenido/sketches/',
    '/contenido/podcast': '/es/contenido/podcast/',
    '/contenido/madlab': '/es/contenido/madlab/',

    // Universe sections
    '/personajes': '/es/personajes/',
    '/mundo': '/es/mundo/',
    '/guiones': '/es/guiones/',

    // Project sections
    '/proyecto': '/es/proyecto/',
    '/produccion': '/es/produccion/',
    '/produccion/estilo-visual': '/es/produccion/estilo-visual/',
    '/produccion/audio': '/es/produccion/audio/',
    '/produccion/tono-voz': '/es/produccion/tono-voz/',
    '/produccion/specs': '/es/produccion/specs/',

    // Other sections
    '/comunidad': '/es/comunidad/',
    '/impacto': '/es/impacto/',
    '/filosofia': '/es/filosofia/',
    '/formatos': '/es/formatos/',
    '/guia-visual': '/es/guia-visual/',
  },

  // Integrations
  integrations: [
    // Generate automatic sitemap with i18n support
    sitemap({
      filter: (page) => !page.includes('404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-MX',
          en: 'en-US',
        },
      },
    }),
  ],

  // Build configuration optimized for performance
  build: {
    // Optimize asset file names
    assets: '_assets',
    // Enable inline stylesheets for critical CSS
    inlineStylesheets: 'auto',
  },

  // Image optimization configuration with Sharp
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },

  // Vite configuration
  vite: {
    build: {
      // Enable CSS code splitting for better caching
      cssCodeSplit: true,
      // Enable minification for smaller bundles (using esbuild default)
      minify: true,
      // Configure manual chunks for better caching
      rollupOptions: {
        output: {
          assetFileNames: '_assets/[name].[hash][extname]',
          chunkFileNames: '_assets/chunks/[name].[hash].js',
          entryFileNames: '_assets/[name].[hash].js',
        },
      },
    },
    // SSR configuration (disabled for static build)
    ssr: {
      // Exclude problematic dependencies from SSR
      external: ['@resvg/resvg-js', 'sharp'],
      // Disable SSR for static builds
      noExternal: [],
    },
  },

  // Server configuration for development
  server: {
    port: 4321,
    host: true,
  },

  // Markdown configuration
  markdown: {
    // Enable GitHub-flavored markdown
    gfm: true,
    // Configure syntax highlighting with Shiki
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  // Prefetch configuration for better performance (disabled to reduce bundle size)
  // prefetch: {
  //   prefetchAll: true,
  //   defaultStrategy: 'viewport',
  // },

  // Output configuration
  output: 'static',

  // Enable trailing slash for GitHub Pages compatibility
  trailingSlash: 'always',

  // Disable HTML compression to avoid parsing issues
  compressHTML: false,

  // Compression is disabled (was causing 404 errors)
  // Use astro-compress when the issues are resolved

  // Future custom domain configuration:
  // site: 'https://universo.testigosdesolarpunk.mx',
  // base: '/',
});
