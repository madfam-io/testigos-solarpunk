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

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  clearAllCaches,
  unregisterServiceWorkers,
  forceCacheRefresh,
  installCacheBuster
} from '../../../src/utils/cache-buster';

describe('Cache Buster Utilities', () => {
  // Mock console methods
  const mockConsole = {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  };

  // Save original console
  const originalConsole = { ...console };

  beforeEach(() => {
    // Replace console methods with mocks
    Object.assign(console, mockConsole);
    
    // Clear all mocks before each test
    vi.clearAllMocks();
    
    // Reset window.location mock
    Object.defineProperty(window, 'location', {
      value: { href: 'https://example.com/test' },
      writable: true
    });
  });

  afterEach(() => {
    // Restore original console
    Object.assign(console, originalConsole);
    
    // Clean up any global modifications
    if ('cacheBuster' in window) {
      delete (window as any).cacheBuster;
    }
  });

  /**
   * Test clearAllCaches function
   */
  describe('clearAllCaches', () => {
    it('should handle when Cache API is not supported', async () => {
      // Mock window without caches
      const originalCaches = window.caches;
      delete (window as any).caches;

      await clearAllCaches();

      expect(mockConsole.warn).toHaveBeenCalledWith('Cache API not supported');
      expect(mockConsole.log).not.toHaveBeenCalledWith('All caches cleared successfully');

      // Restore
      (window as any).caches = originalCaches;
    });

    it('should clear all caches when Cache API is available', async () => {
      // Mock caches API
      const mockCacheNames = ['cache-v1', 'cache-v2', 'images-cache'];
      const mockCaches = {
        keys: vi.fn().mockResolvedValue(mockCacheNames),
        delete: vi.fn().mockResolvedValue(true)
      };
      
      Object.defineProperty(window, 'caches', {
        value: mockCaches,
        writable: true,
        configurable: true
      });

      await clearAllCaches();

      expect(mockCaches.keys).toHaveBeenCalled();
      expect(mockCaches.delete).toHaveBeenCalledTimes(3);
      expect(mockCaches.delete).toHaveBeenCalledWith('cache-v1');
      expect(mockCaches.delete).toHaveBeenCalledWith('cache-v2');
      expect(mockCaches.delete).toHaveBeenCalledWith('images-cache');
      expect(mockConsole.log).toHaveBeenCalledWith('All caches cleared successfully');
    });

    it('should handle errors when clearing caches', async () => {
      // Mock caches API with error
      const mockError = new Error('Cache deletion failed');
      const mockCaches = {
        keys: vi.fn().mockRejectedValue(mockError)
      };
      
      Object.defineProperty(window, 'caches', {
        value: mockCaches,
        writable: true,
        configurable: true
      });

      await clearAllCaches();

      expect(mockConsole.error).toHaveBeenCalledWith('Error clearing caches:', mockError);
    });

    it('should handle empty cache list', async () => {
      // Mock caches API with no caches
      const mockCaches = {
        keys: vi.fn().mockResolvedValue([]),
        delete: vi.fn()
      };
      
      Object.defineProperty(window, 'caches', {
        value: mockCaches,
        writable: true,
        configurable: true
      });

      await clearAllCaches();

      expect(mockCaches.keys).toHaveBeenCalled();
      expect(mockCaches.delete).not.toHaveBeenCalled();
      expect(mockConsole.log).toHaveBeenCalledWith('All caches cleared successfully');
    });
  });

  /**
   * Test unregisterServiceWorkers function
   */
  describe('unregisterServiceWorkers', () => {
    it('should handle when Service Worker is not supported', async () => {
      // Mock navigator without serviceWorker
      const originalServiceWorker = navigator.serviceWorker;
      delete (navigator as any).serviceWorker;

      await unregisterServiceWorkers();

      expect(mockConsole.warn).toHaveBeenCalledWith('Service Worker not supported');
      expect(mockConsole.log).not.toHaveBeenCalledWith('All service workers unregistered');

      // Restore
      (navigator as any).serviceWorker = originalServiceWorker;
    });

    it('should unregister all service workers', async () => {
      // Mock service worker registrations
      const mockRegistrations = [
        { scope: '/app/', unregister: vi.fn().mockResolvedValue(true) },
        { scope: '/api/', unregister: vi.fn().mockResolvedValue(true) }
      ];
      
      const mockServiceWorker = {
        getRegistrations: vi.fn().mockResolvedValue(mockRegistrations)
      };
      
      Object.defineProperty(navigator, 'serviceWorker', {
        value: mockServiceWorker,
        writable: true,
        configurable: true
      });

      await unregisterServiceWorkers();

      expect(mockServiceWorker.getRegistrations).toHaveBeenCalled();
      expect(mockRegistrations[0].unregister).toHaveBeenCalled();
      expect(mockRegistrations[1].unregister).toHaveBeenCalled();
      expect(mockConsole.log).toHaveBeenCalledWith('Unregistering service worker:', '/app/');
      expect(mockConsole.log).toHaveBeenCalledWith('Unregistering service worker:', '/api/');
      expect(mockConsole.log).toHaveBeenCalledWith('All service workers unregistered');
    });

    it('should handle errors when unregistering', async () => {
      // Mock service worker with error
      const mockError = new Error('Unregister failed');
      const mockServiceWorker = {
        getRegistrations: vi.fn().mockRejectedValue(mockError)
      };
      
      Object.defineProperty(navigator, 'serviceWorker', {
        value: mockServiceWorker,
        writable: true,
        configurable: true
      });

      await unregisterServiceWorkers();

      expect(mockConsole.error).toHaveBeenCalledWith('Error unregistering service workers:', mockError);
    });

    it('should handle no registered service workers', async () => {
      // Mock with empty registrations
      const mockServiceWorker = {
        getRegistrations: vi.fn().mockResolvedValue([])
      };
      
      Object.defineProperty(navigator, 'serviceWorker', {
        value: mockServiceWorker,
        writable: true,
        configurable: true
      });

      await unregisterServiceWorkers();

      expect(mockServiceWorker.getRegistrations).toHaveBeenCalled();
      expect(mockConsole.log).toHaveBeenCalledWith('All service workers unregistered');
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
        delete: vi.fn().mockResolvedValue(true)
      };
      
      const mockServiceWorker = {
        getRegistrations: vi.fn().mockResolvedValue([])
      };
      
      Object.defineProperty(window, 'caches', {
        value: mockCaches,
        writable: true,
        configurable: true
      });
      
      Object.defineProperty(navigator, 'serviceWorker', {
        value: mockServiceWorker,
        writable: true,
        configurable: true
      });

      // Mock location.href setter
      let locationHref = 'https://example.com/test';
      Object.defineProperty(window.location, 'href', {
        get: () => locationHref,
        set: (value) => { locationHref = value; }
      });

      await forceCacheRefresh();

      expect(mockConsole.log).toHaveBeenCalledWith('Starting force cache refresh...');
      expect(mockCaches.keys).toHaveBeenCalled();
      expect(mockServiceWorker.getRegistrations).toHaveBeenCalled();
      
      // Check that timestamp was added to URL
      expect(locationHref).toMatch(/\?_cb=\d+$/);
    });

    it('should handle URLs with existing query parameters', async () => {
      // Setup mocks
      const mockCaches = {
        keys: vi.fn().mockResolvedValue([]),
        delete: vi.fn()
      };
      
      const mockServiceWorker = {
        getRegistrations: vi.fn().mockResolvedValue([])
      };
      
      Object.defineProperty(window, 'caches', {
        value: mockCaches,
        writable: true,
        configurable: true
      });
      
      Object.defineProperty(navigator, 'serviceWorker', {
        value: mockServiceWorker,
        writable: true,
        configurable: true
      });

      // Mock location with existing query params
      let locationHref = 'https://example.com/test?foo=bar';
      Object.defineProperty(window.location, 'href', {
        get: () => locationHref,
        set: (value) => { locationHref = value; }
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

      expect((window as any).cacheBuster).toBeDefined();
      expect((window as any).cacheBuster.clearAllCaches).toBe(clearAllCaches);
      expect((window as any).cacheBuster.unregisterServiceWorkers).toBe(unregisterServiceWorkers);
      expect((window as any).cacheBuster.forceCacheRefresh).toBe(forceCacheRefresh);
      
      // Check console logs
      expect(mockConsole.log).toHaveBeenCalledWith(
        expect.stringContaining('Cache Buster Installed!'),
        expect.any(String)
      );
      expect(mockConsole.log).toHaveBeenCalledWith('Available commands:');
    });

    it('should not install if window is undefined', () => {
      // This test is mainly for coverage in Node.js environment
      // In a real browser environment, window is always defined
      const originalWindow = global.window;
      delete (global as any).window;

      installCacheBuster();

      // Should not throw and should not log
      expect(mockConsole.log).not.toHaveBeenCalled();

      // Restore
      (global as any).window = originalWindow;
    });

    it('should be callable multiple times without error', () => {
      installCacheBuster();
      installCacheBuster(); // Second call

      expect((window as any).cacheBuster).toBeDefined();
      // Should log twice
      expect(mockConsole.log.mock.calls.filter(
        call => call[0]?.includes('Cache Buster Installed!')
      )).toHaveLength(2);
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
        delete: vi.fn().mockResolvedValue(true)
      };
      
      const mockRegistration = {
        scope: '/',
        unregister: vi.fn().mockResolvedValue(true)
      };
      
      const mockServiceWorker = {
        getRegistrations: vi.fn().mockResolvedValue([mockRegistration])
      };
      
      Object.defineProperty(window, 'caches', {
        value: mockCaches,
        writable: true,
        configurable: true
      });
      
      Object.defineProperty(navigator, 'serviceWorker', {
        value: mockServiceWorker,
        writable: true,
        configurable: true
      });

      // Install and use
      installCacheBuster();
      
      // Use the installed functions
      await (window as any).cacheBuster.clearAllCaches();
      expect(mockCaches.delete).toHaveBeenCalledTimes(2);
      
      await (window as any).cacheBuster.unregisterServiceWorkers();
      expect(mockRegistration.unregister).toHaveBeenCalled();
    });

    it('should gracefully handle all APIs being unavailable', async () => {
      // Remove all APIs
      delete (window as any).caches;
      delete (navigator as any).serviceWorker;

      // Should not throw
      await clearAllCaches();
      await unregisterServiceWorkers();

      expect(mockConsole.warn).toHaveBeenCalledWith('Cache API not supported');
      expect(mockConsole.warn).toHaveBeenCalledWith('Service Worker not supported');
    });
  });
});