/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: [
        'src/**/*.{js,jsx,ts,tsx}',
      ],
      exclude: [
        'node_modules/',
        'dist/',
        '.astro/',
        'coverage/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData/*',
        'tests/**',
        'scripts/**',
        'public/**',
        'src/env.d.ts',
        'src/content/config.ts',
        '**/*.astro',
      ],
      thresholds: {
        branches: 20,
        functions: 15,
        lines: 20,
        statements: 20,
      },
    },
    reporters: ['default', 'html'],
    outputFile: {
      html: './tests/reports/index.html',
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@layouts': '/src/layouts',
      '@lib': '/src/lib',
      '@content': '/src/content',
      '@styles': '/src/styles',
    },
  },
});
