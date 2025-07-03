const CACHE_NAME = 'testigos-solarpunk-v3';
const RUNTIME_CACHE = 'testigos-runtime-v3';
const IMAGE_CACHE = 'testigos-images-v1';
const FONT_CACHE = 'testigos-fonts-v1';
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
const CACHE_PATTERNS = {
  styles: /\.css$/,
  scripts: /\.js$/,
  images: /\.(png|jpg|jpeg|svg|webp|avif)$/,
  fonts: /\.(woff|woff2|ttf|otf)$/,
};
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((c) => c.addAll(STATIC_CACHE_URLS))
      .then(() => self.skipWaiting())
      .catch(() => {})
  );
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((n) =>
        Promise.all(
          n
            .filter(
              (c) =>
                c !== CACHE_NAME &&
                c !== RUNTIME_CACHE &&
                c !== IMAGE_CACHE &&
                c !== FONT_CACHE
            )
            .map((c) => caches.delete(c))
        )
      )
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  const { request: r } = e;
  const u = new URL(r.url);
  if (r.method !== 'GET' || !u.origin.includes(self.location.origin)) return;
  if (isStaticAsset(u.pathname)) {
    // Use appropriate cache based on asset type
    const cacheName = getAssetCache(u.pathname);
    e.respondWith(
      caches.match(r).then((c) => {
        if (c) {
          // Return from cache and update in background
          fetchAndCache(r, cacheName);
          return c;
        }
        return fetchAndCache(r, cacheName);
      })
    );
    return;
  }
  if (r.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(r)
        .then(async (s) => {
          if (s.ok) {
            const c = s.clone();
            const h = await caches.open(RUNTIME_CACHE);
            await h.put(r, c);
          }
          return s;
        })
        .catch(async () => {
          const c = await caches.match(r);
          return c || caches.match('/testigos-solarpunk/404.html');
        })
    );
    return;
  }
  e.respondWith(
    fetch(r)
      .then((s) => {
        if (s.ok) {
          const c = s.clone();
          caches.open(RUNTIME_CACHE).then((h) => h.put(r, c));
        }
        return s;
      })
      .catch(() => caches.match(r))
  );
});
self.addEventListener('message', (e) => {
  if (e.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (e.data?.type === 'CLEAR_CACHE') {
    caches
      .keys()
      .then((n) => Promise.all(n.map((c) => caches.delete(c))))
      .then(() => {
        e.ports[0].postMessage({ type: 'CACHE_CLEARED' });
      });
  }
});
self.addEventListener('sync', (e) => {
  if (e.tag === 'update-content') {
    e.waitUntil(updateContent());
  }
});
self.addEventListener('push', (e) => {
  if (e.data) {
    const d = e.data.json();
    const o = {
      body: d.body || '¡Nuevo milagro verde disponible!',
      icon: '/testigos-solarpunk/icon-192.png',
      badge: '/testigos-solarpunk/badge-72.png',
      vibrate: [200, 100, 200],
      data: { dateOfArrival: Date.now(), primaryKey: 1 },
      actions: [
        { action: 'explore', title: 'Ver ahora' },
        { action: 'close', title: 'Cerrar' },
      ],
    };
    e.waitUntil(
      self.registration.showNotification(d.title || 'Testigos de Solarpunk', o)
    );
  }
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  if (e.action === 'explore') {
    e.waitUntil(clients.openWindow('/testigos-solarpunk/'));
  }
});
function isStaticAsset(p) {
  return Object.values(CACHE_PATTERNS).some((t) => t.test(p));
}
async function fetchAndCache(r, n) {
  try {
    const s = await fetch(r);
    if (s.ok) {
      const c = s.clone();
      const h = await caches.open(n);
      h.put(r, c);
    }
    return s;
  } catch (e) {
    const c = await caches.match(r);
    if (c) return c;
    throw e;
  }
}
function getAssetCache(pathname) {
  if (CACHE_PATTERNS.images.test(pathname)) return IMAGE_CACHE;
  if (CACHE_PATTERNS.fonts.test(pathname)) return FONT_CACHE;
  if (
    CACHE_PATTERNS.styles.test(pathname) ||
    CACHE_PATTERNS.scripts.test(pathname)
  )
    return CACHE_NAME;
  return RUNTIME_CACHE;
}
async function updateContent() {
  try {
    const c = await caches.open(CACHE_NAME);
    const r = await c.keys();
    await Promise.all(
      r.map(async (q) => {
        try {
          const s = await fetch(q);
          if (s.ok) await c.put(q, s);
        } catch (e) {}
      })
    );
  } catch (e) {}
}
