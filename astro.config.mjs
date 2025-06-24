// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://madfam-io.github.io',
  base: '/testigos-solarpunk',
  
  integrations: [
    // Generar sitemap automático
    sitemap({
      filter: (page) => !page.includes('404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-MX',
        },
      },
    }),
    
    // Compresión de assets
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          sortAttributes: true,
          sortClassName: true,
        },
      },
      JavaScript: true,
      Image: false, // Manejaremos imágenes con Sharp
      SVG: true,
    }),
  ],
  
  build: {
    // Optimizar nombres de archivos
    assets: '_assets',
    // Inline estilos críticos automáticamente
    inlineStylesheets: 'auto',
  },
  
  image: {
    // Configurar servicio de optimización de imágenes
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  
  vite: {
    build: {
      // Mejorar code splitting
      cssCodeSplit: true,
      // Configurar chunks manuales para mejor caching
      rollupOptions: {
        output: {
          assetFileNames: '_assets/[name].[hash][extname]',
          chunkFileNames: '_assets/chunks/[name].[hash].js',
          entryFileNames: '_assets/[name].[hash].js',
          manualChunks: {
            // Separar vendor code
            'vendor': ['astro:content'],
            // Agrupar utilidades
            'utils': [
              './src/lib/utils',
              './src/lib/constants',
            ],
          },
        },
      },
    },
    // Optimizaciones adicionales
    optimizeDeps: {
      include: ['astro:content'],
    },
    ssr: {
      // Excluir dependencias problemáticas del SSR
      external: ['@resvg/resvg-js'],
    },
  },
  
  // Experimental: Optimizaciones adicionales
  experimental: {
    // Options available in Astro 5
  },
  
  // Para dominio personalizado:
  // site: 'https://universo.testigosdesolarpunk.mx',
  // base: '/',
});