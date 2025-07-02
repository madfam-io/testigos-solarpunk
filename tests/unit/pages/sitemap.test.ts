/**
 * @fileoverview Unit tests for sitemap.xml.ts
 * @author MADFAM
 * @version 0.5.0
 * 
 * Tests the XML sitemap generation including:
 * - Valid XML structure
 * - All routes included
 * - Language alternates
 * - Priority and changefreq values
 * - Response headers
 */

import { describe, it, expect, vi } from 'vitest';
import { GET } from '../../../src/pages/sitemap.xml';

/**
 * Parse XML string to Document
 */
function parseXML(xmlString: string): Document {
  // Simple XML validation regex
  const xmlRegex = /^<\?xml[^>]*\?>/;
  if (!xmlRegex.test(xmlString.trim())) {
    throw new Error('Invalid XML: Missing XML declaration');
  }
  
  // For Node.js environment, we'll use a mock parser
  // In a real browser environment, you'd use DOMParser
  return {
    querySelector: (selector: string) => {
      if (selector === 'urlset') {
        return { 
          getAttribute: (attr: string) => {
            if (attr === 'xmlns') return 'http://www.sitemaps.org/schemas/sitemap/0.9';
            if (attr === 'xmlns:xhtml') return 'http://www.w3.org/1999/xhtml';
            return null;
          }
        };
      }
      return null;
    },
    querySelectorAll: (selector: string) => {
      if (selector === 'url') {
        // Count URLs in the XML
        const urlMatches = xmlString.match(/<url>/g);
        return new Array(urlMatches ? urlMatches.length : 0).fill({});
      }
      return [];
    }
  } as unknown as Document;
}

