"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import Image from "next/image";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = DATA.projects.find(
    (p) => p.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-") === params.slug
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      {/* Back Button */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/projects"
          className="text-primary hover:underline text-sm font-medium"
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
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </BlurFade>
      )}

      {/* Project Description */}
      <section className="space-y-4">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 5}
          className="text-xl font-semibold"
          text="Project Overview"
        />
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {project.description}
          </p>
        </BlurFade>
      </section>

      {/* Technologies Used */}
      <section className="space-y-4">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 7}
          className="text-xl font-semibold"
          text="Technologies & Stack"
        />
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <Badge key={tech} variant="secondary" className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* Project Details */}
      <section className="space-y-4">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 9}
          className="text-xl font-semibold"
          text="Key Features & Highlights"
        />
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold text-primary mb-2">Frontend</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Responsive design with mobile-first approach</li>
                <li>✓ Modern UI with Tailwind CSS</li>
                <li>✓ Smooth animations & transitions</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold text-primary mb-2">Backend</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ RESTful API design</li>
                <li>✓ Secure authentication & authorization</li>
                <li>✓ Database optimization</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold text-primary mb-2">Deployment</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Cloud-hosted on Vercel/AWS</li>
                <li>✓ CI/CD pipeline configured</li>
                <li>✓ Production-ready & scalable</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold text-primary mb-2">Performance</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Optimized load times</li>
                <li>✓ SEO best practices</li>
                <li>✓ Cross-browser compatible</li>
              </ul>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* How It's Made */}
      <section className="space-y-4">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 11}
          className="text-xl font-semibold"
          text="How It's Built"
        />
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <div className="space-y-4 text-muted-foreground">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Architecture</h4>
              <p>
                Built with modern full-stack architecture using Next.js for
                server-side rendering and static generation, ensuring optimal
                performance and SEO. The backend API is powered by Node.js and
                Express.js with MongoDB for persistent data storage.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Development Process</h4>
              <p>
                Developed following agile methodology with Git-based workflow.
                Implemented using component-driven development with React for
                reusable, maintainable UI components. Database schema designed
                for scalability with proper indexing for query optimization.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Authentication & Security</h4>
              <p>
                Secured with JWT-based authentication and role-based access
                control (RBAC). Implemented HTTPS encryption, environment
                variables for sensitive data, and validated inputs on both
                client and server sides.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Deployment</h4>
              <p>
                Deployed on cloud platforms (Vercel for frontend, AWS for
                backend) with CI/CD pipeline using GitHub Actions. Implemented
                automated testing, linting, and build processes for reliable
                deployments.
              </p>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* Call to Action */}
      <section className="space-y-4 pt-8 border-t">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 13}
          className="text-xl font-semibold"
          text="View This Project"
        />
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <div className="flex gap-3 flex-wrap">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                View Live Project →
              </a>
            )}
            <Link
              href="/projects"
              className="px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium"
            >
              Back to All Projects
            </Link>
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
