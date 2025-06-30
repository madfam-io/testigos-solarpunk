/**
 * @fileoverview Comprehensive unit tests for utility functions.
 * Tests all helper functions used throughout the Testigos de Solarpunk project,
 * including string manipulation, date formatting, SEO generation, and browser utilities.
 * These utilities are critical for content presentation and user experience.
 */

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

/**
 * Test suite for all utility functions
 * Validates helper functions used across the application
 */
describe('Utility Functions', () => {
  /**
   * Tests date formatting functionality
   * Ensures dates are displayed in Spanish (Mexico) locale
   */
  describe('formatDate', () => {
    /**
     * Validates default Spanish date formatting
     * Critical for Mexican audience localization
     */
    it('should format date in Spanish (Mexico) format', () => {
      const date = new Date('2024-03-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('marzo');
      expect(formatted).toContain('2024');
    });

    /**
     * Tests string date input handling
     * Ensures flexibility in date input formats
     */
    it('should accept string dates', () => {
      const formatted = formatDate('2024-12-25');
      expect(formatted).toContain('diciembre');
      expect(formatted).toContain('2024');
    });

    /**
     * Validates custom formatting options
     * Allows flexible date display formats
     */
    it('should accept custom options', () => {
      const date = new Date('2024-03-15');
      const formatted = formatDate(date, { month: 'short', year: '2-digit' });
      expect(formatted).toContain('mar');
      expect(formatted).toContain('24');
    });
  });

  /**
   * Tests URL slug generation
   * Essential for creating SEO-friendly URLs from Spanish text
   */
  describe('slugify', () => {
    /**
     * Validates basic slug conversion
     * Handles character names and Spanish text
     */
    it('should convert text to URL-friendly slug', () => {
      expect(slugify('Lucía Solar')).toBe('lucia-solar');
      expect(slugify('Hermano Compostino')).toBe('hermano-compostino');
      expect(slugify('¡Testigos de Solarpunk!')).toBe('testigos-de-solarpunk');
    });

    /**
     * Tests edge cases in slug generation
     * Handles Spanish characters, numbers, and multiple spaces
     */
    it('should handle special characters and spaces', () => {
      expect(slugify('Año 2050: El Futuro')).toBe('ano-2050-el-futuro');
      expect(slugify('  Espacios   múltiples  ')).toBe('espacios-multiples');
    });
  });

  /**
   * Tests text truncation functionality
   * Used for creating excerpts and preview text
   */
  describe('truncateText', () => {
    /**
     * Validates basic truncation with ellipsis
     * Essential for card components and previews
     */
    it('should truncate long text with ellipsis', () => {
      const longText = 'Este es un texto muy largo que necesita ser truncado';
      expect(truncateText(longText, 20)).toBe('Este es un texto muy...');
    });

    /**
     * Ensures short text remains unchanged
     * Prevents unnecessary ellipsis on brief content
     */
    it('should not truncate short text', () => {
      const shortText = 'Texto corto';
      expect(truncateText(shortText, 20)).toBe('Texto corto');
    });

    /**
     * Tests truncation edge cases
     * Handles empty strings and zero length
     */
    it('should handle edge cases', () => {
      expect(truncateText('', 10)).toBe('');
      expect(truncateText('Hola', 0)).toBe('...');
    });
  });

  /**
   * Tests markdown excerpt generation
   * Creates plain text summaries from markdown content
   */
  describe('generateExcerpt', () => {
    /**
     * Validates markdown parsing and cleaning
     * Removes formatting while preserving content
     */
    it('should generate excerpt from markdown content', () => {
      const markdown = `---
title: Test
---
# Header

This is **bold** and *italic* text with [a link](https://example.com).`;
      const excerpt = generateExcerpt(markdown, 50);
      expect(excerpt).toBe('Header This is bold and italic text with a link.');
    });

    /**
     * Tests code block removal
     * Ensures technical content doesn't appear in excerpts
     */
    it('should remove code blocks', () => {
      const markdown =
        'Text before\n```js\nconst code = true;\n```\nText after';
      const excerpt = generateExcerpt(markdown);
      expect(excerpt).toBe('Text before Text after');
    });

    /**
     * Validates inline code handling
     * Removes backticks while preserving content
     */
    it('should handle inline code', () => {
      const markdown = 'Use `npm install` to install dependencies';
      const excerpt = generateExcerpt(markdown);
      expect(excerpt).toBe('Use npm install to install dependencies');
    });

    /**
     * Tests default excerpt length
     * 160 characters is optimal for meta descriptions
     */
    it('should use default maxLength of 160', () => {
      const longText = 'a'.repeat(200);
      const excerpt = generateExcerpt(longText);
      expect(excerpt.length).toBe(163); // 160 + '...'
    });
  });

  /**
   * Tests string capitalization
   * Used for formatting names and titles
   */
  describe('capitalize', () => {
    /**
     * Validates basic capitalization
     * Handles lowercase and already capitalized text
     */
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('WORLD');
    });

    /**
     * Tests empty string handling
     * Includes null safety check
     */
    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
      // @ts-expect-error Testing null input
      expect(capitalize(null)).toBe('');
    });

    /**
     * Validates single character capitalization
     * Edge case for minimal input
     */
    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });

    /**
     * Tests undefined input handling
     * Ensures function doesn't crash with invalid input
     */
    it('should handle undefined', () => {
      // @ts-expect-error Testing undefined input
      expect(capitalize(undefined)).toBe('');
    });

    /**
     * Tests strings starting with numbers
     * Numbers cannot be capitalized
     */
    it('should handle numbers at start', () => {
      expect(capitalize('123abc')).toBe('123abc');
    });
  });

  /**
   * Tests video duration formatting
   * Used for displaying sketch video lengths
   */
  describe('formatDuration', () => {
    /**
     * Validates time formatting from seconds
     * Handles edge cases like 0 seconds and over 1 hour
     */
    it('should format seconds to MM:SS', () => {
      expect(formatDuration(0)).toBe('0:00');
      expect(formatDuration(59)).toBe('0:59');
      expect(formatDuration(60)).toBe('1:00');
      expect(formatDuration(125)).toBe('2:05');
      expect(formatDuration(3661)).toBe('61:01');
    });
  });

  /**
   * Tests platform icon mapping
   * Returns emoji icons for each social platform
   */
  describe('getPlatformIcon', () => {
    /**
     * Validates icon mapping for all platforms
     * TT=TikTok, YT=YouTube, IG=Instagram, FB=Facebook
     */
    it('should return correct platform icons', () => {
      expect(getPlatformIcon('TT')).toBe('📱');
      expect(getPlatformIcon('YT')).toBe('📺');
      expect(getPlatformIcon('IG')).toBe('📷');
      expect(getPlatformIcon('FB')).toBe('👥');
    });

    /**
     * Tests fallback icon behavior
     * Returns globe emoji for unknown platforms
     */
    it('should return default icon for unknown platform', () => {
      expect(getPlatformIcon('UNKNOWN')).toBe('🌐');
      expect(getPlatformIcon('')).toBe('🌐');
    });
  });

  /**
   * Tests deterministic color generation
   * Creates consistent colors from string hashes
   */
  describe('stringToColor', () => {
    /**
     * Validates color consistency
     * Same input always produces same color
     */
    it('should generate consistent colors for same string', () => {
      const color1 = stringToColor('test');
      const color2 = stringToColor('test');
      expect(color1).toBe(color2);
      expect(color1).toMatch(/^hsl\(\d+, 70%, 50%\)$/);
    });

    /**
     * Ensures color variety
     * Different inputs produce different colors
     */
    it('should generate different colors for different strings', () => {
      const color1 = stringToColor('test1');
      const color2 = stringToColor('test2');
      expect(color1).not.toBe(color2);
    });
  });

  /**
   * Tests date-based sorting
   * Used for content chronological ordering
   */
  describe('sortByDate', () => {
    /**
     * Validates descending date sort
     * Most recent content appears first
     */
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

    /**
     * Tests flexible date field selection
     * Allows sorting by different date properties
     */
    it('should handle custom date field', () => {
      const items = [
        { id: 1, created_at: '2024-01-01' },
        { id: 2, created_at: '2024-03-01' },
      ];
      const sorted = sortByDate(items, 'created_at');
      expect(sorted[0].id).toBe(2);
    });
  });

  /**
   * Tests array grouping functionality
   * Used for organizing content by categories
   */
  describe('groupBy', () => {
    /**
     * Validates basic grouping by property
     * Creates object with arrays for each group
     */
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

    /**
     * Tests empty array handling
     * Returns empty object for no items
     */
    it('should handle empty arrays', () => {
      const grouped = groupBy([], 'any');
      expect(grouped).toEqual({});
    });

    /**
     * Tests undefined property handling
     * Groups items with missing properties under 'undefined'
     */
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

  /**
   * Tests SEO metadata generation
   * Critical for search engine optimization and social sharing
   */
  describe('generateSEOMeta', () => {
    /**
     * Validates complete SEO meta tag generation
     * Includes Open Graph and Twitter Card data
     */
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

    /**
     * Tests custom image handling
     * Allows page-specific social media images
     */
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

    /**
     * Validates description length limits
     * Prevents truncation by search engines
     */
    it('should truncate long descriptions', () => {
      const longDesc = 'a'.repeat(200);
      const meta = generateSEOMeta({
        title: 'Test',
        description: longDesc,
        url: 'https://example.com',
      });
      expect(meta.description.length).toBe(163); // 160 + '...'
    });

    /**
     * Tests Open Graph type customization
     * Allows article, website, and other types
     */
    it('should use custom type', () => {
      const meta = generateSEOMeta({
        title: 'Article',
        description: 'An article',
        url: 'https://example.com/article',
        type: 'article',
      });
      expect(meta.openGraph.type).toBe('article');
    });

    /**
     * Tests empty image fallback
     * Uses default OG image when none provided
     */
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

  /**
   * Tests debounce implementation
   * Prevents excessive function calls during rapid events
   */
  describe('debounce', () => {
    /**
     * Validates basic debounce behavior
     * Only last call within timeout executes
     */
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

    /**
     * Tests debounce with spaced calls
     * Each call after timeout executes normally
     */
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

  /**
   * Tests browser environment detection
   * Used for SSR-safe code execution
   */
  describe('isBrowser', () => {
    /**
     * Validates browser detection in test environment
     * jsdom provides window object
     */
    it('should return true in browser environment', () => {
      // jsdom environment provides window object
      expect(isBrowser()).toBe(true);
    });
  });

  /**
   * Tests URL parameter extraction
   * Used for reading query string values
   */
  describe('getURLParam', () => {
    /**
     * Tests non-browser environment handling
     * Returns null when window is unavailable
     */
    it('should return null when not in browser environment', () => {
      // Mock isBrowser to return false
      const originalWindow = global.window;
      // @ts-expect-error Testing non-browser environment
      delete global.window;

      expect(getURLParam('param1')).toBe(null);

      // Restore
      global.window = originalWindow;
    });

    /**
     * Validates parameter extraction from query string
     * Handles multiple parameters correctly
     */
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

    /**
     * Tests empty query string handling
     * Returns null when no parameters exist
     */
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

  /**
   * Tests lazy image loading functionality
   * Optimizes page load by deferring image loading
   */
  describe('lazyLoadImage', () => {
    /**
     * Validates successful image loading
     * Returns promise that resolves with image element
     */
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

    /**
     * Tests error handling during image load
     * Promise rejects when image fails to load
     */
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

    /**
     * Tests placeholder image functionality
     * Shows placeholder immediately while loading actual image
     */
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
