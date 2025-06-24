/* eslint-disable */
// @ts-nocheck
/**
 * Service Worker para Testigos de Solarpunk
 * Implementa cache-first strategy con actualizaciones en segundo plano
 */

const CACHE_NAME = 'testigos-solarpunk-v1';
const RUNTIME_CACHE = 'testigos-runtime-v1';

// Archivos esenciales para funcionamiento offline
const STATIC_CACHE_URLS = [
  '/testigos-solarpunk/',
  '/testigos-solarpunk/index.html',
  '/testigos-solarpunk/personajes/',
  '/testigos-solarpunk/guiones/',
  '/testigos-solarpunk/mundo/',
  '/testigos-solarpunk/filosofia/',
  '/testigos-solarpunk/404.html',
  '/testigos-solarpunk/manifest.json',
  '/testigos-solarpunk/favicon.svg',
];

// Patrones de archivos a cachear
const CACHE_PATTERNS = {
  styles: /\.css$/,
  scripts: /\.js$/,
  images: /\.(png|jpg|jpeg|svg|webp|avif)$/,
  fonts: /\.(woff|woff2|ttf|otf)$/,
};

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cacheando archivos estáticos');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('[SW] Instalación completada');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Error durante instalación:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Service Worker...');

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
            })
            .map((cacheName) => {
              console.log('[SW] Eliminando cache antigua:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activación completada');
        return self.clients.claim();
      })
  );
});

// Estrategia de fetch
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requests que no son GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorar URLs externas
  if (!url.origin.includes(self.location.origin)) {
    return;
  }

  // Estrategia para archivos estáticos (cache-first)
  if (isStaticAsset(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Actualizar cache en segundo plano
          fetchAndCache(request, CACHE_NAME);
          return cachedResponse;
        }
        return fetchAndCache(request, CACHE_NAME);
      })
    );
    return;
  }

  // Estrategia para páginas HTML (network-first)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (response.ok) {
            const responseClone = response.clone();
            const cache = await caches.open(RUNTIME_CACHE);
            await cache.put(request, responseClone);
          }
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Página offline de fallback
          return caches.match('/testigos-solarpunk/404.html');
        })
    );
    return;
  }

  // Default: Network con cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const responseClone = response.clone();
          caches
            .open(RUNTIME_CACHE)
            .then((cache) => cache.put(request, responseClone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Manejo de mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => {
        event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
      });
  }
});

// Sincronización en segundo plano
self.addEventListener('sync', (event) => {
  if (event.tag === 'update-content') {
    event.waitUntil(updateContent());
  }
});

// Notificaciones push (preparado para futuro)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || '¡Nuevo milagro verde disponible!',
      icon: '/testigos-solarpunk/icon-192.png',
      badge: '/testigos-solarpunk/badge-72.png',
      vibrate: [200, 100, 200],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
      actions: [
        {
          action: 'explore',
          title: 'Ver ahora',
        },
        {
          action: 'close',
          title: 'Cerrar',
        },
      ],
    };

    event.waitUntil(
      self.registration.showNotification(
        data.title || 'Testigos de Solarpunk',
        options
      )
    );
  }
});

// Manejo de clicks en notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/testigos-solarpunk/'));
  }
});

// Funciones auxiliares
function isStaticAsset(pathname) {
  return Object.values(CACHE_PATTERNS).some((pattern) =>
    pattern.test(pathname)
  );
}

async function fetchAndCache(request, cacheName) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      const responseClone = response.clone();
      const cache = await caches.open(cacheName);
      cache.put(request, responseClone);
    }

    return response;
  } catch (error) {
    console.error('[SW] Error fetching:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

async function updateContent() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();

    const updatePromises = requests.map(async (request) => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.put(request, response);
        }
      } catch (error) {
        console.error('[SW] Error actualizando:', request.url);
      }
    });

    await Promise.all(updatePromises);
    console.log('[SW] Contenido actualizado');
  } catch (error) {
    console.error('[SW] Error en actualización:', error);
  }
}

// Versión del Service Worker
console.log('[SW] Service Worker v1.0.0 - Testigos de Solarpunk');
