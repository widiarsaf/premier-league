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

], {
    ignoreUrlParametersMatching: [/.*/]
})

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

workbox.routing.registerRoute(
    new RegExp('https://fonts.googleapis.com/icon?family=Material+Icons'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'font',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 5,
            })
        ]
    })
)

workbox.routing.registerRoute(
    new RegExp('https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'icon-materialize',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 5,
            })
        ]
    })
)


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