import { DATA } from "@/data/resume";
import { slugify } from "@/lib/utils";

interface ServiceDef {
  title: string;
  description: string;
  /**
   * Case-insensitive terms matched against each project's technologies,
   * title and short description — used to surface real, relevant project
   * evidence on the service's page instead of hardcoded/invented examples.
   */
  keywords: string[];
}

const SERVICE_DEFS: readonly ServiceDef[] = [
  {
    title: "Full Stack Web Development",
    description:
      "End-to-end web applications — from React/Next.js frontends to Node.js and Express.js APIs backed by MongoDB or PostgreSQL.",
    keywords: ["Next.js", "React.js", "Node.js", "Express.js"],
  },
  {
    title: "React.js Development",
    description:
      "Component-driven, responsive UIs in React 18 with Redux Toolkit for state management.",
    keywords: ["React.js", "Redux Toolkit"],
  },
  {
    title: "Next.js Development",
    description:
      "Server-rendered and statically-exported Next.js apps using the App Router — SEO-friendly, fast first paint.",
    keywords: ["Next.js"],
  },
  {
    title: "Node.js Backend Development",
    description:
      "REST APIs and services in Node.js/Express.js with JWT authentication and role-based access control.",
    keywords: ["Node.js", "Express.js", "JWT"],
  },
  {
    title: "SaaS Development",
    description:
      "Multi-tenant SaaS platforms — admin dashboards, customer-facing apps, and the API layer connecting them.",
    keywords: ["SaaS", "multi-tenant"],
  },
  {
    title: "E-commerce Development",
    description:
      "Storefronts with cart, checkout, inventory tracking, and secure payment flows.",
    keywords: ["E-commerce", "e-commerce"],
  },
  {
    title: "Dashboard & Admin Panel Development",
    description:
      "Internal tools and admin panels for managing orders, users, bookings, and business data in real time.",
    keywords: ["dashboard", "admin"],
  },
  {
    title: "Payment Gateway Integration",
    description:
      "Stripe payment intents, webhook-based confirmation, and idempotent transaction handling.",
    keywords: ["Stripe"],
  },
  {
    title: "Third-Party API Integration",
    description:
      "Wiring up transactional email (Postmark), payments, and other external services into an existing product.",
    keywords: ["Postmark", "Payment Gateway"],
  },
  {
    title: "Database Design (MongoDB & PostgreSQL)",
    description:
      "Schema design, indexing, and query optimization — including Redis caching for high-traffic reads.",
    keywords: ["MongoDB", "PostgreSQL", "Redis", "Mongoose"],
  },
  {
    title: "Website Performance Optimization",
    description:
      "Lazy loading, code splitting, image optimization, and query tuning to cut load times.",
    keywords: ["Redis (Inventory cache)", "aggregation", "indexing", "Optimized"],
  },
  {
    title: "Bug Fixing & Feature Development",
    description:
      "Picking up an existing codebase, shipping new features, and fixing production issues without breaking what already works.",
    keywords: [],
  },
];

export const SERVICES = SERVICE_DEFS.map((s) => ({
  ...s,
  slug: slugify(s.title),
}));

export type Service = (typeof SERVICES)[number];

/** Real projects whose stack/description genuinely match this service — no invented examples. */
export function relatedProjectsFor(service: Pick<ServiceDef, "keywords">) {
  if (service.keywords.length === 0) return [];
  const terms = service.keywords.map((k) => k.toLowerCase());

  return DATA.projects.filter((project) => {
    const haystack = [
      project.title,
      project.shortDescription,
      ...project.technologies,
    ]
      .join(" ")
      .toLowerCase();
    return terms.some((term) => haystack.includes(term));
  });
}
