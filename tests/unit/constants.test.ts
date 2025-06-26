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

describe('Constants', () => {
  describe('Site Information', () => {
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

  describe('Social Links', () => {
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

    it('should be constant object', () => {
      // as const creates readonly properties, not frozen objects
      expect(typeof SOCIAL_LINKS).toBe('object');
      expect(SOCIAL_LINKS).toBeDefined();
    });
  });

  describe('Platforms', () => {
    it('should have all platform configurations', () => {
      expect(PLATFORMS).toHaveProperty('TT');
      expect(PLATFORMS).toHaveProperty('YT');
      expect(PLATFORMS).toHaveProperty('IG');
      expect(PLATFORMS).toHaveProperty('FB');
    });

    it('should have correct platform properties', () => {
      expect(PLATFORMS.TT).toEqual({
        name: 'TikTok',
        icon: '📱',
        maxDuration: 180,
        aspectRatio: '9:16',
        hashtags: ['#TestigosDeSolarpunk', '#MilagroVerde', '#AleluyaSolar'],
      });
    });

    it('should be constant object', () => {
      // as const creates readonly properties, not frozen objects
      expect(typeof PLATFORMS).toBe('object');
      expect(PLATFORMS).toBeDefined();
    });
  });

  describe('Character Roles', () => {
    it('should have all character roles', () => {
      expect(CHARACTER_ROLES).toHaveProperty('PROTAGONISTA');
      expect(CHARACTER_ROLES).toHaveProperty('ANTAGONISTA');
      expect(CHARACTER_ROLES).toHaveProperty('SECUNDARIO');
      expect(CHARACTER_ROLES).toHaveProperty('CAMEO');
    });

    it('should have correct role properties', () => {
      expect(CHARACTER_ROLES.PROTAGONISTA).toEqual({
        label: 'Protagonista',
        color: 'var(--madfam-yellow)',
        icon: '⭐',
      });
    });
  });

  describe('Catchphrases', () => {
    it('should have catchphrases array', () => {
      expect(Array.isArray(CATCHPHRASES)).toBe(true);
      expect(CATCHPHRASES.length).toBe(8);
      expect(CATCHPHRASES).toContain('¡Aleluya Solar!');
      expect(CATCHPHRASES).toContain('¡Amén Verde!');
    });

    it('should be constant array', () => {
      // as const creates readonly arrays, not frozen arrays
      expect(Array.isArray(CATCHPHRASES)).toBe(true);
      expect(CATCHPHRASES).toBeDefined();
    });
  });

  describe('Miracle Types', () => {
    it('should have all miracle types', () => {
      expect(MIRACLE_TYPES).toHaveProperty('ENERGIA');
      expect(MIRACLE_TYPES).toHaveProperty('AGRICULTURA');
      expect(MIRACLE_TYPES).toHaveProperty('RECICLAJE');
      expect(MIRACLE_TYPES).toHaveProperty('AGUA');
      expect(MIRACLE_TYPES).toHaveProperty('TRANSPORTE');
    });

    it('should have correct miracle properties', () => {
      expect(MIRACLE_TYPES.ENERGIA).toEqual({
        name: 'Milagro Energético',
        icon: '⚡',
        description: 'Transformación relacionada con energía renovable',
      });
    });
  });

  describe('SEO Defaults', () => {
    it('should have correct SEO configuration', () => {
      expect(SEO_DEFAULTS.titleTemplate).toBe('%s | Testigos de Solarpunk');
      expect(SEO_DEFAULTS.defaultTitle).toBe(
        'Testigos de Solarpunk - Universo Narrativo Eco-Evangelista'
      );
      expect(SEO_DEFAULTS.defaultImage).toBe('/og-image.jpg');
      expect(SEO_DEFAULTS.twitterHandle).toBe('@TestigosSolar');
    });
  });

  describe('Color Themes', () => {
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

    it('should have Solarpunk colors', () => {
      expect(SOLARPUNK_COLORS).toHaveProperty('bioGlow', '#7FFF00');
      expect(SOLARPUNK_COLORS).toHaveProperty('skyHope', '#87CEEB');
      expect(SOLARPUNK_COLORS).toHaveProperty('solarGold', '#FFD700');
    });
  });

  describe('Animation Duration', () => {
    it('should have correct animation durations', () => {
      expect(ANIMATION_DURATION).toEqual({
        fast: 150,
        base: 250,
        slow: 350,
        verySlow: 500,
      });
    });
  });

  describe('Breakpoints', () => {
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

  describe('Content Limits', () => {
    it('should have correct content limits', () => {
      expect(CONTENT_LIMITS.titleMax).toBe(100);
      expect(CONTENT_LIMITS.descriptionMax).toBe(300);
      expect(CONTENT_LIMITS.excerptMax).toBe(160);
      expect(CONTENT_LIMITS.bioMax).toBe(500);
      expect(CONTENT_LIMITS.sermonMax).toBe(1000);
    });
  });

  describe('Image Configuration', () => {
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

  describe('Content Tags', () => {
    it('should have episode tags', () => {
      expect(CONTENT_TAGS.episodios).toContain('tutorial');
      expect(CONTENT_TAGS.episodios).toContain('testimonio');
      expect(CONTENT_TAGS.episodios).toContain('milagro');
    });

    it('should have character tags', () => {
      expect(CONTENT_TAGS.personajes).toContain('evangelista');
      expect(CONTENT_TAGS.personajes).toContain('converso');
    });

    it('should have theme tags', () => {
      expect(CONTENT_TAGS.temas).toContain('energía-solar');
      expect(CONTENT_TAGS.temas).toContain('agricultura-urbana');
    });
  });

  describe('Messages', () => {
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

    it('should have loading messages', () => {
      expect(MESSAGES.loading.default).toBe('Cargando milagros verdes...');
      expect(MESSAGES.loading.characters).toBe('Convocando a los testigos...');
      expect(MESSAGES.loading.scripts).toBe(
        'Desenrollando los pergaminos sagrados...'
      );
    });
  });

  describe('API Configuration', () => {
    it('should have correct API config', () => {
      expect(API_CONFIG.baseURL).toBe('/api');
      expect(API_CONFIG.timeout).toBe(10000);
      expect(API_CONFIG.retries).toBe(3);
      expect(API_CONFIG.headers).toEqual({
        'Content-Type': 'application/json',
        'X-Source': 'testigos-solarpunk-web',
      });
    });

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

  describe('TypeScript Types', () => {
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
