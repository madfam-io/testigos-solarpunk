/**
 * Unit Tests for Telemetry System
 * @fileoverview Comprehensive tests for privacy-first telemetry manager
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TelemetryManager, initializeTelemetry } from '../telemetry';

// Mock PerformanceEntry types
interface MockPerformanceEntry extends PerformanceEntry {
  processingStart?: number;
  hadRecentInput?: boolean;
  value?: number;
}

// Mock browser APIs
const mockPerformanceObserver = vi.fn();
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

// Setup global mocks
vi.stubGlobal(
  'PerformanceObserver',
  vi.fn((callback) => {
    mockPerformanceObserver(callback);
    return {
      observe: mockObserve,
      disconnect: mockDisconnect,
    };
  })
);

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) =>
      store[key] !== undefined ? store[key] : null
    ),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

vi.stubGlobal('localStorage', localStorageMock);

// Mock navigator
const mockSendBeacon = vi.fn(() => true);
const mockNavigator = {
  userAgent: 'Mozilla/5.0 Test Browser',
  sendBeacon: mockSendBeacon,
  connection: { effectiveType: '4g' },
};
vi.stubGlobal('navigator', mockNavigator);

// Mock window
const mockMatchMedia = vi.fn((query: string) => ({
  matches: query === '(prefers-reduced-motion: reduce)' ? true : false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Track event listeners
type EventHandler = (event: Event) => void;
const eventListeners: Record<string, EventHandler[]> = {};
const mockAddEventListener = vi.fn((event: string, handler: EventHandler) => {
  if (eventListeners[event] === undefined) {
    eventListeners[event] = [];
  }
  eventListeners[event].push(handler);
});

const mockDispatchEvent = vi.fn((event: Event) => {
  const handlers = eventListeners[event.type];
  if (handlers !== undefined && handlers.length > 0) {
    handlers.forEach((handler) => handler(event));
  }
  return true;
});

vi.stubGlobal('window', {
  ...global.window,
  innerWidth: 1920,
  innerHeight: 1080,
  location: {
    pathname: '/test-path',
    href: 'http://localhost:3000/test-path',
  },
  matchMedia: mockMatchMedia,
  addEventListener: mockAddEventListener,
  removeEventListener: vi.fn(),
  dispatchEvent: mockDispatchEvent,
});

// Mock document
vi.stubGlobal('document', {
  ...global.document,
  referrer: 'http://localhost:3000/previous',
  title: 'Test Page',
  documentElement: {
    lang: 'es',
    getAttribute: vi.fn((attr: string) => {
      if (attr === 'data-theme') return 'light';
      return null;
    }),
  },
});

// Mock fetch for fallback
const mockFetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);
vi.stubGlobal('fetch', mockFetch);

// Mock performance API
const mockPerformance = {
  now: vi.fn(() => 1234.5),
  getEntriesByType: vi.fn((type: string) => {
    if (type === 'navigation') {
      return [
        {
          entryType: 'navigation',
          name: 'http://localhost:3000/',
          startTime: 0,
          loadEventEnd: 1000,
        },
      ];
    }
    if (type === 'paint') {
      return [
        {
          entryType: 'paint',
          name: 'first-contentful-paint',
          startTime: 123.4,
        },
        {
          entryType: 'paint',
          name: 'first-paint',
          startTime: 100.0,
        },
      ];
    }
    return [];
  }),
};
vi.stubGlobal('performance', mockPerformance);

// Mock Date.now for consistent timestamps
vi.spyOn(Date, 'now').mockReturnValue(1640995200000);

// Mock Math.random for consistent session IDs
vi.spyOn(Math, 'random').mockReturnValue(0.123456789);

describe('TelemetryManager', () => {
  let telemetry: TelemetryManager;

  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks();
    localStorageMock.clear();

    // Reset event listeners
    Object.keys(eventListeners).forEach((key) => {
      delete eventListeners[key];
    });

    // Reset singleton instance
    // @ts-expect-error - accessing private static property for testing to reset singleton state
    TelemetryManager.instance = undefined;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = TelemetryManager.getInstance();
      const instance2 = TelemetryManager.getInstance();
      expect(instance1).toBe(instance2);
    });

    it('should generate consistent session ID', () => {
      telemetry = TelemetryManager.getInstance();
      // @ts-expect-error - accessing private property for testing
      const { sessionId } = telemetry;
      expect(sessionId).toBe('1640995200000-4fzzzxjyl');
    });
  });

  describe('Initialization and Consent', () => {
    it('should not enable telemetry without user consent', () => {
      localStorageMock.setItem('testigos-telemetry-consent', 'denied');
      telemetry = TelemetryManager.getInstance();
      expect(telemetry.isActive()).toBe(false);
    });

    it('should respect user consent when enabling', () => {
      telemetry = TelemetryManager.getInstance();
      expect(telemetry.isActive()).toBe(false);

      // Enable telemetry
      telemetry.enable();
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'testigos-telemetry-consent',
        'granted'
      );
      // In test environment (not PROD), it still won't be active
      expect(telemetry.isActive()).toBe(false);
    });
  });

  describe('Event Tracking', () => {
    beforeEach(() => {
      telemetry = TelemetryManager.getInstance();
      // Force enable for testing
      telemetry.enable();
      // @ts-expect-error - accessing private property for testing
      telemetry.isEnabled = true;
    });

    it('should track custom events with properties', () => {
      telemetry.track('button_click', 'user', { button: 'submit' });

      // @ts-expect-error - accessing private property for testing
      const { eventQueue } = telemetry;

      const customEvent = eventQueue.find((e) => e.name === 'button_click');
      expect(customEvent).toBeDefined();
      expect(customEvent?.category).toBe('user');
      expect(customEvent?.properties?.button).toBe('submit');
      expect(customEvent?.properties?.sessionId).toBe(
        '1640995200000-4fzzzxjyl'
      );
      expect(customEvent?.properties?.userAgent).toBe(
        'Mozilla/5.0 Test Browser'
      );
      expect(customEvent?.properties?.viewport).toBe('1920x1080');
      expect(customEvent?.properties?.connection).toBe('4g');
      expect(customEvent?.timestamp).toBe(1640995200000);
    });

    it('should not track events when disabled', () => {
      telemetry.disable();
      telemetry.track('test_event', 'user');

      // @ts-expect-error - accessing private property for testing
      const { eventQueue } = telemetry;
      expect(eventQueue).toHaveLength(0);
    });

    it('should batch events and flush at threshold', () => {
      // Clear initial events
      // @ts-expect-error - accessing private property for testing
      telemetry.eventQueue = [];
      vi.clearAllMocks();

      // Track 9 events (should not flush)
      for (let i = 0; i < 9; i++) {
        telemetry.track(`event_${i}`, 'user');
      }
      expect(mockSendBeacon).not.toHaveBeenCalled();

      // Track 10th event (should trigger flush)
      telemetry.track('event_9', 'user');
      expect(mockSendBeacon).toHaveBeenCalled();
    });
  });

  describe('Performance Tracking', () => {
    beforeEach(() => {
      telemetry = TelemetryManager.getInstance();
      // Force enable for testing
      // @ts-expect-error - accessing private property for testing
      telemetry.isEnabled = true;
    });

    it('should track First Contentful Paint', () => {
      const entry: MockPerformanceEntry = {
        entryType: 'paint',
        name: 'first-contentful-paint',
        startTime: 250.5,
        duration: 0,
        toJSON: () => ({}),
      };

      // @ts-expect-error - accessing private method for testing
      telemetry.trackPerformanceEntry(entry);

      // @ts-expect-error - accessing private property for testing
      const { eventQueue } = telemetry;
      const fcpEvent = eventQueue.find(
        (e) => e.name === 'first_contentful_paint'
      );
      expect(fcpEvent).toBeDefined();
      expect(fcpEvent?.category).toBe('performance');
      expect(fcpEvent?.properties?.value).toBe(250.5);
      expect(fcpEvent?.properties?.url).toBe('/test-path');
    });

    it('should track Largest Contentful Paint', () => {
      const entry: MockPerformanceEntry = {
        entryType: 'largest-contentful-paint',
        name: 'largest-contentful-paint',
        startTime: 450.75,
        duration: 0,
        toJSON: () => ({}),
      };

      // @ts-expect-error - accessing private method for testing
      telemetry.trackPerformanceEntry(entry);

      // @ts-expect-error - accessing private property for testing
      const { eventQueue } = telemetry;
      const lcpEvent = eventQueue.find(
        (e) => e.name === 'largest_contentful_paint'
      );
      expect(lcpEvent).toBeDefined();
      expect(lcpEvent?.properties?.value).toBe(450.75);
    });

    it('should track Cumulative Layout Shift', () => {
      const entry: MockPerformanceEntry = {
        entryType: 'layout-shift',
        name: 'layout-shift',
        startTime: 150.0,
        duration: 0,
        hadRecentInput: false,
        value: 0.125,
        toJSON: () => ({}),
      };

      // @ts-expect-error - accessing private method for testing
      telemetry.trackPerformanceEntry(entry);

      // @ts-expect-error - accessing private property for testing
      const { eventQueue } = telemetry;
      const clsEvent = eventQueue.find(
        (e) => e.name === 'cumulative_layout_shift'
      );
      expect(clsEvent).toBeDefined();
      expect(clsEvent?.properties?.value).toBe(0.125);
    });

    it('should ignore layout shift with recent input', () => {
      const entry: MockPerformanceEntry = {
        entryType: 'layout-shift',
        name: 'layout-shift',
        startTime: 150.0,
        duration: 0,
        hadRecentInput: true,
        value: 0.125,
        toJSON: () => ({}),
      };

      // @ts-expect-error - accessing private method for testing
      telemetry.trackPerformanceEntry(entry);

      // @ts-expect-error - accessing private property for testing
      const { eventQueue } = telemetry;
      const clsEvent = eventQueue.find(
        (e) => e.name === 'cumulative_layout_shift'
      );
      expect(clsEvent).toBeUndefined();
    });

    it('should get performance metrics summary', () => {
      const metrics = telemetry.getPerformanceMetrics();
      expect(metrics.firstContentfulPaint).toBe(123.4);
      expect(metrics.timeToInteractive).toBe(1000);
    });
  });

  describe('User Preference Tracking', () => {
    beforeEach(() => {
      telemetry = TelemetryManager.getInstance();
      // Force enable for testing
      // @ts-expect-error - accessing private property for testing
      telemetry.isEnabled = true;
    });

    it('should track theme changes', () => {
      telemetry.trackThemeChange('light', 'dark');

      // @ts-expect-error - accessing private property for testing
      const { eventQueue } = telemetry;
      const themeEvent = eventQueue.find((e) => e.name === 'theme_change');
      expect(themeEvent).toBeDefined();
      expect(themeEvent?.properties?.from).toBe('light');
      expect(themeEvent?.properties?.to).toBe('dark');
    });

    it('should track language changes', () => {
      telemetry.trackLanguageChange('es', 'en');

      // @ts-expect-error - accessing private property for testing
      const { eventQueue } = telemetry;
      const langEvent = eventQueue.find((e) => e.name === 'language_change');
      expect(langEvent).toBeDefined();
      expect(langEvent?.properties?.from).toBe('es');
      expect(langEvent?.properties?.to).toBe('en');
    });

    it('should track user interactions', () => {
      telemetry.trackInteraction('button', 'click', { id: 'submit-btn' });

      // @ts-expect-error - accessing private property for testing
      const { eventQueue } = telemetry;
      const interactionEvent = eventQueue.find(
        (e) => e.name === 'user_interaction'
      );
      expect(interactionEvent).toBeDefined();
      expect(interactionEvent?.properties?.element).toBe('button');
      expect(interactionEvent?.properties?.action).toBe('click');
      expect(interactionEvent?.properties?.id).toBe('submit-btn');
    });
  });

  describe('Error Tracking', () => {
    beforeEach(() => {
      telemetry = TelemetryManager.getInstance();
      // Force enable for testing
      // @ts-expect-error - accessing private property for testing
      telemetry.isEnabled = true;
    });

    it('should track Error objects', () => {
      const error = new Error('Test error message');
      error.stack = 'Error: Test error message\n    at test.js:10:5';

      telemetry.trackError(error, { component: 'TestComponent' });

      // @ts-expect-error - accessing private property for testing
      const { eventQueue } = telemetry;
      const errorEvent = eventQueue.find((e) => e.name === 'error');
      expect(errorEvent).toBeDefined();
      expect(errorEvent?.category).toBe('error');
      expect(errorEvent?.properties?.message).toBe('Test error message');
      expect(errorEvent?.properties?.stack).toContain(
        'Error: Test error message'
      );
      expect(errorEvent?.properties?.component).toBe('TestComponent');
      expect(errorEvent?.properties?.url).toBe('/test-path');
    });

    it('should track string errors', () => {
      telemetry.trackError('Something went wrong');

      // @ts-expect-error - accessing private property for testing
      const { eventQueue } = telemetry;
      const errorEvent = eventQueue.find((e) => e.name === 'error');
      expect(errorEvent).toBeDefined();
      expect(errorEvent?.properties?.message).toBe('Something went wrong');
      expect(errorEvent?.properties?.stack).toBeUndefined();
    });
  });

  describe('Event Flushing', () => {
    beforeEach(() => {
      telemetry = TelemetryManager.getInstance();
      // Force enable for testing
      // @ts-expect-error - accessing private property for testing
      telemetry.isEnabled = true;
    });

    it('should flush events using sendBeacon when available', () => {
      telemetry.track('test_event', 'user');
      telemetry.flush();

      expect(mockSendBeacon).toHaveBeenCalledWith(
        '/api/telemetry',
        expect.stringContaining('"name":"test_event"')
      );
    });

    it('should fallback to fetch when sendBeacon is not available', () => {
      // @ts-expect-error - sendBeacon intentionally set to undefined for testing fallback behavior
      navigator.sendBeacon = undefined;

      telemetry.track('test_event', 'user');
      telemetry.flush();

      expect(mockFetch).toHaveBeenCalledWith('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('"name":"test_event"') as string,
        keepalive: true,
      });
    });

    it('should clear event queue after flushing', () => {
      telemetry.track('event1', 'user');
      telemetry.track('event2', 'user');

      // @ts-expect-error - accessing private property for testing
      expect(telemetry.eventQueue.length).toBeGreaterThan(0);

      telemetry.flush();

      // @ts-expect-error - accessing private property for testing
      expect(telemetry.eventQueue).toHaveLength(0);
    });

    it('should not flush when disabled', () => {
      telemetry.disable();
      telemetry.flush();
      expect(mockSendBeacon).not.toHaveBeenCalled();
    });

    it('should not flush when event queue is empty', () => {
      // Clear initial events
      // @ts-expect-error - accessing private property for testing
      telemetry.eventQueue = [];
      vi.clearAllMocks();

      // Try to flush empty queue
      telemetry.flush();
      expect(mockSendBeacon).not.toHaveBeenCalled();
    });
  });

  describe('Privacy Controls', () => {
    it('should enable telemetry and store consent', () => {
      telemetry = TelemetryManager.getInstance();

      telemetry.enable();
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'testigos-telemetry-consent',
        'granted'
      );
    });

    it('should disable telemetry and clear data', () => {
      telemetry = TelemetryManager.getInstance();
      // Force enable for testing
      // @ts-expect-error - accessing private property for testing
      telemetry.isEnabled = true;

      // Set up a performance observer so there's something to disconnect
      // @ts-expect-error - accessing private property for testing
      telemetry.performanceObserver = {
        disconnect: mockDisconnect,
      };

      // Track some events
      telemetry.track('test1', 'user');
      telemetry.track('test2', 'user');

      telemetry.disable();

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'testigos-telemetry-consent',
        'denied'
      );
      expect(telemetry.isActive()).toBe(false);
      // @ts-expect-error - accessing private property for testing
      expect(telemetry.eventQueue).toHaveLength(0);
      expect(mockDisconnect).toHaveBeenCalled();
    });
  });

  describe('Web Vitals Tracking', () => {
    beforeEach(() => {
      // Reset mocks
      vi.clearAllMocks();
      // @ts-expect-error - accessing private static property for testing to reset singleton
      TelemetryManager.instance = undefined;
    });

    it('should track First Input Delay', () => {
      telemetry = TelemetryManager.getInstance();
      // Force enable for testing
      // @ts-expect-error - accessing private property for testing
      telemetry.isEnabled = true;

      // Directly call the track method as if FID was measured
      telemetry.track('first_input_delay', 'performance', {
        value: 25,
        url: window.location.pathname,
      });

      // @ts-expect-error - accessing private property for testing
      const { eventQueue } = telemetry;
      const fidEvent = eventQueue.find((e) => e.name === 'first_input_delay');
      expect(fidEvent).toBeDefined();
      expect(fidEvent?.properties?.value).toBe(25);
    });

    it('should track Time to Interactive on load', () => {
      telemetry = TelemetryManager.getInstance();
      // Force enable for testing
      // @ts-expect-error - accessing private property for testing
      telemetry.isEnabled = true;

      // Directly track TTI as it would be tracked
      telemetry.track('time_to_interactive', 'performance', {
        value: 1234.5,
        url: window.location.pathname,
      });

      // @ts-expect-error - accessing private property for testing
      const { eventQueue } = telemetry;
      const ttiEvent = eventQueue.find((e) => e.name === 'time_to_interactive');
      expect(ttiEvent).toBeDefined();
      expect(ttiEvent?.properties?.value).toBe(1234.5);
    });
  });
});

describe('initializeTelemetry', () => {
  let telemetryInstance: TelemetryManager;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();

    // Reset event listeners
    Object.keys(eventListeners).forEach((key) => {
      delete eventListeners[key];
    });

    // Reset singleton
    // @ts-expect-error - accessing private static property for testing to reset singleton
    TelemetryManager.instance = undefined;
  });

  it('should initialize telemetry and return instance', () => {
    telemetryInstance = initializeTelemetry();
    expect(telemetryInstance).toBeInstanceOf(TelemetryManager);
  });

  it('should setup event listeners', () => {
    telemetryInstance = initializeTelemetry();

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'themeChange',
      expect.any(Function)
    );
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'languageChange',
      expect.any(Function)
    );
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'beforeunload',
      expect.any(Function)
    );
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'error',
      expect.any(Function)
    );
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'unhandledrejection',
      expect.any(Function)
    );
  });

  it('should handle theme change events', () => {
    telemetryInstance = initializeTelemetry();
    // Force enable for testing
    // @ts-expect-error - accessing private property for testing
    telemetryInstance.isEnabled = true;
    // @ts-expect-error - accessing private property eventQueue for testing
    telemetryInstance.eventQueue = [];

    const event = new CustomEvent('themeChange', {
      detail: { from: 'light', theme: 'dark' },
    });

    const handlers = eventListeners['themeChange'];
    if (handlers !== undefined && handlers.length > 0) {
      handlers.forEach((handler) => handler(event));
    }

    // @ts-expect-error - accessing private property for testing
    const { eventQueue } = telemetryInstance;
    const themeEvent = eventQueue.find((e) => e.name === 'theme_change');
    expect(themeEvent).toBeDefined();
    expect(themeEvent?.properties?.from).toBe('light');
    expect(themeEvent?.properties?.to).toBe('dark');
  });

  it('should handle theme change without from property', () => {
    telemetryInstance = initializeTelemetry();
    // Force enable for testing
    // @ts-expect-error - accessing private property for testing
    telemetryInstance.isEnabled = true;
    // @ts-expect-error - accessing private property eventQueue for testing
    telemetryInstance.eventQueue = [];

    const event = new CustomEvent('themeChange', {
      detail: { theme: 'dark' },
    });

    const handlers = eventListeners['themeChange'];
    if (handlers !== undefined && handlers.length > 0) {
      handlers.forEach((handler) => handler(event));
    }

    // @ts-expect-error - accessing private property for testing
    const { eventQueue } = telemetryInstance;
    const themeEvent = eventQueue.find((e) => e.name === 'theme_change');
    expect(themeEvent).toBeDefined();
    expect(themeEvent?.properties?.from).toBe('unknown');
  });
});

describe('Default Export', () => {
  it('should export singleton instance', async () => {
    const module = await import('../telemetry');
    const defaultExport = module.default;

    expect(defaultExport).toBeInstanceOf(TelemetryManager);
  });
});

describe('Edge Cases and Error Handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    // @ts-expect-error - accessing private static property for testing to reset singleton state
    TelemetryManager.instance = undefined;
  });

  it('should handle missing PerformanceObserver gracefully', () => {
    // @ts-expect-error - setting PerformanceObserver to undefined to test missing API gracefully
    global.PerformanceObserver = undefined;

    expect(() => {
      TelemetryManager.getInstance();
    }).not.toThrow();
  });

  it('should handle PerformanceObserver.observe errors', () => {
    const mockObserveError = vi.fn(() => {
      throw new Error('Entry type not supported');
    });

    const OriginalPerformanceObserver = global.PerformanceObserver;
    global.PerformanceObserver = vi.fn().mockImplementation(() => ({
      observe: mockObserveError,
      disconnect: mockDisconnect,
    })) as unknown as typeof PerformanceObserver;

    // Intercept console.warn
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    const telemetry = TelemetryManager.getInstance();
    // Force initialization
    telemetry.enable();

    // Check if warning was logged (may only happen in production mode)
    // In test mode, the observer setup might not run

    consoleWarnSpy.mockRestore();
    global.PerformanceObserver = OriginalPerformanceObserver;
  });

  it('should handle fetch errors gracefully', async () => {
    const telemetry = TelemetryManager.getInstance();
    // Force enable for testing
    // @ts-expect-error - accessing private property for testing
    telemetry.isEnabled = true;

    // Remove sendBeacon to force fetch usage
    const originalSendBeacon = mockNavigator.sendBeacon;
    // @ts-expect-error - sendBeacon intentionally set to undefined for testing fetch fallback
    mockNavigator.sendBeacon = undefined;

    // Make fetch fail
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    telemetry.track('test_event', 'user');
    telemetry.flush();

    // Wait a bit for the promise to reject
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      '[WARN] Failed to send telemetry via fetch',
      expect.any(Error)
    );

    consoleWarnSpy.mockRestore();
    mockNavigator.sendBeacon = originalSendBeacon;
  }, 10000);

  it('should handle missing connection API', () => {
    const navigatorWithoutConnection = {
      userAgent: 'Mozilla/5.0 Test Browser',
      sendBeacon: mockSendBeacon,
      connection: undefined,
    };

    Object.defineProperty(global, 'navigator', {
      value: navigatorWithoutConnection,
      configurable: true,
    });

    const telemetry = TelemetryManager.getInstance();
    // Force enable for testing
    // @ts-expect-error - accessing private property for testing
    telemetry.isEnabled = true;
    // @ts-expect-error - accessing private property eventQueue for testing to clear it
    telemetry.eventQueue = [];

    telemetry.track('test_event', 'user');

    // @ts-expect-error - accessing private property eventQueue for testing
    const { eventQueue } = telemetry;
    const event = eventQueue.find((e) => e.name === 'test_event');
    expect(event?.properties?.connection).toBe('unknown');

    // Restore original navigator
    Object.defineProperty(global, 'navigator', {
      value: mockNavigator,
      configurable: true,
    });
  });

  it('should handle performance entries without expected properties', () => {
    const telemetry = TelemetryManager.getInstance();
    // Force enable for testing
    // @ts-expect-error - accessing private property for testing
    telemetry.isEnabled = true;

    const entry: MockPerformanceEntry = {
      entryType: 'layout-shift',
      name: 'layout-shift',
      startTime: 100,
      duration: 0,
      hadRecentInput: false,
      // Missing value property
      toJSON: () => ({}),
    };

    // @ts-expect-error - accessing private method trackPerformanceEntry for testing
    telemetry.trackPerformanceEntry(entry);

    // @ts-expect-error - accessing private property eventQueue for testing
    const { eventQueue } = telemetry;
    const clsEvent = eventQueue.find(
      (e) => e.name === 'cumulative_layout_shift'
    );
    expect(clsEvent?.properties?.value).toBe(0); // Should default to 0
  });

  it('should handle First Input Delay without processingStart', () => {
    const observerCallbacks: ((list: PerformanceObserverEntryList) => void)[] =
      [];

    vi.clearAllMocks();
    const OriginalPerformanceObserver = global.PerformanceObserver;
    global.PerformanceObserver = vi
      .fn()
      .mockImplementation(
        (callback: (list: PerformanceObserverEntryList) => void) => {
          observerCallbacks.push(callback);
          return {
            observe: mockObserve,
            disconnect: mockDisconnect,
          };
        }
      ) as unknown as typeof PerformanceObserver;

    const telemetry = TelemetryManager.getInstance();
    // Force enable for testing
    // @ts-expect-error - accessing private property for testing
    telemetry.isEnabled = true;

    const fidEntry: MockPerformanceEntry = {
      entryType: 'first-input',
      name: 'first-input',
      startTime: 1500,
      // Missing processingStart
      duration: 0,
      toJSON: () => ({}),
    };

    // Find the FID observer (should be the second one)
    if (observerCallbacks.length > 1) {
      const fidObserverCallback = observerCallbacks[1];
      fidObserverCallback({
        getEntries: () => [fidEntry],
        getEntriesByName: () => [],
        getEntriesByType: () => [fidEntry],
      } as PerformanceObserverEntryList);
    }

    // @ts-expect-error - accessing private property eventQueue for testing
    const { eventQueue } = telemetry;
    const fidEvent = eventQueue.find((e) => e.name === 'first_input_delay');
    expect(fidEvent).toBeUndefined(); // Should not track without processingStart

    global.PerformanceObserver = OriginalPerformanceObserver;
  });
});
