import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/ui/section-label";
import { DATA } from "@/data/resume";
import { slugify } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import Image from "next/image";

const BLUR_FADE_DELAY = 0.04;

type Project = (typeof DATA.projects)[number];

function findProject(slug: string): Project | undefined {
  return DATA.projects.find((p) => slugify(p.title) === slug);
}

export function generateStaticParams() {
  return DATA.projects.map((p) => ({ slug: slugify(p.title) }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = findProject(params.slug);
  if (!project) return {};

  const title = project.title;
  // Widen away the `as const` literal types first — otherwise TS treats the
  // always-truthy literal `shortDescription` as narrowing `project` itself
  // to `never` in the `||` fallback branch.
  const shortDescription: string = project.shortDescription;
  const fullDescription: string = project.description;
  const description = shortDescription || fullDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/projects/${params.slug}`,
      type: "article",
      images: project.image ? [{ url: project.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = findProject(params.slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: project.href || undefined,
    dateCreated: project.dates,
    author: {
      "@type": "Person",
      name: DATA.name,
      url: DATA.url,
    },
    keywords: project.technologies.join(", "),
    image: project.image ? `${DATA.url}${project.image}` : undefined,
  };

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Back Button */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/projects"
          className="font-mono text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Projects
        </Link>
      </BlurFade>

      {/* Project Header */}
      <section className="space-y-6">
        <div className="space-y-4">
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 2}
            className="text-4xl font-bold tracking-tighter sm:text-5xl"
            yOffset={8}
            text={project.title}
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 3}
            className="text-lg text-muted-foreground"
            text={`Project • ${project.dates}`}
          />
        </div>
      </section>

      {/* Project Image */}
      {project.image && (
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-dashed border-border">
            <Image
              src={project.image}
              alt={`${project.title} — screenshot`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </BlurFade>
      )}

      {/* Project Description */}
      <section className="space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <SectionLabel>Project Overview</SectionLabel>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {project.description}
          </p>
        </BlurFade>
      </section>

      {/* Technologies Used */}
      <section className="space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <SectionLabel>Technologies Used</SectionLabel>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* Call to Action */}
      <section className="space-y-4 pt-8 border-t">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <SectionLabel>View This Project</SectionLabel>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <div className="flex gap-3 flex-wrap">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                View Live Project →
              </a>
            )}
            {project.links?.map((l, idx) => (
              <a
                key={idx}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-6 py-2 rounded-md border border-border hover:bg-accent transition-colors font-medium"
              >
                {l.icon}
                {l.type}
              </a>
            ))}
            <Link
              href="/projects"
              className="px-6 py-2 rounded-md border border-border hover:bg-accent transition-colors font-medium"
            >
              Back to All Projects
            </Link>
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
