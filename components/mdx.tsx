import { useMDXComponent } from "@content-collections/mdx/react";
import Image from "next/image";
import type { FC, HTMLProps, ReactNode } from "react";
import { CodeBox } from "@/components/code-box";

type MdxProperties = {
  readonly code: string;
};

const a: FC<HTMLProps<HTMLAnchorElement>> = ({ href, ...properties }) => {
  if (typeof href !== "string") {
    throw new TypeError("href is required");
  }

  return (
    <a
      {...properties}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {properties.children || href}
    </a>
  );
};

const img: FC<HTMLProps<HTMLImageElement>> = (properties) => {
  if (
    typeof properties.src !== "string" ||
    typeof properties.alt !== "string"
  ) {
    throw new TypeError("Image src and alt are required");
  }

  return (
    <Image
      src={properties.src}
      alt={properties.alt}
      width={1240}
      height={698}
      unoptimized={properties.src.startsWith("http")}
      className="overflow-hidden rounded"
      quality={100}
    />
  );
};

const Callout: FC<{ readonly children: ReactNode }> = ({ children }) => (
  <div className="overflow-hidden rounded-lg bg-gradient-to-tr from-white/0 to-white/20 p-px">
    <div className="rounded-[7px] bg-gradient-to-tr from-black to-neutral-950 p-6">
      {children}
    </div>
  </div>
);

export const Mdx: FC<MdxProperties> = ({ code }) => {
  const Component = useMDXComponent(code);

  return (
    <Component
      components={{
        a,
        img,
        Callout,
        CodeBox,
      }}
    />
  );
};
