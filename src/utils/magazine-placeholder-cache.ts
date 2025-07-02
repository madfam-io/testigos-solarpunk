/**
 * @fileoverview Magazine Placeholder Cache System
 *
 * Advanced caching system for AI-generated magazine cutout placeholders.
 * Implements LRU eviction, memory management, and performance optimization
 * for the Testigos de Solarpunk project.
 *
 * Features:
 * - Time-based expiration with configurable TTL
 * - LRU (Least Recently Used) eviction strategy
 * - Access statistics and hit rate tracking
 * - Memory usage estimation
 * - Automatic cleanup and optimization
 * - Preloading of common placeholder types
 *
 * @module utils/magazine-placeholder-cache
 */

import { magazinePlaceholderConfig } from '../config/magazine-placeholders.config';
import type { GeneratedPlaceholder } from '../services/MagazineCutoutPlaceholderService';
import { log } from './logger';

/**
 * Internal cache entry structure
 *
 * @interface CacheEntry
 * @property {GeneratedPlaceholder} placeholder - Cached placeholder data
 * @property {number} timestamp - Creation timestamp (milliseconds)
 * @property {number} accessCount - Number of times accessed
 * @property {number} lastAccessed - Last access timestamp (milliseconds)
 */
interface CacheEntry {
  placeholder: GeneratedPlaceholder;
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
}

/**
 * Cache statistics for monitoring and debugging
 *
 * @interface CacheStats
 * @property {number} totalEntries - Current number of cached items
 * @property {number} hitRate - Cache hit percentage (0-100)
 * @property {number} memoryUsage - Estimated memory usage in bytes
 * @property {number} oldestEntry - Age of oldest entry in milliseconds
 * @property {string} mostAccessed - Key of most frequently accessed item
 */
interface CacheStats {
  totalEntries: number;
  hitRate: number;
  memoryUsage: number;
  oldestEntry: number;
  mostAccessed: string;
}

export class MagazinePlaceholderCache {
  private static cache = new Map<string, CacheEntry>();
  private static hits = 0;
  private static misses = 0;
  private static maxSize = 100; // Máximo número de entradas

  /**
   * Retrieves a placeholder from cache
   *
   * Checks expiration and updates access statistics.
   * Returns null if not found or expired.
   *
   * @static
   * @param {string} key - Cache key to retrieve
   * @returns {GeneratedPlaceholder | null} Cached placeholder or null
   *
   * Side Effects:
   * - Updates hit/miss statistics
   * - Updates access count and timestamp
   * - Removes expired entries
   */
  static get(key: string): GeneratedPlaceholder | null {
    const entry = this.cache.get(key);

    if (!entry) {
      this.misses++;
      return null;
    }

    // Verificar si el cache está expirado
    const now = Date.now();
    const isExpired =
      now - entry.timestamp >
      magazinePlaceholderConfig.performance.cacheDuration;

    if (isExpired) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    // Actualizar estadísticas de acceso
    entry.accessCount++;
    entry.lastAccessed = now;
    this.hits++;

    return { ...entry.placeholder, cached: true };
  }

  /**
   * Stores a placeholder in cache
   *
   * Triggers LRU eviction if cache is full.
   * Resets access statistics for new entries.
   *
   * @static
   * @param {string} key - Cache key for storage
   * @param {GeneratedPlaceholder} placeholder - Placeholder to cache
   * @returns {void}
   *
   * Implementation:
   * - Checks cache size limit
   * - Evicts oldest entry if needed
   * - Stores with fresh timestamps
   */
  static set(key: string, placeholder: GeneratedPlaceholder): void {
    const now = Date.now();

    // Limpiar cache si está lleno
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }

