/**
 * Advanced Theme Management System for Testigos de Solarpunk
 * Extends existing DIY Magazine Cutout aesthetic with enterprise-grade theming
 *
 * @fileoverview Theme manager with light/dark/auto switching and persistence
 * @author MADFAM
 * @version 0.3.0+themes
 */

export type Theme = 'light' | 'dark' | 'auto';
export type ThemeVariant = 'magazine' | 'minimal' | 'accessibility';

/**
 * Color theme definitions extending existing MADFAM design tokens
 * Integrates with the current DIY Magazine Cutout aesthetic
 */
interface ThemeColors {
  // Base colors from existing MADFAM tokens
  '--bg-primary': string;
  '--bg-secondary': string;
  '--bg-tertiary': string;
  '--bg-elevated': string;

  // Text colors with WCAG AAA compliance
  '--text-primary': string;
  '--text-secondary': string;
  '--text-tertiary': string;
  '--text-disabled': string;

  // MADFAM brand colors
  '--madfam-yellow': string;
  '--madfam-green': string;
  '--madfam-purple': string;
  '--madfam-blue': string;

  // Accent colors
  '--accent-primary': string;
  '--accent-secondary': string;
  '--accent-tertiary': string;

  // Interactive states
  '--hover-overlay': string;
  '--focus-overlay': string;
  '--active-overlay': string;

  // Borders and dividers
  '--border-subtle': string;
  '--border-default': string;
  '--border-strong': string;

  // Shadows and elevation
  '--shadow-sm': string;
  '--shadow-md': string;
  '--shadow-lg': string;
  '--shadow-glow': string;

  // Magazine cutout specific
  '--cutout-shadow': string;
  '--tape-color': string;
  '--paper-texture': string;
  '--torn-edge-color': string;
}

/**
 * Theme definitions compatible with existing CSS variables
 * Preserves the DIY Magazine Cutout aesthetic while enabling switching
 */
export const themes: Record<'light' | 'dark', ThemeColors> = {
  light: {
    // Base backgrounds
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f5f5f5',
    '--bg-tertiary': '#eeeeee',
    '--bg-elevated': '#e0e0e0',

    // Text colors for light theme
    '--text-primary': '#212121',
    '--text-secondary': 'rgba(0, 0, 0, 0.87)',
    '--text-tertiary': 'rgba(0, 0, 0, 0.6)',
    '--text-disabled': 'rgba(0, 0, 0, 0.38)',

    // MADFAM brand colors (consistent across themes)
    '--madfam-yellow': '#FFC107',
    '--madfam-green': '#4CAF50',
    '--madfam-purple': '#663399',
    '--madfam-blue': '#2196F3',

    // Accent colors
    '--accent-primary': '#FFC107',
    '--accent-secondary': '#4CAF50',
    '--accent-tertiary': '#663399',

    // Interactive states
    '--hover-overlay': 'rgba(0, 0, 0, 0.04)',
    '--focus-overlay': 'rgba(255, 193, 7, 0.24)',
    '--active-overlay': 'rgba(0, 0, 0, 0.08)',

    // Borders for light theme
    '--border-subtle': 'var(--border-default)',
    '--border-default': 'rgba(0, 0, 0, 0.23)',
    '--border-strong': 'rgba(0, 0, 0, 0.35)',

    // Shadows for light theme
    '--shadow-sm':
      '0 1px 3px var(--border-default), 0 1px 2px var(--shadow-overlay-dark)',
    '--shadow-md':
      '0 4px 6px var(--torn-edge-color), 0 2px 4px var(--shadow-overlay-medium)',
    '--shadow-lg':
      '0 10px 25px var(--cutout-shadow), 0 5px 10px var(--shadow-overlay-strong)',
    '--shadow-glow': '0 0 20px rgba(255, 193, 7, 0.4)',

    // Magazine cutout aesthetic for light theme
    '--cutout-shadow': 'var(--cutout-shadow)',
    '--tape-color': 'rgba(255, 193, 7, 0.7)',
    '--paper-texture': 'rgba(76, 175, 80, 0.03)',
    '--torn-edge-color': 'var(--torn-edge-color)',
  },
  dark: {
    // Base backgrounds (from existing unified-dark-theme.css)
    '--bg-primary': '#0a0a0b',
    '--bg-secondary': '#141416',
    '--bg-tertiary': '#1c1c1f',
    '--bg-elevated': '#242428',

    // Text colors (from existing dark theme)
    '--text-primary': '#ffffff',
    '--text-secondary': 'rgba(255, 255, 255, 0.87)',
    '--text-tertiary': 'rgba(255, 255, 255, 0.6)',
    '--text-disabled': 'rgba(255, 255, 255, 0.38)',

    // MADFAM brand colors for dark theme
    '--madfam-yellow': '#ffc107',
    '--madfam-green': '#66bb6a',
    '--madfam-purple': '#9575cd',
    '--madfam-blue': '#42a5f5',

    // Accent colors
    '--accent-primary': '#ffc107',
    '--accent-secondary': '#66bb6a',
    '--accent-tertiary': '#9575cd',

    // Interactive states
    '--hover-overlay': 'rgba(255, 255, 255, 0.08)',
    '--focus-overlay': 'rgba(255, 193, 7, 0.24)',
    '--active-overlay': 'rgba(255, 255, 255, 0.16)',

    // Borders for dark theme
    '--border-subtle': 'rgba(255, 255, 255, 0.2)',
    '--border-default': 'rgba(255, 255, 255, 0.3)',
    '--border-strong': 'rgba(255, 255, 255, 0.5)',

    // Shadows for dark theme
    '--shadow-sm':
      '0 1px 3px var(--shadow-overlay-dark-mode), 0 1px 2px rgba(0, 0, 0, 0.8)',
    '--shadow-md': '0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.6)',
    '--shadow-lg':
      '0 10px 25px var(--shadow-overlay-dark-mode), 0 5px 10px var(--shadow-overlay-dark-stronger)',
    '--shadow-glow': '0 0 20px rgba(255, 193, 7, 0.3)',

    // Magazine cutout aesthetic for dark theme
    '--cutout-shadow': 'rgba(0, 0, 0, 0.3)',
    '--tape-color': 'rgba(255, 213, 79, 0.8)',
    '--paper-texture': 'rgba(102, 187, 106, 0.05)',
    '--torn-edge-color': 'rgba(255, 255, 255, 0.1)',
  },
};

