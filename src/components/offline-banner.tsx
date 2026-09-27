"use client";

import { WifiOffIcon } from "lucide-react";
import { useEffect, useState } from "react";

/** A small fixed banner that shows while the browser reports no network connection. */
export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const goOffline = () => setIsOffline(true);
    const goOnline = () => setIsOffline(false);
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-center gap-2 border-b border-dashed border-border bg-background/95 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur"
    >
      <WifiOffIcon className="size-3.5" />
      You&apos;re offline — showing cached pages where available.
    </div>
  );
}
