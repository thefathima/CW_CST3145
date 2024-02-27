var cacheName = 'lessonsApp';
var cacheFiles = [
    'index.html',
    'lesons.js',
    'lessonsApp.webmanifest',
    'images/astroo.png',
    'images/brain.JPG',
    'images/codez.JPG',
    'images/cw.png',
    'images/economics.png',
    'images/food.png',
    'images/globee.JPG',
    'images/history.png',
    'images/musics.JPG',
    'images/paint.jpg',
    'images/robotic.png',
    'images/swim.png',
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

// self.addEventListener('fetch', function (e) {
//     e.respondWith(
//         // check if the cache has the file
//         caches.match(e.request).then(function (r) {
//             console.log('[Service Worker] Fetching resource: ' + e.request.url);
//             // 'r' is the matching file if it exists in the cache
//             return r 
//         })
//     );
// });

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // Download the file if it is not in the cache, 
            return r || fetch(e.request).then(function (response) {
                // add the new file to cache
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});