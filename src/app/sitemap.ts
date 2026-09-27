import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { BLOGS } from "@/data/blogs";
import { SERVICES } from "@/data/services";
import { slugify } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = DATA.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = DATA.projects.map((project) => ({
    url: `${base}/projects/${slugify(project.title)}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${base}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = BLOGS.map((blog) => ({
    url: `${base}/blog/${blog.slug}`,
    lastModified: blog.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes, ...blogRoutes];
}
