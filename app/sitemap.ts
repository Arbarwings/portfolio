import { getBaseURL } from "@/lib/utils";
import { MetadataRoute } from "next";
import { allPosts } from "content-collections";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postSlugs = allPosts.map((e) => ({
    slug: e.slug,
    modified_at: e.publishedAt,
  }));

  const defaultPages = [
    {
      url: getBaseURL().origin,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${getBaseURL().origin}/blog`,
      lastModified: postSlugs[0].modified_at,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
  ];

  const sitemap = [
    ...defaultPages,
    ...postSlugs.map((e) => ({
      url: `${getBaseURL().origin}/blog/${e.slug}`,
      lastModified: e.modified_at,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return sitemap;
}
