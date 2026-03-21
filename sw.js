const CACHE_NAME = 'tmc-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'https://drive.google.com/thumbnail?id=1l-7TVMBSBafc7uqqPTjEyiVpIiJknuOw&sz=s500'
];

// 1. Install & Cache Essentials
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

// 2. The "Must-Have" Fetch Handler
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // Return the cached index.html if the network fails
      return caches.match(event.request) || caches.match('index.html');
    })
  );
});
