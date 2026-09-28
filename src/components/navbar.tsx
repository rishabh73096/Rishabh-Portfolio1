"use client";

import { SocialIcons } from "@/components/social-icons";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between gap-4 pb-6 sm:pb-12">
      <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm sm:gap-6">
        {DATA.navbar.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors",
                isActive
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      {/* On mobile these live in the fixed bottom dock instead (MobileDock). */}
      <SocialIcons className="hidden sm:flex" />
    </header>
  );
}
