/**
 * @fileoverview Unit tests for theme-manager.ts
 * @author MADFAM
 * @version 0.5.0
 *
 * Tests the theme management system including:
 * - Theme switching (light/dark/auto)
 * - LocalStorage persistence
 * - System preference detection
 * - CSS variable application
 * - Event dispatching
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ThemeManager, themes } from '../../../src/utils/theme-manager';

describe('Theme Manager', () => {
  // Mock localStorage
  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };

  // Mock matchMedia
  const mockMatchMedia = vi.fn();
  const mockMediaQueryList = {
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };

  // Mock document
  const mockDocumentElement = {
    style: {
      setProperty: vi.fn(),
    },
    setAttribute: vi.fn(),
    classList: {
      add: vi.fn(),
    },
  };

  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks();

    // Setup localStorage mock
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    // Setup matchMedia mock
    mockMatchMedia.mockReturnValue(mockMediaQueryList);
    Object.defineProperty(window, 'matchMedia', {
      value: mockMatchMedia,
      writable: true,
    });

    // Setup document mock
    Object.defineProperty(document, 'documentElement', {
      value: mockDocumentElement,
      writable: true,
    });

    // Reset window event listeners
    window.dispatchEvent = vi.fn();
  });

  afterEach(() => {
    // Clean up
    mockLocalStorage.getItem.mockReset();
    mockLocalStorage.setItem.mockReset();
    mockMatchMedia.mockReset();
    mockMediaQueryList.matches = false;
  });

  /**
   * Test initialization
   */
  describe('initialize', () => {
    it('should initialize with saved theme preference', () => {
      mockLocalStorage.getItem
        .mockReturnValueOnce('dark') // theme
        .mockReturnValueOnce('magazine'); // variant

      ThemeManager.initialize();

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
        'testigos-theme-preference'
      );
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
        'testigos-theme-variant'
      );
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith(
        'theme-initialized'
      );
    });

    it('should initialize with defaults when no saved preferences', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      ThemeManager.initialize();

      // Should apply auto theme by default
      expect(mockMatchMedia).toHaveBeenCalledWith(
        '(prefers-color-scheme: dark)'
      );
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme-selection',
        'auto'
      );
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme-variant',
        'magazine'
      );
    });

    it('should setup system theme listener', () => {
      mockLocalStorage.getItem.mockReturnValue(null); // Force defaults

      ThemeManager.initialize();

      expect(mockMatchMedia).toHaveBeenCalledWith(
        '(prefers-color-scheme: dark)'
      );
      expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      );
    });

    it('should setup reduced motion listener', () => {
      mockLocalStorage.getItem.mockReturnValue(null); // Force defaults

      ThemeManager.initialize();

      expect(mockMatchMedia).toHaveBeenCalledWith(
        '(prefers-reduced-motion: reduce)'
      );
    });

    it('should handle server-side rendering', () => {
      // Simulate SSR by making window undefined
      const originalWindow = global.window;
      // @ts-expect-error - Mocking for test
      global.window = undefined;

      // Should not throw
      expect(() => ThemeManager.initialize()).not.toThrow();

      // Restore
      (global as typeof globalThis & { window: Window }).window =
        originalWindow;
    });
  });

  /**
   * Test theme preference management
   */
  describe('Theme Preferences', () => {
    it('should get saved theme', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      const theme = ThemeManager.getSavedTheme();

      expect(theme).toBe('dark');
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
        'testigos-theme-preference'
      );
    });

    it('should return auto as default theme', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const theme = ThemeManager.getSavedTheme();

      expect(theme).toBe('auto');
    });

    it('should save theme preference', () => {
      ThemeManager.saveTheme('dark');

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'testigos-theme-preference',
        'dark'
      );
    });

    it('should get saved variant', () => {
      mockLocalStorage.getItem.mockReturnValue('minimal');

      const variant = ThemeManager.getSavedVariant();

      expect(variant).toBe('minimal');
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
        'testigos-theme-variant'
      );
    });

    it('should return magazine as default variant', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const variant = ThemeManager.getSavedVariant();

      expect(variant).toBe('magazine');
    });

    it('should save variant preference', () => {
      ThemeManager.saveVariant('accessibility');

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'testigos-theme-variant',
        'accessibility'
      );
    });
  });

  /**
   * Test theme application
   */
  describe('applyTheme', () => {
    it('should apply light theme', () => {
      ThemeManager.applyTheme('light');

      // Check CSS variables are set
      const lightColors = themes.light;
      Object.entries(lightColors).forEach(([property, value]) => {
        expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
          property,
          value
        );
      });

      // Check data attributes
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'light'
      );
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme-selection',
        'light'
      );
    });

    it('should apply dark theme', () => {
      ThemeManager.applyTheme('dark');

      // Check CSS variables are set
      const darkColors = themes.dark;
      Object.entries(darkColors).forEach(([property, value]) => {
        expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
          property,
          value
        );
      });

      // Check data attributes
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'dark'
      );
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme-selection',
        'dark'
      );
    });

    it('should resolve auto theme based on system preference', () => {
      // System prefers dark
      mockMediaQueryList.matches = true;

      ThemeManager.applyTheme('auto');

      expect(mockMatchMedia).toHaveBeenCalledWith(
        '(prefers-color-scheme: dark)'
      );
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'dark'
      );
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme-selection',
        'auto'
      );
    });

    it('should apply theme with variant', () => {
      ThemeManager.applyTheme('light', 'minimal');

      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme-variant',
        'minimal'
      );
    });

    it('should dispatch theme change event', () => {
      ThemeManager.applyTheme('dark', 'magazine');

      expect(window.dispatchEvent).toHaveBeenCalled();
      const mockDispatchEvent = window.dispatchEvent as ReturnType<
        typeof vi.fn
      >;
      const mockCalls = mockDispatchEvent.mock.calls;
      expect(mockCalls.length).toBeGreaterThan(0);
      const firstCallArgs = mockCalls[0];
      const customEvent = firstCallArgs[0] as CustomEvent;
      expect(customEvent.type).toBe('themeChange');
      expect(customEvent.detail).toEqual({
        theme: 'dark',
        selection: 'dark',
        variant: 'magazine',
      });
    });

    it('should handle server-side rendering', () => {
      const originalDocument = global.document;
      const globalWithDocument = global as typeof globalThis & {
        document?: Document;
      };
      // @ts-expect-error - Mocking for test
      globalWithDocument.document = undefined;

      // Should not throw
      expect(() => ThemeManager.applyTheme('light')).not.toThrow();

      // Restore
      globalWithDocument.document = originalDocument;
    });
  });

  /**
   * Test theme toggling
   */
  describe('toggleTheme', () => {
    it('should cycle through themes: light -> dark -> auto', () => {
      // Start with light
      mockLocalStorage.getItem.mockReturnValue('light');

      let newTheme = ThemeManager.toggleTheme();
      expect(newTheme).toBe('dark');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'testigos-theme-preference',
        'dark'
      );

      // Mock dark as current
      mockLocalStorage.getItem.mockReturnValue('dark');

      newTheme = ThemeManager.toggleTheme();
      expect(newTheme).toBe('auto');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'testigos-theme-preference',
        'auto'
      );

      // Mock auto as current
      mockLocalStorage.getItem.mockReturnValue('auto');

      newTheme = ThemeManager.toggleTheme();
      expect(newTheme).toBe('light');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'testigos-theme-preference',
        'light'
      );
    });

    it('should apply theme after toggling', () => {
      mockLocalStorage.getItem
        .mockReturnValueOnce('light') // current theme
        .mockReturnValueOnce('magazine'); // variant

      ThemeManager.toggleTheme();

      // Should have applied the new theme
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'dark'
      );
    });
  });

  /**
   * Test theme setters
   */
  describe('setTheme and setVariant', () => {
    it('should set specific theme', () => {
      mockLocalStorage.getItem.mockReturnValue('magazine');

      ThemeManager.setTheme('dark');

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'testigos-theme-preference',
        'dark'
      );
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'dark'
      );
    });

    it('should set specific variant', () => {
      mockLocalStorage.getItem.mockReturnValue('light');

      ThemeManager.setVariant('accessibility');

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'testigos-theme-variant',
        'accessibility'
      );
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme-variant',
        'accessibility'
      );
    });
  });

  /**
   * Test theme state getters
   */
  describe('Theme State', () => {
    it('should get current resolved theme', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      const current = ThemeManager.getCurrentTheme();

      expect(current).toBe('dark');
    });

    it('should resolve auto theme to system preference', () => {
      mockLocalStorage.getItem.mockReturnValue('auto');
      mockMediaQueryList.matches = true; // System prefers dark

      const current = ThemeManager.getCurrentTheme();

      expect(current).toBe('dark');
    });

    it('should check if theme is dark', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');

      expect(ThemeManager.isDark()).toBe(true);
      expect(ThemeManager.isLight()).toBe(false);
    });

    it('should check if theme is light', () => {
      mockLocalStorage.getItem.mockReturnValue('light');

      expect(ThemeManager.isLight()).toBe(true);
      expect(ThemeManager.isDark()).toBe(false);
    });

    it('should get theme icon', () => {
      mockLocalStorage.getItem.mockReturnValue('light');
      expect(ThemeManager.getThemeIcon()).toBe('☀️');

      mockLocalStorage.getItem.mockReturnValue('dark');
      expect(ThemeManager.getThemeIcon()).toBe('🌙');

      mockLocalStorage.getItem.mockReturnValue('auto');
      expect(ThemeManager.getThemeIcon()).toBe('🔄');
    });

    it('should get theme description', () => {
      mockLocalStorage.getItem.mockReturnValue('light');
      expect(ThemeManager.getThemeDescription()).toBe('Light theme active');

      mockLocalStorage.getItem.mockReturnValue('dark');
      expect(ThemeManager.getThemeDescription()).toBe('Dark theme active');

      mockLocalStorage.getItem.mockReturnValue('auto');
      expect(ThemeManager.getThemeDescription()).toBe(
        'Auto theme (follows system preference)'
      );
    });
  });

  /**
   * Test system theme change listener
   */
  describe('System Theme Listener', () => {
    it('should update theme when system preference changes', () => {
      mockLocalStorage.getItem.mockReturnValue('auto');

      ThemeManager.initialize();

      // Get the change handler
      const changeHandler = mockMediaQueryList.addEventListener.mock.calls.find(
        (call) => call[0] === 'change'
      )?.[1] as ((event: { matches: boolean }) => void) | undefined;

      expect(changeHandler).toBeDefined();

      // Simulate system theme change to dark
      mockMediaQueryList.matches = true;
      if (changeHandler !== undefined) {
        changeHandler({ matches: true });
      }

      // Should have applied dark theme
      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'dark'
      );
    });

    it('should not update theme if not in auto mode', () => {
      mockLocalStorage.getItem.mockReturnValue('light');

      ThemeManager.initialize();

      // Get the change handler
      const changeHandler = mockMediaQueryList.addEventListener.mock.calls.find(
        (call) => call[0] === 'change'
      )?.[1] as ((event: { matches: boolean }) => void) | undefined;

      // Clear previous calls
      mockDocumentElement.setAttribute.mockClear();

      // Simulate system theme change
      mockMediaQueryList.matches = true;
      if (changeHandler !== undefined) {
        changeHandler({ matches: true });
      }

      // Should not have changed theme
      const themeCall = mockDocumentElement.setAttribute.mock.calls.find(
        (call) => call[0] === 'data-theme'
      );
      expect(themeCall).toBeUndefined();
    });

    it('should handle legacy addListener API', () => {
      mockLocalStorage.getItem.mockReturnValue(null); // Force defaults

      // Create a new mock without addEventListener
      const legacyMediaQueryList = {
        matches: false,
        addListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockReturnValue(legacyMediaQueryList);

      ThemeManager.initialize();

      expect(legacyMediaQueryList.addListener).toHaveBeenCalled();
    });
  });

  /**
   * Test reduced motion listener
   */
  describe('Reduced Motion', () => {
    it('should set reduced motion attribute', () => {
      mockLocalStorage.getItem.mockReturnValue(null); // Force defaults

      const reducedMotionQuery = {
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockImplementation((query) => {
        if (query === '(prefers-reduced-motion: reduce)') {
          return reducedMotionQuery;
        }
        return mockMediaQueryList;
      });

      ThemeManager.initialize();

      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-reduced-motion',
        'true'
      );
    });

    it('should update reduced motion on change', () => {
      mockLocalStorage.getItem.mockReturnValue(null); // Force defaults

      const reducedMotionQuery = {
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMatchMedia.mockImplementation((query) => {
        if (query === '(prefers-reduced-motion: reduce)') {
          return reducedMotionQuery;
        }
        return mockMediaQueryList;
      });

      ThemeManager.initialize();

      // Get the change handler
      const changeHandler = reducedMotionQuery.addEventListener.mock
        .calls[0][1] as (event: { matches: boolean }) => void;

      // Simulate preference change
      if (changeHandler !== undefined) {
        changeHandler({ matches: true });
      }

      expect(mockDocumentElement.setAttribute).toHaveBeenCalledWith(
        'data-reduced-motion',
        'true'
      );
    });
  });

  /**
   * Test theme color values
   */
  describe('Theme Colors', () => {
    it('should have all required CSS variables in light theme', () => {
      const requiredVars = [
        '--bg-primary',
        '--bg-secondary',
        '--text-primary',
        '--text-secondary',
        '--madfam-yellow',
        '--border-default',
        '--shadow-sm',
      ];

      requiredVars.forEach((varName) => {
        expect(themes.light).toHaveProperty(varName);
        expect(themes.light[varName as keyof typeof themes.light]).toBeTruthy();
      });
    });

    it('should have all required CSS variables in dark theme', () => {
      const requiredVars = [
        '--bg-primary',
        '--bg-secondary',
        '--text-primary',
        '--text-secondary',
        '--madfam-yellow',
        '--border-default',
        '--shadow-sm',
      ];

      requiredVars.forEach((varName) => {
        expect(themes.dark).toHaveProperty(varName);
        expect(themes.dark[varName as keyof typeof themes.dark]).toBeTruthy();
      });
    });

    it('should have proper contrast values', () => {
      // Light theme should have dark text on light background
      expect(themes.light['--bg-primary']).toBe('#ffffff');
      expect(themes.light['--text-primary']).toBe('#212121');

      // Dark theme should have light text on dark background
      expect(themes.dark['--bg-primary']).toBe('#0a0a0b');
      expect(themes.dark['--text-primary']).toBe('#ffffff');
    });
  });
});
