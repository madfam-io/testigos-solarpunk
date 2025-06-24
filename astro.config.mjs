// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://madfam-io.github.io',
  base: '/testigos-solarpunk',
  build: {
    assets: 'assets'
  },
  // Para dominio personalizado:
  // site: 'https://universo.testigosdesolarpunk.mx',
  // base: '/',
});
