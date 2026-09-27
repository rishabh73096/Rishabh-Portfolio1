import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  shortDescription?: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  shortDescription,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  return (
    <Card
      className={cn(
        "flex flex-col gap-4 p-4 transition-colors hover:border-foreground/40 sm:flex-row sm:p-5",
        className
      )}
    >
      <Link
        href={`/projects/${slug}`}
        className="block shrink-0 overflow-hidden rounded-lg sm:w-56"
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none h-40 w-full object-cover object-top sm:h-full"
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full object-cover object-top sm:h-full"
          />
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <Link href={`/projects/${slug}`} className="group">
            <h3 className="font-bold group-hover:text-primary transition-colors">
              {title}
            </h3>
            <time className="font-mono text-xs text-muted-foreground">
              {dates}
            </time>
          </Link>
          <div className="flex flex-wrap gap-1.5">
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-accent transition-colors"
              >
                <ArrowUpRightIcon className="size-3" />
                Live
              </a>
            )}
            {links?.map((l, idx) => (
              <a
                href={l.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-accent transition-colors"
              >
                {l.icon}
                {l.type}
              </a>
            ))}
          </div>
        </div>

        <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
          {shortDescription || description}
        </Markdown>

        {tags && tags.length > 0 && (
          <div className="mt-auto space-y-1.5 pt-1">
            <div className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Technologies Used
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge className="text-[10px]" variant="secondary" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
