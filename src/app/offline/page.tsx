import { WifiOffIcon } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "You're offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main className="flex min-h-[70dvh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl border border-dashed border-border">
        <WifiOffIcon className="size-6 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold">You&apos;re offline</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        This page hasn&apos;t been cached yet. Reconnect to the internet and
        try again — pages you&apos;ve already visited will keep working
        offline.
      </p>
      <div className="flex gap-3 pt-2">
        <Link
          href="/"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
}
