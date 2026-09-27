import BlurFade from "@/components/magicui/blur-fade";
import { SectionLabel } from "@/components/ui/section-label";
import { DashedBox } from "@/components/ui/dashed-box";
import { TESTIMONIALS } from "@/data/testimonials";

const BLUR_FADE_DELAY = 0.04;

/** Renders nothing until a real testimonial exists — see src/data/testimonials.ts. */
export function TestimonialsSection() {
  if (TESTIMONIALS.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    review: TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewBody: t.quote,
    })),
  };

  return (
    <section id="testimonials">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <SectionLabel>Testimonials</SectionLabel>
        </BlurFade>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TESTIMONIALS.map((t, id) => (
            <BlurFade key={t.name} delay={BLUR_FADE_DELAY * 1.5 + id * 0.05}>
              <DashedBox className="h-full">
                <p className="text-sm text-muted-foreground">
                  &quot;{t.quote}&quot;
                </p>
                <div className="mt-3 text-sm font-medium">
                  {t.url ? (
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {t.name}
                    </a>
                  ) : (
                    t.name
                  )}
                  <span className="text-muted-foreground font-normal">
                    {" "}
                    — {t.role}
                    {t.company ? `, ${t.company}` : ""}
                  </span>
                </div>
              </DashedBox>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
