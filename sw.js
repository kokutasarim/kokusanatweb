const CACHE_NAME = 'koku-sanat-v2';
const urlsToCache = [
  '/',
  '/assets/css/main.css',
  '/assets/css/custom.css',
  '/images/banner.png',
  '/images/spotlight01.jpg',
  '/images/spotlight02.jpg',
  '/images/favicon-32x32.png',
  '/images/apple-touch-icon.png',
  '/manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
