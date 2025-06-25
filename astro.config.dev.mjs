// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Development configuration without base path
export default defineConfig({
  // Local development configuration
  site: 'http://localhost:4321',
  base: '/', // No base path for local development

  // Integrations
  integrations: [
    // Generate automatic sitemap
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
  ],

  // Build configuration
  build: {
    assets: '_assets',
    inlineStylesheets: 'never',
  },

  // Vite configuration
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: '_assets/[name].[hash][extname]',
          chunkFileNames: '_assets/chunks/[name].[hash].js',
          entryFileNames: '_assets/[name].[hash].js',
          manualChunks: {
            utils: ['./src/lib/utils', './src/lib/constants'],
          },
        },
      },
    },
    ssr: {
      external: ['@resvg/resvg-js', 'sharp'],
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
    gfm: true,
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  // Output configuration
  output: 'static',

  // Enable trailing slash for consistency
  trailingSlash: 'always',
});