/**
 * Test utilities for Astro components
 * Since Astro components compile to HTML, we test the rendered output
 */

import { vi } from 'vitest';

/**
 * Mock Astro global object
 */
export const mockAstro = {
  site: new URL('https://example.com'),
  url: new URL('https://example.com/test'),
  request: {
    headers: new Headers(),
  },
  props: {},
  slots: {
    has: vi.fn(() => false),
    render: vi.fn(() => Promise.resolve('')),
  },
};

/**
 * Mock for Astro.glob function
 */
export function mockAstroGlob<T>(files: Record<string, T>) {
  return vi.fn(() => {
    return Object.entries(files).map(([url, module]) => ({
      url,
      ...module,
    }));
  });
}

/**
 * Extract text content from HTML string
 */
export function extractTextContent(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Parse HTML attributes from a tag
 */
export function parseAttributes(html: string, tagName: string): Record<string, string> {
  const tagRegex = new RegExp(`<${tagName}(?:\\s+([^>]*))?>`, 'i');
  const match = html.match(tagRegex);
  if (!match || !match[1]) return {};

  const attributesString = match[1];
  const attributes: Record<string, string> = {};
  
  // Updated regex to handle various attribute formats including href
  const attrRegex = /(\w+)(?:="([^"]*)")?/g;
  let attrMatch;
  
  while ((attrMatch = attrRegex.exec(attributesString)) !== null) {
    const [, name, value] = attrMatch;
    attributes[name] = value !== undefined ? value : 'true';
  }
  
  return attributes;
}

/**
 * Check if HTML contains a specific class
 */
export function hasClass(html: string, className: string): boolean {
  const classRegex = new RegExp(`class="[^"]*\\b${className}\\b[^"]*"`);
  return classRegex.test(html);
}

/**
 * Count occurrences of a tag in HTML
 */
export function countTags(html: string, tagName: string): number {
  const regex = new RegExp(`<${tagName}[^>]*>`, 'gi');
  const matches = html.match(regex);
  return matches ? matches.length : 0;
}

/**
 * Get inner HTML of a specific element
 */
export function getInnerHTML(html: string, selector: string): string | null {
  // Simple implementation for basic selectors
  if (selector.startsWith('.')) {
    const className = selector.slice(1);
    const regex = new RegExp(`<[^>]+class="[^"]*\\b${className}\\b[^"]*"[^>]*>([\\s\\S]*?)<\\/\\w+>`, 'i');
    const match = html.match(regex);
    return match ? match[1] : null;
  }
  
  if (selector.startsWith('#')) {
    const id = selector.slice(1);
    const regex = new RegExp(`<[^>]+id="${id}"[^>]*>([\\s\\S]*?)<\\/\\w+>`, 'i');
    const match = html.match(regex);
    return match ? match[1] : null;
  }
  
  // Tag selector
  const regex = new RegExp(`<${selector}[^>]*>([\\s\\S]*?)<\\/${selector}>`, 'i');
  const match = html.match(regex);
  return match ? match[1] : null;
}

/**
 * Mock fetch for testing
 */
export function mockFetch(responses: Record<string, any>) {
  return vi.fn((url: string) => {
    const response = responses[url];
    if (!response) {
      return Promise.reject(new Error(`No mock response for ${url}`));
    }
    
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
    });
  });
}