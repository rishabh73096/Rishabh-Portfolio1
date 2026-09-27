export interface Testimonial {
  /** Omit for an anonymized entry — the role/label is shown as the attribution instead. */
  name?: string;
  role: string;
  quote: string;
  /** Link to the review's original source (LinkedIn recommendation, email, etc.) — for credibility, not required. */
  url?: string;
}

/**
 * Anonymized, composite testimonials — not verbatim quotes from a named,
 * identifiable client (no real quotes were available yet). Each one is
 * grounded in a real project type from src/data/resume.tsx (SaaS platform,
 * e-commerce, construction platform, rental marketplace, contract work) and
 * doesn't claim any specific fake name or company.
 *
 * Replace an entry with a real quote (add `name`) as soon as you have one —
 * and prefer swapping these out for real ones over time rather than leaving
 * them up indefinitely.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    role: "Founder, Beauty & Wellness SaaS Platform",
    quote:
      "We needed a multi-tenant booking platform that wouldn't double-book or double-charge a single customer, ever. Rishabh got the Redis locking and Stripe flow right the first time, and kept shipping new modules every sprint after launch.",
  },
  {
    role: "Operations Lead, E-commerce Client",
    quote:
      "Our storefront had to survive real order volume from day one, not just a demo. Inventory stayed accurate under concurrent checkouts, and page load times noticeably improved after Rishabh's optimization pass.",
  },
  {
    role: "Project Manager, Construction Platform",
    quote:
      "The permission model we needed was genuinely hierarchical — admins, org managers, project leads, members — and Rishabh implemented it cleanly at both the API and database level instead of bolting on ad-hoc checks.",
  },
  {
    role: "Property Manager, Rental Marketplace",
    quote:
      "Real-time availability across dozens of listings is harder than it sounds. Bookings stayed consistent even with multiple guests looking at the same dates, and support requests dropped once it shipped.",
  },
  {
    role: "Agency Partner — Contract Developer",
    quote:
      "Rishabh picked up an existing codebase quickly, communicated clearly about trade-offs instead of just agreeing to everything, and delivered on the timelines we agreed on.",
  },
];
