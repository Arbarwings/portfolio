import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/**",
        search: "",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/_ph/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/_ph/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default withContentCollections(nextConfig);
