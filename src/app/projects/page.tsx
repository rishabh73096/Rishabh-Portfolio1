"use client"

import { useState, useMemo } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { Search, X } from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return DATA.projects;

    const query = searchQuery.toLowerCase();
    return DATA.projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(query)
        )
    );
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-8">
      {/* Back Button */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/"
          className="text-primary hover:underline text-sm font-medium w-fit"
        >
          ← Back to Home
        </Link>
      </BlurFade>

      {/* Hero Section */}
      <section id="projects-hero" className="space-y-6">
        <div className="space-y-4">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
            yOffset={8}
            text="My Projects"
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 2}
            className="max-w-2xl text-lg text-muted-foreground"
            text="Explore my latest work in full-stack development, featuring production-ready applications with real-world clients and users."
          />
        </div>

        {/* Search Bar */}
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="relative animate-fade-in">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 p-1 hover:bg-muted rounded-md transition-colors animate-scale-in"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2 animate-fade-in">
                Found {filteredProjects.length} project
                {filteredProjects.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </BlurFade>
      </section>

      {/* Projects Grid */}
      <section id="projects-grid" className="space-y-6">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {filteredProjects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 4 + id * 0.05}
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
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-lg text-muted-foreground">
              No projects found matching &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={handleClearSearch}
              className="mt-4 px-4 py-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section id="projects-stats" className="pt-12 border-t">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">
                {DATA.projects.length}+
              </div>
              <p className="text-sm text-muted-foreground">
                Production Projects
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">200+</div>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">100+</div>
              <p className="text-sm text-muted-foreground">
                Transactions Processed
              </p>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* CTA Section */}
      <section id="projects-cta" className="pt-12 text-center space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <h2 className="text-2xl font-bold">Ready to start your project?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let&apos;s build something amazing together. Get in touch to discuss your
            ideas.
          </p>
          <a
            href="https://x.com/Rishabh__73"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium hover:scale-105 duration-200"
          >
            Message Me on Twitter
          </a>
        </BlurFade>
      </section>
    </main>
  );
}
