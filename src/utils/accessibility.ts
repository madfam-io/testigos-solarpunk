/**
 * Accessibility Utilities - Testigos de Solarpunk
 * Enterprise-grade accessibility helper functions and constants
 *
 * @fileoverview Comprehensive accessibility utilities for WCAG AAA compliance
 * @author MADFAM
 * @version 0.3.0+a11y
 */

import { useTranslations } from '@/i18n/config';
import type { Language } from '@/i18n/config';

/**
 * ARIA attribute generators for consistent accessibility
 */
export const AriaAttributes = {
  /**
   * Generate ARIA attributes for interactive buttons
   */
  button: (label: string, isPressed?: boolean, isExpanded?: boolean) => ({
    role: 'button',
    'aria-label': label,
    'aria-pressed': isPressed?.toString(),
    'aria-expanded': isExpanded?.toString(),
    tabindex: '0',
  }),

  /**
   * Generate ARIA attributes for navigation links
   */
  navLink: (label: string, isCurrent?: boolean) => ({
    'aria-label': label,
    'aria-current': isCurrent === true ? 'page' : undefined,
  }),

  /**
   * Generate ARIA attributes for form controls
   */
  formControl: (
    label: string,
    isRequired?: boolean,
    isInvalid?: boolean,
    describedBy?: string
  ) => ({
    'aria-label': label,
    'aria-required': isRequired?.toString(),
    'aria-invalid': isInvalid?.toString(),
    'aria-describedby': describedBy,
  }),

  /**
   * Generate ARIA attributes for images
   */
  image: (alt: string, isDecorative = false) => ({
    alt: isDecorative ? '' : alt,
    role: isDecorative ? 'presentation' : undefined,
    'aria-hidden': isDecorative ? 'true' : undefined,
  }),

  /**
   * Generate ARIA attributes for modals/dialogs
   */
  dialog: (label: string, describedBy?: string) => ({
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': label,
    'aria-describedby': describedBy,
    tabindex: '-1',
  }),

  /**
   * Generate ARIA attributes for live regions
   */
  liveRegion: (politeness: 'polite' | 'assertive' = 'polite') => ({
    'aria-live': politeness,
    'aria-atomic': 'true',
  }),

  /**
   * Generate ARIA attributes for expandable content
   */
  expandable: (label: string, isExpanded: boolean, controls?: string) => ({
    'aria-label': label,
    'aria-expanded': isExpanded.toString(),
    'aria-controls': controls,
    tabindex: '0',
  }),
};

/**
 * Semantic HTML role definitions for better screen reader support
 */
export const SemanticRoles = {
  navigation: 'navigation',
  main: 'main',
  complementary: 'complementary',
  contentinfo: 'contentinfo',
  banner: 'banner',
  region: 'region',
  article: 'article',
  section: 'section',
  list: 'list',
  listitem: 'listitem',
  button: 'button',
  link: 'link',
  img: 'img',
  heading: 'heading',
  search: 'search',
  form: 'form',
  dialog: 'dialog',
  alert: 'alert',
  status: 'status',
  presentation: 'presentation',
} as const;

/**
 * Focus management utilities for keyboard navigation
 */
export class FocusManager {
  private static focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(',');

  /**
   * Get all focusable elements within a container
   */
  static getFocusableElements(container: Element): HTMLElement[] {
    return Array.from(
      container.querySelectorAll<HTMLElement>(this.focusableSelectors)
    );
  }

  /**
   * Trap focus within a container (for modals, menus, etc.)
   */
  static trapFocus(container: Element): () => void {
    const focusableElements = this.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Focus first element
    firstElement?.focus();

    // Return cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }

  /**
   * Create a focus outline that's visible only for keyboard users
   */
  static createFocusOutline(): string {
    return `
      outline: 3px solid var(--madfam-yellow, #ffc107);
      outline-offset: 2px;
      border-radius: 4px;
    `;
  }

  /**
   * Save and restore focus position
   */
  static saveFocus(): HTMLElement | null {
    return document.activeElement as HTMLElement;
  }

  static restoreFocus(savedElement: HTMLElement | null): void {
    if (savedElement && typeof savedElement.focus === 'function') {
      savedElement.focus();
    }
  }
}

/**
 * Internationalized accessibility labels
 */
export function getA11yLabels(lang: Language): Record<string, string | ((param: string) => string)> & {
  currentTheme: (theme: string) => string;
  currentLanguage: (language: string) => string;
} {
  const t = useTranslations(lang);

  return {
    // Navigation
    skipToContent: t('a11y.skip.content'),
    mainMenu: t('a11y.menu.open'),
    closeMenu: t('a11y.menu.close'),
    
    // Theme switching
    toggleTheme: t('a11y.theme.toggle'),
    
    // Language switching
    switchLanguage: t('a11y.lang.toggle'),
    
    // Content interaction
    readMore: (title: string) => `Read more about ${title}`,
    viewDetails: (item: string) => `View details for ${item}`,
    playVideo: (title: string) => `Play video: ${title}`,
    downloadFile: (filename: string) => `Download ${filename}`,
    
    // Form controls
    requiredField: t('form.required'),
    invalidInput: t('form.invalid'),
    searchPlaceholder: t('ui.search'),
    
    // Status messages
    loading: t('status.loading'),
    error: t('status.error'),
    success: t('status.success'),
    
    // Social media
    shareOn: (platform: string) => `Share on ${platform}`,
    socialLink: (platform: string) => `Visit our ${platform} page`,
    
    // Magazine cutout specific
    cutoutImage: (subject: string) => `Magazine cutout style image of ${subject}`,
    tapedPhoto: 'Photo with decorative tape',
    vintagePhoto: 'Vintage style photograph',
    
    // Navigation breadcrumbs
    breadcrumbNavigation: 'Breadcrumb navigation',
    currentPage: 'Current page',
    
    // Characters and content
    characterProfile: (name: string) => `Character profile for ${name}`,
    episodePlayer: (episode: string) => `Audio player for ${episode}`,
    sketchVideo: (title: string) => `Watch sketch: ${title}`,
    
    // Dynamic status messages (moved outside the main object to avoid duplicate keys)
    currentTheme: (theme: string) => lang === 'es' ? `Tema cambiado a ${theme}` : `Theme changed to ${theme}`,
    currentLanguage: (language: string) => lang === 'es' ? `Idioma cambiado a ${language}` : `Language changed to ${language}`,
  };
}

/**
 * Screen reader utilities
 */
export class ScreenReaderUtils {
  /**
   * Create a screen reader only text element
   */
  static createSROnlyText(text: string): HTMLElement {
    const element = document.createElement('span');
    element.textContent = text;
    element.className = 'sr-only';
    return element;
  }

