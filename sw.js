const CACHE = 'mitempo-dash-v5';
const SHELL = ['/dashboard.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting(); // no esperar a que se cierren todas las pestañas para tomar control
});

self.addEventListener('activate', e =>
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim()) // toma control inmediato de las páginas ya abiertas
  )
);

self.addEventListener('fetch', e => {
  // No interceptar llamadas a n8n ni a CDNs externos
  if (!e.request.url.startsWith(self.location.origin)) return;

  // Documentos HTML (el shell): network-first, con fallback a cache si no hay red.
  // Así cada deploy se ve al toque en vez de quedar pegado a lo que se cacheó una vez.
  if (e.request.mode === 'navigate' || e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Resto de assets same-origin (íconos, manifest): cache-first, cambian poco.
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
