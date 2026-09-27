import BlurFade from "@/components/magicui/blur-fade";
import { SectionLabel } from "@/components/ui/section-label";
import { DashedBox } from "@/components/ui/dashed-box";
import { TESTIMONIALS } from "@/data/testimonials";

const BLUR_FADE_DELAY = 0.04;

/**
 * Renders nothing until src/data/testimonials.ts has entries.
 *
 * No Review/AggregateRating JSON-LD here on purpose: these are anonymized,
 * composite testimonials rather than verified reviews from a named,
 * identifiable person, and marking them up as schema.org Review data would
 * assert to search engines that they're the latter.
 */
export function TestimonialsSection() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section id="testimonials">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <SectionLabel>What Clients Say</SectionLabel>
        </BlurFade>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TESTIMONIALS.map((t, id) => (
            <BlurFade key={t.role} delay={BLUR_FADE_DELAY * 1.5 + id * 0.05}>
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
                      {t.name ?? t.role}
                    </a>
                  ) : (
                    t.name ?? t.role
                  )}
                  {t.name && (
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      — {t.role}
                    </span>
                  )}
                </div>
              </DashedBox>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
