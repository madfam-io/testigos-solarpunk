/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { JSDOM } from 'jsdom';

interface RenderOptions {
  props?: Record<string, unknown>;
  slots?: Record<string, string>;
}

interface RenderResult {
  container: Element;
  html: string;
  querySelector: (selector: string) => Element | null;
  querySelectorAll: (selector: string) => NodeListOf<Element>;
  getByText: (text: string) => Element | null;
  getByTestId: (testId: string) => Element | null;
}

/**
 * Helper to render Astro components for testing
 * Since Astro components compile to HTML, we simulate the render process
 */
export function renderAstroComponent(
  componentHtml: string,
  options: RenderOptions = {}
): RenderResult {
  const { props = {}, slots = {} } = options;

  // Replace prop placeholders in the HTML
  let html = componentHtml;
  for (const [key, value] of Object.entries(props)) {
    const placeholder = `{${key}}`;
    const stringValue = typeof value === 'string' ? value : String(value);
    html = html.replace(new RegExp(placeholder, 'g'), stringValue);
  }

  // Replace slot placeholders
  for (const [slotName, slotContent] of Object.entries(slots)) {
    const slotPlaceholder = `<slot name="${slotName}" />`;
    const defaultSlotPlaceholder = '<slot />';

    if (slotName === 'default') {
      html = html.replace(defaultSlotPlaceholder, slotContent);
    } else {
      html = html.replace(slotPlaceholder, slotContent);
    }
  }

  // Create DOM
  const dom = new JSDOM(html) as unknown as {
    window: { document: { body: Element } };
  };
  const container = dom.window.document.body;

  return {
    container,
    html: container.innerHTML,
    querySelector: (selector: string) => container.querySelector(selector),
    querySelectorAll: (selector: string) =>
      container.querySelectorAll(selector),
    getByText: (text: string) => {
      const elements = container.querySelectorAll('*');
      for (const element of elements) {
        if (element.textContent?.includes(text)) {
          return element;
        }
      }
      return null;
    },
    getByTestId: (testId: string) =>
      container.querySelector(`[data-testid="${testId}"]`),
  };
}

/**
 * Helper to test Astro page components
 */
export function renderAstroPage(pageHtml: string): RenderResult {
  const dom = new JSDOM(pageHtml, {
    url: 'http://localhost:3000',
    runScripts: 'dangerously',
    resources: 'usable',
  }) as unknown as { window: { document: { documentElement: Element } } };

  const container = dom.window.document.documentElement;

  return {
    container,
    html: container.outerHTML,
    querySelector: (selector: string) => container.querySelector(selector),
    querySelectorAll: (selector: string) =>
      container.querySelectorAll(selector),
    getByText: (text: string) => {
      const elements = container.querySelectorAll('*');
      for (const element of elements) {
        if (element.textContent?.includes(text)) {
          return element;
        }
      }
      return null;
    },
    getByTestId: (testId: string) =>
      container.querySelector(`[data-testid="${testId}"]`),
  };
}

/**
 * Helper to create mock Astro.props
 */
export function createAstroProps<T extends Record<string, unknown>>(
  props: T
): T {
  return props;
}

/**
 * Helper to create mock Astro.slots
 */
export function createAstroSlots(
  slots: Record<string, () => string>
): Record<string, () => string> {
  return slots;
}

/**
 * Mock for Astro global
 */
export const mockAstroGlobal = {
  props: {},
  slots: {},
  request: new Request('http://localhost:3000'),
  url: new URL('http://localhost:3000'),
  redirect: (url: string): Response =>
    new Response(null, { status: 302, headers: { Location: url } }),
  glob: (_pattern: string): Promise<Record<string, unknown>[]> =>
    Promise.resolve([]),
};

/**
 * Helper to test Astro API endpoints
 */
export async function testEndpoint(
  endpoint: (context: { request: Request }) => Promise<Response> | Response,
  options: {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
    params?: Record<string, string>;
  } = {}
): Promise<Response> {
  const { method = 'GET', body, headers = {}, params = {} } = options;

  const url = new URL('http://localhost:3000/api/test');
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const request = new Request(url.toString(), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const response = await endpoint({ request });
  return response;
}

/**
 * Helper function to extract text content from HTML
 */
export function extractTextContent(html: string): string {
  const dom = new JSDOM(html);
  return dom.window.document.body.textContent ?? '';
}

/**
 * Helper function to check if an element has a class
 */
export function hasClass(
  html: string,
  selector: string,
  className: string
): boolean {
  const dom = new JSDOM(html);
  const element = dom.window.document.querySelector(selector);
  return element?.classList.contains(className) ?? false;
}

/**
 * Helper function to count tags in HTML
 */
export function countTags(html: string, tagName: string): number {
  const dom = new JSDOM(html);
  return dom.window.document.querySelectorAll(tagName).length;
}

/**
 * Helper function to parse attributes from an element
 */
export function parseAttributes(
  html: string,
  selector: string
): Record<string, string> {
  const dom = new JSDOM(html);
  const element = dom.window.document.querySelector(selector);
  if (!element) return {};

  const attrs: Record<string, string> = {};
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];
    attrs[attr.name] = attr.value;
  }
  return attrs;
}

/**
 * Helper function to get inner HTML of an element
 */
export function getInnerHTML(html: string, selector: string): string {
  const dom = new JSDOM(html);
  const element = dom.window.document.querySelector(selector);
  return element?.innerHTML ?? '';
}
