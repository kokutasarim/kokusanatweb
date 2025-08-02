const CACHE_NAME = 'koku-sanat-v1';
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

// Mobil cihazlar için ek optimizasyon
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  // Mobil için network-first stratejisi
  if (isMobile && event.request.destination === 'image') {
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseClone);
            });
          return response;
        })
        .catch(function() {
          return caches.match(event.request);
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  }
});
