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
      redirectToDefaultLocale: false,
    },
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

  // Build configuration (simplified to reduce bundle size)
  build: {
    // Optimize asset file names
    assets: '_assets',
    // Disable inline stylesheets to reduce bundle size
    inlineStylesheets: 'never',
  },

  // Image optimization configuration (disabled to reduce bundle size)
  // image: {
  //   service: {
  //     entrypoint: 'astro/assets/services/sharp',
  //     config: {
  //       limitInputPixels: false,
  //     },
  //   },
  // },

  // Vite configuration
  vite: {
    build: {
      // Enable CSS code splitting for better caching
      cssCodeSplit: true,
      // Configure manual chunks for better caching
      rollupOptions: {
        output: {
          assetFileNames: '_assets/[name].[hash][extname]',
          chunkFileNames: '_assets/chunks/[name].[hash].js',
          entryFileNames: '_assets/[name].[hash].js',
          manualChunks: {
            // Group utilities for better caching
            utils: ['./src/lib/utils', './src/lib/constants'],
          },
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
