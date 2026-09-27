import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionLabel } from "@/components/ui/section-label";
import { DashedBox } from "@/components/ui/dashed-box";
import { TimelineItem } from "@/components/timeline-item";
import { AnimatedAvatar } from "@/components/animated-avatar";
import { LiveClock } from "@/components/live-clock";
import { GithubContributions } from "@/components/github-contributions";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import { BLOGS } from "@/data/blogs";
import { SERVICES } from "@/data/services";
import { FAQ } from "@/data/faq";
import { TestimonialsSection } from "@/components/testimonials-section";
import { MapPinIcon, DownloadIcon } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";
import Image from "next/image";

const getSocialIcon = (name: string) => {
  switch (name) {
    case "GitHub":
      return Icons.github;
    case "LinkedIn":
      return Icons.linkedin;
    case "email":
      return Icons.email;
    case "X":
      return Icons.x;
    default:
      return Icons.github;
  }
};

const BLUR_FADE_DELAY = 0.04;

// Refresh the GitHub contribution graph at most once an hour.
export const revalidate = 3600;

const githubUsername = DATA.contact.social.GitHub.url.split("/").filter(Boolean).pop()!;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: DATA.name,
    url: DATA.url,
    jobTitle: "Full Stack Developer",
    description: DATA.description,
  },
};

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <section id="hero">
        <div className="mx-auto w-full max-w-4xl space-y-8">
          <div className="gap-4 flex flex-col md:flex-row md:justify-between md:items-start items-center">
            <div className="flex-col flex flex-1 space-y-1.5 md:order-1 order-2">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-center md:text-left"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="flex items-center justify-center gap-1.5 font-mono text-sm text-muted-foreground md:justify-start">
                  <MapPinIcon className="size-3.5" />
                  <span>{DATA.location}</span>
                  <span aria-hidden>&middot;</span>
                  <LiveClock />
                </div>
              </BlurFade>
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
        <div className="flex flex-col gap-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <SectionLabel>About</SectionLabel>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <DashedBox>
              <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                {DATA.summary}
              </Markdown>
            </DashedBox>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <SectionLabel>Work Experience</SectionLabel>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <DashedBox>
              {DATA.work.map((work, id) => (
                <TimelineItem
                  key={work.company}
                  isLast={id === DATA.work.length - 1}
                  active={work.end === "Present"}
                >
                  <ResumeCard
                    logoUrl={work.logoUrl}
                    altText={work.company}
                    title={work.company}
                    subtitle={work.title}
                    href={work.href}
                    badges={work.badges}
                    period={`${work.start} - ${work.end ?? "Present"}`}
                    description={work.description}
                    active={work.end === "Present"}
                  />
                </TimelineItem>
              ))}
            </DashedBox>
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <SectionLabel>Education</SectionLabel>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <DashedBox>
              {DATA.education.map((education, id) => (
                <TimelineItem
                  key={education.school}
                  isLast={id === DATA.education.length - 1}
                >
                  <ResumeCard
                    href={education.href}
                    logoUrl={education.logoUrl}
                    altText={education.school}
                    title={education.school}
                    subtitle={education.degree}
                    period={`${education.start} - ${education.end}`}
                  />
                </TimelineItem>
              ))}
            </DashedBox>
          </BlurFade>
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <SectionLabel>My Skills</SectionLabel>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 9.5}>
            <DashedBox className="flex flex-wrap gap-2">
              {DATA.skills.map((skill) => (
                <Badge variant="secondary" key={skill}>
                  {skill}
                </Badge>
              ))}
            </DashedBox>
          </BlurFade>
        </div>
      </section>
      <section id="services">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9.7}>
            <SectionLabel>Services</SectionLabel>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 9.8}>
            <p className="text-sm text-muted-foreground">
              Available for freelance, contract and remote full-stack
              development work in India and worldwide.
            </p>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICES.map((service, id) => (
              <BlurFade
                key={service.title}
                delay={BLUR_FADE_DELAY * 9.9 + id * 0.03}
              >
                <Link href={`/services/${service.slug}`}>
                  <DashedBox className="h-full transition-colors hover:border-foreground/40">
                    <h3 className="font-semibold hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </DashedBox>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="github">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <SectionLabel>GitHub Activity</SectionLabel>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10.5}>
            <DashedBox>
              <GithubContributions username={githubUsername} />
            </DashedBox>
          </BlurFade>
        </div>
      </section>
      <section id="projects">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <SectionLabel>My Projects</SectionLabel>
          </BlurFade>
          <div className="flex flex-col gap-4">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
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
        </div>
      </section>
      <TestimonialsSection />
      <section id="blog">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <SectionLabel>Latest Articles</SectionLabel>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {BLOGS.slice(0, 4).map((blog, id) => (
              <BlurFade
                key={blog.id}
                delay={BLUR_FADE_DELAY * 13 + id * 0.05}
              >
                <Link href={`/blog/${blog.slug}`}>
                  <Card className="group h-full cursor-pointer overflow-hidden p-3 transition-colors hover:border-foreground/40">
                    <div className="relative w-full h-40 mb-3 overflow-hidden rounded-lg">
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
                        <span className="text-xs font-mono text-muted-foreground">
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
                  </Card>
                </Link>
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="flex justify-center pt-2">
              <Link
                href="/blog"
                className="rounded-md border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                View All Articles →
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="faq">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <SectionLabel>FAQ</SectionLabel>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 15.2}>
            <DashedBox className="divide-y divide-dashed divide-border p-0">
              {FAQ.map((item) => (
                <details key={item.question} className="group px-5 py-4 first:rounded-t-2xl last:rounded-b-2xl">
                  <summary className="cursor-pointer list-none font-medium marker:content-none">
                    <span className="flex items-center justify-between gap-4">
                      {item.question}
                      <span
                        aria-hidden
                        className="shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.answer}
                  </p>
                </details>
              ))}
            </DashedBox>
          </BlurFade>
        </div>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <DashedBox className="flex flex-col items-center gap-4 py-10 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Let&apos;s Connect</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Feel free to reach out through any of these platforms
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {Object.entries(DATA.contact.social).map(([name, social]) => {
                const Icon = getSocialIcon(name);
                return (
                  <a
                    key={name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    <Icon className="size-3.5" />
                    {social.name}
                  </a>
                );
              })}
              <a
                href={DATA.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                <DownloadIcon className="size-3.5" />
                Resume
              </a>
            </div>
          </DashedBox>
        </BlurFade>
      </section>
    </main>
  );
}
