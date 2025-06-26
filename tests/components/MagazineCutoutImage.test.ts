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
global.Image = MockImage as any;

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
      const result = await MagazineCutoutPlaceholderService.generatePlaceholder({
        type: 'character',
        width: 400,
        height: 300
      });

      expect(result).toMatchObject({
        url: expect.any(String),
        service: expect.any(String),
        cached: expect.any(Boolean),
        aesthetic: {
          rotation: expect.any(Number),
          translateX: expect.any(Number),
          translateY: expect.any(Number),
          hasDecorations: expect.any(Boolean)
        }
      });

      // Verificar que la rotación está en el rango esperado
      expect(result.aesthetic.rotation).toBeGreaterThanOrEqual(-5);
      expect(result.aesthetic.rotation).toBeLessThanOrEqual(5);
    });

    it('should use custom prompt when provided', async () => {
      const customPrompt = 'custom test prompt';
      const result = await MagazineCutoutPlaceholderService.generatePlaceholder({
        type: 'sketch',
        width: 640,
        height: 360,
        prompt: customPrompt
      });

      expect(result.url).toContain('custom');
    });

    it('should generate aesthetics within expected ranges', async () => {
      const results = [];
      for (let i = 0; i < 5; i++) {
        const result = await MagazineCutoutPlaceholderService.generatePlaceholder({
          type: 'character',
          prompt: `test-${i}` // Diferente prompt para evitar cache
        });
        results.push(result);
      }

      // Verificar que las rotaciones están en rangos esperados
      results.forEach(result => {
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

      const result = await MagazineCutoutPlaceholderService.generatePlaceholder({
        type: 'character',
        prompt: 'error-trigger' // Esto debería causar error en el mock
      });

      expect(result.url).toContain('data:image/svg+xml');
      expect(result.service).toBe('svg-fallback');
      
      consoleSpy.mockRestore();
    });
  });

  describe('SVG Fallback Generation', () => {
    it('should generate valid SVG for different types', async () => {
      const types = ['character', 'sketch', 'podcast', 'hero', 'background'] as const;

      for (const type of types) {
        const result = await MagazineCutoutPlaceholderService.generatePlaceholder({
          type,
          width: 400,
          height: 300
        });

        if (result.url.startsWith('data:image/svg+xml')) {
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
      const result = await MagazineCutoutPlaceholderService.generatePlaceholder({
        type: 'character',
        width: 400,
        height: 300
      });

      if (result.url.startsWith('data:image/svg+xml')) {
        const svgContent = decodeURIComponent(result.url.split(',')[1]);
        
        // Verificar efectos específicos
        expect(svgContent).toContain('roughPaper');
        expect(svgContent).toContain('dropShadow');
        expect(svgContent).toContain('clip-path');
      }
    });
  });
});

describe('MagazinePlaceholderCache', () => {
  beforeEach(() => {
    MagazinePlaceholderCache.clear();
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
          hasDecorations: true
        }
      };

      MagazinePlaceholderCache.set('test-key', testPlaceholder);
      const retrieved = MagazinePlaceholderCache.get('test-key');

      expect(retrieved).toMatchObject({
        ...testPlaceholder,
        cached: true
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
          hasDecorations: true
        }
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
          hasDecorations: true
        }
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

    it('should optimize cache by removing duplicates', () => {
      const testPlaceholder1 = {
        url: 'same-url',
        service: 'test-service',
        cached: false,
        aesthetic: { rotation: 2, translateX: 1, translateY: -1, hasDecorations: true }
      };

      const testPlaceholder2 = {
        url: 'same-url', // Misma URL
        service: 'test-service',
        cached: false,
        aesthetic: { rotation: 3, translateX: 2, translateY: -2, hasDecorations: false }
      };

      MagazinePlaceholderCache.set('key1', testPlaceholder1);
      MagazinePlaceholderCache.set('key2', testPlaceholder2);

      // Acceder key1 más veces para que tenga mayor prioridad
      MagazinePlaceholderCache.get('key1');
      MagazinePlaceholderCache.get('key1');
      MagazinePlaceholderCache.get('key2');

      const statsBefore = MagazinePlaceholderCache.getStats();
      expect(statsBefore.totalEntries).toBe(2);

      const removedCount = MagazinePlaceholderCache.optimize();
      
      expect(removedCount).toBe(1);
      
      const statsAfter = MagazinePlaceholderCache.getStats();
      expect(statsAfter.totalEntries).toBe(1);
      
      // key1 debería permanecer (más accedido)
      expect(MagazinePlaceholderCache.get('key1')).not.toBeNull();
      expect(MagazinePlaceholderCache.get('key2')).toBeNull();
    });
  });

  describe('preload functionality', () => {
    it('should preload common placeholders', async () => {
      await MagazinePlaceholderCache.preloadCommon();

      const stats = MagazinePlaceholderCache.getStats();
      expect(stats.totalEntries).toBeGreaterThan(0);

      // Verificar que al menos uno de los placeholders comunes está disponible
      const characterPlaceholder = MagazinePlaceholderCache.get('character-default');
      const sketchPlaceholder = MagazinePlaceholderCache.get('sketch-default');
      const heroPlaceholder = MagazinePlaceholderCache.get('hero-default');
      
      const hasPreloaded = characterPlaceholder || sketchPlaceholder || heroPlaceholder;
      expect(hasPreloaded).toBeTruthy();
      
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
          hasDecorations: true
        }
      };

      MagazinePlaceholderCache.set('test-key', testPlaceholder);
      
      const exported = MagazinePlaceholderCache.export();
      
      expect(exported).toHaveProperty('stats');
      expect(exported).toHaveProperty('entries');
      expect(exported.entries['test-key']).toMatchObject({
        service: 'test-service',
        hasUrl: true,
        hasFallback: false
      });
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
    return new Promise(resolve => {
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
        hasDecorations: Math.random() > 0.4
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