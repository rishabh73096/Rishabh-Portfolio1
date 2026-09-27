"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Icons } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const getSocialIcon = (name: string) => {
  switch (name) {
    case "GitHub":
      return Icons.github;
    case "LinkedIn":
      return Icons.linkedin;
    case "email":
      return Icons.email;
    case "X":
      return Icons.x;
    default:
      return Icons.github;
  }
};

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between gap-4 pb-8 sm:pb-12">
      <nav className="flex items-center gap-4 font-mono text-sm sm:gap-6">
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
      <div className="flex items-center gap-1">
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => {
            const Icon = getSocialIcon(name);
            return (
              <Tooltip key={name}>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        <ModeToggle />
      </div>
    </header>
  );
}
