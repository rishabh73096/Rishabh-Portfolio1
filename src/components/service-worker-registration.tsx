"use client";

import { useEffect } from "react";

/** Registers the offline-support service worker (public/sw.js). Renders nothing. */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* offline support is a nice-to-have, never block the app on it */
    });
  }, []);

  return null;
}