  /**
   * Announce text to screen readers
   */
  static announce(
    message: string,
    priority: 'polite' | 'assertive' = 'polite'
  ): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Update a live region with new content
   */
  static updateLiveRegion(regionId: string, content: string): void {
    const region = document.getElementById(regionId);
    if (region) {
      region.textContent = content;
    }
  }
}

/**
 * Keyboard navigation patterns
 */
export class KeyboardNavigation {
  /**
   * Standard keyboard event handlers
   */
  static handleArrowKeys(
    event: KeyboardEvent,
    elements: HTMLElement[],
    currentIndex: number
  ): number {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (currentIndex + 1) % elements.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = elements.length - 1;
        break;
    }

    elements[newIndex]?.focus();
    return newIndex;
  }

  /**
   * Handle Enter and Space key activation
   */
  static handleActivation(
    event: KeyboardEvent,
    callback: () => void
  ): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  }

  /**
   * Handle Escape key
   */
  static handleEscape(
    event: KeyboardEvent,
    callback: () => void
  ): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      callback();
    }
  }
}

/**
 * Color contrast utilities for WCAG compliance
 */
export class ContrastUtils {
  /**
   * Calculate relative luminance of a color
   */
  static getLuminance(color: string): number {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    // Apply gamma correction
    const rs = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gs = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bs = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  /**
   * Calculate contrast ratio between two colors
   */
  static getContrastRatio(color1: string, color2: string): number {
    const lum1 = this.getLuminance(color1);
    const lum2 = this.getLuminance(color2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Check if contrast ratio meets WCAG standards
   */
  static meetsWCAG(
    color1: string,
    color2: string,
    level: 'AA' | 'AAA' = 'AA',
    isLargeText = false
  ): boolean {
    const ratio = this.getContrastRatio(color1, color2);
    
    if (level === 'AAA') {
      return isLargeText ? ratio >= 4.5 : ratio >= 7;
    }
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  }
}

/**
 * Accessibility testing utilities for development
 */
export class A11yTesting {
  /**
   * Check for common accessibility issues
   */
  static runBasicChecks(): { passed: boolean; issues: string[] } {
    const issues: string[] = [];

    // Check for images without alt text
    const images = document.querySelectorAll('img:not([alt])');
    if (images.length > 0) {
      issues.push(`${images.length} images missing alt text`);
    }

    // Check for buttons without accessible names
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    buttons.forEach((button) => {
      if (button.textContent?.trim() === '' || button.textContent === null) {
        issues.push('Button without accessible name found');
      }
    });

    // Check for headings hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > previousLevel + 1) {
        issues.push(`Heading hierarchy skip detected: ${heading.tagName}`);
      }
      previousLevel = level;
    });

    // Check for form controls without labels
    const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
    inputs.forEach((input) => {
      const id = input.getAttribute('id');
      if (id === null || id === '' || !document.querySelector(`label[for="${id}"]`)) {
        issues.push('Form control without proper label found');
      }
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  }

  /**
   * Log accessibility report to console (development only)
   */
  static logReport(): void {
    if (import.meta.env.DEV) {
      const _report = this.runBasicChecks();
      // Accessibility audit completed
      // Results: passed = _report.passed, issues = _report.issues
    }
  }
}

/**
 * Initialize accessibility features for the page
 */
export function initializeAccessibility(lang: Language): void {
  // Run development checks
  A11yTesting.logReport();

  // Set up global keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Global Escape handler for modals
    if (e.key === 'Escape') {
      const openModal = document.querySelector('[data-modal][aria-hidden="false"]');
      if (openModal) {
        const closeButton = openModal.querySelector('[data-close]') as HTMLElement;
        closeButton?.click();
      }
    }
  });

  // Announce theme changes to screen readers
  window.addEventListener('themeChange', (e: Event) => {
    const customEvent = e as CustomEvent<{ theme: string }>;
    const labels = getA11yLabels(lang);
    ScreenReaderUtils.announce(labels.currentTheme(customEvent.detail.theme));
  });

  // Announce language changes to screen readers
  window.addEventListener('languageChange', (e: Event) => {
    const customEvent = e as CustomEvent<{ to: string }>;
    const labels = getA11yLabels(lang);
    ScreenReaderUtils.announce(labels.currentLanguage(customEvent.detail.to));
  });

  // Create live region for announcements
  if (!document.getElementById('aria-live-region')) {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'aria-live-region';
    Object.assign(liveRegion, AriaAttributes.liveRegion('polite'));
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }
}

export default {
  AriaAttributes,
  SemanticRoles,
  FocusManager,
  getA11yLabels,
  ScreenReaderUtils,
  KeyboardNavigation,
  ContrastUtils,
  A11yTesting,
  initializeAccessibility,
};