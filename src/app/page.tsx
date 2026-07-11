import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Badge } from "@/components/ui/badge";
import { AnimatedAvatar } from "@/components/animated-avatar";
import { DATA } from "@/data/resume";
import { BLOGS } from "@/data/blogs";
import Link from "next/link";
import Markdown from "react-markdown";
import Image from "next/image";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <div className="gap-4 flex flex-col md:flex-row md:justify-between md:items-start items-center">
            <div className="flex-col flex flex-1 space-y-1.5 md:order-1 order-2">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-center md:text-left"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl text-center md:text-left"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex gap-3 pt-4 justify-center md:justify-start flex-wrap">
                  <a
                    href={DATA.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm"
                  >
                    Download Resume
                  </a>
                  <a
                    href="#contact"
                    className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium text-sm"
                  >
                    Get in Touch
                  </a>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="md:order-2 order-1">
              <AnimatedAvatar
                src={DATA.avatarUrl}
                alt={DATA.name}
                fallback={DATA.initials}
                size="md"
              />
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
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
        </div>
      </section>
      <section id="blog">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Latest Articles
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Technical Deep Dives
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Exploring production challenges and solutions from real-world MERN projects.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {BLOGS.slice(0, 4).map((blog, id) => (
              <BlurFade
                key={blog.id}
                delay={BLUR_FADE_DELAY * 13 + id * 0.05}
              >
                <Link href={`/blog/${blog.slug}`}>
                  <article className="group cursor-pointer h-full flex flex-col">
                    <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-2 flex-1 flex flex-col">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {blog.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {blog.readTime} min
                        </span>
                      </div>

                      <h3 className="font-bold text-base group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          {blog.projectName && (
                            <span className="text-primary font-medium">
                              {blog.projectName}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-1 flex-wrap pt-2">
                        {blog.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs px-2"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="flex justify-center">
              <Link
                href="/blog"
                className="px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium"
              >
                View All Articles →
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on twitter
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
