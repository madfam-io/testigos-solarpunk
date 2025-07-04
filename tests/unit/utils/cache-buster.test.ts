/**
 * @fileoverview Unit tests for cache-buster.ts
 * @author MADFAM
 * @version 0.5.0
 *
 * Tests the cache management utilities including:
 * - Cache clearing functionality
 * - Service worker unregistration
 * - Force refresh behavior
 * - Console installation
 * - Error handling
 */

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  clearAllCaches,
  unregisterServiceWorkers,
  forceCacheRefresh,
  installCacheBuster,
} from '../../../src/utils/cache-buster';

describe('Cache Buster Utilities', () => {
  // Save original console
  // const originalConsole = { ...console }; // No longer needed with vi.restoreAllMocks()

  beforeEach(() => {
    // Mock console methods
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // Clear all mocks before each test
    vi.clearAllMocks();

    // Reset window.location mock
    Object.defineProperty(window, 'location', {
      value: { href: 'https://example.com/test' },
      writable: true,
    });
  });

  afterEach(() => {
    // Restore all mocks
    vi.restoreAllMocks();

    // Clean up any global modifications
    if ('cacheBuster' in window) {
      delete (window as Window & { cacheBuster?: unknown }).cacheBuster;
    }
  });

  /**
   * Test clearAllCaches function
   */
  describe('clearAllCaches', () => {
    it('should handle when Cache API is not supported', async () => {
      // Create a mock window without caches
      const originalWindow = global.window;
      const mockWindow = { ...window };
      delete (mockWindow as any).caches;
      global.window = mockWindow as Window & typeof globalThis;

      await clearAllCaches();

      expect(console.warn).toHaveBeenCalledWith(
        '[WARN] Cache API not supported',
        ''
      );
      expect(console.log).not.toHaveBeenCalled();

      // Restore
      global.window = originalWindow;
    });

    it('should clear all caches when Cache API is available', async () => {
      // Mock caches API
      const mockCacheNames = ['cache-v1', 'cache-v2', 'images-cache'];
      const mockCaches = {
        keys: vi.fn().mockResolvedValue(mockCacheNames),
        delete: vi.fn().mockResolvedValue(true),
      };

      Object.defineProperty(window, 'caches', {
        value: mockCaches,
        writable: true,
        configurable: true,
      });

      await clearAllCaches();

      expect(mockCaches.keys).toHaveBeenCalled();
      expect(mockCaches.delete).toHaveBeenCalledTimes(3);
      expect(mockCaches.delete).toHaveBeenCalledWith('cache-v1');
      expect(mockCaches.delete).toHaveBeenCalledWith('cache-v2');
      expect(mockCaches.delete).toHaveBeenCalledWith('images-cache');
      // Logger.info is not logged in production mode, so console.log won't be called
      expect(console.log).not.toHaveBeenCalled();
    });

    it('should handle errors when clearing caches', async () => {
      // Mock caches API with error
      const mockError = new Error('Cache deletion failed');
      const mockCaches = {
        keys: vi.fn().mockRejectedValue(mockError),
      };

      Object.defineProperty(window, 'caches', {
        value: mockCaches,
        writable: true,
        configurable: true,
      });

      await clearAllCaches();

      expect(console.error).toHaveBeenCalledWith(
        '[ERROR] Error clearing caches',
        mockError
      );
    });

    it('should handle empty cache list', async () => {
      // Mock caches API with no caches
      const mockCaches = {
        keys: vi.fn().mockResolvedValue([]),
        delete: vi.fn(),
      };

      Object.defineProperty(window, 'caches', {
        value: mockCaches,
        writable: true,
        configurable: true,
      });

      await clearAllCaches();

      expect(mockCaches.keys).toHaveBeenCalled();
      expect(mockCaches.delete).not.toHaveBeenCalled();
      // Logger.info is not logged in production mode, so console.log won't be called
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  /**
   * Test unregisterServiceWorkers function
   */
  describe('unregisterServiceWorkers', () => {
    it('should handle when Service Worker is not supported', async () => {
      // Create a mock navigator without serviceWorker
      const originalNavigator = global.navigator;
      const mockNavigator = { ...navigator };
      delete (mockNavigator as any).serviceWorker;
      global.navigator = mockNavigator as Navigator;

      await unregisterServiceWorkers();

      expect(console.warn).toHaveBeenCalledWith(
        '[WARN] Service Worker not supported',
        ''
      );
      expect(console.log).not.toHaveBeenCalled();

      // Restore
      global.navigator = originalNavigator;
    });

    it('should unregister all service workers', async () => {
      // Mock service worker registrations
      const mockRegistrations = [
        { scope: '/app/', unregister: vi.fn().mockResolvedValue(true) },
        { scope: '/api/', unregister: vi.fn().mockResolvedValue(true) },
      ];

      const mockServiceWorker = {
        getRegistrations: vi.fn().mockResolvedValue(mockRegistrations),
      };

      Object.defineProperty(navigator, 'serviceWorker', {
        value: mockServiceWorker,
        writable: true,
        configurable: true,
      });

      await unregisterServiceWorkers();

      expect(mockServiceWorker.getRegistrations).toHaveBeenCalled();
      expect(mockRegistrations[0].unregister).toHaveBeenCalled();
      expect(mockRegistrations[1].unregister).toHaveBeenCalled();
      // Logger.info is not logged in production mode, so console.log won't be called
      expect(console.log).not.toHaveBeenCalled();
    });

    it('should handle errors when unregistering', async () => {
      // Mock service worker with error
      const mockError = new Error('Unregister failed');
      const mockServiceWorker = {
        getRegistrations: vi.fn().mockRejectedValue(mockError),
      };

      Object.defineProperty(navigator, 'serviceWorker', {
        value: mockServiceWorker,
        writable: true,
        configurable: true,
      });

      await unregisterServiceWorkers();

      expect(console.error).toHaveBeenCalledWith(
        '[ERROR] Error unregistering service workers',
        mockError
      );
    });

    it('should handle no registered service workers', async () => {
      // Mock with empty registrations
      const mockServiceWorker = {
        getRegistrations: vi.fn().mockResolvedValue([]),
      };

      Object.defineProperty(navigator, 'serviceWorker', {
        value: mockServiceWorker,
        writable: true,
        configurable: true,
      });

      await unregisterServiceWorkers();

      expect(mockServiceWorker.getRegistrations).toHaveBeenCalled();
      // Logger.info is not logged in production mode, so console.log won't be called
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  /**
   * Test forceCacheRefresh function
   */
  describe('forceCacheRefresh', () => {
    it('should perform all cleanup steps and reload', async () => {
      // Mock caches and service worker
      const mockCaches = {
        keys: vi.fn().mockResolvedValue(['cache-v1']),
        delete: vi.fn().mockResolvedValue(true),
      };

      const mockServiceWorker = {
        getRegistrations: vi.fn().mockResolvedValue([]),
      };

      Object.defineProperty(window, 'caches', {
        value: mockCaches,
        writable: true,
        configurable: true,
      });

      Object.defineProperty(navigator, 'serviceWorker', {
        value: mockServiceWorker,
        writable: true,
        configurable: true,
      });

      // Mock location.href setter
      let locationHref = 'https://example.com/test';
      Object.defineProperty(window.location, 'href', {
        get: () => locationHref,
        set: (value: string) => {
          locationHref = value;
        },
      });

      await forceCacheRefresh();

      // Logger.info is not logged in production mode, so console.log won't be called
      expect(console.log).not.toHaveBeenCalled();
      expect(mockCaches.keys).toHaveBeenCalled();
      expect(mockServiceWorker.getRegistrations).toHaveBeenCalled();

      // Check that timestamp was added to URL
      expect(locationHref).toMatch(/\?_cb=\d+$/);
    });

    it('should handle URLs with existing query parameters', async () => {
      // Setup mocks
      const mockCaches = {
        keys: vi.fn().mockResolvedValue([]),
        delete: vi.fn(),
      };

      const mockServiceWorker = {
        getRegistrations: vi.fn().mockResolvedValue([]),
      };

      Object.defineProperty(window, 'caches', {
        value: mockCaches,
        writable: true,
        configurable: true,
      });

      Object.defineProperty(navigator, 'serviceWorker', {
        value: mockServiceWorker,
        writable: true,
        configurable: true,
      });

      // Mock location with existing query params
      let locationHref = 'https://example.com/test?foo=bar';
      Object.defineProperty(window.location, 'href', {
        get: () => locationHref,
        set: (value: string) => {
          locationHref = value;
        },
      });

      await forceCacheRefresh();

      // Should use & separator for existing query params
      expect(locationHref).toMatch(/\?foo=bar&_cb=\d+$/);
    });
  });

  /**
   * Test installCacheBuster function
   */
  describe('installCacheBuster', () => {
    it('should install cache buster on window object', () => {
      installCacheBuster();

      const { cacheBuster } = window as Window & {
        cacheBuster?: {
          clearAllCaches: typeof clearAllCaches;
          unregisterServiceWorkers: typeof unregisterServiceWorkers;
          forceCacheRefresh: typeof forceCacheRefresh;
        };
      };
      expect(cacheBuster).toBeDefined();
      if (cacheBuster) {
        expect(cacheBuster.clearAllCaches).toBe(clearAllCaches);
        expect(cacheBuster.unregisterServiceWorkers).toBe(
          unregisterServiceWorkers
        );
        expect(cacheBuster.forceCacheRefresh).toBe(forceCacheRefresh);
      }

      // Logger.info is not logged in production mode, so console.log won't be called
      expect(console.log).not.toHaveBeenCalled();
    });

    it('should not install if window is undefined', () => {
      // This test is mainly for coverage in Node.js environment
      // In a real browser environment, window is always defined
      const originalWindow = global.window;
      // @ts-expect-error - Mocking for test
      global.window = undefined;

      installCacheBuster();

      // Should not throw and should not log
      expect(console.log).not.toHaveBeenCalled();

      // Restore
      (global as typeof globalThis & { window: Window }).window =
        originalWindow;
    });

    it('should be callable multiple times without error', () => {
      installCacheBuster();
      installCacheBuster(); // Second call

      expect(
        (window as Window & { cacheBuster?: unknown }).cacheBuster
      ).toBeDefined();
      // Logger.info is not logged in production mode, so console.log won't be called
      expect(
        (console.log as any).mock.calls.filter(
          (call: any[]): boolean =>
            typeof call[0] === 'string' &&
            call[0].includes('Cache Buster Installed!')
        )
      ).toHaveLength(0);
    });
  });

  /**
   * Test integration scenarios
   */
  describe('Integration Tests', () => {
    it('should handle complete flow without errors', async () => {
      // Setup complete environment
      const mockCaches = {
        keys: vi.fn().mockResolvedValue(['app-cache', 'api-cache']),
        delete: vi.fn().mockResolvedValue(true),
      };

      const mockRegistration = {
        scope: '/',
        unregister: vi.fn().mockResolvedValue(true),
      };

      const mockServiceWorker = {
        getRegistrations: vi.fn().mockResolvedValue([mockRegistration]),
      };

      Object.defineProperty(window, 'caches', {
        value: mockCaches,
        writable: true,
        configurable: true,
      });

      Object.defineProperty(navigator, 'serviceWorker', {
        value: mockServiceWorker,
        writable: true,
        configurable: true,
      });

      // Install and use
      installCacheBuster();

      // Use the installed functions
      const cb = (
        window as Window & {
          cacheBuster?: {
            clearAllCaches: () => Promise<void>;
            unregisterServiceWorkers: () => Promise<void>;
          };
        }
      ).cacheBuster;
      if (cb !== undefined) {
        await cb.clearAllCaches();
        expect(mockCaches.delete).toHaveBeenCalledTimes(2);

        await cb.unregisterServiceWorkers();
      }
      expect(mockRegistration.unregister).toHaveBeenCalled();
    });

    it('should gracefully handle all APIs being unavailable', async () => {
      // Create mocks without APIs
      const originalWindow = global.window;
      const originalNavigator = global.navigator;

      const mockWindow = { ...window };
      delete (mockWindow as any).caches;
      const mockNavigator = { ...navigator };
      delete (mockNavigator as any).serviceWorker;

      global.window = mockWindow as Window & typeof globalThis;
      global.navigator = mockNavigator as Navigator;

      // Should not throw
      await clearAllCaches();
      await unregisterServiceWorkers();

      expect(console.warn).toHaveBeenCalledWith(
        '[WARN] Cache API not supported',
        ''
      );
      expect(console.warn).toHaveBeenCalledWith(
        '[WARN] Service Worker not supported',
        ''
      );

      // Restore
      global.window = originalWindow;
      global.navigator = originalNavigator;
    });
  });
});
