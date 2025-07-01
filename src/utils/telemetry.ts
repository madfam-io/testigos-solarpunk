/**
 * Telemetry System - Testigos de Solarpunk
 * Enterprise-grade performance and user analytics
 *
 * @fileoverview Privacy-first telemetry for performance monitoring
 * @author MADFAM
 * @version 0.3.0+enterprise
 */

interface TelemetryEvent {
  name: string;
  category: 'performance' | 'user' | 'error' | 'system';
  properties?: Record<string, unknown>;
  timestamp?: number;
  sessionId?: string;
}

interface PerformanceMetrics {
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
  totalBlockingTime?: number;
  timeToInteractive?: number;
}

interface UserPreferences {
  theme: string;
  language: string;
  reducedMotion: boolean;
  highContrast: boolean;
  [key: string]: unknown; // Allow additional properties
}

/**
 * Privacy-first telemetry manager
 */
export class TelemetryManager {
  private static instance: TelemetryManager;
  private sessionId: string;
  private isEnabled: boolean = false;
  private eventQueue: TelemetryEvent[] = [];
  private performanceObserver: PerformanceObserver | null = null;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.initialize();
  }

  static getInstance(): TelemetryManager {
    if (TelemetryManager.instance === undefined) {
      TelemetryManager.instance = new TelemetryManager();
    }
    return TelemetryManager.instance;
  }

  /**
   * Initialize telemetry system
   */
  private initialize(): void {
    // Only enable in production and with user consent
    this.isEnabled = import.meta.env.PROD && this.hasUserConsent();

    if (!this.isEnabled) {
      // Telemetry disabled (dev mode or no consent)
      return;
    }

    this.setupPerformanceObserver();
    this.trackPageView();
    this.trackUserPreferences();
    this.trackWebVitals();

    // Telemetry initialized successfully
  }

  /**
   * Check if user has given consent for telemetry
   */
  private hasUserConsent(): boolean {
    // Check localStorage for consent
    const consent = localStorage.getItem('testigos-telemetry-consent');
    return consent === 'granted';
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }

  /**
   * Set up performance observer for Web Vitals
   */
  private setupPerformanceObserver(): void {
    if (!('PerformanceObserver' in window)) return;

    this.performanceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.trackPerformanceEntry(entry);
      }
    });

    // Observe all performance entry types
    try {
      this.performanceObserver.observe({
        entryTypes: [
          'navigation',
          'paint',
          'largest-contentful-paint',
          'layout-shift',
        ],
      });
    } catch (e) {
      console.warn('Some performance metrics not supported:', e);
    }
  }

  /**
   * Track a performance entry
   */
  private trackPerformanceEntry(entry: PerformanceEntry): void {
    switch (entry.entryType) {
      case 'paint':
        if (entry.name === 'first-contentful-paint') {
          this.track('first_contentful_paint', 'performance', {
            value: entry.startTime,
            url: window.location.pathname,
          });
        }
        break;

      case 'largest-contentful-paint':
        this.track('largest_contentful_paint', 'performance', {
          value: entry.startTime,
          url: window.location.pathname,
        });
        break;

      case 'layout-shift': {
        const layoutShiftEntry = entry as PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        };
        if (layoutShiftEntry.hadRecentInput !== true) {
          this.track('cumulative_layout_shift', 'performance', {
            value: layoutShiftEntry.value ?? 0,
            url: window.location.pathname,
          });
        }
        break;
      }
    }
  }

  /**
   * Track page view
   */
  private trackPageView(): void {
    this.track('page_view', 'user', {
      url: window.location.pathname,
      referrer: document.referrer,
      title: document.title,
      language: document.documentElement.lang,
    });
  }

  /**
   * Track user preferences
   */
  private trackUserPreferences(): void {
    const preferences: UserPreferences = {
      theme: document.documentElement.getAttribute('data-theme') ?? 'auto',
      language:
        document.documentElement.lang !== ''
          ? document.documentElement.lang
          : 'es',
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
        .matches,
      highContrast: window.matchMedia('(prefers-contrast: high)').matches,
    };

    this.track('user_preferences', 'user', preferences);
  }

  /**
   * Track Web Vitals using the web-vitals library pattern
   */
  private trackWebVitals(): void {
    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as PerformanceEntry & {
          processingStart?: number;
        };
        if (fidEntry.processingStart !== undefined) {
          const fid = fidEntry.processingStart - fidEntry.startTime;
          this.track('first_input_delay', 'performance', {
            value: fid,
            url: window.location.pathname,
          });
        }
      }
    });

    try {
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      // First Input Delay not supported
    }

    // Time to Interactive (approximation)
    window.addEventListener('load', () => {
      setTimeout(() => {
        const tti = performance.now();
        this.track('time_to_interactive', 'performance', {
          value: tti,
          url: window.location.pathname,
        });
      }, 0);
    });
  }

  /**
   * Track a custom event
   */
  track(
    name: string,
    category: TelemetryEvent['category'],
    properties?: Record<string, unknown>
  ): void {
    if (!this.isEnabled) return;

    const event: TelemetryEvent = {
      name,
      category,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        userAgent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        connection:
          (navigator as Navigator & { connection?: { effectiveType?: string } })
            .connection?.effectiveType ?? 'unknown',
      },
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.eventQueue.push(event);

    // Send events in batches
    if (this.eventQueue.length >= 10) {
      this.flush();
    }

    // Telemetry event tracked successfully
  }

  /**
   * Track theme change
   */
  trackThemeChange(from: string, to: string): void {
    this.track('theme_change', 'user', { from, to });
  }

  /**
   * Track language change
   */
  trackLanguageChange(from: string, to: string): void {
    this.track('language_change', 'user', { from, to });
  }

  /**
   * Track user interaction
   */
  trackInteraction(
    element: string,
    action: string,
    properties?: Record<string, unknown>
  ): void {
    this.track('user_interaction', 'user', {
      element,
      action,
      ...properties,
    });
  }

  /**
   * Track error
   */
  trackError(error: Error | string, context?: Record<string, unknown>): void {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorStack =
      typeof error === 'object' &&
      error !== null &&
      'stack' in error &&
      typeof error.stack === 'string'
        ? error.stack
        : undefined;

    this.track('error', 'error', {
      message: errorMessage,
      stack: errorStack,
      url: window.location.pathname,
      ...context,
    });
  }

  /**
   * Flush events to server
   */
  flush(): void {
    if (!this.isEnabled || this.eventQueue.length === 0) return;

    const events = [...this.eventQueue];
    this.eventQueue = [];

    // Send to analytics endpoint (implement as needed)
    if (navigator.sendBeacon !== undefined) {
      const data = JSON.stringify({ events });
      navigator.sendBeacon('/api/telemetry', data);
    } else {
      // Fallback for older browsers
      fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events }),
        keepalive: true,
      }).catch(console.warn);
    }
  }

  /**
   * Get performance summary
   */
  getPerformanceMetrics(): PerformanceMetrics {
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');

    return {
      firstContentfulPaint: paint.find(
        (p) => p.name === 'first-contentful-paint'
      )?.startTime,
      timeToInteractive:
        navigation?.loadEventEnd !== 0 ? navigation.loadEventEnd : undefined,
    };
  }

  /**
   * Enable telemetry with user consent
   */
  enable(): void {
    localStorage.setItem('testigos-telemetry-consent', 'granted');
    this.isEnabled = true;
    this.initialize();
  }

  /**
   * Disable telemetry and clear data
   */
  disable(): void {
    localStorage.setItem('testigos-telemetry-consent', 'denied');
    this.isEnabled = false;
    this.eventQueue = [];

    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
      this.performanceObserver = null;
    }
  }

  /**
   * Check if telemetry is enabled
   */
  isActive(): boolean {
    return this.isEnabled;
  }
}

