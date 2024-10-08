import { getBaseURL } from "@/lib/utils";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: [],
    },
    sitemap: [`${getBaseURL().origin}/sitemap.xml`],
  };
}
