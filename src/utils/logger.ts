/**
 * @fileoverview Production-Safe Logging Utility
 * @author MADFAM
 * @version 0.5.0
 *
 * Provides conditional logging that respects production environment.
 * Integrates with telemetry system for error tracking while keeping
 * console clean in production builds.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
  source?: string;
}

/**
 * Logger utility that respects environment settings
 * Logs to console in development, sends to telemetry in production
 */
class Logger {
  private static instance: Logger;
  private isDevelopment: boolean;
  private logHistory: LogEntry[] = [];
  private maxHistorySize = 100;

  private constructor() {
    // Check if we're in development mode
    this.isDevelopment = !import.meta.env.PROD;
  }

  static getInstance(): Logger {
    if (Logger.instance === null || Logger.instance === undefined) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Log debug information (development only)
   * @param {string} message - Debug message to log
   * @param {unknown} [data] - Optional data to include with the log
   * @param {string} [source] - Optional source identifier for tracking
   * @example
   * log.debug('Component mounted', { props }, 'MyComponent');
   */
  debug(message: string, data?: unknown, source?: string): void {
    if (this.isDevelopment) {
      // eslint-disable-next-line no-console
      console.debug(
        `[DEBUG] ${message}`,
        data !== null && data !== undefined ? data : ''
      );
    }
    this.addToHistory('debug', message, data, source);
  }

  /**
   * Log informational messages
   * @param {string} message - Info message to log
   * @param {unknown} [data] - Optional data to include
   * @param {string} [source] - Optional source identifier
   * @example
   * log.info('User logged in', { userId: 123 }, 'AuthService');
   */
  info(message: string, data?: unknown, source?: string): void {
    if (this.isDevelopment) {
      // eslint-disable-next-line no-console
      console.info(
        `[INFO] ${message}`,
        data !== null && data !== undefined ? data : ''
      );
    }
    this.addToHistory('info', message, data, source);
  }

  /**
   * Log warnings (always shown)
   * @param {string} message - Warning message
   * @param {unknown} [data] - Optional warning context
   * @param {string} [source] - Optional source identifier
   * @example
   * log.warn('API rate limit approaching', { remaining: 10 });
   */
  warn(message: string, data?: unknown, source?: string): void {
    // eslint-disable-next-line no-console
    console.warn(
      `[WARN] ${message}`,
      data !== null && data !== undefined ? data : ''
    );
    this.addToHistory('warn', message, data, source);
  }

  /**
   * Log errors (always shown and sent to telemetry)
   * @param {string} message - Error description
   * @param {Error} [error] - Error object to log
   * @param {string} [source] - Optional source identifier
   * @example
   * log.error('Failed to fetch data', error, 'DataService');
   */
  error(message: string, error?: Error, source?: string): void {
    // eslint-disable-next-line no-console
    console.error(
      `[ERROR] ${message}`,
      error !== null && error !== undefined ? error : ''
    );
    this.addToHistory('error', message, error, source);

    // Send to telemetry if available
    this.sendToTelemetry('error', message, error, source);
  }

  /**
   * Production-safe console.log replacement
   * Only logs in development, silent in production
   */
  log(message: string, data?: unknown, source?: string): void {
    if (this.isDevelopment) {
      // eslint-disable-next-line no-console
      console.log(message, data !== null && data !== undefined ? data : '');
    }
    this.addToHistory('info', message, data, source);
  }

  /**
   * Get recent log history
   * @param {LogLevel} [level] - Filter by specific log level
   * @returns {LogEntry[]} Array of log entries
   * @example
   * const errors = log.getHistory('error');
   */
  getHistory(): LogEntry[] {
    return [...this.logHistory];
  }

  /**
   * Clear log history
   */
  clearHistory(): void {
    this.logHistory = [];
  }

  private addToHistory(
    level: LogLevel,
    message: string,
    data?: unknown,
    source?: string
  ): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
      source,
    };

    this.logHistory.push(entry);

    // Keep history size manageable
    if (this.logHistory.length > this.maxHistorySize) {
      this.logHistory.shift();
    }
  }

  private sendToTelemetry(
    level: LogLevel,
    message: string,
    error?: unknown,
    source?: string
  ): void {
    // Only send errors and warnings to telemetry
    if (level !== 'error' && level !== 'warn') return;

    try {
      // Dynamic import to avoid circular dependencies
      import('./telemetry')
        .then(({ default: telemetry }) => {
          if (
            telemetry !== null &&
            telemetry !== undefined &&
            telemetry.isActive() === true
          ) {
            telemetry.trackError(error instanceof Error ? error : message, {
              level,
              source,
              timestamp: new Date().toISOString(),
            });
          }
        })
        .catch(() => {
          // Telemetry not available, ignore silently
        });
    } catch {
      // Telemetry not available, ignore silently
    }
  }
}

// Export singleton instance
const logger = Logger.getInstance();

/**
 * Production-safe logging functions
 * Use these instead of console.log/warn/error
 */
export const log = {
  debug: (message: string, data?: unknown, source?: string) =>
    logger.debug(message, data, source),
  info: (message: string, data?: unknown, source?: string) =>
    logger.info(message, data, source),
  warn: (message: string, data?: unknown, source?: string) =>
    logger.warn(message, data, source),
  error: (message: string, error?: Error, source?: string) =>
    logger.error(message, error, source),
  log: (message: string, data?: unknown, source?: string) =>
    logger.log(message, data, source),
};

/**
 * Get logger instance for advanced usage
 */
export const getLogger = (): Logger => logger;

export default logger;
