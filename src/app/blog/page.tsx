import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { BLOGS } from "@/data/blogs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DashedBox } from "@/components/ui/dashed-box";
import Image from "next/image";

const BLUR_FADE_DELAY = 0.04;

export const metadata = {
  title: "Blog — Technical Articles",
  description:
    "Deep dives into full-stack development, architecture, and production lessons learned from real MERN/Next.js projects.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Technical Articles — Rishabh Tiwari, Full Stack Developer",
    description:
      "Deep dives into full-stack development, architecture, and production lessons learned from real MERN/Next.js projects.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-8">
      {/* Back Button */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/"
          className="font-mono text-sm font-medium text-muted-foreground hover:text-foreground w-fit transition-colors"
        >
          ← Back to Home
        </Link>
      </BlurFade>

      {/* Hero Section */}
      <section id="blog-hero" className="space-y-6">
        <div className="space-y-4">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
            yOffset={8}
            text="Technical Articles"
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 2}
            className="max-w-2xl text-lg text-muted-foreground"
            text="Deep dives into full-stack development, architecture decisions, and production lessons learned."
          />
        </div>
      </section>

      {/* Blog Grid */}
      <section id="blog-grid" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOGS.map((blog, idx) => (
            <BlurFade
              key={blog.id}
              delay={BLUR_FADE_DELAY * 3 + idx * 0.05}
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

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {blog.category}
                      </Badge>
                      <span className="text-xs font-mono text-muted-foreground">
                        {blog.readTime} min read
                      </span>
                    </div>

                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-2 text-xs font-mono text-muted-foreground">
                      <div className="flex items-center gap-2">
                        {blog.projectName && (
                          <span className="text-primary font-sans font-medium">
                            {blog.projectName}
                          </span>
                        )}
                      </div>
                      <time>{new Date(blog.date).toLocaleDateString()}</time>
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
      </section>

      {/* Stats */}
      <section id="blog-stats" className="pt-4">
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <DashedBox className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">
                {BLOGS.length}
              </div>
              <p className="text-sm text-muted-foreground">Technical Articles</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">
                {Math.round(BLOGS.reduce((sum, b) => sum + b.readTime, 0) / BLOGS.length)}
              </div>
              <p className="text-sm text-muted-foreground">Avg Read Time (min)</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">
                {new Set(BLOGS.map(b => b.category)).size}
              </div>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
          </DashedBox>
        </BlurFade>
      </section>
    </main>
  );
}
