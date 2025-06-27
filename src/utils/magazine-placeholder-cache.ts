/**
 * Sistema de Cache para Placeholders Magazine Cutout
 * Testigos de Solarpunk - MADFAM
 *
 * Maneja el cache de placeholders AI y optimización de rendimiento
 */

import { magazinePlaceholderConfig } from '../config/magazine-placeholders.config';
import type { GeneratedPlaceholder } from '../services/MagazineCutoutPlaceholderService';

interface CacheEntry {
  placeholder: GeneratedPlaceholder;
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
}

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
   * Obtiene un placeholder del cache
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
   * Almacena un placeholder en el cache
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
   * Elimina entradas más antiguas cuando el cache está lleno
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
   * Precargar placeholders comunes
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
          console.warn(`Failed to preload ${config.key}:`, error);
        }
      }
    }
  }

  /**
   * Genera SVG por defecto para preload
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
   * Obtener estadísticas del cache
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
   * Limpiar cache expirado
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
   * Limpiar todo el cache
   */
  static clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Configurar tamaño máximo del cache
   */
  static setMaxSize(size: number): void {
    this.maxSize = Math.max(1, size);

    // Si el cache actual es más grande, eliminar entradas
    while (this.cache.size > this.maxSize) {
      this.evictOldest();
    }
  }

  /**
   * Exportar cache para debugging
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
   * Optimizar cache eliminando duplicados
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

// Auto-limpieza periódica
if (typeof window !== 'undefined') {
  // Limpiar cache expirado cada 5 minutos
  setInterval(
    () => {
      MagazinePlaceholderCache.cleanExpired();
    },
    5 * 60 * 1000
  );

  // Optimizar cache cada 30 minutos
  setInterval(
    () => {
      MagazinePlaceholderCache.optimize();
    },
    30 * 60 * 1000
  );
}
