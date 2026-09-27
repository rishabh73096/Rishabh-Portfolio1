// Minimal offline support: cache the app shell on install, then
// network-first for page navigations (falling back to the cache, then to
// /offline) and cache-first for static assets. No API/data caching here —
// this portfolio's dynamic data (e.g. the GitHub contributions graph) is
// fetched server-side, so the service worker never sees those requests.

const CACHE_VERSION = "v1";
const CACHE_NAME = `portfolio-shell-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline";
const APP_SHELL = [
  "/",
  "/projects",
  "/blog",
  OFFLINE_URL,
  "/icon.png",
  "/me.jpeg", // the homepage avatar — a plain <img>, so it's requested outside next/image's optimizer and won't get caught by the runtime asset cache on the very first (registering) page load
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.all(
          APP_SHELL.map((url) =>
            cache.add(url).catch(() => {
              /* ignore a single shell URL failing to precache */
            })
          )
        )
      )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  // Page navigations: network-first, cache fallback, offline-page last resort.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          // waitUntil keeps the worker alive long enough for this write to
          // land — without it the browser can tear the worker down right
          // after respondWith resolves, silently dropping the cache.put.
          event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          );
          return response;
        })
        .catch(
          async () =>
            (await caches.match(request)) ||
            (await caches.match(OFFLINE_URL))
        )
    );
    return;
  }

  // Same-origin static assets: cache-first, network fallback.
  if (new URL(request.url).origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request)
            .then((response) => {
              const copy = response.clone();
              event.waitUntil(
                caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
              );
              return response;
            })
            .catch(() => cached)
      )
    );
  }
});
