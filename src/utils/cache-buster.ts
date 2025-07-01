/**
 * Cache Buster Utility
 * Helps clear stale caches and handle missing assets gracefully
 */

/* eslint-disable no-console */

export async function clearAllCaches(): Promise<void> {
  if (!('caches' in window)) {
    console.warn('Cache API not supported');
    return;
  }

  try {
    // Get all cache names
    const cacheNames = await caches.keys();
    
    // Delete all caches
    await Promise.all(
      cacheNames.map(cacheName => {
        console.log(`Deleting cache: ${cacheName}`);
        return caches.delete(cacheName);
      })
    );

    console.log('All caches cleared successfully');
  } catch (error) {
    console.error('Error clearing caches:', error);
  }
}

export async function unregisterServiceWorkers(): Promise<void> {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker not supported');
    return;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    
    await Promise.all(
      registrations.map(registration => {
        console.log('Unregistering service worker:', registration.scope);
        return registration.unregister();
      })
    );

    console.log('All service workers unregistered');
  } catch (error) {
    console.error('Error unregistering service workers:', error);
  }
}

export async function forceCacheRefresh(): Promise<void> {
  console.log('Starting force cache refresh...');
  
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
    const windowWithCacheBuster = window as Window & {
      cacheBuster: {
        clearAllCaches: typeof clearAllCaches;
        unregisterServiceWorkers: typeof unregisterServiceWorkers;
        forceCacheRefresh: typeof forceCacheRefresh;
      };
    };
    
    windowWithCacheBuster.cacheBuster = {
      clearAllCaches,
      unregisterServiceWorkers,
      forceCacheRefresh
    };
    
    console.log(
      '%c✨ Cache Buster Installed!',
      'background: #4CAF50; color: white; padding: 5px 10px; border-radius: 3px;'
    );
    console.log('Available commands:');
    console.log('  window.cacheBuster.clearAllCaches()');
    console.log('  window.cacheBuster.unregisterServiceWorkers()');
    console.log('  window.cacheBuster.forceCacheRefresh()');
  }
}