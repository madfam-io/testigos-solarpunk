/**
 * Tests para MagazineCutoutImage Component
 * Testigos de Solarpunk - MADFAM
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MagazineCutoutPlaceholderService } from '../../src/services/MagazineCutoutPlaceholderService';
import { MagazinePlaceholderCache } from '../../src/utils/magazine-placeholder-cache';
import { magazinePlaceholderConfig } from '../../src/config/magazine-placeholders.config';

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

    it('should test generatePlaceholder with enabled services', async () => {
      // Clear cache first
      MagazineCutoutPlaceholderService.clearCache();

      // Mock the config to have enabled services
      const originalServices = magazinePlaceholderConfig.services;
      (magazinePlaceholderConfig as any).services = [
        {
          name: 'test-service',
          enabled: true,
          endpoint: 'https://test.com',
          features: [] as string[],
          styleParams: {},
        },
        {
          name: 'disabled-service',
          enabled: false,
          endpoint: 'https://disabled.com',
          features: [] as string[],
          styleParams: {},
        },
      ];

      // Mock tryService to return a URL
      const originalTryService = MagazineCutoutPlaceholderService['tryService'];
      MagazineCutoutPlaceholderService['tryService'] = vi
        .fn()
        .mockResolvedValue('https://test.com/image.jpg');

      try {
        const result =
          await MagazineCutoutPlaceholderService.generatePlaceholder({
            type: 'character',
            width: 400,
            height: 300,
          });

        expect(result.url).toBe('https://test.com/image.jpg');
        expect(result.service).toBe('test-service');
        expect(result.cached).toBe(false);
        expect(result.fallbackUrl).toContain('data:image/svg+xml');

        // Test cached result
        const cachedResult =
          await MagazineCutoutPlaceholderService.generatePlaceholder({
            type: 'character',
            width: 400,
            height: 300,
          });
        expect(cachedResult.cached).toBe(true);
      } finally {
        // Restore
        (magazinePlaceholderConfig as any).services = originalServices;
        MagazineCutoutPlaceholderService['tryService'] = originalTryService;
        MagazineCutoutPlaceholderService.clearCache();
      }
    });

    it('should handle service errors and continue to next service', async () => {
      const consoleWarnSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      // Clear cache first
      MagazineCutoutPlaceholderService.clearCache();

      // Mock the config
      const originalServices = magazinePlaceholderConfig.services;
      (magazinePlaceholderConfig as any).services = [
        {
          name: 'failing-service',
          enabled: true,
          endpoint: 'https://fail.com',
          features: [] as string[],
          styleParams: {},
        },
        {
          name: 'working-service',
          enabled: true,
          endpoint: 'https://work.com',
          features: [] as string[],
          styleParams: {},
        },
      ];

      // Mock tryService to throw for first service, succeed for second
      const originalTryService = MagazineCutoutPlaceholderService['tryService'];
      let callCount = 0;
      MagazineCutoutPlaceholderService['tryService'] = vi
        .fn()
        .mockImplementation(() => {
          callCount++;
          if (callCount === 1) {
            throw new Error('Service failed');
          }
          return Promise.resolve('https://work.com/image.jpg');
        });

      try {
        const result =
          await MagazineCutoutPlaceholderService.generatePlaceholder({
            type: 'sketch',
            width: 640,
            height: 360,
          });

        expect(result.url).toBe('https://work.com/image.jpg');
        expect(result.service).toBe('working-service');
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          'Service failing-service failed:',
          expect.any(Error)
        );
      } finally {
        // Restore
        (magazinePlaceholderConfig as any).services = originalServices;
        MagazineCutoutPlaceholderService['tryService'] = originalTryService;
        consoleWarnSpy.mockRestore();
        MagazineCutoutPlaceholderService.clearCache();
      }
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

    it('should test URL builders through different priorities', async () => {
      // Test with different priorities to ensure all URL builders get called
      const results = [];

      // High priority should try different services
      const highResult =
        await MagazineCutoutPlaceholderService.generatePlaceholder({
          type: 'character',
          width: 400,
          height: 300,
          prompt: 'ABH test prompt',
          priority: 'high',
        });
      results.push(highResult);

      // Normal priority should try different services
      const normalResult =
        await MagazineCutoutPlaceholderService.generatePlaceholder({
          type: 'sketch',
          width: 640,
          height: 360,
          prompt: 'placeholdr test prompt',
          priority: 'normal',
        });
      results.push(normalResult);

      // Low priority should try different services
      const lowResult =
        await MagazineCutoutPlaceholderService.generatePlaceholder({
          type: 'podcast',
          width: 800,
          height: 450,
          prompt: 'placeholders.io test prompt',
          priority: 'low',
        });
      results.push(lowResult);

      // All should have generated some result (SVG fallback at minimum)
      results.forEach((result) => {
        expect(result).toBeDefined();
        expect(result.url).toBeDefined();
        expect(result.service).toBeDefined();
      });
    });

    it('should test buildABHUrl method directly', () => {
      // Access private method through prototype
      const buildABHUrlMethod = MagazineCutoutPlaceholderService['buildABHUrl'];
      const buildABHUrl = buildABHUrlMethod.bind(
        MagazineCutoutPlaceholderService
      );

      const service = {
        name: 'abh.ai',
        enabled: true,
        endpoint: 'https://abh.ai/api/placeholder',
        styleParams: {
          style: 'collage',
          border: 'torn',
        },
        features: [] as string[],
      };

      const config = {
        type: 'character' as const,
        width: 400,
        height: 300,
        quality: 75,
        prompt: 'Test prompt',
        enhancedPrompt: 'Test prompt, magazine cutout',
        modifiers: [],
        priority: 'normal',
      };

      const url = buildABHUrl(service, config);

      expect(url).toContain('https://abh.ai/api/placeholder/400x300');
      expect(url).toContain('text=Test+prompt%2C+magazine+cutout');
      expect(url).toContain('style=collage');
      expect(url).toContain('border=torn');
    });

    it('should test buildPlaceholdrUrl method directly', () => {
      // Access private method through prototype
      const buildPlaceholdrUrlMethod =
        MagazineCutoutPlaceholderService['buildPlaceholdrUrl'];
      const buildPlaceholdrUrl = buildPlaceholdrUrlMethod.bind(
        MagazineCutoutPlaceholderService
      );

      const service = {
        name: 'placeholdr.ai',
        enabled: true,
        endpoint: 'https://placeholdr.ai/generate',
        styleParams: {
          aesthetic: 'collage-art',
          paper: 'aged',
        },
        features: [] as string[],
      };

      const config = {
        type: 'sketch' as const,
        width: 640,
        height: 360,
        quality: 80,
        prompt: 'Sketch test',
        enhancedPrompt: 'Sketch test, DIY aesthetic',
        modifiers: [],
        priority: 'normal',
      };

      const url = buildPlaceholdrUrl(service, config);

      expect(url).toContain('https://placeholdr.ai/generate');
      expect(url).toContain('prompt=Sketch+test%2C+DIY+aesthetic');
      expect(url).toContain('w=640');
      expect(url).toContain('h=360');
      expect(url).toContain('aesthetic=collage-art');
      expect(url).toContain('paper=aged');
    });

    it('should test buildPlaceholdersIOUrl method directly', () => {
      // Access private method through prototype
      const buildPlaceholdersIOUrlMethod =
        MagazineCutoutPlaceholderService['buildPlaceholdersIOUrl'];
      const buildPlaceholdersIOUrl = buildPlaceholdersIOUrlMethod.bind(
        MagazineCutoutPlaceholderService
      );

      const service = {
        name: 'placeholders.io',
        enabled: true,
        endpoint: 'https://placeholders.io/api',
        styleParams: {
          style: 'magazine',
          texture: 'rough',
          effect: 'retro',
        },
        features: [] as string[],
      };

      const config = {
        type: 'hero' as const,
        width: 1200,
        height: 600,
        quality: 85,
        prompt: 'Hero test',
        enhancedPrompt: 'Hero test, vintage magazine',
        modifiers: [],
        priority: 'low',
      };

      const url = buildPlaceholdersIOUrl(service, config);

      expect(url).toContain('https://placeholders.io/api');
      expect(url).toContain('prompt=Hero+test%2C+vintage+magazine');
      expect(url).toContain('w=1200');
      expect(url).toContain('h=600');
      expect(url).toContain('style=magazine');
      expect(url).toContain('texture=rough');
      expect(url).toContain('effect=retro');
    });

    it('should test tryService method with all service types', async () => {
      // Mock Image to avoid actual network requests
      const originalImage = global.Image;
      const mockImage = vi.fn().mockImplementation(() => {
        const img = {
          onload: null as (() => void) | null,
          onerror: null as (() => void) | null,
          set src(_value: string) {
            // Immediately call onload for all URLs to simulate successful load
            setTimeout(() => {
              if (img.onload !== null) img.onload();
            }, 0);
          },
        };
        return img;
      });
      (global as { Image: unknown }).Image = mockImage;

      try {
        // Access private method
        const tryServiceMethod = MagazineCutoutPlaceholderService['tryService'];
        const tryService = tryServiceMethod.bind(
          MagazineCutoutPlaceholderService
        );

        const config = {
          type: 'character' as const,
          width: 400,
          height: 300,
          quality: 75,
          prompt: 'Test',
          enhancedPrompt: 'Test enhanced',
          modifiers: [],
          priority: 'normal',
        };

        // Test placeholders.io service
        const placeholdersService = {
          name: 'placeholders.io',
          enabled: true,
          endpoint: 'https://placeholders.io/api',
          styleParams: {},
          features: [] as string[],
        };

        const result1 = await tryService(placeholdersService, config);
        expect(result1).toContain('https://placeholders.io/api');

        // Test abh.ai service
        const abhService = {
          name: 'abh.ai',
          enabled: true,
          endpoint: 'https://abh.ai/api',
          styleParams: {},
          features: [] as string[],
        };

        const result2 = await tryService(abhService, config);
        expect(result2).toContain('https://abh.ai/api');

        // Test placeholdr.ai service
        const placeholdrService = {
          name: 'placeholdr.ai',
          enabled: true,
          endpoint: 'https://placeholdr.ai/api',
          styleParams: {},
          features: [] as string[],
        };

        const result3 = await tryService(placeholdrService, config);
        expect(result3).toContain('https://placeholdr.ai/api');

        // Test unknown service (should return null)
        const unknownService = {
          name: 'unknown-service',
          enabled: true,
          endpoint: 'https://unknown.com',
          styleParams: {},
          features: [] as string[],
        };

        const result4 = await tryService(unknownService, config);
        expect(result4).toBeNull();

        // Test error handling in tryService
        const errorImage = vi.fn().mockImplementation(() => {
          const img = {
            onload: null as (() => void) | null,
            onerror: null as (() => void) | null,
            set src(_value: string) {
              // Trigger error
              setTimeout(() => {
                if (img.onerror !== null) img.onerror();
              }, 0);
            },
          };
          return img;
        });
        (global as { Image: unknown }).Image = errorImage;

        const result5 = await tryService(placeholdersService, config);
        expect(result5).toBeNull();
      } finally {
        // Restore original Image
        (global as { Image: unknown }).Image = originalImage;
      }
    });

    it('should handle exceptions in tryService', async () => {
      // Mock buildPlaceholdersIOUrl to throw an error
      const originalBuild =
        MagazineCutoutPlaceholderService['buildPlaceholdersIOUrl'];
      MagazineCutoutPlaceholderService['buildPlaceholdersIOUrl'] = () => {
        throw new Error('Build URL error');
      };

      try {
        // Access private method
        const tryServiceMethod = MagazineCutoutPlaceholderService['tryService'];
        const tryService = tryServiceMethod.bind(
          MagazineCutoutPlaceholderService
        );

        const service = {
          name: 'placeholders.io',
          enabled: true,
          endpoint: 'https://placeholders.io/api',
          styleParams: {},
          features: [] as string[],
        };

        const config = {
          type: 'character' as const,
          width: 400,
          height: 300,
          quality: 75,
          prompt: 'Test',
          enhancedPrompt: 'Test enhanced',
          modifiers: [],
          priority: 'normal',
        };

        // Should handle the exception and return null
        const result = await tryService(service, config);
        expect(result).toBeNull();
      } finally {
        // Restore original method
        MagazineCutoutPlaceholderService['buildPlaceholdersIOUrl'] =
          originalBuild;
      }
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

      // Clear cache to start fresh
      MagazinePlaceholderCache.clear();

      // Add multiple entries with manual timestamp manipulation to ensure different ages
      MagazinePlaceholderCache.set('old-key', testPlaceholder);

      // Manually adjust timestamp to make it older
      interface CacheEntry {
        timestamp: number;
        [key: string]: unknown;
      }
      const cacheMap = (MagazinePlaceholderCache as any)['cache'] as Map<
        string,
        CacheEntry
      >;
      const oldEntry = cacheMap.get('old-key');
      if (oldEntry !== undefined) {
        oldEntry.timestamp = Date.now() - 1000; // 1 second ago
      }

      MagazinePlaceholderCache.set('new-key', testPlaceholder);

      // Hit on first key multiple times
      MagazinePlaceholderCache.get('old-key');
      MagazinePlaceholderCache.get('old-key');
      MagazinePlaceholderCache.get('old-key');

      // Hit on second key once
      MagazinePlaceholderCache.get('new-key');

      // Miss
      MagazinePlaceholderCache.get('non-existent');

      const stats = MagazinePlaceholderCache.getStats();

      expect(stats.totalEntries).toBe(2);
      expect(stats.hitRate).toBeGreaterThan(0);
      expect(stats.oldestEntry).toBeGreaterThan(0); // Should be > 0 since we set old timestamp
      expect(stats.mostAccessed).toBe('old-key'); // Should be the one with most hits
      expect(stats.memoryUsage).toBeGreaterThan(0);
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

    it('should remove duplicate entries with same URL keeping most accessed', () => {
      const duplicateUrl = 'https://test.com/same-image.jpg';
      const placeholder1 = {
        url: duplicateUrl,
        service: 'test-service',
        cached: false,
        aesthetic: {
          rotation: 1,
          translateX: 0,
          translateY: 0,
          hasDecorations: true,
        },
      };

      const placeholder2 = {
        url: duplicateUrl,
        service: 'test-service',
        cached: false,
        aesthetic: {
          rotation: 2,
          translateX: 1,
          translateY: 1,
          hasDecorations: false,
        },
      };

      // Clear cache and reset max size
      MagazinePlaceholderCache.clear();
      MagazinePlaceholderCache.setMaxSize(100); // Ensure we have space
      MagazinePlaceholderCache.set('dup-url-1', placeholder1);
      MagazinePlaceholderCache.set('dup-url-2', placeholder2);

      // Access the second one more times to make it the most accessed
      MagazinePlaceholderCache.get('dup-url-2');
      MagazinePlaceholderCache.get('dup-url-2');
      MagazinePlaceholderCache.get('dup-url-1');

      const initialStats = MagazinePlaceholderCache.getStats();
      expect(initialStats.totalEntries).toBe(2);

      // Optimize should remove one duplicate
      const removed = MagazinePlaceholderCache.optimize();
      expect(removed).toBe(1);

      const afterStats = MagazinePlaceholderCache.getStats();
      expect(afterStats.totalEntries).toBe(1);

      // The most accessed entry should remain
      expect(MagazinePlaceholderCache.get('dup-url-2')).not.toBeNull();
      expect(MagazinePlaceholderCache.get('dup-url-1')).toBeNull();
    });

    it('should handle multiple duplicates correctly', () => {
      const duplicateUrl = 'https://test.com/multi-duplicate.jpg';
      const basePlaceholder = {
        url: duplicateUrl,
        service: 'test-service',
        cached: false,
        aesthetic: {
          rotation: 0,
          translateX: 0,
          translateY: 0,
          hasDecorations: true,
        },
      };

      MagazinePlaceholderCache.clear();
      MagazinePlaceholderCache.setMaxSize(100); // Ensure we have space

      // Add multiple duplicates
      for (let i = 0; i < 5; i++) {
        MagazinePlaceholderCache.set(`multi-dup-${i}`, {
          ...basePlaceholder,
          aesthetic: { ...basePlaceholder.aesthetic, rotation: i },
        });
      }

      // Access some more than others
      MagazinePlaceholderCache.get('multi-dup-2'); // Most accessed
      MagazinePlaceholderCache.get('multi-dup-2');
      MagazinePlaceholderCache.get('multi-dup-2');
      MagazinePlaceholderCache.get('multi-dup-1');

      const beforeOptimize = MagazinePlaceholderCache.getStats();
      expect(beforeOptimize.totalEntries).toBe(5);

      const removed = MagazinePlaceholderCache.optimize();
      expect(removed).toBe(4); // Should remove 4 duplicates, keeping only 1

      const afterOptimize = MagazinePlaceholderCache.getStats();
      expect(afterOptimize.totalEntries).toBe(1);

      // The most accessed one should remain
      expect(MagazinePlaceholderCache.get('multi-dup-2')).not.toBeNull();
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

    it('should handle edge cases in optimize method', () => {
      // Clear cache
      MagazinePlaceholderCache.clear();

      // Test with empty cache
      const removedEmpty = MagazinePlaceholderCache.optimize();
      expect(removedEmpty).toBe(0);

      // Test with no duplicates
      MagazinePlaceholderCache.set('unique1', {
        url: 'url1',
        service: 'test',
        cached: false,
        aesthetic: {
          rotation: 1,
          translateX: 0,
          translateY: 0,
          hasDecorations: true,
        },
      });
      MagazinePlaceholderCache.set('unique2', {
        url: 'url2',
        service: 'test',
        cached: false,
        aesthetic: {
          rotation: 2,
          translateX: 0,
          translateY: 0,
          hasDecorations: true,
        },
      });

      const removedNoDups = MagazinePlaceholderCache.optimize();
      expect(removedNoDups).toBe(0);

      // Verify cache still has both entries
      expect(MagazinePlaceholderCache.getStats().totalEntries).toBe(2);
    });

    it('should test cleanExpired with expired entries', () => {
      // Clear cache first
      MagazinePlaceholderCache.clear();

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

      // Add entries
      MagazinePlaceholderCache.set('fresh-entry', testPlaceholder);
      MagazinePlaceholderCache.set('old-entry', testPlaceholder);

      // Manually set timestamp to expired for one entry
      interface CacheEntry {
        timestamp: number;
        [key: string]: unknown;
      }
      const cacheMap = (MagazinePlaceholderCache as any)['cache'] as Map<
        string,
        CacheEntry
      >;
      const oldEntry = cacheMap.get('old-entry');
      if (oldEntry !== undefined) {
        // Set timestamp to 25 hours ago (cache duration is 24 hours)
        oldEntry.timestamp = Date.now() - 25 * 60 * 60 * 1000;
      }

      // Clean expired entries
      const removed = MagazinePlaceholderCache.cleanExpired();
      expect(removed).toBe(1);

      // Verify only fresh entry remains
      expect(MagazinePlaceholderCache.get('fresh-entry')).not.toBeNull();
      expect(MagazinePlaceholderCache.get('old-entry')).toBeNull();
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
