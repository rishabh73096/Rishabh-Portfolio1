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

/** Social links + theme toggle — shared between the desktop navbar and the mobile bottom dock. */
export function SocialIcons({
  className,
  iconClassName = "size-8",
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
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
                  className={cn(
                    "inline-flex items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                    iconClassName
                  )}
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
  );
}
