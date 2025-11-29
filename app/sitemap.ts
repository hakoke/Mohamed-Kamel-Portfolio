import type { MetadataRoute } from "next";
import { projectSlugs } from "@/data/projects";

const baseUrl = "https://mohamed-kamel.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectSlugs.map((slug) => ({
      url: `${baseUrl}/projects/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}

