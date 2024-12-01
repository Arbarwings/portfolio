import { allPosts } from "content-collections";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blog • Melvin Oostendorp",
  description: "Unloading my thoughts on the web.",
};

export default function Blog() {
  return (
    <div className="container max-w-4xl">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="font-heading inline-block text-4xl font-bold tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            I write about web development, software engineering, and everything
            in between.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {allPosts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {allPosts.map((post, index) => (
            <article
              key={post.slug}
              className="group relative flex flex-col space-y-2"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.imageAlt ?? post.title}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                  priority={index <= 1}
                />
              )}
              <h2 className="text-2xl font-extrabold">{post.title}</h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
              {post.publishedAt && (
                <p className="text-sm text-muted-foreground">
                  {new Date(post.publishedAt).toDateString()}
                </p>
              )}
              <Link
                href={`/blog/${post.slug}`}
                prefetch
                className="absolute inset-0"
              >
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
}
