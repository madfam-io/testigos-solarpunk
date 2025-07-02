// @ts-check
import { defineConfig } from 'astro/config';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
// import sitemap from '@astrojs/sitemap';

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
    '/recursos/creadores/worldbuilding':
      '/es/recursos/creadores/worldbuilding/',
    '/recursos/actores': '/es/recursos/actores/',
    '/recursos/actores/personajes': '/es/recursos/actores/personajes/',
    '/recursos/actores/dialogo': '/es/recursos/actores/dialogo/',
    '/recursos/actores/movimiento': '/es/recursos/actores/movimiento/',
    '/recursos/patrocinadores': '/es/recursos/patrocinadores/',
    '/recursos/patrocinadores/valores': '/es/recursos/patrocinadores/valores/',
    '/recursos/patrocinadores/integracion':
      '/es/recursos/patrocinadores/integracion/',
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
    '/proyecto-unified': '/es/proyecto-unified/',
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
    '/sitemap': '/es/sitemap/',

    // World subsections
    '/mundo/azotea-verde-neo-cuernavaca':
      '/es/mundo/azotea-verde-neo-cuernavaca/',

    // English route redirects to Spanish equivalents
    '/project': '/es/proyecto/',
    '/unified-project': '/es/proyecto-unified/',
    '/content': '/es/contenido/',
    '/content/sketches': '/es/contenido/sketches/',
    '/content/podcast': '/es/contenido/podcast/',
    '/content/madlab': '/es/contenido/madlab/',
    '/characters': '/es/personajes/',
    '/world': '/es/mundo/',
    '/world/green-roof-neo-cuernavaca':
      '/es/mundo/azotea-verde-neo-cuernavaca/',
    '/scripts': '/es/guiones/',
    '/community': '/es/comunidad/',
    '/production': '/es/produccion/',
    '/production/visual-style': '/es/produccion/estilo-visual/',
    '/production/tone-voice': '/es/produccion/tono-voz/',
    '/production/audio': '/es/produccion/audio/',
    '/production/specs': '/es/produccion/specs/',
    '/resources': '/es/recursos/',
    '/resources/actors': '/es/recursos/actores/',
    '/resources/actors/characters': '/es/recursos/actores/personajes/',
    '/resources/actors/dialogue': '/es/recursos/actores/dialogo/',
    '/resources/actors/movement': '/es/recursos/actores/movimiento/',
    '/resources/creators': '/es/recursos/creadores/',
    '/resources/creators/characters': '/es/recursos/creadores/personajes/',
    '/resources/creators/templates': '/es/recursos/creadores/plantillas/',
    '/resources/creators/worldbuilding':
      '/es/recursos/creadores/worldbuilding/',
    '/resources/sponsors': '/es/recursos/patrocinadores/',
    '/resources/sponsors/values': '/es/recursos/patrocinadores/valores/',
    '/resources/sponsors/impact': '/es/recursos/patrocinadores/impacto/',
    '/resources/sponsors/integration':
      '/es/recursos/patrocinadores/integracion/',
    '/impact': '/es/impacto/',
    '/philosophy': '/es/filosofia/',
    '/visual-guide': '/es/guia-visual/',
    '/formats': '/es/formatos/',
  },

  // Integrations
  integrations: [
    // Sitemap temporarily disabled to reduce bundle size
    // TODO: Re-enable after bundle optimization
    // sitemap({
    //   filter: (page) => !page.includes('404'),
    //   changefreq: 'weekly',
    //   priority: 0.7,
    //   lastmod: new Date(),
    //   i18n: {
    //     defaultLocale: 'es',
    //     locales: {
    //       es: 'es-MX',
    //       en: 'en-US',
    //     },
    //   },
    // }),
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
      // Configure advanced minification with Terser
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove all console statements
          drop_debugger: true, // Remove debugger statements
          pure_funcs: [
            'console.log',
            'console.info',
            'console.debug',
            'console.trace',
          ],
          passes: 2, // Run compress passes twice for better optimization
          arguments: true, // Convert arguments[index] to function parameter names
          unsafe_arrows: true, // Convert ES5 functions to arrow functions
          module: true, // Enable optimizations for ES6+ modules
          toplevel: true, // Enable top-level variable and function name mangling
          hoist_funs: true, // Hoist function declarations
          unsafe_math: true, // Optimize numerical expressions
          unsafe_methods: true, // Optimize object methods
          unsafe_proto: true, // Optimize prototype expressions
          unsafe_regexp: true, // Optimize regular expressions
          booleans_as_integers: true, // Convert booleans to 0/1
        },
        mangle: {
          toplevel: true, // Mangle top-level names
          properties: {
            regex: /^_/, // Mangle properties starting with underscore
          },
        },
        format: {
          comments: false, // Remove all comments
          ascii_only: true, // Escape non-ASCII characters
        },
        module: true, // Enable ES6+ optimizations
        toplevel: true, // Enable top-level optimizations
      },
      // Configure manual chunks for better caching
      rollupOptions: {
        output: {
          assetFileNames: '_assets/[name].[hash][extname]',
          chunkFileNames: '_assets/chunks/[name].[hash].js',
          entryFileNames: '_assets/[name].[hash].js',
          manualChunks: {
            theme: ['/src/utils/theme-manager.ts'],
            // Split vendor chunks for better caching
            'vendor-astro': ['astro:*'],
            // Split i18n translations into separate chunks
            'i18n-es': ['/src/i18n/es/*'],
            'i18n-en': ['/src/i18n/en/*'],
          },
        },
        plugins: [
          // Tree shake unused exports
          {
            name: 'tree-shake-unused',
            transform(/** @type {string} */ code, /** @type {string} */ id) {
              if (id.includes('node_modules')) return null;
              // Mark side-effect free for better tree shaking
              return { code, moduleSideEffects: false };
            },
          },
          // Bundle visualization (only in analyze mode)
          ...(process.env.ANALYZE
            ? [
                visualizer({
                  open: true,
                  gzipSize: true,
                  brotliSize: true,
                  template: 'sunburst',
                  filename: './dist/stats.html',
                }),
              ]
            : []),
        ],
      },
      // Additional optimizations
      target: 'es2020', // Target modern browsers only
      assetsInlineLimit: 4096, // Inline assets smaller than 4KB
      chunkSizeWarningLimit: 500, // Warn for chunks larger than 500KB
      sourcemap: false, // Disable sourcemaps in production
    },
    // Compression plugins - cast to any to avoid type issues
    plugins: [
      // Gzip compression
      /** @type {any} */
      (
        viteCompression({
          algorithm: 'gzip',
          ext: '.gz',
          threshold: 10240, // Only compress files larger than 10KB
          deleteOriginFile: false,
          filter: /\.(js|css|html|json|svg|xml|ttf|otf|woff|woff2)$/i,
        })
      ),
      // Brotli compression (better compression ratio)
      /** @type {any} */
      (
        viteCompression({
          algorithm: 'brotliCompress',
          ext: '.br',
          threshold: 10240,
          deleteOriginFile: false,
          filter: /\.(js|css|html|json|svg|xml|ttf|otf|woff|woff2)$/i,
          compressionOptions: {
            level: 11, // Maximum compression
          },
        })
      ),
    ],
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
