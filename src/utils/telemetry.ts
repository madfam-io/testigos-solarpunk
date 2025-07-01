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
  properties?: Record<string, any>;
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
    if (!TelemetryManager.instance) {
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
      console.log('📊 Telemetry disabled (dev mode or no consent)');
      return;
    }

    this.setupPerformanceObserver();
    this.trackPageView();
    this.trackUserPreferences();
    this.trackWebVitals();
    
    console.log('📊 Telemetry initialized');
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
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
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
        entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'layout-shift'] 
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
      
      case 'layout-shift':
        if (!(entry as any).hadRecentInput) {
          this.track('cumulative_layout_shift', 'performance', {
            value: (entry as any).value,
            url: window.location.pathname,
          });
        }
        break;
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
      theme: document.documentElement.getAttribute('data-theme') || 'auto',
      language: document.documentElement.lang || 'es',
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
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
        const fid = entry.processingStart - entry.startTime;
        this.track('first_input_delay', 'performance', {
          value: fid,
          url: window.location.pathname,
        });
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
    properties?: Record<string, any>
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
        connection: (navigator as any).connection?.effectiveType || 'unknown',
      },
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.eventQueue.push(event);
    
    // Send events in batches
    if (this.eventQueue.length >= 10) {
      this.flush();
    }

    // Also log to console in development
    if (import.meta.env.DEV) {
      console.log('📊 Telemetry:', event);
    }
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
  trackInteraction(element: string, action: string, properties?: Record<string, any>): void {
    this.track('user_interaction', 'user', {
      element,
      action,
      ...properties,
    });
  }

  /**
   * Track error
   */
  trackError(error: Error | string, context?: Record<string, any>): void {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorStack = typeof error === 'object' && error.stack ? error.stack : undefined;

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
    if (navigator.sendBeacon) {
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
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    return {
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
      timeToInteractive: navigation?.loadEventEnd || undefined,
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
  window.addEventListener('themeChange', (e: any) => {
    telemetry.trackThemeChange(e.detail.from || 'unknown', e.detail.theme);
  });
  
  // Track language changes
  window.addEventListener('languageChange', (e: any) => {
    telemetry.trackLanguageChange(e.detail.from, e.detail.to);
  });
  
  // Track navigation
  window.addEventListener('beforeunload', () => {
    telemetry.flush();
  });
  
  // Track errors
  window.addEventListener('error', (e) => {
    telemetry.trackError(e.error, {
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno,
    });
  });
  
  window.addEventListener('unhandledrejection', (e) => {
    telemetry.trackError(e.reason);
  });
  
  return telemetry;
}

// Export default instance
export default TelemetryManager.getInstance();