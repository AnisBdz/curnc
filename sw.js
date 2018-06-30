var cacheName = 'curnc-static-v7';

self.addEventListener('install', function (e) {

	e.waitUntil(caches.open(cacheName).then(function (cache) {
		// cache page 
		cache.addAll(['./', 'index.html', 'dist/build.js', 'dist/logo.png', 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0']);
	}));
});

self.addEventListener('activate', function (e) {
	e.waitUntil(
	// delete all previous caches
	caches.keys().then(function (names) {
		return Promise.all(names.filter(function (name) {
			return name.startsWith('curnc') && name != cacheName;
		}).map(function (name) {
			return caches.delete(name);
		}));
	}));
});

self.addEventListener('fetch', function (e) {
	// respond with cache first
	e.respondWith(caches.match(e.request).then(function (response) {
		return response ? response : fetch(e.request);
	}));
});
