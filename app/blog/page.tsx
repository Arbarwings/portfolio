import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
          <p className="text-muted-foreground text-xl">
            I write about web development, software engineering, and everything
            in between.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {allPosts?.length ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {allPosts
            .toSorted(
              (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime(),
            )
            .map((post, index) => (
              <article
                key={post.slug}
                className="group relative flex flex-col space-y-2"
              >
                <Card className="flex h-full flex-col overflow-hidden border transition-all duration-300 ease-out hover:shadow-lg">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.imageAlt ?? post.title}
                      width={352}
                      height={208}
                      style={{ width: "352px", height: "208px" }}
                      className="overflow-hidden object-cover object-top"
                      priority={index <= 1}
                    />
                  )}
                  <CardHeader className="px-2">
                    <h2 className="text-xl font-extrabold">{post.title}</h2>
                  </CardHeader>
                  {post.description && (
                    <CardContent className="mt-auto flex flex-col px-2">
                      <p className="text-muted-foreground">
                        {post.description}
                      </p>
                    </CardContent>
                  )}
                  {post.publishedAt && (
                    <CardFooter className="px-2 pb-2">
                      <p className="text-muted-foreground text-sm">
                        {new Date(post.publishedAt).toDateString()}
                      </p>
                    </CardFooter>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    prefetch
                    className="absolute inset-0"
                  >
                    <span className="sr-only">View Article</span>
                  </Link>
                </Card>
              </article>
            ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
}
