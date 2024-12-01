import { Mdx } from "@/components/mdx";
import { buttonVariants } from "@/components/ui/button";
import { cn, getBaseURL } from "@/lib/utils";
import { allPosts } from "content-collections";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { data as resumeData } from "@/data/resume";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Params = Promise<{ slug: string }>;
export async function generateMetadata({ params }: { params: Params }) {
  const { slug: currentPath } = await params;
  const page = allPosts.find(({ slug }) => slug === currentPath);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} • Melvin Oostendorp`,
    description: page.description,
    authors: [
      {
        name: `${resumeData.firstName} ${resumeData.lastName}`,
      },
    ],
    openGraph: page.image
      ? {
          images: [
            {
              url: new URL(page.image, getBaseURL().origin).href,
              width: 1920,
              height: 1080,
              alt: page.imageAlt ?? page.title,
            },
          ],
        }
      : undefined,
  };
}

export async function generateStaticParams() {
  return allPosts.map((page) => ({
    slug: page.slug,
  }));
}

export default async function Page(props: Readonly<{ params: Params }>) {
  const params = await props.params;
  const currentPath = params.slug;
  const post = allPosts.find(({ slug }) => slug === currentPath);

  if (!post) {
    notFound();
  }

  return (
    <article className="container prose relative max-w-3xl dark:prose-invert">
      <Link
        href="/blog"
        prefetch
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-0 hidden xl:inline-flex",
        )}
      >
        <ChevronLeftIcon className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        <time
          dateTime={post.publishedAt}
          className="block text-sm text-muted-foreground"
        >
          Published on {new Date(post.publishedAt).toDateString()}
        </time>
        <h1 className="mt-2 inline-block text-4xl leading-tight lg:text-5xl">
          {post.title}
        </h1>
        <p className="m-0 text-lg">{post.description}</p>
        <div className="mt-4 flex space-x-4">
          <Link href="/" className="no-underline">
            <div className="flex items-center space-x-2 text-sm">
              <Avatar className="not-prose size-11">
                <AvatarImage
                  alt={`${resumeData.firstName} ${resumeData.lastName}`}
                  src="/avatar.jpeg"
                />
                <AvatarFallback>{resumeData.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left leading-tight">
                <p className="mb-0 font-medium">{`${resumeData.firstName} ${resumeData.lastName}`}</p>
                <p className="mt-0 text-[12px] text-muted-foreground">
                  {resumeData.title}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.imageAlt ?? post.title}
          width={720}
          height={405}
          className={cn("rounded-md border bg-muted transition-colors", {
            "mb-0 mt-8": post.imageAlt,
            "my-8": !post.imageAlt,
          })}
          priority
        />
      )}
      {post.imageAlt && (
        <p className="mt-1 text-sm text-muted-foreground">{post.imageAlt}</p>
      )}
      <div className="md:prose-lg prose-h1:-mb-2 prose-h1:mt-7 prose-h1:text-4xl">
        <Mdx code={post.mdx} />
      </div>
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/blog"
          prefetch
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  );
}
