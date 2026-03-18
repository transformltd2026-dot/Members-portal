self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // Just a pass-through for now
  e.respondWith(fetch(e.request));
});
