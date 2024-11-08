import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  href?: string;
  description: string;
  categories: readonly string[];
  link?: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  className?: string;
}

export function PostCard({
  title,
  href,
  description,
  categories,
  link,
  image,
  imageAlt,
  video,
  className,
}: Readonly<Props>) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border transition-all duration-300 ease-out hover:shadow-lg">
      <Link
        href={href ?? "#"}
        prefetch
        className={cn("block cursor-pointer", className)}
        aria-label={title}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-52 w-full object-cover object-top"
          />
        )}
        {image && (
          <Image
            src={image}
            alt={imageAlt ?? title}
            width={300}
            height={208}
            style={{ width: "300px", height: "208px" }}
            className="overflow-hidden object-cover object-top"
          />
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <Link
            href={href ?? "#"}
            prefetch
            className={cn("block cursor-pointer", className)}
            aria-label={title}
          >
            <CardTitle className="mt-1 text-base">{title}</CardTitle>
          </Link>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {categories && categories.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {categories?.map((category) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={category}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        <Link prefetch href={href ?? "#"}>
          <Badge className="flex gap-2 px-2 py-1 text-xs">Read more</Badge>
        </Link>
      </CardFooter>
    </Card>
  );
}
