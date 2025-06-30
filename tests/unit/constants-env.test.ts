/**
 * @fileoverview Unit tests for environment-dependent constants.
 * Tests how constants behave with different environment variable configurations,
 * particularly the API_URL configuration which can be overridden for different
 * deployment environments (development, staging, production).
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * Test suite for environment-dependent constants
 * Validates dynamic configuration based on environment variables
 */
describe('Constants with environment variables', () => {
  /**
   * Setup function run before each test
   * Clears module cache to ensure fresh imports with new env values
   */
  beforeEach(() => {
    // Clear module cache
    vi.resetModules();
  });

  /**
   * Tests API URL override functionality
   * Ensures production deployments can specify custom API endpoints
   */
  it('should use API_URL from environment when set', async () => {
    // Set the environment variable
    process.env.API_URL = 'https://api.testigos.com';

    // Re-import the module to get fresh evaluation
    const { API_CONFIG } = await import('../../src/lib/constants');

    expect(API_CONFIG.baseURL).toBe('https://api.testigos.com');

    // Clean up
    delete process.env.API_URL;
  });

  /**
   * Tests fallback behavior for empty environment variable
   * Ensures the app falls back to relative API path for local development
   */
  it('should use default /api when API_URL is empty string', async () => {
    // Set the environment variable to empty string
    process.env.API_URL = '';

    // Re-import the module to get fresh evaluation
    const { API_CONFIG } = await import('../../src/lib/constants');

    expect(API_CONFIG.baseURL).toBe('/api');

    // Clean up
    delete process.env.API_URL;
  });
});
