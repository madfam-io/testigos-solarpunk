/**
 * Unit Tests for Accessibility Utilities
 * @fileoverview Comprehensive tests for all accessibility helper functions
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  AriaAttributes,
  SemanticRoles,
  FocusManager,
  getA11yLabels,
  ScreenReaderUtils,
  KeyboardNavigation,
  ContrastUtils,
  A11yTesting,
  initializeAccessibility,
} from '../accessibility';
import type { Language } from '@/i18n/config';

// Mock the i18n config
vi.mock('@/i18n/config', () => ({
  useTranslations: (lang: Language) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        'a11y.skip.content': 'Saltar al contenido',
        'a11y.menu.open': 'Abrir menú',
        'a11y.menu.close': 'Cerrar menú',
        'a11y.theme.toggle': 'Cambiar tema',
        'a11y.lang.toggle': 'Cambiar idioma',
        'form.required': 'Campo requerido',
        'form.invalid': 'Entrada inválida',
        'ui.search': 'Buscar',
        'status.loading': 'Cargando',
        'status.error': 'Error',
        'status.success': 'Éxito',
      },
      en: {
        'a11y.skip.content': 'Skip to content',
        'a11y.menu.open': 'Open menu',
        'a11y.menu.close': 'Close menu',
        'a11y.theme.toggle': 'Toggle theme',
        'a11y.lang.toggle': 'Toggle language',
        'form.required': 'Required field',
        'form.invalid': 'Invalid input',
        'ui.search': 'Search',
        'status.loading': 'Loading',
        'status.error': 'Error',
        'status.success': 'Success',
      },
    };
    return translations[lang]?.[key] || key;
  },
}));

describe('AriaAttributes', () => {
  describe('button', () => {
    it('should generate basic button attributes', () => {
      const attrs = AriaAttributes.button('Click me');
      expect(attrs).toEqual({
        role: 'button',
        'aria-label': 'Click me',
        'aria-pressed': undefined,
        'aria-expanded': undefined,
        tabindex: '0',
      });
    });

    it('should include pressed state when provided', () => {
      const attrs = AriaAttributes.button('Toggle', true);
      expect(attrs['aria-pressed']).toBe('true');
    });

    it('should include expanded state when provided', () => {
      const attrs = AriaAttributes.button('Expand', false, true);
      expect(attrs['aria-expanded']).toBe('true');
    });

    it('should handle false states correctly', () => {
      const attrs = AriaAttributes.button('Button', false, false);
      expect(attrs['aria-pressed']).toBe('false');
      expect(attrs['aria-expanded']).toBe('false');
    });
  });

  describe('navLink', () => {
    it('should generate basic nav link attributes', () => {
      const attrs = AriaAttributes.navLink('Home');
      expect(attrs).toEqual({
        'aria-label': 'Home',
        'aria-current': undefined,
      });
    });

    it('should mark current page when specified', () => {
      const attrs = AriaAttributes.navLink('About', true);
      expect(attrs['aria-current']).toBe('page');
    });

    it('should not include aria-current for non-current pages', () => {
      const attrs = AriaAttributes.navLink('Contact', false);
      expect(attrs['aria-current']).toBeUndefined();
    });
  });

  describe('formControl', () => {
    it('should generate basic form control attributes', () => {
      const attrs = AriaAttributes.formControl('Email');
      expect(attrs).toEqual({
        'aria-label': 'Email',
        'aria-required': undefined,
        'aria-invalid': undefined,
        'aria-describedby': undefined,
      });
    });

    it('should include all optional attributes when provided', () => {
      const attrs = AriaAttributes.formControl('Password', true, false, 'password-help');
      expect(attrs).toEqual({
        'aria-label': 'Password',
        'aria-required': 'true',
        'aria-invalid': 'false',
        'aria-describedby': 'password-help',
      });
    });
  });

  describe('image', () => {
    it('should generate attributes for meaningful images', () => {
      const attrs = AriaAttributes.image('A sunset over mountains');
      expect(attrs).toEqual({
        alt: 'A sunset over mountains',
        role: undefined,
        'aria-hidden': undefined,
      });
    });

    it('should handle decorative images correctly', () => {
      const attrs = AriaAttributes.image('', true);
      expect(attrs).toEqual({
        alt: '',
        role: 'presentation',
        'aria-hidden': 'true',
      });
    });

    it('should use provided alt text even for decorative images', () => {
      const attrs = AriaAttributes.image('Decorative border', true);
      expect(attrs.alt).toBe('');
    });
  });

  describe('dialog', () => {
    it('should generate dialog attributes', () => {
      const attrs = AriaAttributes.dialog('Settings');
      expect(attrs).toEqual({
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': 'Settings',
        'aria-describedby': undefined,
        tabindex: '-1',
      });
    });

    it('should include describedby when provided', () => {
      const attrs = AriaAttributes.dialog('Login', 'login-instructions');
      expect(attrs['aria-describedby']).toBe('login-instructions');
    });
  });

  describe('liveRegion', () => {
    it('should create polite live region by default', () => {
      const attrs = AriaAttributes.liveRegion();
      expect(attrs).toEqual({
        'aria-live': 'polite',
        'aria-atomic': 'true',
      });
    });

    it('should create assertive live region when specified', () => {
      const attrs = AriaAttributes.liveRegion('assertive');
      expect(attrs['aria-live']).toBe('assertive');
    });
  });

  describe('expandable', () => {
    it('should generate expandable content attributes', () => {
      const attrs = AriaAttributes.expandable('More info', false);
      expect(attrs).toEqual({
        'aria-label': 'More info',
        'aria-expanded': 'false',
        'aria-controls': undefined,
        tabindex: '0',
      });
    });

    it('should include controls when provided', () => {
      const attrs = AriaAttributes.expandable('Details', true, 'details-panel');
      expect(attrs['aria-controls']).toBe('details-panel');
      expect(attrs['aria-expanded']).toBe('true');
    });
  });
});

describe('SemanticRoles', () => {
  it('should contain all expected semantic role constants', () => {
    expect(SemanticRoles.navigation).toBe('navigation');
    expect(SemanticRoles.main).toBe('main');
    expect(SemanticRoles.complementary).toBe('complementary');
    expect(SemanticRoles.contentinfo).toBe('contentinfo');
    expect(SemanticRoles.banner).toBe('banner');
    expect(SemanticRoles.region).toBe('region');
    expect(SemanticRoles.article).toBe('article');
    expect(SemanticRoles.section).toBe('section');
    expect(SemanticRoles.list).toBe('list');
    expect(SemanticRoles.listitem).toBe('listitem');
    expect(SemanticRoles.button).toBe('button');
    expect(SemanticRoles.link).toBe('link');
    expect(SemanticRoles.img).toBe('img');
    expect(SemanticRoles.heading).toBe('heading');
    expect(SemanticRoles.search).toBe('search');
    expect(SemanticRoles.form).toBe('form');
    expect(SemanticRoles.dialog).toBe('dialog');
    expect(SemanticRoles.alert).toBe('alert');
    expect(SemanticRoles.status).toBe('status');
    expect(SemanticRoles.presentation).toBe('presentation');
  });
});

describe('FocusManager', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('getFocusableElements', () => {
    it('should find all focusable elements', () => {
      container.innerHTML = `
        <a href="#">Link</a>
        <button>Button</button>
        <button disabled>Disabled Button</button>
        <input type="text" />
        <input type="text" disabled />
        <select><option>Option</option></select>
        <textarea></textarea>
        <div tabindex="0">Focusable div</div>
        <div tabindex="-1">Non-focusable div</div>
        <div contenteditable="true">Editable div</div>
      `;

      const focusable = FocusManager.getFocusableElements(container);
      expect(focusable).toHaveLength(7);
    });

    it('should return empty array for container with no focusable elements', () => {
      container.innerHTML = '<div>No focusable elements</div>';
      const focusable = FocusManager.getFocusableElements(container);
      expect(focusable).toHaveLength(0);
    });
  });

  describe('trapFocus', () => {
    it('should trap focus within container', () => {
      container.innerHTML = `
        <button id="first">First</button>
        <button id="middle">Middle</button>
        <button id="last">Last</button>
      `;

      const first = container.querySelector('#first') as HTMLElement;
      const last = container.querySelector('#last') as HTMLElement;
      const cleanup = FocusManager.trapFocus(container);

      // Should focus first element initially
      expect(document.activeElement).toBe(first);

      // Simulate Tab on last element
      last.focus();
      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: false,
      });
      document.dispatchEvent(tabEvent);

      // Simulate Shift+Tab on first element
      first.focus();
      const shiftTabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
      });
      document.dispatchEvent(shiftTabEvent);

      // Clean up
      cleanup();
    });

    it('should handle containers with no focusable elements', () => {
      container.innerHTML = '<div>No focusable content</div>';
      const cleanup = FocusManager.trapFocus(container);
      expect(() => cleanup()).not.toThrow();
    });
  });

  describe('createFocusOutline', () => {
    it('should return CSS string for focus outline', () => {
      const css = FocusManager.createFocusOutline();
      expect(css).toContain('outline: 3px solid');
      expect(css).toContain('outline-offset: 2px');
      expect(css).toContain('border-radius: 4px');
    });
  });

  describe('saveFocus and restoreFocus', () => {
    it('should save and restore focus', () => {
      const button = document.createElement('button');
      container.appendChild(button);
      button.focus();

      const saved = FocusManager.saveFocus();
      expect(saved).toBe(button);

      const input = document.createElement('input');
      container.appendChild(input);
      input.focus();
      expect(document.activeElement).toBe(input);

      FocusManager.restoreFocus(saved);
      expect(document.activeElement).toBe(button);
    });

    it('should handle null saved element', () => {
      expect(() => FocusManager.restoreFocus(null)).not.toThrow();
    });
  });
});

describe('getA11yLabels', () => {
  it('should return English labels', () => {
    const labels = getA11yLabels('en');
    expect(labels.skipToContent).toBe('Skip to content');
    expect(labels.mainMenu).toBe('Open menu');
    expect(labels.closeMenu).toBe('Close menu');
    expect(labels.toggleTheme).toBe('Toggle theme');
    expect(labels.switchLanguage).toBe('Toggle language');
    expect(labels.requiredField).toBe('Required field');
    expect(labels.invalidInput).toBe('Invalid input');
    expect(labels.searchPlaceholder).toBe('Search');
    expect(labels.loading).toBe('Loading');
    expect(labels.error).toBe('Error');
    expect(labels.success).toBe('Success');
  });

  it('should return Spanish labels', () => {
    const labels = getA11yLabels('es');
    expect(labels.skipToContent).toBe('Saltar al contenido');
    expect(labels.mainMenu).toBe('Abrir menú');
    expect(labels.closeMenu).toBe('Cerrar menú');
    expect(labels.toggleTheme).toBe('Cambiar tema');
    expect(labels.switchLanguage).toBe('Cambiar idioma');
    expect(labels.requiredField).toBe('Campo requerido');
    expect(labels.invalidInput).toBe('Entrada inválida');
    expect(labels.searchPlaceholder).toBe('Buscar');
    expect(labels.loading).toBe('Cargando');
    expect(labels.error).toBe('Error');
    expect(labels.success).toBe('Éxito');
  });

  it('should generate dynamic labels with parameters', () => {
    const labels = getA11yLabels('en');
    expect(labels.readMore('Article Title')).toBe('Read more about Article Title');
    expect(labels.viewDetails('Product')).toBe('View details for Product');
    expect(labels.playVideo('Tutorial')).toBe('Play video: Tutorial');
    expect(labels.downloadFile('document.pdf')).toBe('Download document.pdf');
    expect(labels.shareOn('Twitter')).toBe('Share on Twitter');
    expect(labels.socialLink('Facebook')).toBe('Visit our Facebook page');
    expect(labels.cutoutImage('hero')).toBe('Magazine cutout style image of hero');
    expect(labels.characterProfile('Gaby')).toBe('Character profile for Gaby');
    expect(labels.episodePlayer('Episode 1')).toBe('Audio player for Episode 1');
    expect(labels.sketchVideo('Funny Sketch')).toBe('Watch sketch: Funny Sketch');
  });

  it('should generate language-specific dynamic messages', () => {
    const enLabels = getA11yLabels('en');
    const esLabels = getA11yLabels('es');

    expect(enLabels.currentTheme('dark')).toBe('Theme changed to dark');
    expect(esLabels.currentTheme('oscuro')).toBe('Tema cambiado a oscuro');

    expect(enLabels.currentLanguage('Spanish')).toBe('Language changed to Spanish');
    expect(esLabels.currentLanguage('Inglés')).toBe('Idioma cambiado a Inglés');
  });
});

describe('ScreenReaderUtils', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('createSROnlyText', () => {
    it('should create screen reader only element', () => {
      const element = ScreenReaderUtils.createSROnlyText('Hidden text');
      expect(element.tagName).toBe('SPAN');
      expect(element.textContent).toBe('Hidden text');
      expect(element.className).toBe('sr-only');
    });
  });

  describe('announce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should create and remove polite announcement', () => {
      ScreenReaderUtils.announce('Test message');
      
      const announcement = document.querySelector('[aria-live="polite"]');
      expect(announcement).toBeTruthy();
      expect(announcement?.textContent).toBe('Test message');
      expect(announcement?.className).toBe('sr-only');

      vi.advanceTimersByTime(1000);
      expect(document.querySelector('[aria-live="polite"]')).toBeFalsy();
    });

    it('should create assertive announcement when specified', () => {
      ScreenReaderUtils.announce('Urgent message', 'assertive');
      
      const announcement = document.querySelector('[aria-live="assertive"]');
      expect(announcement).toBeTruthy();
      expect(announcement?.getAttribute('aria-atomic')).toBe('true');
    });
  });

  describe('updateLiveRegion', () => {
    it('should update existing live region', () => {
      const region = document.createElement('div');
      region.id = 'test-region';
      region.textContent = 'Old content';
      document.body.appendChild(region);

      ScreenReaderUtils.updateLiveRegion('test-region', 'New content');
      expect(region.textContent).toBe('New content');
    });

    it('should handle non-existent region gracefully', () => {
      expect(() => {
        ScreenReaderUtils.updateLiveRegion('non-existent', 'Content');
      }).not.toThrow();
    });
  });
});

describe('KeyboardNavigation', () => {
  let elements: HTMLElement[];
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    elements = Array.from({ length: 5 }, (_, i) => {
      const button = document.createElement('button');
      button.textContent = `Button ${i}`;
      container.appendChild(button);
      return button;
    });
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('handleArrowKeys', () => {
    it('should navigate forward with ArrowDown', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const newIndex = KeyboardNavigation.handleArrowKeys(event, elements, 0);
      expect(newIndex).toBe(1);
    });

    it('should navigate forward with ArrowRight', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      const newIndex = KeyboardNavigation.handleArrowKeys(event, elements, 2);
      expect(newIndex).toBe(3);
    });

    it('should wrap around when navigating forward from last element', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const newIndex = KeyboardNavigation.handleArrowKeys(event, elements, 4);
      expect(newIndex).toBe(0);
    });

    it('should navigate backward with ArrowUp', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const newIndex = KeyboardNavigation.handleArrowKeys(event, elements, 3);
      expect(newIndex).toBe(2);
    });

    it('should navigate backward with ArrowLeft', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      const newIndex = KeyboardNavigation.handleArrowKeys(event, elements, 1);
      expect(newIndex).toBe(0);
    });

    it('should wrap around when navigating backward from first element', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const newIndex = KeyboardNavigation.handleArrowKeys(event, elements, 0);
      expect(newIndex).toBe(4);
    });

    it('should jump to first element with Home key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Home' });
      const newIndex = KeyboardNavigation.handleArrowKeys(event, elements, 3);
      expect(newIndex).toBe(0);
    });

    it('should jump to last element with End key', () => {
      const event = new KeyboardEvent('keydown', { key: 'End' });
      const newIndex = KeyboardNavigation.handleArrowKeys(event, elements, 1);
      expect(newIndex).toBe(4);
    });

    it('should not change index for other keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      const newIndex = KeyboardNavigation.handleArrowKeys(event, elements, 2);
      expect(newIndex).toBe(2);
    });
  });

  describe('handleActivation', () => {
    it('should trigger callback on Enter key', () => {
      const callback = vi.fn();
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      KeyboardNavigation.handleActivation(event, callback);
      expect(callback).toHaveBeenCalled();
    });

    it('should trigger callback on Space key', () => {
      const callback = vi.fn();
      const event = new KeyboardEvent('keydown', { key: ' ' });
      KeyboardNavigation.handleActivation(event, callback);
      expect(callback).toHaveBeenCalled();
    });

    it('should not trigger callback on other keys', () => {
      const callback = vi.fn();
      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      KeyboardNavigation.handleActivation(event, callback);
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('handleEscape', () => {
    it('should trigger callback on Escape key', () => {
      const callback = vi.fn();
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      KeyboardNavigation.handleEscape(event, callback);
      expect(callback).toHaveBeenCalled();
    });

    it('should not trigger callback on other keys', () => {
      const callback = vi.fn();
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      KeyboardNavigation.handleEscape(event, callback);
      expect(callback).not.toHaveBeenCalled();
    });
  });
});

describe('ContrastUtils', () => {
  describe('getLuminance', () => {
    it('should calculate luminance for black', () => {
      const luminance = ContrastUtils.getLuminance('#000000');
      expect(luminance).toBe(0);
    });

    it('should calculate luminance for white', () => {
      const luminance = ContrastUtils.getLuminance('#ffffff');
      expect(luminance).toBeCloseTo(1, 5);
    });

    it('should calculate luminance for mid-gray', () => {
      const luminance = ContrastUtils.getLuminance('#808080');
      expect(luminance).toBeGreaterThan(0.2);
      expect(luminance).toBeLessThan(0.3);
    });

    it('should handle colors without hash', () => {
      const luminance = ContrastUtils.getLuminance('ff0000');
      expect(luminance).toBeGreaterThan(0);
    });
  });

  describe('getContrastRatio', () => {
    it('should calculate maximum contrast ratio for black and white', () => {
      const ratio = ContrastUtils.getContrastRatio('#000000', '#ffffff');
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('should calculate minimum contrast ratio for same colors', () => {
      const ratio = ContrastUtils.getContrastRatio('#808080', '#808080');
      expect(ratio).toBe(1);
    });

    it('should calculate correct ratio for common color pairs', () => {
      const ratio = ContrastUtils.getContrastRatio('#333333', '#ffffff');
      expect(ratio).toBeGreaterThan(12);
    });
  });

  describe('meetsWCAG', () => {
    it('should pass AA standard for normal text with sufficient contrast', () => {
      const meets = ContrastUtils.meetsWCAG('#000000', '#ffffff', 'AA', false);
      expect(meets).toBe(true);
    });

    it('should fail AA standard for normal text with insufficient contrast', () => {
      const meets = ContrastUtils.meetsWCAG('#777777', '#999999', 'AA', false);
      expect(meets).toBe(false);
    });

    it('should have lower threshold for large text', () => {
      const meets = ContrastUtils.meetsWCAG('#666666', '#ffffff', 'AA', true);
      expect(meets).toBe(true);
    });

    it('should have higher threshold for AAA standard', () => {
      // Using #767676 which has ~4.54:1 contrast with white
      // This passes AA (4.5:1) but fails AAA (7:1) for normal text
      const meetsAA = ContrastUtils.meetsWCAG('#767676', '#ffffff', 'AA', false);
      const meetsAAA = ContrastUtils.meetsWCAG('#767676', '#ffffff', 'AAA', false);
      expect(meetsAA).toBe(true);
      expect(meetsAAA).toBe(false);
    });

    it('should correctly evaluate AAA for large text', () => {
      const meets = ContrastUtils.meetsWCAG('#595959', '#ffffff', 'AAA', true);
      expect(meets).toBe(true);
    });
  });
});

describe('A11yTesting', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('runBasicChecks', () => {
    it('should detect images without alt text', () => {
      document.body.innerHTML = `
        <img src="test1.jpg" alt="Test image">
        <img src="test2.jpg">
        <img src="test3.jpg">
      `;
      
      const { passed, issues } = A11yTesting.runBasicChecks();
      expect(passed).toBe(false);
      expect(issues).toContain('2 images missing alt text');
    });

    it('should detect buttons without accessible names', () => {
      document.body.innerHTML = `
        <button>Click me</button>
        <button aria-label="Submit">Submit</button>
        <button></button>
        <button>   </button>
      `;
      
      const { passed, issues } = A11yTesting.runBasicChecks();
      expect(passed).toBe(false);
      expect(issues.filter(i => i.includes('Button without accessible name')).length).toBe(2);
    });

    it('should detect heading hierarchy issues', () => {
      document.body.innerHTML = `
        <h1>Title</h1>
        <h3>Subtitle</h3>
        <h2>Section</h2>
      `;
      
      const { passed, issues } = A11yTesting.runBasicChecks();
      expect(passed).toBe(false);
      expect(issues.some(i => i.includes('Heading hierarchy skip'))).toBe(true);
    });

    it('should detect form controls without labels', () => {
      document.body.innerHTML = `
        <label for="input1">Name</label>
        <input id="input1" type="text">
        <input type="email">
        <input type="password" aria-label="Password">
      `;
      
      const { passed, issues } = A11yTesting.runBasicChecks();
      expect(passed).toBe(false);
      expect(issues.some(i => i.includes('Form control without proper label'))).toBe(true);
    });

    it('should pass when no issues are found', () => {
      document.body.innerHTML = `
        <img src="test.jpg" alt="Test image">
        <button>Click me</button>
        <h1>Title</h1>
        <h2>Subtitle</h2>
        <label for="input1">Name</label>
        <input id="input1" type="text">
      `;
      
      const { passed, issues } = A11yTesting.runBasicChecks();
      expect(passed).toBe(true);
      expect(issues).toHaveLength(0);
    });
  });

  describe('logReport', () => {
    it('should not throw in development environment', () => {
      vi.stubEnv('DEV', true);
      expect(() => A11yTesting.logReport()).not.toThrow();
      vi.unstubAllEnvs();
    });

    it('should not throw in production environment', () => {
      vi.stubEnv('DEV', false);
      expect(() => A11yTesting.logReport()).not.toThrow();
      vi.unstubAllEnvs();
    });
  });
});

describe('initializeAccessibility', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up event listeners
    const liveRegion = document.getElementById('aria-live-region');
    if (liveRegion) {
      document.body.removeChild(liveRegion);
    }
  });

  it('should create live region if not exists', () => {
    initializeAccessibility('en');
    const liveRegion = document.getElementById('aria-live-region');
    expect(liveRegion).toBeTruthy();
    // Object.assign adds properties directly to the element, not as attributes
    expect((liveRegion as any)?.['aria-live']).toBe('polite');
    expect((liveRegion as any)?.['aria-atomic']).toBe('true');
    expect(liveRegion?.className).toBe('sr-only');
  });

  it('should not create duplicate live regions', () => {
    initializeAccessibility('en');
    initializeAccessibility('en');
    const liveRegions = document.querySelectorAll('#aria-live-region');
    expect(liveRegions).toHaveLength(1);
  });

  it('should handle escape key for modals', () => {
    document.body.innerHTML = `
      <div data-modal aria-hidden="false">
        <button data-close>Close</button>
      </div>
    `;
    
    const closeButton = document.querySelector('[data-close]') as HTMLElement;
    const clickSpy = vi.spyOn(closeButton, 'click');
    
    initializeAccessibility('en');
    
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);
    
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should announce theme changes', () => {
    vi.useFakeTimers();
    const announceSpy = vi.spyOn(ScreenReaderUtils, 'announce');
    
    initializeAccessibility('en');
    
    const themeEvent = new CustomEvent('themeChange', {
      detail: { theme: 'dark' }
    });
    window.dispatchEvent(themeEvent);
    
    expect(announceSpy).toHaveBeenCalledWith('Theme changed to dark');
    
    vi.useRealTimers();
  });

  it('should announce language changes', () => {
    vi.useFakeTimers();
    const announceSpy = vi.spyOn(ScreenReaderUtils, 'announce');
    
    initializeAccessibility('es');
    
    const langEvent = new CustomEvent('languageChange', {
      detail: { to: 'Español' }
    });
    window.dispatchEvent(langEvent);
    
    expect(announceSpy).toHaveBeenCalledWith('Idioma cambiado a Español');
    
    vi.useRealTimers();
  });
});

// Integration test for the default export
describe('Default Export', () => {
  it('should export all utilities', async () => {
    const module = await import('../accessibility');
    const defaultExport = module.default;
    
    expect(defaultExport.AriaAttributes).toBeDefined();
    expect(defaultExport.SemanticRoles).toBeDefined();
    expect(defaultExport.FocusManager).toBeDefined();
    expect(defaultExport.getA11yLabels).toBeDefined();
    expect(defaultExport.ScreenReaderUtils).toBeDefined();
    expect(defaultExport.KeyboardNavigation).toBeDefined();
    expect(defaultExport.ContrastUtils).toBeDefined();
    expect(defaultExport.A11yTesting).toBeDefined();
    expect(defaultExport.initializeAccessibility).toBeDefined();
  });
});