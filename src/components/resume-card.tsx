"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  /** Renders a status pill: green "Active" dot when true, neutral "Done" when false. Omit to hide. */
  active?: boolean;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  active,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  // Only clickable when it actually does something: expands a description,
  // or links out somewhere real. Otherwise it's a plain card — no cursor,
  // no chevron promising an interaction that doesn't exist (this is what
  // Education cards hit before: no description, href "#", but the chevron
  // still showed on hover as if clicking would open something).
  const isInteractive = Boolean(description) || Boolean(href && href !== "#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  const cardContent = (
      <Card className="flex p-4 transition-colors hover:border-foreground/40">
        <div className="flex-none">
          <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain"
            />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow ml-4 items-center flex-col group min-w-0">
          <CardHeader className="p-0">
            <div className="flex flex-col gap-1 text-base sm:flex-row sm:items-start sm:justify-between sm:gap-x-2">
              <h3 className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-semibold leading-none text-xs sm:text-sm">
                {title}
                {typeof active === "boolean" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] font-normal text-muted-foreground">
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        active ? "bg-success" : "bg-muted-foreground/60"
                      )}
                    />
                    {active ? "Active" : "Done"}
                  </span>
                )}
                {badges && (
                  <span className="inline-flex flex-wrap gap-1">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="align-middle text-xs"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                {isInteractive && (
                  <ChevronRightIcon
                    className={cn(
                      "size-4 shrink-0 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                      isExpanded ? "rotate-90" : "rotate-0"
                    )}
                  />
                )}
              </h3>
              <div className="text-xs sm:text-sm tabular-nums font-mono text-muted-foreground shrink-0 sm:text-right">
                {period}
              </div>
            </div>
            {subtitle && <div className="font-sans text-xs text-muted-foreground">{subtitle}</div>}
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,

                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-2 text-xs sm:text-sm"
            >
              {description}
            </motion.div>
          )}
        </div>
      </Card>
  );

  if (!isInteractive) {
    return <div className="block">{cardContent}</div>;
  }

  return (
    <Link href={href || "#"} className="block cursor-pointer" onClick={handleClick}>
      {cardContent}
    </Link>
  );
};
