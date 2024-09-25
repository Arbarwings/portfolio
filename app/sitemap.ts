import { getBaseURL } from "@/lib/utils";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages = [
    {
      url: getBaseURL().origin,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  const sitemap = [
    ...defaultPages,
    // ...postSlugs.map((e) => ({
    //   url: `${getBaseURL()}/${e.slug}`,
    //   lastModified: e.modified_at,
    //   changeFrequency: "daily",
    //   priority: 0.8,
    // })),
  ];

  return sitemap;
}
