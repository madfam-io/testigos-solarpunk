/**
 * Lighthouse CI Configuration
 * @fileoverview Configuration for automated Lighthouse performance audits
 * @author MADFAM
 * @version 0.5.0
 */

module.exports = {
  ci: {
    // Collect configuration
    collect: {
      // URLs to audit (adjust based on your deployment environment)
      url: [
        'http://localhost:4321/testigos-solarpunk/', // Home
        'http://localhost:4321/testigos-solarpunk/es/', // Spanish home
        'http://localhost:4321/testigos-solarpunk/en/', // English home
        'http://localhost:4321/testigos-solarpunk/es/proyecto/', // Project page
        'http://localhost:4321/testigos-solarpunk/es/contenido/', // Content page
        'http://localhost:4321/testigos-solarpunk/es/comunidad/', // Community page
        'http://localhost:4321/testigos-solarpunk/es/personajes/', // Characters page
      ],
      // Build static assets before collecting
      startServerCommand: 'npm run preview',
      // Server configuration
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 10000,
      // Number of runs per URL for consistent results
      numberOfRuns: 3,
      // Chrome configuration
      settings: {
        chromeFlags: [
          '--headless',
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-extensions',
          '--no-first-run',
        ],
        // Configure device emulation for mobile testing
        emulatedFormFactor: 'mobile',
        // Throttling configuration
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        // Skip certain audits that aren't relevant for static sites
        skipAudits: [
          'uses-http2', // GitHub Pages doesn't support HTTP/2 configuration
          'redirects-http', // Handled by GitHub Pages
          'canonical', // We handle canonical URLs manually
        ],
        // Only run categories we care about
        onlyCategories: [
          'performance',
          'accessibility',
          'best-practices',
          'seo',
        ],
      },
    },
    // Assertion configuration for performance budgets
    assert: {
      assertions: {
        // Performance thresholds
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],

        // Core Web Vitals thresholds
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],

        // Resource optimization
        'unused-css-rules': ['warn', { maxLength: 2 }],
        'unused-javascript': ['warn', { maxLength: 2 }],
        'modern-image-formats': ['warn', { maxLength: 0 }],
        'offscreen-images': ['warn', { maxLength: 1 }],

        // Accessibility requirements
        'color-contrast': ['error', { maxLength: 0 }],
        'heading-order': ['error', { maxLength: 0 }],
        'link-name': ['error', { maxLength: 0 }],
        'meta-viewport': ['error', { maxLength: 0 }],

        // SEO requirements
        'meta-description': ['error', { maxLength: 0 }],
        'document-title': ['error', { maxLength: 0 }],
        hreflang: ['warn', { maxLength: 0 }],

        // Performance optimizations
        'render-blocking-resources': ['warn', { maxLength: 1 }],
        'unminified-css': ['warn', { maxLength: 0 }],
        'unminified-javascript': ['warn', { maxLength: 0 }],
      },
    },
    // Upload configuration for CI/CD
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-results',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
    // Server configuration
    server: {
      port: 4321,
      host: '0.0.0.0',
    },
  },
};
