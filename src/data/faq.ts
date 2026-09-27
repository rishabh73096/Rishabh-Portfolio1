import { DATA } from "@/data/resume";

/**
 * Visible FAQ content — also used verbatim to build the FAQPage JSON-LD on
 * the homepage. Keep the two in sync (Google requires the schema to match
 * what's actually shown on the page).
 */
export const FAQ = [
  {
    question: "Who is Rishabh Tiwari?",
    answer:
      "Rishabh Tiwari is a Full Stack Developer based in India, specializing in React, Next.js, Node.js, Express.js and MongoDB.",
  },
  {
    question: "What does Rishabh Tiwari specialize in?",
    answer:
      "Building responsive web applications, REST APIs, and multi-tenant SaaS platforms — with authentication, role-based access control, Stripe payments, and Redis caching.",
  },
  {
    question: "Is Rishabh Tiwari available for freelance projects?",
    answer:
      "Yes. Rishabh takes on freelance and contract full-stack development work alongside full-time opportunities.",
  },
  {
    question: "Does Rishabh Tiwari work remotely?",
    answer:
      "Yes, remotely for clients anywhere, with a preference for India, Delhi NCR, Noida and Gurugram-based teams and startups.",
  },
  {
    question: "Can Rishabh Tiwari build a full-stack web application?",
    answer:
      "Yes — React/Next.js on the frontend, Node.js/Express.js APIs on the backend, and MongoDB or PostgreSQL for data, is his core stack.",
  },
  {
    question: "Can Rishabh Tiwari build a SaaS application?",
    answer:
      "Yes. He has architected multi-tenant SaaS platforms with admin dashboards, customer-facing apps, subscription billing via Stripe, and role-based access control.",
  },
  {
    question: "What technologies does Rishabh Tiwari use?",
    answer:
      "Next.js, React.js, JavaScript, Node.js, Express.js, MongoDB, Redux Toolkit, Tailwind CSS, JWT, Socket.IO, Redis and Stripe, plus Git, GitHub, Figma and Docker.",
  },
  {
    question: "Can Rishabh Tiwari build React applications?",
    answer:
      "Yes, React 18 with Redux Toolkit for state management is part of his day-to-day stack.",
  },
  {
    question: "Can Rishabh Tiwari build Next.js applications?",
    answer:
      "Yes, including the App Router, server-side rendering, static exports, and SEO-oriented builds.",
  },
  {
    question: "Can Rishabh Tiwari develop Node.js APIs?",
    answer:
      "Yes — REST APIs built with Node.js and Express.js, secured with JWT authentication and role-based access control.",
  },
  {
    question: "Can Rishabh Tiwari integrate payment gateways?",
    answer:
      "Yes, Stripe integration — payment intents, webhook-based confirmation, and idempotent transaction handling — is used across several of his production projects.",
  },
  {
    question: "Can Rishabh Tiwari work with startups?",
    answer:
      "Yes. His production work has included multi-tenant SaaS platforms and MVPs built for early-stage products.",
  },
  {
    question: "Where is Rishabh Tiwari located?",
    answer: `${DATA.location}, available for remote work worldwide and on-site/hybrid work across Delhi NCR, Noida and Gurugram.`,
  },
  {
    question: "How can I contact Rishabh Tiwari for a project?",
    answer: `Email ${DATA.contact.email}, or reach out via LinkedIn or X — links are in the "Let's Connect" section of this site.`,
  },
] as const;
