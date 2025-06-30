/**
 * @fileoverview General Utilities for Testigos de Solarpunk
 *
 * Collection of utility functions for common operations throughout the application.
 * Includes date formatting, text processing, SEO utilities, and browser helpers.
 *
 * @module lib/utils
 */

/**
 * Formats a date in readable Spanish format
 *
 * Uses Intl.DateTimeFormat with Mexican Spanish locale for consistent
 * date formatting across the application.
 *
 * @export
 * @param {Date | string} date - Date to format (Date object or ISO string)
 * @param {Intl.DateTimeFormatOptions} [options] - Additional format options
 * @returns {string} Formatted date in Spanish (e.g., "15 de marzo de 2024")
 *
 * @example
 * ```typescript
 * formatDate('2024-03-15') // "15 de marzo de 2024"
 * formatDate(new Date(), { weekday: 'long' }) // "viernes, 15 de marzo de 2024"
 * ```
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(dateObj);
}

/**
 * Converts text to URL-friendly slug
 *
 * Normalizes text by removing accents, converting to lowercase,
 * and replacing special characters with hyphens.
 *
 * @export
 * @param {string} text - Text to convert to slug
 * @returns {string} Normalized slug suitable for URLs
 *
 * @example
 * ```typescript
 * slugify('Hermana Panelia') // "hermana-panelia"
 * slugify('¡Energía Solar!') // "energia-solar"
 * ```
 *
 * Transformations:
 * 1. Convert to lowercase
 * 2. Normalize and remove accents (NFD decomposition)
 * 3. Replace non-alphanumeric characters with hyphens
 * 4. Remove leading/trailing hyphens
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9]+/g, '-') // Reemplazar caracteres especiales
    .replace(/^-+|-+$/g, ''); // Eliminar guiones al inicio/final
}

/**
 * Truncates text with ellipsis
 *
 * Safely truncates text to specified length, adding ellipsis if needed.
 * Trims whitespace before adding ellipsis for clean output.
 *
 * @export
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text with ellipsis if needed
 *
 * @example
 * ```typescript
 * truncateText('Long text here', 10) // "Long text..."
 * truncateText('Short', 10) // "Short"
 * ```
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Generates excerpt from Markdown content
 *
 * Strips Markdown syntax and frontmatter to create plain text excerpts
 * suitable for meta descriptions and preview text.
 *
 * @export
 * @param {string} content - Markdown content to process
 * @param {number} [maxLength=160] - Maximum excerpt length (SEO optimal)
 * @returns {string} Plain text excerpt truncated to maxLength
 *
 * @example
 * ```typescript
 * const markdown = '---\ntitle: Test\n---\n# Header\n**Bold** text with [link](url)';
 * generateExcerpt(markdown) // "Header Bold text with link..."
 * ```
 *
 * Removes:
 * - YAML frontmatter
 * - Headers (#)
 * - Bold/italic formatting
 * - Links (preserves text)
 * - Code blocks and inline code
 * - Multiple newlines
 */
export function generateExcerpt(content: string, maxLength = 160): string {
  // Eliminar frontmatter YAML
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---\n/, '');

  // Eliminar sintaxis Markdown básica
  const plainText = withoutFrontmatter
    .replace(/#{1,6}\s+/g, '') // Headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
    .replace(/\*([^*]+)\*/g, '$1') // Italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/`([^`]+)`/g, '$1') // Inline code
    .replace(/\n+/g, ' ') // Newlines
    .trim();

  return truncateText(plainText, maxLength);
}

/**
 * Capitalizes first letter of text
 *
 * Simple utility for consistent text capitalization.
 * Handles null/empty strings gracefully.
 *
 * @export
 * @param {string} text - Text to capitalize
 * @returns {string} Text with first letter uppercase, empty string if null/empty
 *
 * @example
 * ```typescript
 * capitalize('hello') // "Hello"
 * capitalize('') // ""
 * ```
 */
