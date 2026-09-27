import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { SectionLabel } from "@/components/ui/section-label";
import { DATA } from "@/data/resume";
import { SERVICES, relatedProjectsFor } from "@/data/services";

const BLUR_FADE_DELAY = 0.04;

function findService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = findService(params.slug);
  if (!service) return {};

  const title = `${service.title} Services`;
  const description = `${service.description} Available freelance, contract and remote — based in ${DATA.location}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${params.slug}`,
    },
    openGraph: {
      title: `${title} — ${DATA.name}`,
      description,
      url: `/services/${params.slug}`,
      type: "website",
    },
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = findService(params.slug);

  if (!service) {
    notFound();
  }

  const projects = relatedProjectsFor(service);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    description: service.description,
    provider: {
      "@type": "Person",
      name: DATA.name,
      url: DATA.url,
    },
    areaServed: ["IN", "Remote"],
  };

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/services"
          className="font-mono text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Services
        </Link>
      </BlurFade>

      <section className="space-y-4">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 2}
          className="text-4xl font-bold tracking-tighter sm:text-5xl"
          yOffset={8}
          text={service.title}
        />
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 3}
          className="max-w-2xl text-lg text-muted-foreground"
          text={service.description}
        />
      </section>

      {projects.length > 0 && (
        <section className="space-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <SectionLabel>Real Projects Using This</SectionLabel>
          </BlurFade>
          <div className="flex flex-col gap-4">
            {projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 5 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  title={project.title}
                  description={project.description}
                  shortDescription={project.shortDescription}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4 pt-8 border-t">
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <SectionLabel>Get In Touch</SectionLabel>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="flex gap-3 flex-wrap">
            <a
              href={`mailto:${DATA.contact.email}`}
              className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              Email {DATA.name.split(" ")[0]}
            </a>
            <Link
              href="/services"
              className="px-6 py-2 rounded-md border border-border hover:bg-accent transition-colors font-medium"
            >
              All Services
            </Link>
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
