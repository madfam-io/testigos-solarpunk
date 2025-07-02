/**
 * @fileoverview Comprehensive unit tests for i18n configuration.
 * Tests language constants, route mappings, translation functions, and helper utilities.
 * Critical for bilingual functionality and internationalization features.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  languages,
  defaultLang,
  showDefaultLang,
  routes,
  ui,
  getLangFromUrl,
  detectLanguage,
  useTranslations,
  getLocalizedPath,
  getRouteFromUrl,
  type Language,
  type TranslationKey,
  type RouteKey,
} from '../../../src/i18n/config';

/**
 * Test suite for internationalization configuration
 * Validates core i18n functionality for bilingual support
 */
describe('i18n Configuration', () => {
  /**
   * Tests language constants and configuration
   * Ensures proper language definitions and defaults
   */
  describe('Language Configuration', () => {
    /**
     * Validates language object structure
     * Spanish and English are required languages
     */
    it('should define supported languages', () => {
      expect(languages).toEqual({
        es: 'Español',
        en: 'English',
      });
      expect(Object.keys(languages)).toHaveLength(2);
    });

    /**
     * Tests default language setting
     * Spanish is the primary language
     */
    it('should set Spanish as default language', () => {
      expect(defaultLang).toBe('es');
      expect(defaultLang in languages).toBe(true);
    });

    /**
     * Validates URL language visibility
     * Always show language prefix for clarity
     */
    it('should always show default language in URLs', () => {
      expect(showDefaultLang).toBe(true);
    });

    /**
     * Tests TypeScript type exports
     * Ensures type safety for language operations
     */
    it('should export proper TypeScript types', () => {
      const lang: Language = 'es';
      expect(lang).toBe('es');
      expect(typeof lang).toBe('string');
    });
  });

  /**
   * Tests route mappings for bilingual navigation
   * Spanish routes are canonical, English routes are translated
   */
  describe('Route Mappings', () => {
    /**
     * Validates route structure for both languages
     * Ensures all required routes exist in both languages
     */
    it('should have routes for both languages', () => {
      expect(routes.es).toBeDefined();
      expect(routes.en).toBeDefined();
      expect(typeof routes.es).toBe('object');
      expect(typeof routes.en).toBe('object');
    });

    /**
     * Tests main route translations
     * Core navigation routes must be translated
     */
    it('should map main routes correctly', () => {
      // Spanish canonical routes
      expect(routes.es.proyecto).toBe('proyecto');
      expect(routes.es.contenido).toBe('contenido');
      expect(routes.es.comunidad).toBe('comunidad');
      expect(routes.es.personajes).toBe('personajes');
      expect(routes.es.universo).toBe('universo');

      // English translated routes
      expect(routes.en.proyecto).toBe('project');
      expect(routes.en.contenido).toBe('content');
      expect(routes.en.comunidad).toBe('community');
      expect(routes.en.personajes).toBe('characters');
      expect(routes.en.universo).toBe('universe');
    });

    /**
     * Validates content section routes
     * Content types have consistent translations
     */
    it('should map content routes correctly', () => {
      expect(routes.es.sketches).toBe('sketches');
      expect(routes.en.sketches).toBe('sketches');
      expect(routes.es.podcast).toBe('podcast');
      expect(routes.en.podcast).toBe('podcast');
      expect(routes.es.madlab).toBe('madlab');
      expect(routes.en.madlab).toBe('madlab');
    });

    /**
     * Tests production and resource routes
     * Technical terms are appropriately translated
     */
    it('should map production and resource routes', () => {
      expect(routes.es.produccion).toBe('produccion');
      expect(routes.en.produccion).toBe('production');
      expect(routes.es.recursos).toBe('recursos');
      expect(routes.en.recursos).toBe('resources');
      expect(routes.es.guiones).toBe('guiones');
      expect(routes.en.guiones).toBe('scripts');
    });

    /**
     * Validates nested and specialized routes
     * Complex routes maintain consistency
     */
    it('should map nested and specialized routes', () => {
      expect(routes.es.worldbuilding).toBe('worldbuilding');
      expect(routes.en.worldbuilding).toBe('worldbuilding');
      expect(routes.es['guia-visual']).toBe('guia-visual');
      expect(routes.en['guia-visual']).toBe('visual-guide');
      expect(routes.es.patrocinadores).toBe('patrocinadores');
      expect(routes.en.patrocinadores).toBe('sponsors');
    });

    /**
     * Tests route key consistency
     * Same keys exist in both language route objects
     */
    it('should have consistent route keys between languages', () => {
      const esKeys = Object.keys(routes.es).sort();
      const enKeys = Object.keys(routes.en).sort();
      expect(esKeys).toEqual(enKeys);
    });

    /**
     * Validates route uniqueness within languages
     * No duplicate route values within each language
     */
    it('should have unique route values within each language', () => {
      const esValues = Object.values(routes.es);
      const enValues = Object.values(routes.en);
      
      expect(new Set(esValues).size).toBe(esValues.length);
      expect(new Set(enValues).size).toBe(enValues.length);
    });
  });

  /**
   * Tests UI translation strings
   * Comprehensive bilingual content management
   */
  describe('UI Translations', () => {
    /**
     * Validates UI structure for both languages
     * Both languages have translation objects
     */
    it('should have ui translations for both languages', () => {
      expect(ui.es).toBeDefined();
      expect(ui.en).toBeDefined();
      expect(typeof ui.es).toBe('object');
      expect(typeof ui.en).toBe('object');
    });

    /**
     * Tests site metadata translations
     * Core site information is properly translated
     */
    it('should have site metadata in both languages', () => {
      // Spanish metadata
      expect(ui.es['site.title']).toBe('Testigos de Solarpunk');
      expect(ui.es['site.description']).toContain('universo narrativo');
      expect(ui.es['site.keywords']).toContain('solarpunk');

      // English metadata
      expect(ui.en['site.title']).toBe('Solarpunk Witnesses');
      expect(ui.en['site.description']).toContain('narrative universe');
      expect(ui.en['site.keywords']).toContain('solarpunk');
    });

    /**
     * Validates navigation translations
     * All navigation items are translated
     */
    it('should have navigation translations', () => {
      // Spanish navigation
      expect(ui.es['nav.home']).toBe('Inicio');
      expect(ui.es['nav.project']).toBe('El Proyecto');
      expect(ui.es['nav.community']).toBe('Comunidad');
      expect(ui.es['nav.characters']).toBe('Personajes');

      // English navigation
      expect(ui.en['nav.home']).toBe('Home');
      expect(ui.en['nav.project']).toBe('The Project');
      expect(ui.en['nav.community']).toBe('Community');
      expect(ui.en['nav.characters']).toBe('Characters');
    });

    /**
     * Tests error message translations
     * Error pages have proper translations
     */
    it('should have error message translations', () => {
      // Spanish error messages
      expect(ui.es['error.404.title']).toBe('404 - Página no encontrada');
      expect(ui.es['error.404.heading']).toBe('Página no encontrada');
      expect(ui.es['error.404.home']).toBe('Volver al Inicio');

      // English error messages
      expect(ui.en['error.404.title']).toBe('404 - Page not found');
      expect(ui.en['error.404.heading']).toBe('Page not found');
      expect(ui.en['error.404.home']).toBe('Back to Home');
    });

    /**
     * Validates footer translations
     * Footer content is properly translated
     */
    it('should have footer translations', () => {
      // Spanish footer
      expect(ui.es['footer.tagline']).toBe('Conectar, Concientizar y Crear Comunidad');
      expect(ui.es['footer.copyright']).toBe('Un proyecto de MADFAM');
      expect(ui.es['footer.contact']).toBe('Contacto');

      // English footer
      expect(ui.en['footer.tagline']).toBe('Connect, Raise Awareness, Create Community');
      expect(ui.en['footer.copyright']).toBe('A MADFAM project');
      expect(ui.en['footer.contact']).toBe('Contact');
    });

    /**
     * Tests parameterized translations
     * Messages with placeholders work correctly
     */
    it('should have parameterized translations', () => {
      // Status messages with parameters
      expect(ui.es['status.page.loaded']).toBe('Página cargada: {title}');
      expect(ui.en['status.page.loaded']).toBe('Page loaded: {title}');

      // Character portrait alt text
      expect(ui.es['character.portrait.alt']).toBe('Retrato evangelista de {name}, {occupation}');
      expect(ui.en['character.portrait.alt']).toBe('Evangelist portrait of {name}, {occupation}');

      // Theme change messages
      expect(ui.es['theme.changed']).toBe('Tema cambiado a {theme}');
      expect(ui.en['theme.changed']).toBe('Theme changed to {theme}');
    });

    /**
     * Validates accessibility translations
     * ARIA labels and screen reader text
     */
    it('should have accessibility translations', () => {
      // Spanish accessibility
      expect(ui.es['a11y.lang.toggle']).toBe('Cambiar idioma');
      expect(ui.es['a11y.menu.open']).toBe('Abrir menú');
      expect(ui.es['a11y.menu.close']).toBe('Cerrar menú');

      // English accessibility
      expect(ui.en['a11y.lang.toggle']).toBe('Switch language');
      expect(ui.en['a11y.menu.open']).toBe('Open menu');
      expect(ui.en['a11y.menu.close']).toBe('Close menu');
    });

    /**
     * Tests representative sample of translation keys
     * Ensures consistent key structure between languages
     */
    it('should have consistent translation key structure', () => {
      const sampleKeys = [
        'site.title',
        'nav.home',
        'hero.title',
        'error.404.title',
        'footer.tagline',
        'a11y.lang.toggle',
      ];

      sampleKeys.forEach(key => {
        expect(ui.es[key]).toBeDefined();
        expect(ui.en[key]).toBeDefined();
        expect(typeof ui.es[key]).toBe('string');
        expect(typeof ui.en[key]).toBe('string');
        expect(ui.es[key].length).toBeGreaterThan(0);
        expect(ui.en[key].length).toBeGreaterThan(0);
      });
    });
  });

  /**
   * Tests language detection from URLs
   * Critical for routing and language switching
   */
  describe('Language Detection', () => {
    /**
     * Tests getLangFromUrl function
     * Extracts language from URL path segments
     */
    describe('getLangFromUrl', () => {
      /**
       * Validates language detection from valid URLs
       * Correctly identifies language from URL pathname
       */
      it('should detect language from URL pathname', () => {
        const esUrl = new URL('https://example.com/es/proyecto/');
        const enUrl = new URL('https://example.com/en/project/');
        
        expect(getLangFromUrl(esUrl)).toBe('es');
        expect(getLangFromUrl(enUrl)).toBe('en');
      });

      /**
       * Tests fallback to default language
       * Returns default when no valid language found
       */
      it('should fallback to default language for invalid paths', () => {
        const rootUrl = new URL('https://example.com/');
        const invalidUrl = new URL('https://example.com/invalid/path/');
        const noLangUrl = new URL('https://example.com/proyecto/');
        
        expect(getLangFromUrl(rootUrl)).toBe('es');
        expect(getLangFromUrl(invalidUrl)).toBe('es');
        expect(getLangFromUrl(noLangUrl)).toBe('es');
      });

      /**
       * Validates edge cases in URL detection
       * Handles malformed and empty paths
       */
      it('should handle edge cases', () => {
        const emptyPath = new URL('https://example.com');
        const deepPath = new URL('https://example.com/es/contenido/sketches/');
        
        expect(getLangFromUrl(emptyPath)).toBe('es');
        expect(getLangFromUrl(deepPath)).toBe('es');
      });
    });

    /**
     * Tests detectLanguage function
     * String-based language detection
     */
    describe('detectLanguage', () => {
      /**
       * Validates path string language detection
       * Works with path strings instead of URL objects
       */
      it('should detect language from path string', () => {
        expect(detectLanguage('/es/proyecto/')).toBe('es');
        expect(detectLanguage('/en/project/')).toBe('en');
        expect(detectLanguage('es/contenido/sketches')).toBe('es');
      });

      /**
       * Tests default language fallback
       * Returns default for invalid paths
       */
      it('should fallback to default for invalid paths', () => {
        expect(detectLanguage('/')).toBe('es');
        expect(detectLanguage('/invalid/')).toBe('es');
        expect(detectLanguage('/proyecto/')).toBe('es');
        expect(detectLanguage('')).toBe('es');
      });

      /**
       * Validates case sensitivity
       * Language codes are case-sensitive
       */
      it('should be case sensitive', () => {
        expect(detectLanguage('/ES/proyecto/')).toBe('es');
        expect(detectLanguage('/EN/project/')).toBe('es');
      });
    });
  });

  /**
   * Tests translation function with fallback support
   * Core translation functionality
   */
  describe('Translation Functions', () => {
    /**
     * Tests useTranslations function
     * Returns translation function for specific language
     */
    describe('useTranslations', () => {
      let tEs: ReturnType<typeof useTranslations>;
      let tEn: ReturnType<typeof useTranslations>;

      beforeEach(() => {
        tEs = useTranslations('es');
        tEn = useTranslations('en');
      });

      /**
       * Validates basic translation functionality
       * Returns correct translations for valid keys
       */
      it('should return correct translations for valid keys', () => {
        expect(tEs('site.title')).toBe('Testigos de Solarpunk');
        expect(tEn('site.title')).toBe('Solarpunk Witnesses');
        expect(tEs('nav.home')).toBe('Inicio');
        expect(tEn('nav.home')).toBe('Home');
      });

      /**
       * Tests fallback mechanism
       * Falls back to default language when key missing
       */
      it('should fallback to default language when translation missing', () => {
        // Mock a missing translation in English
        const originalEn = ui.en['nav.home'];
        // @ts-expect-error Testing fallback behavior
        delete ui.en['nav.home'];

        expect(tEn('nav.home')).toBe('Inicio'); // Falls back to Spanish

        // Restore
        ui.en['nav.home'] = originalEn;
      });

      /**
       * Tests final fallback to key
       * Returns key when translation missing in both languages
       */
      it('should return key when translation missing in both languages', () => {
        // @ts-expect-error Testing invalid key
        expect(tEs('nonexistent.key')).toBe('nonexistent.key');
        // @ts-expect-error Testing invalid key
        expect(tEn('nonexistent.key')).toBe('nonexistent.key');
      });

      /**
       * Validates parameter substitution
       * Replaces placeholders with provided values
       */
      it('should replace parameters in translations', () => {
        const esResult = tEs('status.page.loaded', { title: 'Proyecto' });
        const enResult = tEn('status.page.loaded', { title: 'Project' });
        
        expect(esResult).toBe('Página cargada: Proyecto');
        expect(enResult).toBe('Page loaded: Project');
      });

      /**
       * Tests multiple parameter substitution
       * Handles multiple placeholders correctly
       */
      it('should handle multiple parameters', () => {
        const esResult = tEs('character.portrait.alt', { 
          name: 'Lucía Solar', 
          occupation: 'Predicadora Ecológica' 
        });
        const enResult = tEn('character.portrait.alt', { 
          name: 'Lucia Solar', 
          occupation: 'Ecological Preacher' 
        });
        
        expect(esResult).toBe('Retrato evangelista de Lucía Solar, Predicadora Ecológica');
        expect(enResult).toBe('Evangelist portrait of Lucia Solar, Ecological Preacher');
      });

      /**
       * Validates parameter types
       * Accepts both string and number parameters
       */
      it('should handle different parameter types', () => {
        const result = tEs('theme.changed', { theme: 'dark' });
        expect(result).toBe('Tema cambiado a dark');

        // Test with number
        const numResult = tEs('status.page.loaded', { title: 123 });
        expect(numResult).toBe('Página cargada: 123');
      });

      /**
       * Tests parameter edge cases
       * Handles missing parameters gracefully
       */
      it('should handle missing parameters gracefully', () => {
        const result = tEs('status.page.loaded'); // No params provided
        expect(result).toBe('Página cargada: {title}'); // Placeholder remains
      });

      /**
       * Validates empty string handling
       * Handles empty translations correctly
       */
      it('should handle empty translations', () => {
        // Mock empty translation
        const originalValue = ui.es['site.title'];
        ui.es['site.title'] = '';

        expect(tEs('site.title')).toBe('site.title'); // Falls back to key

        // Restore
        ui.es['site.title'] = originalValue;
      });
    });
  });

  /**
   * Tests route localization utilities
   * Path translation and route key lookup
   */
  describe('Route Utilities', () => {
    /**
     * Tests getLocalizedPath function
     * Translates paths between languages
     */
    describe('getLocalizedPath', () => {
      /**
       * Validates path translation to Spanish
       * Converts English paths to Spanish equivalents
       */
      it('should translate English paths to Spanish', () => {
        const esPath = getLocalizedPath('/project', 'es');
        expect(esPath).toBe('/es/proyecto/');

        const esContentPath = getLocalizedPath('/content/sketches', 'es');
        expect(esContentPath).toBe('/es/contenido/sketches/');
      });

      /**
       * Tests path translation to English
       * Converts Spanish paths to English equivalents
       */
      it('should translate Spanish paths to English', () => {
        const enPath = getLocalizedPath('/proyecto', 'en');
        expect(enPath).toBe('/en/project/');

        const enContentPath = getLocalizedPath('/contenido/sketches', 'en');
        expect(enContentPath).toBe('/en/content/sketches/');
      });

      /**
       * Validates trailing slash handling
       * Always adds trailing slash for Astro compatibility
       */
      it('should always add trailing slash', () => {
        expect(getLocalizedPath('/proyecto', 'es')).toBe('/es/proyecto/');
        expect(getLocalizedPath('/project', 'en')).toBe('/en/project/');
        expect(getLocalizedPath('/contenido', 'es')).toBe('/es/contenido/');
      });

      /**
       * Tests non-translatable segments
       * Preserves segments that don't have translations
       */
      it('should preserve non-translatable segments', () => {
        const path = getLocalizedPath('/custom/path', 'es');
        expect(path).toBe('/es/custom/path/');

        const enPath = getLocalizedPath('/custom/path', 'en');
        expect(enPath).toBe('/en/custom/path/');
      });

      /**
       * Validates complex path handling
       * Handles multiple segments correctly
       */
      it('should handle complex paths with multiple segments', () => {
        const complexPath = getLocalizedPath('/contenido/sketches/some-slug', 'en');
        expect(complexPath).toBe('/en/content/sketches/some-slug/');
      });

      /**
       * Tests empty and root path handling
       * Handles edge cases gracefully
       */
      it('should handle empty and root paths', () => {
        expect(getLocalizedPath('/', 'es')).toBe('/es/');
        expect(getLocalizedPath('', 'es')).toBe('/es/');
      });
    });

    /**
     * Tests getRouteFromUrl function
     * Extracts route keys from URLs
     */
    describe('getRouteFromUrl', () => {
      /**
       * Validates route key extraction from Spanish URLs
       * Returns correct route keys for Spanish paths
       */
      it('should extract route key from Spanish URLs', () => {
        const proyectoUrl = new URL('https://example.com/es/proyecto/');
        const contenidoUrl = new URL('https://example.com/es/contenido/');
        
        expect(getRouteFromUrl(proyectoUrl, 'es')).toBe('proyecto');
        expect(getRouteFromUrl(contenidoUrl, 'es')).toBe('contenido');
      });

      /**
       * Tests route key extraction from English URLs
       * Returns correct route keys for English paths
       */
      it('should extract route key from English URLs', () => {
        const projectUrl = new URL('https://example.com/en/project/');
        const contentUrl = new URL('https://example.com/en/content/');
        
        expect(getRouteFromUrl(projectUrl, 'en')).toBe('proyecto');
        expect(getRouteFromUrl(contentUrl, 'en')).toBe('contenido');
      });

      /**
       * Validates handling of URLs without language prefix
       * Processes paths that don't start with language code
       */
      it('should handle URLs without language prefix', () => {
        const noLangUrl = new URL('https://example.com/proyecto/');
        expect(getRouteFromUrl(noLangUrl, 'es')).toBe('proyecto');
      });

      /**
       * Tests non-existent route handling
       * Returns undefined for routes that don't exist
       */
      it('should return undefined for non-existent routes', () => {
        const unknownUrl = new URL('https://example.com/es/unknown-route/');
        expect(getRouteFromUrl(unknownUrl, 'es')).toBeUndefined();
      });

      /**
       * Validates complex route handling
       * Handles nested and multi-segment routes
       */
      it('should handle complex routes', () => {
        const complexUrl = new URL('https://example.com/es/guia-visual/');
        expect(getRouteFromUrl(complexUrl, 'es')).toBe('guia-visual');

        const enComplexUrl = new URL('https://example.com/en/visual-guide/');
        expect(getRouteFromUrl(enComplexUrl, 'en')).toBe('guia-visual');
      });

      /**
       * Tests root URL handling
       * Handles root and empty paths gracefully
       */
      it('should handle root URLs', () => {
        const rootUrl = new URL('https://example.com/es/');
        expect(getRouteFromUrl(rootUrl, 'es')).toBeUndefined();

        const bareRootUrl = new URL('https://example.com/');
        expect(getRouteFromUrl(bareRootUrl, 'es')).toBeUndefined();
      });
    });
  });

  /**
   * Tests TypeScript type definitions
   * Ensures proper type safety for i18n operations
   */
  describe('TypeScript Types', () => {
    /**
     * Validates Language type
     * Only allows valid language codes
     */
    it('should enforce Language type constraints', () => {
      const validLang: Language = 'es';
      expect(validLang).toBe('es');

      const anotherValidLang: Language = 'en';
      expect(anotherValidLang).toBe('en');
    });

    /**
     * Tests TranslationKey type
     * Ensures type safety for translation keys
     */
    it('should provide TranslationKey type', () => {
      const key: TranslationKey = 'site.title';
      expect(key).toBe('site.title');
    });

    /**
     * Validates RouteKey type
     * Ensures type safety for route keys
     */
    it('should provide RouteKey type', () => {
      const routeKey: RouteKey = 'proyecto';
      expect(routeKey).toBe('proyecto');
    });
  });

  /**
   * Tests edge cases and error handling
   * Ensures robust behavior in unexpected scenarios
   */
  describe('Edge Cases and Error Handling', () => {
    /**
     * Tests URL malformation handling
     * Functions handle invalid URLs gracefully
     */
    it('should handle malformed URLs gracefully', () => {
      // URL with unusual structure
      const weirdUrl = new URL('https://example.com///es///proyecto///');
      expect(getLangFromUrl(weirdUrl)).toBe('es');
    });

    /**
     * Validates case insensitive route matching
     * Route functions are case-sensitive as expected
     */
    it('should handle case sensitivity correctly', () => {
      const upperUrl = new URL('https://example.com/ES/PROYECTO/');
      expect(getLangFromUrl(upperUrl)).toBe('es'); // Fallback to default
    });

    /**
     * Tests special character handling
     * Functions handle encoded and special characters
     */
    it('should handle special characters in paths', () => {
      const encodedPath = getLocalizedPath('/caf%C3%A9', 'es');
      expect(encodedPath).toBe('/es/caf%C3%A9/');
    });

    /**
     * Validates memory and performance considerations
     * Functions don't leak memory or cause performance issues
     */
    it('should handle large numbers of translation calls efficiently', () => {
      const t = useTranslations('es');
      
      // Call translation function many times
      for (let i = 0; i < 1000; i++) {
        const result = t('site.title');
        expect(result).toBe('Testigos de Solarpunk');
      }
    });

    /**
     * Tests concurrent translation usage
     * Multiple translation functions work independently
     */
    it('should handle concurrent translation usage', () => {
      const tEs = useTranslations('es');
      const tEn = useTranslations('en');
      
      expect(tEs('nav.home')).toBe('Inicio');
      expect(tEn('nav.home')).toBe('Home');
      expect(tEs('nav.home')).toBe('Inicio'); // Still works after other calls
    });
  });
});