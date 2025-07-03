/**
 * Cache Buster Utility
 * Helps clear stale caches and handle missing assets gracefully
 */

import { log } from './logger';

export async function clearAllCaches(): Promise<void> {
  if (!('caches' in window)) {
    log.warn('Cache API not supported', undefined, 'cache-buster');
    return;
  }

  try {
    // Get all cache names
    const cacheNames = await caches.keys();

    // Delete all caches
    await Promise.all(
      cacheNames.map((cacheName) => {
        log.debug(`Deleting cache: ${cacheName}`, undefined, 'cache-buster');
        return caches.delete(cacheName);
      })
    );

    log.info(
      'All caches cleared successfully',
      { count: cacheNames.length },
      'cache-buster'
    );
  } catch (error) {
    log.error(
      'Error clearing caches',
      error instanceof Error ? error : new Error(String(error)),
      'cache-buster'
    );
  }
}

export async function unregisterServiceWorkers(): Promise<void> {
  if (!('serviceWorker' in navigator)) {
    log.warn('Service Worker not supported', undefined, 'cache-buster');
    return;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();

    await Promise.all(
      registrations.map((registration) => {
        log.debug(
          'Unregistering service worker',
          { scope: registration.scope },
          'cache-buster'
        );
        return registration.unregister();
      })
    );

    log.info(
      'All service workers unregistered',
      { count: registrations.length },
      'cache-buster'
    );
  } catch (error) {
    log.error(
      'Error unregistering service workers',
      error instanceof Error ? error : new Error(String(error)),
      'cache-buster'
    );
  }
}

export async function forceCacheRefresh(): Promise<void> {
  log.info('Starting force cache refresh', undefined, 'cache-buster');

  // 1. Clear all caches
  await clearAllCaches();

  // 2. Unregister all service workers
  await unregisterServiceWorkers();

  // 3. Reload the page with cache bypass
  // Force reload by appending a timestamp to bypass cache
  const timestamp = new Date().getTime();
  const separator = window.location.href.includes('?') ? '&' : '?';
  window.location.href = `${window.location.href}${separator}_cb=${timestamp}`;
}

// Export a function to add to window for easy console access
export function installCacheBuster(): void {
  if (typeof window !== 'undefined') {
    // Add cache buster to window object for console access
    const windowWithCacheBuster = window as unknown as Window & {
      cacheBuster: {
        clearAllCaches: typeof clearAllCaches;
        unregisterServiceWorkers: typeof unregisterServiceWorkers;
        forceCacheRefresh: typeof forceCacheRefresh;
      };
    };

    windowWithCacheBuster.cacheBuster = {
      clearAllCaches,
      unregisterServiceWorkers,
      forceCacheRefresh,
    };

    // Only show installation messages in development
    log.info(
      '✨ Cache Buster Installed!',
      {
        commands: [
          'window.cacheBuster.clearAllCaches()',
          'window.cacheBuster.unregisterServiceWorkers()',
          'window.cacheBuster.forceCacheRefresh()',
        ],
      },
      'cache-buster'
    );
  }
}
