const cacheName = 'curnc-static-v5'

self.addEventListener('install', e => {
 
	e.waitUntil(caches.open(cacheName).then(cache => {
		// cache page
		cache.addAll([
			'./',
			'index.html', 
			'dist/build.js',
			'dist/logo.png',
			'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0'
		])
	}))
})

self.addEventListener('activate', e => {
	e.waitUntil(
		// delete all previous caches
		caches.keys().then(names => {
			return Promise.all(names.filter(name => name.startsWith('curnc') && name != cacheName).map(name => caches.delete(name)))
		})
	)
})

self.addEventListener('fetch', e => {
	// respond with cache first
	e.respondWith(caches.match(e.request).then(response => {
		return response ? response : fetch(e.request)
	}))
})