    this.cache.set(key, {
      placeholder: { ...placeholder, cached: false },
      timestamp: now,
      accessCount: 1,
      lastAccessed: now,
    });
  }

  /**
   * Evicts least recently used entry when cache is full
   *
   * Uses a scoring algorithm combining last access time
   * and access frequency to determine eviction priority.
   *
   * @private
   * @static
   * @returns {void}
   *
   * Algorithm:
   * Score = lastAccessed / (accessCount + 1)
   * Lower score = higher eviction priority
   * Prevents evicting frequently accessed items
   */
  private static evictOldest(): void {
    let oldestKey = '';
    let oldestTime = Date.now();

    // Encontrar la entrada menos accedida y más antigua
    for (const [key, entry] of this.cache) {
      const score = entry.lastAccessed / (entry.accessCount + 1);
      if (score < oldestTime) {
        oldestTime = score;
        oldestKey = key;
      }
    }

    if (oldestKey !== '') {
      this.cache.delete(oldestKey);
    }
  }

  /**
   * Preloads common placeholder configurations
   *
   * Generates and caches frequently used placeholder types
   * to improve initial load performance.
   *
   * @static
   * @returns {void}
   *
   * Preloaded Types:
   * - character: 400x300 for character cards
   * - sketch: 640x360 for video thumbnails
   * - hero: 1200x600 for hero sections
   * - podcast: 500x500 for podcast covers
   */
  static preloadCommon(): void {
    const commonPlaceholders = [
      { key: 'character-default', type: 'character', width: 400, height: 300 },
      { key: 'sketch-default', type: 'sketch', width: 640, height: 360 },
      { key: 'hero-default', type: 'hero', width: 1200, height: 600 },
      { key: 'podcast-default', type: 'podcast', width: 500, height: 500 },
    ];

    for (const config of commonPlaceholders) {
      if (!this.get(config.key)) {
        try {
          // Simular generación de placeholder común
          const placeholder: GeneratedPlaceholder = {
            url: this.generateDefaultSVG(
              config.type,
              config.width,
              config.height
            ),
            service: 'preload-default',
            cached: false,
            aesthetic: {
              rotation: Math.random() * 10 - 5,
              translateX: Math.random() * 4 - 2,
              translateY: Math.random() * 4 - 2,
              hasDecorations: true,
            },
          };

          this.set(config.key, placeholder);
        } catch (error) {
          log.warn(`Failed to preload ${config.key}`, error, 'magazine-cache');
        }
      }
    }
  }

  /**
   * Generates default SVG for preloading
   *
   * Creates simple SVG placeholders with paper texture
   * and type-specific messaging.
   *
   * @private
   * @static
   * @param {string} type - Placeholder type
   * @param {number} width - SVG width in pixels
   * @param {number} height - SVG height in pixels
   * @returns {string} Data URI containing SVG
   *
   * SVG Features:
   * - Paper texture filter
   * - Type-specific labels
   * - Centered layout
   * - Loading indicator
   */
  private static generateDefaultSVG(
    type: string,
    width: number,
    height: number
  ): string {
    const messages = {
      character: 'PERSONA',
      sketch: 'SKETCH',
      hero: 'TESTIGOS',
      podcast: 'PODCAST',
      background: 'CONTENIDO',
    };

    const message = messages[type as keyof typeof messages] ?? 'PRÓXIMAMENTE';
    const centerX = width / 2;
    const centerY = height / 2;

    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="paper">
            <feTurbulence baseFrequency="0.04" numOctaves="5" result="noise"/>
            <feDiffuseLighting in="noise" lighting-color="white" surfaceScale="1"/>
          </filter>
        </defs>
        
        <rect width="100%" height="100%" fill="#F4E5D3" filter="url(#paper)"/>
        
        <circle cx="${centerX}" cy="${centerY - 20}" r="40" fill="#E74C3C" opacity="0.7"/>
        
        <text x="${centerX}" y="${centerY + 20}" text-anchor="middle" 
              font-family="Georgia" font-size="20" fill="#2C3E50">
          ${message}
        </text>
        
        <text x="${centerX}" y="${centerY + 45}" text-anchor="middle" 
              font-family="Courier" font-size="12" fill="#666">
          Generando...
        </text>
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  /**
   * Gets comprehensive cache statistics
   *
   * Calculates performance metrics and usage patterns
   * for monitoring and optimization.
   *
   * @static
   * @returns {CacheStats} Current cache statistics
   *
   * Metrics:
   * - Hit rate percentage
   * - Memory usage estimation
   * - Age of oldest entry
   * - Most accessed key
   * - Total entry count
   */
  static getStats(): CacheStats {
    // const entries = Array.from(this.cache.values());
    const now = Date.now();

    let oldestTime = now;
    let mostAccessedKey = '';
    let maxAccess = 0;
    let totalMemory = 0;

    for (const [key, entry] of this.cache) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
      }

      if (entry.accessCount > maxAccess) {
        maxAccess = entry.accessCount;
        mostAccessedKey = key;
      }

      // Estimar uso de memoria (aproximado)
      totalMemory += JSON.stringify(entry).length * 2; // UTF-16
    }

    const totalRequests = this.hits + this.misses;
    const hitRate = totalRequests > 0 ? (this.hits / totalRequests) * 100 : 0;

    return {
      totalEntries: this.cache.size,
      hitRate: Math.round(hitRate * 100) / 100,
      memoryUsage: totalMemory,
      oldestEntry: now - oldestTime,
      mostAccessed: mostAccessedKey,
    };
  }

  /**
   * Removes expired cache entries
   *
   * Iterates through cache and removes entries older
   * than configured cache duration.
   *
   * @static
   * @returns {number} Number of entries removed
   *
   * Called automatically every 5 minutes in browser environment
   */
  static cleanExpired(): number {
    const now = Date.now();
    const expired: string[] = [];

    for (const [key, entry] of this.cache) {
      if (
        now - entry.timestamp >
        magazinePlaceholderConfig.performance.cacheDuration
      ) {
        expired.push(key);
      }
    }

    expired.forEach((key) => this.cache.delete(key));
    return expired.length;
  }

  /**
   * Clears entire cache and resets statistics
   *
   * Complete reset of cache system. Useful for:
   * - Memory management
   * - Testing
   * - Configuration changes
   *
   * @static
   * @returns {void}
   */
  static clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Sets maximum cache size
   *
   * Adjusts cache capacity and triggers eviction
   * if current size exceeds new limit.
   *
   * @static
   * @param {number} size - Maximum number of entries (minimum: 1)
   * @returns {void}
   *
   * Automatically evicts excess entries using LRU strategy
   */
  static setMaxSize(size: number): void {
    this.maxSize = Math.max(1, size);

    // Si el cache actual es más grande, eliminar entradas
    while (this.cache.size > this.maxSize) {
      this.evictOldest();
    }
  }

  /**
   * Exports cache data for debugging
   *
   * Creates sanitized snapshot of cache state without
   * exposing actual URLs or sensitive data.
   *
   * @static
   * @returns {Record<string, unknown>} Exported cache data
   *
   * Export includes:
   * - Overall statistics
   * - Entry metadata (no URLs)
   * - Access patterns
   * - Service distribution
   */
  static export(): Record<string, unknown> {
    const exported: Record<string, unknown> = {};

    for (const [key, entry] of this.cache) {
      exported[key] = {
        service: entry.placeholder.service,
        timestamp: new Date(entry.timestamp).toISOString(),
        accessCount: entry.accessCount,
        lastAccessed: new Date(entry.lastAccessed).toISOString(),
        hasUrl: entry.placeholder.url !== '',
        hasFallback:
          entry.placeholder.fallbackUrl != null &&
          entry.placeholder.fallbackUrl !== '',
      };
    }

    return {
      stats: this.getStats(),
      entries: exported,
    };
  }

  /**
   * Optimizes cache by removing duplicate URLs
   *
   * Consolidates entries with identical URLs, keeping
   * the most frequently accessed version.
   *
   * @static
   * @returns {number} Number of duplicates removed
   *
   * Algorithm:
   * 1. Group entries by URL
   * 2. Sort by access count
   * 3. Keep most accessed, remove others
   *
   * Called automatically every 30 minutes in browser
   */
  static optimize(): number {
    const urlToKeys = new Map<string, string[]>();

    // Agrupar por URL
    for (const [key, entry] of this.cache) {
      const { url } = entry.placeholder;
      if (!urlToKeys.has(url)) {
        urlToKeys.set(url, []);
      }
      const keys = urlToKeys.get(url);
      if (keys != null) {
        keys.push(key);
      }
    }

    let removedCount = 0;

    // Eliminar duplicados, conservando el más accedido
    for (const [_url, keys] of urlToKeys) {
      if (keys.length > 1) {
        // Ordenar por acceso (más accedido primero)
        keys.sort((a, b) => {
          const entryA = this.cache.get(a);
          const entryB = this.cache.get(b);
          if (entryA == null || entryB == null) return 0;
          return entryB.accessCount - entryA.accessCount;
        });

        // Eliminar duplicados (conservar el primero)
        for (let i = 1; i < keys.length; i++) {
          this.cache.delete(keys[i]);
          removedCount++;
        }
      }
    }

    return removedCount;
  }
}

/**
 * Automatic cache maintenance
 *
 * Sets up periodic cleanup tasks for browser environment.
 * Excludes test environments to prevent interference.
 *
 * Maintenance Schedule:
 * - Expired entry cleanup: Every 5 minutes
 * - Duplicate optimization: Every 30 minutes
 */
if (typeof window !== 'undefined' && !('__vitest_worker__' in globalThis)) {
  // Clean expired entries every 5 minutes
  setInterval(
    () => {
      MagazinePlaceholderCache.cleanExpired();
    },
    5 * 60 * 1000
  );

  // Optimize cache every 30 minutes
  setInterval(
    () => {
      MagazinePlaceholderCache.optimize();
    },
    30 * 60 * 1000
  );
}
