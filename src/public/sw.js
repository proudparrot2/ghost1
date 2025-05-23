importScripts('/uv/uv.bundle.js')
importScripts('/uv/uv.config.js')
importScripts(__uv$config.sw || '/uv/uv.sw.js')

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

const sw = new UVServiceWorker()

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      if (event.request.url.startsWith(location.origin + __uv$config.prefix)) {
        return await sw.fetch(event)
      }
      return await fetch(event.request)
    })()
  )
})