/**
 * Theme management class with enterprise-grade features
 * Integrates with existing Testigos de Solarpunk architecture
 */
export class ThemeManager {
  private static readonly STORAGE_KEY = 'testigos-theme-preference';
  private static readonly VARIANT_KEY = 'testigos-theme-variant';
  private static readonly SYSTEM_QUERY = '(prefers-color-scheme: dark)';

  /**
   * Initialize theme system
   * Sets up theme from saved preferences or system default
   */
  static initialize(): void {
    if (typeof window === 'undefined') return;

    const savedTheme = this.getSavedTheme();
    const savedVariant = this.getSavedVariant();

    this.applyTheme(savedTheme, savedVariant);
    this.setupSystemThemeListener();

    // Set up prefers-reduced-motion detection
    this.setupReducedMotionListener();

    // Add theme class to html element for CSS targeting
    document.documentElement.classList.add('theme-initialized');
  }

  /**
   * Get saved theme preference
   */
  static getSavedTheme(): Theme {
    if (typeof localStorage === 'undefined') return 'auto';
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored !== null ? (stored as Theme) : 'auto';
  }

  /**
   * Get saved theme variant preference
   */
  static getSavedVariant(): ThemeVariant {
    if (typeof localStorage === 'undefined') return 'magazine';
    const stored = localStorage.getItem(this.VARIANT_KEY);
    return stored !== null ? (stored as ThemeVariant) : 'magazine';
  }

