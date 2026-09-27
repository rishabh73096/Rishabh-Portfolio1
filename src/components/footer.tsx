import { LiveClock } from "@/components/live-clock";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 space-y-6 pt-8">
      <p className="text-center font-sans italic text-muted-foreground">
        &quot;Nothing Is Perfect &mdash; But You Can Make It Better.&quot;
      </p>
      <p className="text-center font-medium">Designed &amp; Made with ❤️</p>
      <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>{year}. All rights reserved</span>
        <LiveClock format="24h" suffix="IST" />
      </div>
    </footer>
  );
}
