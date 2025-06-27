// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Vercel deployment configuration (no base path needed)
  site: 'https://testigos-solarpunk.vercel.app',
  
  // No base path for Vercel
  base: '/',

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

  // Build configuration optimized for Vercel
  build: {
    // Optimize asset file names
    assets: '_assets',
    // Enable inline stylesheets for better performance
    inlineStylesheets: 'auto',
  },

  // Image optimization configuration
  image: {
    domains: ['testigos-solarpunk.vercel.app'],
    remotePatterns: [{ protocol: "https" }],
  },

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
    // SSR configuration
    ssr: {
      // Exclude problematic dependencies from SSR
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
    // Enable GitHub-flavored markdown
    gfm: true,
    // Configure syntax highlighting with Shiki
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  // Prefetch configuration for better performance
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  // Output configuration
  output: 'static',

  // Enable trailing slash for consistency
  trailingSlash: 'always',

  // Disable HTML compression to avoid parsing issues
  compressHTML: false,
  
  // Security headers are handled in vercel.json
});