  /**
   * Save theme preference to localStorage
   */
  static saveTheme(theme: Theme): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
  }

  /**
   * Save theme variant preference to localStorage
   */
  static saveVariant(variant: ThemeVariant): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.VARIANT_KEY, variant);
    }
  }

  /**
   * Apply theme and variant to the document
   * Integrates with existing CSS custom properties
   */
  static applyTheme(theme: Theme, variant: ThemeVariant = 'magazine'): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    let resolvedTheme: 'light' | 'dark';

    // Resolve auto theme based on system preference
    if (theme === 'auto') {
      const prefersDark = window.matchMedia?.(this.SYSTEM_QUERY).matches;
      resolvedTheme = prefersDark ? 'dark' : 'light';
    } else {
      resolvedTheme = theme;
    }

    // Apply theme colors to CSS custom properties
    const colors = themes[resolvedTheme];
    Object.entries(colors).forEach(([property, value]) => {
      root.style.setProperty(property, value as string);
    });

    // Set data attributes for CSS targeting
    root.setAttribute('data-theme', resolvedTheme);
    root.setAttribute('data-theme-selection', theme);
    root.setAttribute('data-theme-variant', variant);

    // Dispatch theme change event for components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('themeChange', {
          detail: { theme: resolvedTheme, selection: theme, variant },
        })
      );
    }
  }

  /**
   * Toggle between light, dark, and auto themes
   */
  static toggleTheme(): Theme {
    const current = this.getSavedTheme();
    const themeOrder: Theme[] = ['light', 'dark', 'auto'];
    const currentIndex = themeOrder.indexOf(current);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const nextTheme = themeOrder[nextIndex];

    this.saveTheme(nextTheme);
    this.applyTheme(nextTheme, this.getSavedVariant());

    return nextTheme;
  }

  /**
   * Set specific theme
   */
  static setTheme(theme: Theme): void {
    this.saveTheme(theme);
    this.applyTheme(theme, this.getSavedVariant());
  }

  /**
   * Set theme variant
   */
  static setVariant(variant: ThemeVariant): void {
    this.saveVariant(variant);
    this.applyTheme(this.getSavedTheme(), variant);
  }

  /**
   * Get current resolved theme (not the preference)
   */
  static getCurrentTheme(): 'light' | 'dark' {
    const selection = this.getSavedTheme();
    if (selection === 'auto') {
      return window.matchMedia?.(this.SYSTEM_QUERY).matches ? 'dark' : 'light';
    }
    return selection;
  }

  /**
   * Set up listener for system theme changes
   */
  private static setupSystemThemeListener(): void {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    )
      return;

    const mediaQuery = window.matchMedia(this.SYSTEM_QUERY);
    const handleChange = (_e: MediaQueryListEvent): void => {
      if (this.getSavedTheme() === 'auto') {
        this.applyTheme('auto', this.getSavedVariant());
      }
    };

    // Use the modern addEventListener if available, fallback to deprecated addListener
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Legacy browser support - addListener is deprecated but needed for older browsers
      const legacyMediaQuery = mediaQuery as MediaQueryList & {
        addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
      };
      if (legacyMediaQuery.addListener !== undefined) {
        legacyMediaQuery.addListener(handleChange);
      }
    }
  }

  /**
   * Set up listener for reduced motion preference
   */
  private static setupReducedMotionListener(): void {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    )
      return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent): void => {
      document.documentElement.setAttribute(
        'data-reduced-motion',
        e.matches.toString()
      );
    };

    // Set initial state
    handleChange({ matches: mediaQuery.matches } as MediaQueryListEvent);

    // Listen for changes
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Legacy browser support - addListener is deprecated but needed for older browsers
      const legacyMediaQuery = mediaQuery as MediaQueryList & {
        addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
      };
      if (legacyMediaQuery.addListener !== undefined) {
        legacyMediaQuery.addListener(handleChange);
      }
    }
  }

  /**
   * Check if current theme is dark
   */
  static isDark(): boolean {
    return this.getCurrentTheme() === 'dark';
  }

  /**
   * Check if current theme is light
   */
  static isLight(): boolean {
    return this.getCurrentTheme() === 'light';
  }

  /**
   * Get theme icon for current state
   */
  static getThemeIcon(): string {
    const selection = this.getSavedTheme();
    switch (selection) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'auto':
        return '🔄';
      default:
        return '🔄';
    }
  }

  /**
   * Get theme description for accessibility
   */
  static getThemeDescription(): string {
    const selection = this.getSavedTheme();
    switch (selection) {
      case 'light':
        return 'Light theme active';
      case 'dark':
        return 'Dark theme active';
      case 'auto':
        return 'Auto theme (follows system preference)';
      default:
        return 'Auto theme';
    }
  }
}