export function capitalize(text: string): string {
  if (text == null || text === '') return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Converts duration in seconds to MM:SS format
 *
 * Formats time duration for display in video/audio players.
 * Pads seconds with leading zero for consistent display.
 *
 * @export
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration as MM:SS
 *
 * @example
 * ```typescript
 * formatDuration(65) // "1:05"
 * formatDuration(3600) // "60:00"
 * ```
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Gets platform-specific icon emoji
 *
 * Returns appropriate emoji for social media platforms.
 * Falls back to globe emoji for unknown platforms.
 *
 * @export
 * @param {string} platform - Platform code
 * @returns {string} Platform emoji icon
 *
 * @example
 * ```typescript
 * getPlatformIcon('TT') // "📱" (TikTok)
 * getPlatformIcon('YT') // "📺" (YouTube)
 * getPlatformIcon('IG') // "📷" (Instagram)
 * getPlatformIcon('FB') // "👥" (Facebook)
 * getPlatformIcon('XX') // "🌐" (Unknown)
 * ```
 *
 * Platform Codes:
 * - TT: TikTok
 * - YT: YouTube
 * - IG: Instagram
 * - FB: Facebook
 */
export function getPlatformIcon(platform: string): string {
  const icons: Record<string, string> = {
    TT: '📱', // TikTok
    YT: '📺', // YouTube
    IG: '📷', // Instagram
    FB: '👥', // Facebook
  };
  return icons[platform] ?? '🌐';
}

/**
 * Generates consistent color from string
 *
 * Creates deterministic HSL color based on string hash.
 * Used for generating consistent colors for categories, tags, etc.
 *
 * @export
 * @param {string} str - String to generate color from
 * @returns {string} Color in HSL format
 *
 * @example
 * ```typescript
 * stringToColor('solar') // "hsl(123, 70%, 50%)"
 * stringToColor('solar') // "hsl(123, 70%, 50%)" (same input = same color)
 * ```
 *
 * Algorithm:
 * 1. Hash string to number
 * 2. Use hash for hue (0-360°)
 * 3. Fixed saturation (70%) for vibrancy
 * 4. Fixed lightness (50%) for balance
 */
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  // Usar colores MADFAM como base
  const saturation = 70; // Saturación vibrante
  const lightness = 50; // Brillo balanceado

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Sorts items by date (newest first)
 *
 * Generic sorting function for arrays of objects containing date fields.
 * Returns new sorted array without mutating original.
 *
 * @export
 * @template T - Object type with date field
 * @param {T[]} items - Array of items to sort
 * @param {string} [dateField='fecha_publicacion'] - Date field name to sort by
 * @returns {T[]} New array sorted by date descending
 *
 * @example
 * ```typescript
 * const posts = [
 *   { title: 'Old', fecha_publicacion: '2024-01-01' },
 *   { title: 'New', fecha_publicacion: '2024-03-01' }
 * ];
 * sortByDate(posts) // [{ title: 'New'... }, { title: 'Old'... }]
 * ```
 */
export function sortByDate<T extends Record<string, unknown>>(
  items: T[],
  dateField = 'fecha_publicacion'
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[dateField] as string);
    const dateB = new Date(b[dateField] as string);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Groups array items by property value
 *
 * Creates an object where keys are unique values of the specified property
 * and values are arrays of items with that property value.
 *
 * @export
 * @template T - Object type to group
 * @param {T[]} items - Array of items to group
 * @param {keyof T} key - Property key to group by
 * @returns {Record<string, T[]>} Object with grouped items
 *
 * @example
 * ```typescript
 * const items = [
 *   { name: 'A', category: 'solar' },
 *   { name: 'B', category: 'earth' },
 *   { name: 'C', category: 'solar' }
 * ];
 * groupBy(items, 'category')
 * // { solar: [{name: 'A'...}, {name: 'C'...}], earth: [{name: 'B'...}] }
 * ```
 */
export function groupBy<T extends Record<string, unknown>>(
  items: T[],
  key: keyof T
): Record<string, T[]> {
  return items.reduce(
    (groups, item) => {
      const group = String(item[key]);
      if (groups[group] == null) {
        groups[group] = [];
      }
      groups[group].push(item);
      return groups;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Generates comprehensive SEO metadata for pages
 *
 * Creates structured metadata object for Open Graph and Twitter cards.
 * Ensures consistent SEO across the site with proper fallbacks.
 *
 * @export
 * @param {Object} options - SEO metadata options
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} [options.image] - Social media image URL
 * @param {string} options.url - Canonical page URL
 * @param {string} [options.type='website'] - Open Graph type
 * @returns {Object} Formatted metadata object
 *
 * @example
 * ```typescript
 * generateSEOMeta({
 *   title: 'Hermana Panelia',
 *   description: 'Conoce a la evangelista solar',
 *   url: 'https://example.com/personajes/hermana-panelia'
 * })
 * ```
 *
 * Returns object with:
 * - title: Full title with site name
 * - description: Truncated to 160 chars
 * - canonical: Canonical URL
 * - openGraph: Open Graph metadata
 * - twitter: Twitter card metadata
 */
export function generateSEOMeta({
  title,
  description,
  image,
  url,
  type = 'website',
}: {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: string;
}): {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
} {
  const siteName = 'Testigos de Solarpunk';
  const defaultImage = '/og-image.jpg';

  return {
    title: `${title} | ${siteName}`,
    description: truncateText(description, 160),
    canonical: url,
    openGraph: {
      title,
      description,
      image: image != null && image !== '' ? image : defaultImage,
      url,
      type,
      siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: image != null && image !== '' ? image : defaultImage,
    },
  };
}

/**
 * Debounce utility for optimizing function calls
 *
 * Delays function execution until after wait milliseconds have elapsed
 * since the last time the debounced function was invoked.
 *
 * @export
 * @template T - Function type to debounce
 * @param {T} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {(...args: Parameters<T>) => void} Debounced function
 *
 * @example
 * ```typescript
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Searching:', query);
 * }, 300);
 *
 * // Rapid calls
 * debouncedSearch('h');
 * debouncedSearch('he');
 * debouncedSearch('hello'); // Only this executes after 300ms
 * ```
 *
 * Common use cases:
 * - Search input handlers
 * - Window resize listeners
 * - Scroll event handlers
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>): void {
    const later = (): void => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Checks if code is running in browser environment
 *
 * Useful for SSR/SSG environments to prevent window access errors.
 * Returns false during build time and server-side rendering.
 *
 * @export
 * @returns {boolean} True if running in browser, false if server/build
 *
 * @example
 * ```typescript
 * if (isBrowser()) {
 *   // Safe to use window, document, etc.
 *   window.localStorage.setItem('key', 'value');
 * }
 * ```
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Safely gets URL query parameter
 *
 * Retrieves query parameter value with SSR safety check.
 * Returns null if not in browser or parameter not found.
 *
 * @export
 * @param {string} param - Parameter name to retrieve
 * @returns {string | null} Parameter value or null
 *
 * @example
 * ```typescript
 * // URL: https://example.com?ref=social&campaign=spring
 * getURLParam('ref') // "social"
 * getURLParam('missing') // null
 * ```
 */
export function getURLParam(param: string): string | null {
  if (!isBrowser()) return null;

  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

/**
 * Lazy loads image with optional placeholder
 *
 * Preloads image in background and optionally shows placeholder
 * while loading. Useful for performance optimization.
 *
 * @export
 * @param {string} src - Image source URL
 * @param {string} [placeholder] - Optional placeholder image URL
 * @returns {Promise<HTMLImageElement>} Promise resolving to loaded image element
 *
 * @example
 * ```typescript
 * // With placeholder
 * const img = await lazyLoadImage(
 *   '/high-res.jpg',
 *   '/low-res-placeholder.jpg'
 * );
 *
 * // Without placeholder
 * lazyLoadImage('/image.jpg')
 *   .then(img => document.body.appendChild(img))
 *   .catch(err => console.error('Image failed to load'));
 * ```
 *
 * Implementation:
 * 1. Creates new Image element
 * 2. Shows placeholder immediately if provided
 * 3. Loads actual image in background
 * 4. Resolves when image is fully loaded
 */
export function lazyLoadImage(
  src: string,
  placeholder?: string
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = reject;

    // Si hay placeholder, usarlo mientras carga
    if (placeholder != null && placeholder !== '') {
      img.src = placeholder;
      // Cargar imagen real después
      setTimeout(() => {
        img.src = src;
      }, 0);
    } else {
      img.src = src;
    }
  });
}
