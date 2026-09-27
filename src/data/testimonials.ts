export interface Testimonial {
  name: string;
  role: string;
  company?: string;
  quote: string;
  /** Link to the review's original source (LinkedIn recommendation, email, etc.) — for credibility, not required. */
  url?: string;
}

/**
 * Intentionally empty. Do not add a placeholder/fabricated quote here —
 * the Testimonials section on the homepage only renders when this array is
 * non-empty (see src/components/testimonials-section.tsx). Add a real
 * client/colleague quote as an entry here and it appears automatically,
 * including in the Review/AggregateRating JSON-LD.
 */
export const TESTIMONIALS: Testimonial[] = [];
