import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Constants with environment variables', () => {
  beforeEach(() => {
    // Clear module cache
    vi.resetModules();
  });

  it('should use API_URL from environment when set', async () => {
    // Set the environment variable
    process.env.API_URL = 'https://api.testigos.com';

    // Re-import the module to get fresh evaluation
    const { API_CONFIG } = await import('../../src/lib/constants');

    expect(API_CONFIG.baseURL).toBe('https://api.testigos.com');

    // Clean up
    delete process.env.API_URL;
  });

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
