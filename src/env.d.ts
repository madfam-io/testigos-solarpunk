/// <reference types="astro/client" />

/**
 * @fileoverview TypeScript Environment Variable Definitions
 *
 * Type definitions for environment variables used throughout the application.
 * Ensures type safety when accessing import.meta.env values.
 *
 * @see https://docs.astro.build/en/guides/environment-variables/
 */

/**
 * Environment variables interface
 *
 * All environment variables available in the application.
 * PUBLIC_ prefixed variables are exposed to the client.
 */
interface ImportMetaEnv {
  /**
   * Base URL path for the application
   * Used for GitHub Pages deployment with subpath
   * @example "/testigos-solarpunk"
   */
  readonly BASE_URL: string;

  /**
   * Full site URL for production
   * Used in SEO meta tags and canonical URLs
   * @example "https://madfam-io.github.io"
   */
  readonly SITE: string;

  /**
   * Optional API endpoint URL
   * For future backend integration
   * @example "https://api.testigos-solarpunk.com"
   */
  readonly PUBLIC_API_URL?: string;
}

/**
 * Augment ImportMeta to include env property
 * Provides type safety for import.meta.env access
 */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
