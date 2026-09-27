import type { Metadata } from "next";
import { ProjectsPageClient } from "./projects-page-client";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production full-stack projects by Rishabh Tiwari — SaaS platforms, e-commerce, and booking systems built with Next.js, React, Node.js, Express.js, MongoDB, Redis, and Stripe.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects — Rishabh Tiwari, Full Stack Developer",
    description:
      "Production full-stack projects — SaaS platforms, e-commerce, and booking systems built with Next.js, React, Node.js, Express.js, MongoDB, Redis, and Stripe.",
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
