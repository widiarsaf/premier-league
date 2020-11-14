importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);


workbox.precaching.precacheAndRoute([{
        url: '/',
        revision: '1'
    },
    {
        url: '/index.html',
        revision: '1'
    },
    {
        url: '/team.html',
        revision: '1'
    },
    {
        url: '/favorite.html',
        revision: '1'
    },
    {
        url: '/manifest.json',
        revision: '1'
    },
    {
        url: '/pages/home.js',
        revision: '1'
    },
    {
        url: '/pages/team.js',
        revision: '1'
    },
    {
        url: '/pages/favorite.js',
        revision: '1'
    },
    {
        url: '/assets/css/materialize.min.css',
        revision: '1'
    },
    {
        url: '/js/api.js',
        revision: '1'
    },
    {
        url: '/js/db.js',
        revision: '1'
    },
    {
        url: '/js/idb.js',
        revision: '1'
    },
    {
        url: '/js/main.js',
        revision: '1'
    },
    {
        url: '/js/materialize.min.js',
        revision: '1'
    },
    {
        url: '/assets/icons/icon-512.png',
        revision: '1'
    },
    {
        url: '/assets/icons/icon-384.png',
        revision: '1'
    },
    {
        url: '/assets/icons/icon-192.png',
        revision: '1'
    },
    {
        url: '/assets/icons/icon-152.png',
        revision: '1'
    },
    {
        url: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        revision: '1'
    },
    {
        url: 'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
        revision: '1'
    }


])

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-data',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            })
        ]
    })
)





/*
const CACHE_NAME = 'football-caches';
var urlsToCache = [
    '/',
    '/index.html',
    '/team.html',
    '/favorite.html',
    '/manifest.json',
    '/pages/home.js',
    '/pages/team.js',
    '/pages/favorite.js',
    '/assets/css/materialize.min.css',
    '/js/api.js',
    '/js/db.js',
    '/js/idb.js',
    '/js/main.js',
    '/js/materialize.min.js',
    '/assets/icons/icon-512.png',
    '/assets/icons/icon-384.png',
    '/assets/icons/icon-192.png',
    '/assets/icons/icon-152.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
]

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
        .then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})


self.addEventListener("fetch", function (event) {
    var base_url = "https://api.football-data.org/v2";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});
*/

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'assets/icons/icon-384.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push-notification-football', options)
    );
});