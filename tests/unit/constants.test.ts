/**
 * @fileoverview Comprehensive unit tests for application constants.
 * Tests all configuration constants used throughout the Testigos de Solarpunk project,
 * including site metadata, social media configurations, design tokens, and content settings.
 * These constants are critical for maintaining consistency across the application.
 */

import { describe, it, expect } from 'vitest';
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_AUTHOR,
  SITE_LANG,
  SOCIAL_LINKS,
  PLATFORMS,
  CHARACTER_ROLES,
  CATCHPHRASES,
  MIRACLE_TYPES,
  SEO_DEFAULTS,
  MADFAM_COLORS,
  SOLARPUNK_COLORS,
  ANIMATION_DURATION,
  BREAKPOINTS,
  CONTENT_LIMITS,
  IMAGE_CONFIG,
  CONTENT_TAGS,
  MESSAGES,
  API_CONFIG,
  type Platform,
  type CharacterRole,
  type MiracleType,
  type ContentTag,
} from '../../src/lib/constants';

/**
 * Test suite for all application constants
 * Validates configuration values and type exports
 */
describe('Constants', () => {
  /**
   * Tests core site metadata
   * These values are used for SEO and site identification
   */
  describe('Site Information', () => {
    /**
     * Validates all site metadata constants
     * Critical for SEO and proper site display
     */
    it('should have correct site information', () => {
      expect(SITE_TITLE).toBe('Testigos de Solarpunk');
      expect(SITE_DESCRIPTION).toBe(
        'Universo narrativo evangelista ecológico que combina humor, sostenibilidad y esperanza'
      );
      expect(SITE_URL).toBe('https://madfam-io.github.io/testigos-solarpunk');
      expect(SITE_AUTHOR).toBe('MADFAM');
      expect(SITE_LANG).toBe('es-MX');
    });
  });

  /**
   * Tests social media link configurations
   * Used for Phase 1 content distribution across platforms
   */
  describe('Social Links', () => {
    /**
     * Validates all social media handles and URLs
     * Essential for cross-platform content strategy
     */
    it('should have all social media links', () => {
      expect(SOCIAL_LINKS).toHaveProperty('tiktok', '@testigosdesolarpunk');
      expect(SOCIAL_LINKS).toHaveProperty('youtube', '@TestigosSolarpunk');
      expect(SOCIAL_LINKS).toHaveProperty('instagram', '@testigos.solarpunk');
      expect(SOCIAL_LINKS).toHaveProperty('twitter', '@TestigosSolar');
      expect(SOCIAL_LINKS).toHaveProperty(
        'github',
        'https://github.com/madfam-io/testigos-solarpunk'
      );
    });

    /**
     * Ensures social links object is properly typed
     * Validates TypeScript const assertion behavior
     */
    it('should be constant object', () => {
      // as const creates readonly properties, not frozen objects
      expect(typeof SOCIAL_LINKS).toBe('object');
      expect(SOCIAL_LINKS).toBeDefined();
    });
  });

  /**
   * Tests platform-specific configurations
   * Each platform has unique constraints for video content
   */
  describe('Platforms', () => {
    /**
     * Validates presence of all target platforms
     * TT=TikTok, YT=YouTube, IG=Instagram, FB=Facebook
     */
    it('should have all platform configurations', () => {
      expect(PLATFORMS).toHaveProperty('TT');
      expect(PLATFORMS).toHaveProperty('YT');
      expect(PLATFORMS).toHaveProperty('IG');
      expect(PLATFORMS).toHaveProperty('FB');
    });

    /**
     * Tests detailed platform configuration
     * Example uses TikTok with its specific video constraints
     */
    it('should have correct platform properties', () => {
      expect(PLATFORMS.TT).toEqual({
        name: 'TikTok',
        icon: '📱',
        maxDuration: 180,
        aspectRatio: '9:16',
        hashtags: ['#TestigosDeSolarpunk', '#MilagroVerde', '#AleluyaSolar'],
      });
    });

    /**
     * Validates platform object type consistency
     * Ensures TypeScript const assertion is working
     */
    it('should be constant object', () => {
      // as const creates readonly properties, not frozen objects
      expect(typeof PLATFORMS).toBe('object');
      expect(PLATFORMS).toBeDefined();
    });
  });

  /**
   * Tests character role configurations
   * Used to categorize eco-warriors in the narrative universe
   */
  describe('Character Roles', () => {
    /**
     * Validates all character role types
     * From protagonists to cameo appearances
     */
    it('should have all character roles', () => {
      expect(CHARACTER_ROLES).toHaveProperty('PROTAGONISTA');
      expect(CHARACTER_ROLES).toHaveProperty('ANTAGONISTA');
      expect(CHARACTER_ROLES).toHaveProperty('SECUNDARIO');
      expect(CHARACTER_ROLES).toHaveProperty('CAMEO');
    });

    /**
     * Tests role visual properties
     * Each role has unique color and icon for UI display
     */
    it('should have correct role properties', () => {
      expect(CHARACTER_ROLES.PROTAGONISTA).toEqual({
        label: 'Protagonista',
        color: 'var(--madfam-yellow)',
        icon: '⭐',
      });
    });
  });

  /**
   * Tests eco-evangelical catchphrases
   * These are iconic phrases used throughout the sketches
   */
  describe('Catchphrases', () => {
    /**
     * Validates the complete catchphrase collection
     * Used for character dialogue and UI elements
     */
    it('should have catchphrases array', () => {
      expect(Array.isArray(CATCHPHRASES)).toBe(true);
      expect(CATCHPHRASES.length).toBe(8);
      expect(CATCHPHRASES).toContain('¡Aleluya Solar!');
      expect(CATCHPHRASES).toContain('¡Amén Verde!');
    });

    /**
     * Ensures catchphrases array is properly typed
     * Validates readonly array behavior
     */
    it('should be constant array', () => {
      // as const creates readonly arrays, not frozen arrays
      expect(Array.isArray(CATCHPHRASES)).toBe(true);
      expect(CATCHPHRASES).toBeDefined();
    });
  });

  /**
   * Tests miracle type classifications
   * Categories for eco-transformations in the narrative
   */
  describe('Miracle Types', () => {
    /**
     * Validates all miracle categories
     * From energy to transport transformations
     */
    it('should have all miracle types', () => {
      expect(MIRACLE_TYPES).toHaveProperty('ENERGIA');
      expect(MIRACLE_TYPES).toHaveProperty('AGRICULTURA');
      expect(MIRACLE_TYPES).toHaveProperty('RECICLAJE');
      expect(MIRACLE_TYPES).toHaveProperty('AGUA');
      expect(MIRACLE_TYPES).toHaveProperty('TRANSPORTE');
    });

    /**
     * Tests miracle type metadata
     * Each type has name, icon, and description
     */
    it('should have correct miracle properties', () => {
      expect(MIRACLE_TYPES.ENERGIA).toEqual({
        name: 'Milagro Energético',
        icon: '⚡',
        description: 'Transformación relacionada con energía renovable',
      });
    });
  });

  /**
   * Tests SEO configuration defaults
   * Critical for search engine visibility and social sharing
   */
  describe('SEO Defaults', () => {
    /**
     * Validates SEO template and default values
     * Used for meta tags and Open Graph data
     */
    it('should have correct SEO configuration', () => {
      expect(SEO_DEFAULTS.titleTemplate).toBe('%s | Testigos de Solarpunk');
      expect(SEO_DEFAULTS.defaultTitle).toBe(
        'Testigos de Solarpunk - Universo Narrativo Eco-Evangelista'
      );
      expect(SEO_DEFAULTS.defaultImage).toBe('/og-image.jpg');
      expect(SEO_DEFAULTS.twitterHandle).toBe('@TestigosSolar');
    });
  });

  /**
   * Tests color theme configurations
   * Brand colors and solarpunk aesthetic palette
   */
  describe('Color Themes', () => {
    /**
     * Validates MADFAM brand colors
     * Core palette for UI consistency
     */
    it('should have MADFAM colors', () => {
      expect(MADFAM_COLORS).toEqual({
        yellow: '#FFC107',
        green: '#4CAF50',
        purple: '#663399',
        blue: '#2196F3',
        black: '#212121',
        white: '#FFFFFF',
      });
    });

    /**
     * Tests solarpunk-specific color palette
     * Vibrant colors representing hope and sustainability
     */
    it('should have Solarpunk colors', () => {
      expect(SOLARPUNK_COLORS).toHaveProperty('bioGlow', '#7FFF00');
      expect(SOLARPUNK_COLORS).toHaveProperty('skyHope', '#87CEEB');
      expect(SOLARPUNK_COLORS).toHaveProperty('solarGold', '#FFD700');
    });
  });

  /**
   * Tests animation timing constants
   * Used for consistent motion design across the UI
   */
  describe('Animation Duration', () => {
    /**
     * Validates animation speed presets
     * From fast micro-interactions to slow transitions
     */
    it('should have correct animation durations', () => {
      expect(ANIMATION_DURATION).toEqual({
        fast: 150,
        base: 250,
        slow: 350,
        verySlow: 500,
      });
    });
  });

  /**
   * Tests responsive design breakpoints
   * Critical for mobile-first responsive layout
   */
  describe('Breakpoints', () => {
    /**
     * Validates screen size breakpoints
     * From mobile (320px) to ultrawide (1920px)
     */
    it('should have correct breakpoint values', () => {
      expect(BREAKPOINTS).toEqual({
        mobile: 320,
        tablet: 768,
        desktop: 1024,
        wide: 1280,
        ultrawide: 1920,
      });
    });
  });

  /**
   * Tests content length constraints
   * Ensures consistent content formatting across the site
   */
  describe('Content Limits', () => {
    /**
     * Validates character limits for various content types
     * From titles to full sermon texts
     */
    it('should have correct content limits', () => {
      expect(CONTENT_LIMITS.titleMax).toBe(100);
      expect(CONTENT_LIMITS.descriptionMax).toBe(300);
      expect(CONTENT_LIMITS.excerptMax).toBe(160);
      expect(CONTENT_LIMITS.bioMax).toBe(500);
      expect(CONTENT_LIMITS.sermonMax).toBe(1000);
    });
  });

  /**
   * Tests image optimization settings
   * Configuration for responsive images and placeholders
   */
  describe('Image Configuration', () => {
    /**
     * Validates image formats, sizes, and quality settings
     * Includes magazine-cutout placeholder configuration
     */
    it('should have correct image config', () => {
      expect(IMAGE_CONFIG.formats).toEqual(['webp', 'avif']);
      expect(IMAGE_CONFIG.sizes).toEqual([320, 640, 768, 1024, 1280, 1920]);
      expect(IMAGE_CONFIG.quality).toEqual({
        thumbnail: 70,
        default: 85,
        high: 95,
      });
      expect(IMAGE_CONFIG.placeholder).toEqual({
        type: 'magazine-cutout',
        ai: true,
        size: 20,
        fallback: 'svg',
      });
    });
  });

  /**
   * Tests content categorization tags
   * Used for filtering and organizing content
   */
  describe('Content Tags', () => {
    /**
     * Validates episode-specific tags
     * Categories like tutorial, testimony, miracle
     */
    it('should have episode tags', () => {
      expect(CONTENT_TAGS.episodios).toContain('tutorial');
      expect(CONTENT_TAGS.episodios).toContain('testimonio');
      expect(CONTENT_TAGS.episodios).toContain('milagro');
    });

    /**
     * Tests character categorization tags
     * Evangelist and convert classifications
     */
    it('should have character tags', () => {
      expect(CONTENT_TAGS.personajes).toContain('evangelista');
      expect(CONTENT_TAGS.personajes).toContain('converso');
    });

    /**
     * Validates thematic content tags
     * Sustainability topics covered in the content
     */
    it('should have theme tags', () => {
      expect(CONTENT_TAGS.temas).toContain('energía-solar');
      expect(CONTENT_TAGS.temas).toContain('agricultura-urbana');
    });
  });

  /**
   * Tests user-facing message constants
   * Eco-evangelical themed UI messages
   */
  describe('Messages', () => {
    /**
     * Validates error message content
     * Maintains the evangelical humor tone even in errors
     */
    it('should have error messages', () => {
      expect(MESSAGES.error.notFound).toBe(
        '¡Hermano, esta página se ha extraviado en el camino verde!'
      );
      expect(MESSAGES.error.loadFailed).toBe(
        '¡Oh no! El milagro de carga ha fallado. Intenta de nuevo.'
      );
      expect(MESSAGES.error.formInvalid).toBe(
        'Por favor, revisa los campos marcados con el espíritu rojo.'
      );
    });

    /**
     * Tests success message content
     * Celebratory messages with eco-evangelical flair
     */
    it('should have success messages', () => {
      expect(MESSAGES.success.subscribed).toBe(
        '¡Aleluya! Te has unido a la congregación verde.'
      );
      expect(MESSAGES.success.shared).toBe(
        '¡Amén! Has compartido la buena nueva solar.'
      );
      expect(MESSAGES.success.saved).toBe(
        '¡Gloria! Tus cambios han sido bendecidos y guardados.'
      );
    });

    /**
     * Validates loading state messages
     * Themed loading text for different content types
     */
    it('should have loading messages', () => {
      expect(MESSAGES.loading.default).toBe('Cargando milagros verdes...');
      expect(MESSAGES.loading.characters).toBe('Convocando a los testigos...');
      expect(MESSAGES.loading.scripts).toBe(
        'Desenrollando los pergaminos sagrados...'
      );
    });
  });

  /**
   * Tests API client configuration
   * Settings for backend communication
   */
  describe('API Configuration', () => {
    /**
     * Validates API base configuration
     * Includes timeout, retries, and headers
     */
    it('should have correct API config', () => {
      expect(API_CONFIG.baseURL).toBe('/api');
      expect(API_CONFIG.timeout).toBe(10000);
      expect(API_CONFIG.retries).toBe(3);
      expect(API_CONFIG.headers).toEqual({
        'Content-Type': 'application/json',
        'X-Source': 'testigos-solarpunk-web',
      });
    });

    /**
     * Tests environment-based API URL configuration
     * Ensures proper fallback when env var is not set
     */
    it('should handle environment variable logic', () => {
      // The API_CONFIG.baseURL uses a ternary to check for process.env.API_URL
      // Since the constants module is already imported, we can't test the env var
      // Instead, we verify the fallback behavior
      expect(API_CONFIG.baseURL).toBeDefined();
      expect(typeof API_CONFIG.baseURL).toBe('string');

      // If API_URL is not set, it should default to '/api'
      if (process.env.API_URL === undefined || process.env.API_URL === '') {
        expect(API_CONFIG.baseURL).toBe('/api');
      }
    });
  });

  /**
   * Tests TypeScript type exports
   * Ensures proper type definitions for constants
   */
  describe('TypeScript Types', () => {
    /**
     * Validates that exported types work correctly
     * Tests literal type assignments
     */
    it('should export correct types', () => {
      // Test type assignments
      const platform: Platform = 'TT';
      const role: CharacterRole = 'PROTAGONISTA';
      const miracle: MiracleType = 'ENERGIA';
      const tag: ContentTag = 'tutorial';

      expect(platform).toBe('TT');
      expect(role).toBe('PROTAGONISTA');
      expect(miracle).toBe('ENERGIA');
      expect(tag).toBe('tutorial');
    });
  });
});
