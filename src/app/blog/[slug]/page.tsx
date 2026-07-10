import Link from "next/link";
import { BLOGS } from "@/data/blogs";
import { Badge } from "@/components/ui/badge";
import Markdown from "react-markdown";
import Image from "next/image";
import BlurFade from "@/components/magicui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

export async function generateStaticParams() {
  return BLOGS.map((blog) => ({
    slug: blog.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = BLOGS.find((b) => b.slug === params.slug);

  return {
    title: blog?.title,
    description: blog?.excerpt,
  };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = BLOGS.find((b) => b.slug === params.slug);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const relatedBlogs = BLOGS.filter(
    (b) => b.category === blog.category && b.id !== blog.id
  ).slice(0, 2);

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/blog"
          className="text-primary hover:underline text-sm font-medium w-fit"
        >
          ← Back to Articles
        </Link>
      </BlurFade>

      <section className="space-y-6 max-w-3xl">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="default">{blog.category}</Badge>
              <span className="text-sm text-muted-foreground">
                {blog.readTime} min read
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <time className="text-sm text-muted-foreground">
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {blog.title}
            </h1>

            {blog.projectName && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 relative rounded-full overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.projectName}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-primary font-medium">
                  From {blog.projectName}
                </span>
              </div>
            )}
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        </BlurFade>
      </section>

      <section className="max-w-3xl">
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <article className="prose dark:prose-invert max-w-none">
            <Markdown>
              {blog.content}
            </Markdown>
          </article>
        </BlurFade>
      </section>

      <section className="max-w-3xl space-y-6 pt-8 border-t">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-3">Tags</h3>
              <div className="flex gap-2 flex-wrap">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {blog.projectName && (
              <div>
                <h3 className="text-sm font-semibold mb-3">Featured Project</h3>
                <Link
                  href={`/projects/${blog.projectId}`}
                  className="flex items-center gap-3 p-4 rounded-lg border hover:border-primary transition-colors"
                >
                  <div className="w-12 h-12 relative rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={blog.image}
                      alt={blog.projectName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{blog.projectName}</h4>
                    <p className="text-sm text-muted-foreground">
                      View project details →
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </BlurFade>
      </section>

      {relatedBlogs.length > 0 && (
        <section className="max-w-3xl space-y-6 pt-8">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    href={`/blog/${relatedBlog.slug}`}
                    className="group"
                  >
                    <article className="space-y-2 p-4 rounded-lg border hover:border-primary transition-colors h-full">
                      <p className="text-xs text-muted-foreground">
                        {relatedBlog.category}
                      </p>
                      <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {relatedBlog.excerpt}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </BlurFade>
        </section>
      )}
    </main>
  );
}