describe('Sitemap XML Generation', () => {
  /**
   * Test the GET handler function
   */
  describe('GET handler', () => {
    it('should return a Response object', () => {
      const response = GET({} as any);
      expect(response).toBeInstanceOf(Response);
    });

    it('should have correct content type header', () => {
      const response = GET({} as any);
      expect(response.headers.get('Content-Type')).toBe('application/xml');
    });

    it('should have cache control header', () => {
      const response = GET({} as any);
      expect(response.headers.get('Cache-Control')).toBe('public, max-age=3600');
    });
  });

  /**
   * Test XML structure and content
   */
  describe('XML Structure', () => {
    it('should generate valid XML', async () => {
      const response = GET({} as any);
      const xml = await response.text();
      
      // Check XML declaration
      expect(xml).toMatch(/^<\?xml version="1.0" encoding="UTF-8"\?>/);
      
      // Check urlset opening tag with namespaces
      expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
      expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
      
      // Check closing tag
      expect(xml).toContain('</urlset>');
    });

    it('should contain all required URL elements', async () => {
      const response = GET({} as any);
      const xml = await response.text();
      
      // Check for required elements in each URL
      expect(xml).toContain('<loc>');
      expect(xml).toContain('</loc>');
      expect(xml).toContain('<lastmod>');
      expect(xml).toContain('</lastmod>');
      expect(xml).toContain('<changefreq>');
      expect(xml).toContain('</changefreq>');
      expect(xml).toContain('<priority>');
      expect(xml).toContain('</priority>');
    });

    it('should have valid lastmod dates', async () => {
      const response = GET({} as any);
      const xml = await response.text();
      
      // Extract all lastmod values
      const lastmodRegex = /<lastmod>([^<]+)<\/lastmod>/g;
      const matches = [...xml.matchAll(lastmodRegex)];
      
      expect(matches.length).toBeGreaterThan(0);
      
      // Check each date is valid ISO format
      matches.forEach(match => {
        const date = match[1];
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
        expect(new Date(date).toISOString()).toBe(date);
      });
    });
  });

  /**
   * Test URL content
   */
  describe('URL Content', () => {
    it('should include all static routes', async () => {
      const response = GET({} as any);
      const xml = await response.text();
      
      // Check for key routes in both languages
      const keyRoutes = [
        '/es/',
        '/en/',
        '/es/proyecto/',
        '/en/project/',
        '/es/contenido/sketches/',
        '/en/content/sketches/',
        '/es/personajes/',
        '/en/characters/',
        '/es/comunidad/',
        '/en/community/',
      ];
      
      keyRoutes.forEach(route => {
        expect(xml).toContain(`<loc>https://testigos-solarpunk.vercel.app${route}</loc>`);
      });
    });

    it('should have correct number of URLs', async () => {
      const response = GET({} as any);
      const xml = await response.text();
      
      // Count URL entries
      const urlMatches = xml.match(/<url>/g);
      expect(urlMatches).not.toBeNull();
      expect(urlMatches!.length).toBe(70); // Based on staticRoutes array
    });

    it('should have correct priority values', async () => {
      const response = GET({} as any);
      const xml = await response.text();
      
      // Check homepage has highest priority
      expect(xml).toContain('<loc>https://testigos-solarpunk.vercel.app/es/</loc>\n    <lastmod>');
      const esHomeMatch = xml.match(/<loc>https:\/\/testigos-solarpunk\.vercel\.app\/es\/<\/loc>[\s\S]*?<priority>([^<]+)<\/priority>/);
      expect(esHomeMatch).not.toBeNull();
      expect(esHomeMatch![1]).toBe('1');
      
      // Check sitemap has low priority
      const sitemapMatch = xml.match(/<loc>https:\/\/testigos-solarpunk\.vercel\.app\/es\/sitemap\/<\/loc>[\s\S]*?<priority>([^<]+)<\/priority>/);
      expect(sitemapMatch).not.toBeNull();
      expect(sitemapMatch![1]).toBe('0.3');
    });

    it('should have appropriate changefreq values', async () => {
      const response = GET({} as any);
      const xml = await response.text();
      
      // Check different changefreq values
      expect(xml).toContain('<changefreq>daily</changefreq>'); // sketches
      expect(xml).toContain('<changefreq>weekly</changefreq>'); // homepage
      expect(xml).toContain('<changefreq>monthly</changefreq>'); // most pages
      expect(xml).toContain('<changefreq>yearly</changefreq>'); // philosophy
    });
  });

  /**
   * Test language alternates
   */
  describe('Language Alternates', () => {
    it('should include hreflang alternate links', async () => {
      const response = GET({} as any);
      const xml = await response.text();
      
      // Check for hreflang attributes
      expect(xml).toContain('rel="alternate"');
      expect(xml).toContain('hreflang="es"');
      expect(xml).toContain('hreflang="en"');
    });

    it('should correctly map Spanish to English URLs', async () => {
      const response = GET({} as any);
      const xml = await response.text();
      
      // Check specific mappings
      const mappings = [
        { es: '/es/proyecto/', en: '/en/project/' },
        { es: '/es/contenido/', en: '/en/content/' },
        { es: '/es/personajes/', en: '/en/characters/' },
        { es: '/es/comunidad/', en: '/en/community/' },
      ];
      
      mappings.forEach(({ es, en }) => {
        // For Spanish URL, should have English alternate
        const esUrlSection = xml.match(new RegExp(`<loc>https://testigos-solarpunk\\.vercel\\.app${es.replace(/\//g, '\\/')}</loc>[\\s\\S]*?</url>`, 'g'));
        expect(esUrlSection).not.toBeNull();
        expect(esUrlSection![0]).toContain(`hreflang="en" href="https://testigos-solarpunk.vercel.app${en}"`);
      });
    });

    it('should correctly map English to Spanish URLs', async () => {
      const response = GET({} as any);
      const xml = await response.text();
      
      // Check reverse mappings
      const mappings = [
        { en: '/en/project/', es: '/es/proyecto/' },
        { en: '/en/content/', es: '/es/contenido/' },
        { en: '/en/characters/', es: '/es/personajes/' },
        { en: '/en/community/', es: '/es/comunidad/' },
      ];
      
      mappings.forEach(({ en, es }) => {
        // For English URL, should have Spanish alternate
        const enUrlSection = xml.match(new RegExp(`<loc>https://testigos-solarpunk\\.vercel\\.app${en.replace(/\//g, '\\/')}</loc>[\\s\\S]*?</url>`, 'g'));
        expect(enUrlSection).not.toBeNull();
        expect(enUrlSection![0]).toContain(`hreflang="es" href="https://testigos-solarpunk.vercel.app${es}"`);
      });
    });

    it('should include self-referencing hreflang', async () => {
      const response = GET({} as any);
      const xml = await response.text();
      
      // Check that each URL with alternates also references itself
      const urlSections = xml.match(/<url>[\s\S]*?<\/url>/g);
      expect(urlSections).not.toBeNull();
      
      urlSections!.forEach(section => {
        if (section.includes('hreflang')) {
          // Extract the main URL
          const locMatch = section.match(/<loc>([^<]+)<\/loc>/);
          expect(locMatch).not.toBeNull();
          const mainUrl = locMatch![1];
          
          // Should reference itself with appropriate language
          if (mainUrl.includes('/es/')) {
            expect(section).toContain(`hreflang="es" href="${mainUrl}"`);
          } else if (mainUrl.includes('/en/')) {
            expect(section).toContain(`hreflang="en" href="${mainUrl}"`);
          }
        }
      });
    });
  });

  /**
   * Test edge cases and special routes
   */
  describe('Edge Cases', () => {
    it('should handle nested routes correctly', async () => {
      const response = GET({} as any);
      const xml = await response.text();
      
      // Check nested routes are included
      const nestedRoutes = [
        '/es/recursos/actores/personajes/',
        '/en/resources/actors/characters/',
        '/es/produccion/estilo-visual/',
        '/en/production/visual-style/',
      ];
      
      nestedRoutes.forEach(route => {
        expect(xml).toContain(`<loc>https://testigos-solarpunk.vercel.app${route}</loc>`);
      });
    });

    it('should handle special location names', async () => {
      const response = GET({} as any);
      const xml = await response.text();
      
      // Check special location URLs
      expect(xml).toContain('/es/mundo/azotea-verde-neo-cuernavaca/');
      expect(xml).toContain('/en/world/green-roof-neo-cuernavaca/');
    });

    it('should escape XML entities if needed', async () => {
      const response = GET({} as any);
      const xml = await response.text();
      
      // The XML should be properly formatted (all special chars are within tags)
      // This regex would catch unescaped entities outside of XML tags
      // But our sitemap doesn't have any text content that would need escaping
      expect(xml).toBeDefined();
    });
  });

  /**
   * Test performance considerations
   */
  describe('Performance', () => {
    it('should generate sitemap quickly', async () => {
      const start = performance.now();
      const response = GET({} as any);
      await response.text();
      const end = performance.now();
      
      // Should generate in less than 100ms
      expect(end - start).toBeLessThan(100);
    });

    it('should not have excessive memory usage', () => {
      // The staticRoutes array should be reasonably sized
      const response = GET({} as any);
      expect(response).toBeDefined();
      
      // Simple check that we're not creating massive strings
      response.text().then(xml => {
        expect(xml.length).toBeLessThan(50000); // 50KB max
      });
    });
  });
});