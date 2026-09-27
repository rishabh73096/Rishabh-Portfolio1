import type { Metadata } from "next";
import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { DashedBox } from "@/components/ui/dashed-box";
import { SERVICES } from "@/data/services";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export const metadata: Metadata = {
  title: "Services",
  description: `Full-stack development services offered by ${DATA.name} — Next.js, React, Node.js, SaaS, e-commerce and API work, available freelance, contract and remote.`,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Services — ${DATA.name}, Full Stack Developer`,
    description: `Full-stack development services offered by ${DATA.name} — available freelance, contract and remote.`,
    url: "/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/"
          className="font-mono text-sm font-medium text-muted-foreground hover:text-foreground w-fit transition-colors"
        >
          ← Back to Home
        </Link>
      </BlurFade>

      <section className="space-y-4">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 2}
          className="text-4xl font-bold tracking-tighter sm:text-5xl"
          yOffset={8}
          text="Services"
        />
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 3}
          className="max-w-2xl text-lg text-muted-foreground"
          text="Available for freelance, contract and remote full-stack development work in India and worldwide."
        />
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SERVICES.map((service, id) => (
          <BlurFade key={service.slug} delay={BLUR_FADE_DELAY * 4 + id * 0.03}>
            <Link href={`/services/${service.slug}`}>
              <DashedBox className="h-full transition-colors hover:border-foreground/40">
                <h2 className="font-semibold hover:text-primary transition-colors">
                  {service.title}
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {service.description}
                </p>
              </DashedBox>
            </Link>
          </BlurFade>
        ))}
      </section>
    </main>
  );
}
