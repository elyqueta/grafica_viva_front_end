import { MetadataRoute } from "next";
import { SERVICES } from "./data/servicos";
import { PROJECTS } from "./data/portfolio";
import { BLOG_POSTS } from "./data/blog";
import { PARTNERS } from "./data/partners";
import { SITE_URL } from "./lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/servicos",
    "/sobre",
    "/portfolio",
    "/blog",
    "/contactos",
    "/orcamento",
    "/manifesto",
    "/parceiros",
    "/produtos",
  ];

  const servicePaths = SERVICES.map((service) => `/servicos/${service.slug}`);
  const projectPaths = PROJECTS.map((project) => `/portfolio/${project.slug}`);
  const blogPaths = BLOG_POSTS.map((post) => `/blog/${post.slug}`);
  const partnerPaths = PARTNERS.map((partner) => `/parceiros/${partner.slug}`);

  const urls = [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly" as const,
    })),
    ...servicePaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "weekly" as const,
    })),
    ...projectPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "weekly" as const,
    })),
    ...blogPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "weekly" as const,
    })),
    ...partnerPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly" as const,
    })),
  ];

  return urls;
}