/**
 * Initialize telemetry system
 */
export function initializeTelemetry(): TelemetryManager {
  const telemetry = TelemetryManager.getInstance();

  // Track theme changes
  window.addEventListener('themeChange', (e: Event) => {
    const customEvent = e as CustomEvent<{ from?: string; theme: string }>;
    telemetry.trackThemeChange(
      customEvent.detail.from ?? 'unknown',
      customEvent.detail.theme
    );
  });

  // Track language changes
  window.addEventListener('languageChange', (e: Event) => {
    const customEvent = e as CustomEvent<{ from: string; to: string }>;
    telemetry.trackLanguageChange(
      customEvent.detail.from,
      customEvent.detail.to
    );
  });

  // Track navigation
  window.addEventListener('beforeunload', () => {
    telemetry.flush();
  });

  // Track errors
  window.addEventListener('error', (e) => {
    const errorObj =
      e.error instanceof Error
        ? e.error
        : new Error(String(e.error ?? 'Unknown error'));
    telemetry.trackError(errorObj, {
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno,
    });
  });

  window.addEventListener('unhandledrejection', (e) => {
    const errorObj =
      e.reason instanceof Error
        ? e.reason
        : new Error(String(e.reason ?? 'Unhandled promise rejection'));
    telemetry.trackError(errorObj);
  });

  return telemetry;
}

// Export default instance
export default TelemetryManager.getInstance();
