import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { z } from "zod";

const prettyCodeOptions: Options = {
  theme: {
    dark: "github-dark-dimmed",
    light: "catppuccin-latte",
  },
};

const posts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categories: z
      .array(z.enum(["development", "design", "product", "business", "other"]))
      .default(["development"]),
    publishedAt: z.string().datetime(),
    updatedAt: z.string().datetime().optional(),
    published: z.boolean().default(true),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    video: z.string().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypePrettyCode, prettyCodeOptions],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              ariaLabel: "Link to section",
            },
          },
        ],
      ],
    });
    return {
      ...document,
      mdx,
      slug: document._meta.path,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
