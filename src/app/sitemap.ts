import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";

// `lastModified` is deliberately omitted for every route that has no real
// per-URL modification date.
//
// It previously carried `new Date()` — the build timestamp — so every
// rebuild re-stamped every URL as freshly modified whether or not anything
// had changed. Google learns to distrust a lastmod that never correlates
// with actual change and then ignores it outright, which costs a genuine
// recrawl-prioritisation signal. An omitted lastmod is valid sitemap XML
// and strictly better than a fabricated one.
//
// Blog posts are the exception: `post.date` is a real, per-post publication
// date, so it is trustworthy enough to send.
export default function sitemap(): MetadataRoute.Sitemap {
  // "/about", "/services", and "/work" are excluded: they permanently
  // redirect to anchor sections on "/" (see next.config.mjs), so listing
  // them here would submit redirecting URLs to search engines instead of
  // the canonical single-page home.
  const staticRoutes = ["", "/blog", "/contact", "/ai-receptionist", "/privacy"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/privacy" ? 0.3 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
