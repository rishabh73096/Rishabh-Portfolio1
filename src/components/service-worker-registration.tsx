"use client";

import { useEffect } from "react";

/**
 * Registers the offline-support service worker (public/sw.js) — production
 * only. In dev mode, Next.js rebuilds emit new content-hashed JS chunks on
 * every save; a service worker's cache-first strategy for same-origin
 * assets can end up serving an old chunk that no longer exists after a
 * rebuild, which is exactly what "missing required error components,
 * refreshing..." or a page that hangs/stays blank looks like. So in dev we
 * do the opposite: proactively unregister anything left over from an
 * earlier production build tested on this same origin, and clear its
 * cache, so a browser that picked one up earlier self-heals.
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* offline support is a nice-to-have, never block the app on it */
      });
      return;
    }

    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((reg) => reg.unregister());
    });
    if ("caches" in window) {
      caches.keys().then((keys) => {
        keys
          .filter((key) => key.startsWith("portfolio-shell-"))
          .forEach((key) => caches.delete(key));
      });
    }
  }, []);

  return null;
}
