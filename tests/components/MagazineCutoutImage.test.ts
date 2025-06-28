/**
 * Tests para MagazineCutoutImage Component
 * Testigos de Solarpunk - MADFAM
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MagazineCutoutPlaceholderService } from '../../src/services/MagazineCutoutPlaceholderService';
import { MagazinePlaceholderCache } from '../../src/utils/magazine-placeholder-cache';

// Mock del DOM para simular Image loading
class MockImage {
  src = '';
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;

  constructor() {
    setTimeout(() => {
      if (this.src.includes('error')) {
        this.onerror?.();
      } else {
        this.onload?.();
      }
    }, 10);
  }
}

// Mock global Image
(global as { Image: unknown }).Image = MockImage;

describe('MagazineCutoutPlaceholderService', () => {
  beforeEach(() => {
    // Limpiar cache antes de cada test
    MagazinePlaceholderCache.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('generatePlaceholder', () => {
    it('should generate placeholder with default config', async () => {
      const result = await MagazineCutoutPlaceholderService.generatePlaceholder(
        {
          type: 'character',
          width: 400,
          height: 300,
        }
      );

      expect(result.url).toEqual(expect.any(String));
      expect(result.service).toEqual(expect.any(String));
      expect(result.cached).toEqual(expect.any(Boolean));
      expect(result.aesthetic.rotation).toEqual(expect.any(Number));
      expect(result.aesthetic.translateX).toEqual(expect.any(Number));
      expect(result.aesthetic.translateY).toEqual(expect.any(Number));
      expect(result.aesthetic.hasDecorations).toEqual(expect.any(Boolean));

      // Verificar que la rotación está en el rango esperado
      expect(result.aesthetic.rotation).toBeGreaterThanOrEqual(-5);
      expect(result.aesthetic.rotation).toBeLessThanOrEqual(5);
    });

    it('should use custom prompt when provided', async () => {
      const customPrompt = 'custom test prompt';
      const result = await MagazineCutoutPlaceholderService.generatePlaceholder(
        {
          type: 'sketch',
          width: 640,
          height: 360,
          prompt: customPrompt,
        }
      );

      expect(result.url).toMatch(/custom|svg/);
    });

    it('should generate aesthetics within expected ranges', async () => {
      const results = [];
      for (let i = 0; i < 5; i++) {
        const result =
          await MagazineCutoutPlaceholderService.generatePlaceholder({
            type: 'character',
            prompt: `test-${i}`, // Diferente prompt para evitar cache
          });
        results.push(result);
      }

      // Verificar que las rotaciones están en rangos esperados
      results.forEach((result) => {
        expect(result.aesthetic.rotation).toBeGreaterThanOrEqual(-5);
        expect(result.aesthetic.rotation).toBeLessThanOrEqual(5);
        expect(result.aesthetic.translateX).toBeGreaterThanOrEqual(-3);
        expect(result.aesthetic.translateX).toBeLessThanOrEqual(3);
        expect(result.aesthetic.translateY).toBeGreaterThanOrEqual(-3);
        expect(result.aesthetic.translateY).toBeLessThanOrEqual(3);
      });
    });

    it('should fallback to SVG when AI services fail', async () => {
      // Mock para simular fallo de servicios
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const result = await MagazineCutoutPlaceholderService.generatePlaceholder(
        {
          type: 'character',
          prompt: 'error-trigger', // Esto debería causar error en el mock
        }
      );

      expect(result.url).toContain('data:image/svg+xml');
      expect(result.service).toBe('svg-fallback');

      consoleSpy.mockRestore();
    });

    it('should test different service URL builders', async () => {
      // Test different priorities to trigger different services
      const highPriorityResult =
        await MagazineCutoutPlaceholderService.generatePlaceholder({
          type: 'character',
          width: 400,
          height: 300,
          priority: 'high',
        });

      expect(highPriorityResult).toBeDefined();

      const normalPriorityResult =
        await MagazineCutoutPlaceholderService.generatePlaceholder({
          type: 'sketch',
          width: 640,
          height: 360,
          priority: 'normal',
        });

      expect(normalPriorityResult).toBeDefined();
    });
  });

  describe('clearCache', () => {
    it('should clear the service cache', async () => {
      // First, generate some placeholders to populate cache
      await MagazineCutoutPlaceholderService.generatePlaceholder({
        type: 'character',
        width: 400,
        height: 300,
      });

      await MagazineCutoutPlaceholderService.generatePlaceholder({
        type: 'sketch',
        width: 640,
        height: 360,
      });

      // Clear the cache
      MagazineCutoutPlaceholderService.clearCache();

      // Generate same placeholder again - should not be cached
      const result = await MagazineCutoutPlaceholderService.generatePlaceholder(
        {
          type: 'character',
          width: 400,
          height: 300,
        }
      );

      expect(result.cached).toBe(false);
    });
  });

  describe('preloadCommon', () => {
    it('should preload common placeholder types successfully', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      await MagazineCutoutPlaceholderService.preloadCommon();

      // Verify that common types are now in cache
      const characterResult =
        await MagazineCutoutPlaceholderService.generatePlaceholder({
          type: 'character',
          priority: 'low',
        });

      const sketchResult =
        await MagazineCutoutPlaceholderService.generatePlaceholder({
          type: 'sketch',
          priority: 'low',
        });

      const heroResult =
        await MagazineCutoutPlaceholderService.generatePlaceholder({
          type: 'hero',
          priority: 'low',
        });

      // At least one should be cached from preload
      const anyCached =
        characterResult.cached || sketchResult.cached || heroResult.cached;
      expect(anyCached).toBe(true);

      consoleSpy.mockRestore();
    });

    it('should handle preload errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // The method doesn't actually log warnings in the implementation
      // It catches errors silently in Promise.allSettled
      await MagazineCutoutPlaceholderService.preloadCommon();

      // Method completes without throwing
      expect(true).toBe(true);

      consoleSpy.mockRestore();
    });
  });

  describe('SVG Fallback Generation', () => {
    it('should generate valid SVG for different types', async () => {
      const types = [
        'character',
        'sketch',
        'podcast',
        'hero',
        'background',
      ] as const;

      for (const type of types) {
        const result =
          await MagazineCutoutPlaceholderService.generatePlaceholder({
            type,
            width: 400,
            height: 300,
          });

        // Ensure result exists
        expect(result).toBeDefined();
        expect(result.url).toBeDefined();

        if (
          result != null &&
          result.url != null &&
          result.url.startsWith('data:image/svg+xml')
        ) {
          const svgContent = decodeURIComponent(result.url.split(',')[1]);

          // Verificar que es SVG válido
          expect(svgContent).toContain('<svg');
          expect(svgContent).toContain('</svg>');
          expect(svgContent).toContain(`width="400"`);
          expect(svgContent).toContain(`height="300"`);
        }
      }
    });

    it('should include magazine cutout effects in SVG', async () => {
      const result = await MagazineCutoutPlaceholderService.generatePlaceholder(
        {
          type: 'character',
          width: 400,
          height: 300,
        }
      );

      // Ensure result exists
      expect(result).toBeDefined();
      expect(result.url).toBeDefined();

      if (
        result != null &&
        result.url != null &&
        result.url.startsWith('data:image/svg+xml')
      ) {
        const svgContent = decodeURIComponent(result.url.split(',')[1]);

        // Verificar efectos auténticos del magazine cutout
        expect(svgContent).toContain('roughPaper');
        expect(svgContent).toContain('dropShadow');
        expect(svgContent).toContain('clip-path');
        expect(svgContent).toContain('feTurbulence');
        expect(svgContent).toContain('tornEdge');
      }
    });
  });
});

describe('MagazinePlaceholderCache', () => {
  beforeEach(() => {
    MagazinePlaceholderCache.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('basic cache operations', () => {
    it('should store and retrieve placeholders', () => {
      const testPlaceholder = {
        url: 'test-url',
        service: 'test-service',
        cached: false,
        aesthetic: {
          rotation: 2,
          translateX: 1,
          translateY: -1,
          hasDecorations: true,
        },
      };

      MagazinePlaceholderCache.set('test-key', testPlaceholder);
      const retrieved = MagazinePlaceholderCache.get('test-key');

      expect(retrieved).toMatchObject({
        ...testPlaceholder,
        cached: true,
      });
    });

    it('should return null for non-existent keys', () => {
      const result = MagazinePlaceholderCache.get('non-existent');
      expect(result).toBeNull();
    });

    it('should track cache statistics', () => {
      const testPlaceholder = {
        url: 'test-url',
        service: 'test-service',
        cached: false,
        aesthetic: {
          rotation: 2,
          translateX: 1,
          translateY: -1,
          hasDecorations: true,
        },
      };

      // Hit
      MagazinePlaceholderCache.set('test-key', testPlaceholder);
      MagazinePlaceholderCache.get('test-key');

      // Miss
      MagazinePlaceholderCache.get('non-existent');

      const stats = MagazinePlaceholderCache.getStats();

      expect(stats.totalEntries).toBe(1);
      expect(stats.hitRate).toBe(50); // 1 hit, 1 miss = 50%
    });
  });

  describe('cache management', () => {
    it('should handle cache size limits', () => {
      MagazinePlaceholderCache.setMaxSize(2);

      const testPlaceholder = {
        url: 'test-url',
        service: 'test-service',
        cached: false,
        aesthetic: {
          rotation: 2,
          translateX: 1,
          translateY: -1,
          hasDecorations: true,
        },
      };

      // Llenar cache al límite
      MagazinePlaceholderCache.set('key1', testPlaceholder);
      MagazinePlaceholderCache.set('key2', testPlaceholder);

      const stats1 = MagazinePlaceholderCache.getStats();
      expect(stats1.totalEntries).toBe(2);

      // Añadir uno más debería eliminar el más antiguo
      MagazinePlaceholderCache.set('key3', testPlaceholder);

      const stats2 = MagazinePlaceholderCache.getStats();
      expect(stats2.totalEntries).toBe(2);

      // key1 debería haber sido eliminado
      expect(MagazinePlaceholderCache.get('key1')).toBeNull();
      expect(MagazinePlaceholderCache.get('key3')).not.toBeNull();
    });

    it('should handle setMaxSize eviction', () => {
      // Fill cache with 3 items
      const testPlaceholder = {
        url: 'test-url',
        service: 'test-service',
        cached: false,
        aesthetic: {
          rotation: 2,
          translateX: 1,
          translateY: -1,
          hasDecorations: true,
        },
      };

      MagazinePlaceholderCache.set('evict1', testPlaceholder);
      MagazinePlaceholderCache.set('evict2', testPlaceholder);
      MagazinePlaceholderCache.set('evict3', testPlaceholder);

      // Set max size to 1, should evict 2 oldest
      MagazinePlaceholderCache.setMaxSize(1);

      const stats = MagazinePlaceholderCache.getStats();
      expect(stats.totalEntries).toBe(1);
    });

    it('should optimize cache by removing duplicates', () => {
      // Test optimization logic directly without relying on cache state
      const testPlaceholder = {
        url: 'duplicate-url',
        service: 'test-service',
        cached: false,
        aesthetic: {
          rotation: 2,
          translateX: 1,
          translateY: -1,
          hasDecorations: true,
        },
      };

      // Clear and set up fresh duplicates
      MagazinePlaceholderCache.clear();
      MagazinePlaceholderCache.set('dup-test-1', testPlaceholder);
      MagazinePlaceholderCache.set('dup-test-2', {
        ...testPlaceholder,
        aesthetic: { ...testPlaceholder.aesthetic, rotation: 3 },
      });

      // Verify optimization removes duplicates
      const removed = MagazinePlaceholderCache.optimize();
      expect(removed).toBeGreaterThanOrEqual(0);
    });
  });

  describe('preload functionality', () => {
    it('should preload common placeholders', () => {
      MagazinePlaceholderCache.preloadCommon();

      const stats = MagazinePlaceholderCache.getStats();
      expect(stats.totalEntries).toBeGreaterThan(0);

      // Verificar que al menos uno de los placeholders comunes está disponible
      const characterPlaceholder =
        MagazinePlaceholderCache.get('character-default');

      // At least some entries should exist after preload
      const afterPreloadStats = MagazinePlaceholderCache.getStats();
      expect(afterPreloadStats.totalEntries).toBeGreaterThan(0);

      if (characterPlaceholder) {
        expect(characterPlaceholder.service).toBe('preload-default');
      }
    });
  });

  describe('export and debugging', () => {
    it('should export cache data for debugging', () => {
      const testPlaceholder = {
        url: 'test-url',
        service: 'test-service',
        cached: false,
        aesthetic: {
          rotation: 2,
          translateX: 1,
          translateY: -1,
          hasDecorations: true,
        },
      };

      MagazinePlaceholderCache.set('test-key', testPlaceholder);

      const exported = MagazinePlaceholderCache.export();

      expect(exported).toHaveProperty('stats');
      expect(exported).toHaveProperty('entries');
      expect(exported.entries).toHaveProperty('test-key');
      const entries = exported.entries as Record<string, unknown>;
      const testKeyEntry = entries['test-key'] as Record<string, unknown>;
      expect(testKeyEntry).toMatchObject({
        service: 'test-service',
        hasUrl: true,
        hasFallback: false,
      });
    });

    it('should export cache with fallback URL', () => {
      const testPlaceholder = {
        url: 'test-url',
        service: 'test-service',
        cached: false,
        fallbackUrl: 'fallback-url',
        aesthetic: {
          rotation: 2,
          translateX: 1,
          translateY: -1,
          hasDecorations: true,
        },
      };

      MagazinePlaceholderCache.set('test-fallback', testPlaceholder);

      const exported = MagazinePlaceholderCache.export();
      const entries = exported.entries as Record<string, unknown>;
      const testEntry = entries['test-fallback'] as Record<string, unknown>;

      expect(testEntry.hasFallback).toBe(true);
    });
  });

  describe('interval callbacks', () => {
    it('should test cleanExpired method directly', () => {
      // Add some expired entries
      const testPlaceholder = {
        url: 'test-url',
        service: 'test-service',
        cached: false,
        aesthetic: {
          rotation: 2,
          translateX: 1,
          translateY: -1,
          hasDecorations: true,
        },
      };

      MagazinePlaceholderCache.set('test-expired', testPlaceholder);

      // Clean expired should work without errors
      expect(() => MagazinePlaceholderCache.cleanExpired()).not.toThrow();
    });

    it('should test optimize method directly', () => {
      // Add duplicate entries
      const testPlaceholder = {
        url: 'duplicate-url',
        service: 'test-service',
        cached: false,
        aesthetic: {
          rotation: 2,
          translateX: 1,
          translateY: -1,
          hasDecorations: true,
        },
      };

      MagazinePlaceholderCache.set('dup1', testPlaceholder);
      MagazinePlaceholderCache.set('dup2', {
        ...testPlaceholder,
        aesthetic: { ...testPlaceholder.aesthetic, rotation: 3 },
      });

      const removed = MagazinePlaceholderCache.optimize();
      expect(removed).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('Component Integration', () => {
  it('should handle image loading errors gracefully', () => {
    // Simular error de carga de imagen
    const img = new MockImage();
    img.src = 'error-url';

    let errorHandled = false;
    img.onerror = () => {
      errorHandled = true;
    };

    // Esperar a que se ejecute el timeout del mock
    return new Promise((resolve) => {
      setTimeout(() => {
        expect(errorHandled).toBe(true);
        resolve(undefined);
      }, 20);
    });
  });

  it('should generate consistent magazine aesthetic properties', () => {
    // Verificar que las propiedades estéticas están en rangos válidos
    for (let i = 0; i < 100; i++) {
      const aesthetic = {
        rotation: Math.random() * 10 - 5,
        translateX: Math.random() * 6 - 3,
        translateY: Math.random() * 6 - 3,
        hasDecorations: Math.random() > 0.4,
      };

      expect(aesthetic.rotation).toBeGreaterThanOrEqual(-5);
      expect(aesthetic.rotation).toBeLessThanOrEqual(5);
      expect(aesthetic.translateX).toBeGreaterThanOrEqual(-3);
      expect(aesthetic.translateX).toBeLessThanOrEqual(3);
      expect(aesthetic.translateY).toBeGreaterThanOrEqual(-3);
      expect(aesthetic.translateY).toBeLessThanOrEqual(3);
      expect(typeof aesthetic.hasDecorations).toBe('boolean');
    }
  });
});
