import { describe, it, expect, vi } from 'vitest';
import {
  formatDate,
  slugify,
  truncateText,
  generateExcerpt,
  capitalize,
  formatDuration,
  getPlatformIcon,
  stringToColor,
  sortByDate,
  groupBy,
  generateSEOMeta,
  debounce,
  isBrowser,
  getURLParam,
  lazyLoadImage,
} from '../../src/lib/utils';

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('should format date in Spanish (Mexico) format', () => {
      const date = new Date('2024-03-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('marzo');
      expect(formatted).toContain('2024');
    });

    it('should accept string dates', () => {
      const formatted = formatDate('2024-12-25');
      expect(formatted).toContain('diciembre');
      expect(formatted).toContain('2024');
    });

    it('should accept custom options', () => {
      const date = new Date('2024-03-15');
      const formatted = formatDate(date, { month: 'short', year: '2-digit' });
      expect(formatted).toContain('mar');
      expect(formatted).toContain('24');
    });
  });

  describe('slugify', () => {
    it('should convert text to URL-friendly slug', () => {
      expect(slugify('Lucía Solar')).toBe('lucia-solar');
      expect(slugify('Hermano Compostino')).toBe('hermano-compostino');
      expect(slugify('¡Testigos de Solarpunk!')).toBe('testigos-de-solarpunk');
    });

    it('should handle special characters and spaces', () => {
      expect(slugify('Año 2050: El Futuro')).toBe('ano-2050-el-futuro');
      expect(slugify('  Espacios   múltiples  ')).toBe('espacios-multiples');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text with ellipsis', () => {
      const longText = 'Este es un texto muy largo que necesita ser truncado';
      expect(truncateText(longText, 20)).toBe('Este es un texto muy...');
    });

    it('should not truncate short text', () => {
      const shortText = 'Texto corto';
      expect(truncateText(shortText, 20)).toBe('Texto corto');
    });

    it('should handle edge cases', () => {
      expect(truncateText('', 10)).toBe('');
      expect(truncateText('Hola', 0)).toBe('...');
    });
  });

  describe('generateExcerpt', () => {
    it('should generate excerpt from markdown content', () => {
      const markdown = `---
title: Test
---
# Header

This is **bold** and *italic* text with [a link](https://example.com).`;
      const excerpt = generateExcerpt(markdown, 50);
      expect(excerpt).toBe('Header This is bold and italic text with a link.');
    });

    it('should remove code blocks', () => {
      const markdown =
        'Text before\n```js\nconst code = true;\n```\nText after';
      const excerpt = generateExcerpt(markdown);
      expect(excerpt).toBe('Text before Text after');
    });

    it('should handle inline code', () => {
      const markdown = 'Use `npm install` to install dependencies';
      const excerpt = generateExcerpt(markdown);
      expect(excerpt).toBe('Use npm install to install dependencies');
    });

    it('should use default maxLength of 160', () => {
      const longText = 'a'.repeat(200);
      const excerpt = generateExcerpt(longText);
      expect(excerpt.length).toBe(163); // 160 + '...'
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('WORLD');
    });

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
      // @ts-expect-error Testing null input
      expect(capitalize(null)).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });

    it('should handle undefined', () => {
      // @ts-expect-error Testing undefined input
      expect(capitalize(undefined)).toBe('');
    });

    it('should handle numbers at start', () => {
      expect(capitalize('123abc')).toBe('123abc');
    });
  });

  describe('formatDuration', () => {
    it('should format seconds to MM:SS', () => {
      expect(formatDuration(0)).toBe('0:00');
      expect(formatDuration(59)).toBe('0:59');
      expect(formatDuration(60)).toBe('1:00');
      expect(formatDuration(125)).toBe('2:05');
      expect(formatDuration(3661)).toBe('61:01');
    });
  });

  describe('getPlatformIcon', () => {
    it('should return correct platform icons', () => {
      expect(getPlatformIcon('TT')).toBe('📱');
      expect(getPlatformIcon('YT')).toBe('📺');
      expect(getPlatformIcon('IG')).toBe('📷');
      expect(getPlatformIcon('FB')).toBe('👥');
    });

    it('should return default icon for unknown platform', () => {
      expect(getPlatformIcon('UNKNOWN')).toBe('🌐');
      expect(getPlatformIcon('')).toBe('🌐');
    });
  });

  describe('stringToColor', () => {
    it('should generate consistent colors for same string', () => {
      const color1 = stringToColor('test');
      const color2 = stringToColor('test');
      expect(color1).toBe(color2);
      expect(color1).toMatch(/^hsl\(\d+, 70%, 50%\)$/);
    });

    it('should generate different colors for different strings', () => {
      const color1 = stringToColor('test1');
      const color2 = stringToColor('test2');
      expect(color1).not.toBe(color2);
    });
  });

  describe('sortByDate', () => {
    it('should sort items by date (most recent first)', () => {
      const items = [
        { id: 1, fecha_publicacion: '2024-01-01' },
        { id: 2, fecha_publicacion: '2024-03-01' },
        { id: 3, fecha_publicacion: '2024-02-01' },
      ];
      const sorted = sortByDate(items);
      expect(sorted[0].id).toBe(2);
      expect(sorted[1].id).toBe(3);
      expect(sorted[2].id).toBe(1);
    });

    it('should handle custom date field', () => {
      const items = [
        { id: 1, created_at: '2024-01-01' },
        { id: 2, created_at: '2024-03-01' },
      ];
      const sorted = sortByDate(items, 'created_at');
      expect(sorted[0].id).toBe(2);
    });
  });

  describe('groupBy', () => {
    it('should group items by key', () => {
      const items = [
        { name: 'A', category: 'fruit' },
        { name: 'B', category: 'vegetable' },
        { name: 'C', category: 'fruit' },
      ];
      const grouped = groupBy(items, 'category');
      expect(grouped.fruit).toHaveLength(2);
      expect(grouped.vegetable).toHaveLength(1);
      expect(grouped.fruit[0].name).toBe('A');
    });

    it('should handle empty arrays', () => {
      const grouped = groupBy([], 'any');
      expect(grouped).toEqual({});
    });

    it('should handle undefined values', () => {
      const items = [
        { name: 'A' },
        { name: 'B', category: 'cat1' },
        { name: 'C', category: undefined },
      ];
      const grouped = groupBy(items, 'category');
      expect(grouped.undefined).toHaveLength(2);
      expect(grouped.cat1).toHaveLength(1);
    });
  });

  describe('generateSEOMeta', () => {
    it('should generate complete SEO metadata', () => {
      const meta = generateSEOMeta({
        title: 'Test Page',
        description: 'Test description',
        url: 'https://example.com/test',
      });

      expect(meta.title).toBe('Test Page | Testigos de Solarpunk');
      expect(meta.description).toBe('Test description');
      expect(meta.canonical).toBe('https://example.com/test');
      expect(meta.openGraph.title).toBe('Test Page');
      expect(meta.openGraph.image).toBe('/og-image.jpg');
      expect(meta.twitter.card).toBe('summary_large_image');
    });

    it('should use custom image when provided', () => {
      const meta = generateSEOMeta({
        title: 'Test',
        description: 'Test',
        url: 'https://example.com',
        image: '/custom-image.jpg',
      });
      expect(meta.openGraph.image).toBe('/custom-image.jpg');
      expect(meta.twitter.image).toBe('/custom-image.jpg');
    });

    it('should truncate long descriptions', () => {
      const longDesc = 'a'.repeat(200);
      const meta = generateSEOMeta({
        title: 'Test',
        description: longDesc,
        url: 'https://example.com',
      });
      expect(meta.description.length).toBe(163); // 160 + '...'
    });

    it('should use custom type', () => {
      const meta = generateSEOMeta({
        title: 'Article',
        description: 'An article',
        url: 'https://example.com/article',
        type: 'article',
      });
      expect(meta.openGraph.type).toBe('article');
    });

    it('should handle empty image string', () => {
      const meta = generateSEOMeta({
        title: 'Test',
        description: 'Test',
        url: 'https://example.com',
        image: '',
      });
      expect(meta.openGraph.image).toBe('/og-image.jpg');
      expect(meta.twitter.image).toBe('/og-image.jpg');
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', () => {
      vi.useFakeTimers();
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('arg1');
      debouncedFn('arg2');
      debouncedFn('arg3');

      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('arg3');

      vi.useRealTimers();
    });

    it('should handle multiple separate calls', () => {
      vi.useFakeTimers();
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('first');
      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledWith('first');

      debouncedFn('second');
      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledWith('second');
      expect(mockFn).toHaveBeenCalledTimes(2);

      vi.useRealTimers();
    });
  });

  describe('isBrowser', () => {
    it('should return true in browser environment', () => {
      // jsdom environment provides window object
      expect(isBrowser()).toBe(true);
    });
  });

  describe('getURLParam', () => {
    it('should get URL parameters', () => {
      // Mock window.location.search
      const originalSearch = window.location.search;
      Object.defineProperty(window, 'location', {
        value: {
          ...window.location,
          search: '?param1=value1&param2=value2',
        },
        writable: true,
      });

      expect(getURLParam('param1')).toBe('value1');
      expect(getURLParam('param2')).toBe('value2');
      expect(getURLParam('nonexistent')).toBe(null);

      // Restore
      Object.defineProperty(window, 'location', {
        value: {
          ...window.location,
          search: originalSearch,
        },
        writable: true,
      });
    });

    it('should handle empty search params', () => {
      const originalSearch = window.location.search;
      Object.defineProperty(window, 'location', {
        value: {
          ...window.location,
          search: '',
        },
        writable: true,
      });

      expect(getURLParam('any')).toBe(null);

      // Restore
      Object.defineProperty(window, 'location', {
        value: {
          ...window.location,
          search: originalSearch,
        },
        writable: true,
      });
    });
  });

  describe('lazyLoadImage', () => {
    it('should load image successfully', async () => {
      interface MockImage {
        onload: ((this: GlobalEventHandlers, ev: Event) => unknown) | null;
        onerror:
          | ((this: GlobalEventHandlers, ev: Event | string) => unknown)
          | null;
        src: string;
      }

      const mockImage: MockImage = {
        onload: null,
        onerror: null,
        src: '',
      };

      // @ts-expect-error Mocking global Image
      global.Image = vi.fn(() => mockImage);

      const promise = lazyLoadImage('/test.jpg');

      // Simulate image load
      setTimeout(() => {
        if (mockImage.onload !== null) {
          // @ts-expect-error Testing mock behavior
          mockImage.onload.call(mockImage, new Event('load'));
        }
      }, 0);

      const result = await promise;
      expect(result).toBe(mockImage);
      expect(mockImage.src).toBe('/test.jpg');
    });

    it('should handle image load error', async () => {
      interface MockImage {
        onload: ((this: GlobalEventHandlers, ev: Event) => unknown) | null;
        onerror:
          | ((this: GlobalEventHandlers, ev: Event | string) => unknown)
          | null;
        src: string;
      }

      const mockImage: MockImage = {
        onload: null,
        onerror: null,
        src: '',
      };

      // @ts-expect-error Mocking global Image
      global.Image = vi.fn(() => mockImage);

      const promise = lazyLoadImage('/error.jpg');

      // Simulate image error
      setTimeout(() => {
        if (mockImage.onerror !== null) {
          // @ts-expect-error Testing mock behavior
          mockImage.onerror.call(mockImage, new Error('Load failed'));
        }
      }, 0);

      await expect(promise).rejects.toThrow();
    });

    it('should use placeholder while loading', async () => {
      interface MockImage {
        onload: ((this: GlobalEventHandlers, ev: Event) => unknown) | null;
        onerror:
          | ((this: GlobalEventHandlers, ev: Event | string) => unknown)
          | null;
        src: string;
      }

      const mockImage: MockImage = {
        onload: null,
        onerror: null,
        src: '',
      };

      // @ts-expect-error Mocking global Image
      global.Image = vi.fn(() => mockImage);

      const promise = lazyLoadImage('/test.jpg', '/placeholder.jpg');

      // Check placeholder is set first
      expect(mockImage.src).toBe('/placeholder.jpg');

      // Wait for next tick
      await new Promise((resolve) => setTimeout(resolve, 1));

      // Check actual image is loaded
      expect(mockImage.src).toBe('/test.jpg');

      // Simulate image load
      if (mockImage.onload !== null) {
        // @ts-expect-error Testing mock behavior
        mockImage.onload.call(mockImage, new Event('load'));
      }

      await promise;
    });
  });
});
