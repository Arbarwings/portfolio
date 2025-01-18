import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ResumeCard } from "@/components/resume-card";
import { ProjectCard } from "@/components/project-card";
import { data as resumeData } from "@/data/resume";
import { data as generalData } from "@/data/general";
import Link from "next/link";
import MoreWork from "@/components/moreWork";
import { Metadata } from "next";
import { getBaseURL } from "@/lib/utils";
import { allPosts } from "content-collections";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "Melvin Oostendorp • Full-Stack Developer",
  description:
    "Melvin Oostendorp - Passionate Full-Stack/Front-End Developer, team leader, and advocate for scalable, user-friendly software.",
  keywords: [
    "Melvin Oostendorp",
    "Full-Stack Developer",
    "Front-End Developer",
    "React",
    "TypeScript",
    "Node.js",
    "Software Engineer",
    "Web Developer",
  ],
  openGraph: {
    url: getBaseURL().origin,
    type: "website",
    title: "Melvin Oostendorp | Full-Stack Developer",
    description:
      "Melvin Oostendorp - Passionate Full-Stack/Front-End Developer, team leader, and advocate for scalable, user-friendly software.",
    images: [
      {
        url: `${getBaseURL().origin}/favicon-512x512.png`,
        width: 512,
        height: 512,
        alt: "Melvin Oostendorp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melvin Oostendorp | Full-Stack Developer",
    description:
      "Melvin Oostendorp - Passionate Full-Stack/Front-End Developer, team leader, and advocate for scalable, user-friendly software.",
    images: [
      {
        url: `${getBaseURL().origin}/favicon-512x512.png`,
        width: 512,
        height: 512,
        alt: "Melvin Oostendorp",
      },
    ],
  },
  alternates: {
    canonical: getBaseURL().origin,
  },
};

export default function Home() {
  // To improve SEO, we can use SSR to render the first 5 work experiences
  // and then use client-side rendering to show the rest of the work experiences
  const workToShowLimit = 5;

  const postsToShow = 4;

  return (
    <main className="flex min-h-dvh flex-col space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <div className="flex justify-between gap-2">
            <div className="flex flex-1 flex-col space-y-1.5">
              <span className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Hi, I&apos;m {resumeData.firstName} 👋
              </span>
              <span className="max-w-[600px] md:text-xl">
                {resumeData.description}
              </span>
            </div>
            <Avatar className="size-28">
              <AvatarImage
                alt={`${resumeData.firstName} ${resumeData.lastName}`}
                src="/avatar.jpeg"
              />
              <AvatarFallback>{resumeData.initials}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </section>
      <section id="about">
        <h2 className="text-xl font-bold">About</h2>
        <div className="prose max-w-full text-pretty font-sans text-base dark:text-muted-foreground">
          <p className="whitespace-pre-line">{resumeData.summary}</p>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">Work Experience</h2>
          {resumeData.work.slice(0, workToShowLimit).map((work) => (
            <ResumeCard
              key={`${work.company}-${work.title}`}
              logoUrl={work.logoUrl}
              altText={work.company}
              title={work.company}
              subtitle={work.title}
              href={work.href}
              badges={work.badges}
              period={{ start: work.start, end: work.end ?? undefined }}
              description={work.description}
            />
          ))}
          {resumeData.work.length > workToShowLimit && (
            <MoreWork workData={resumeData.work} limit={workToShowLimit} />
          )}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">Education</h2>
          {resumeData.education.map((education) => (
            <ResumeCard
              key={`${education.school}-${education.degree}`}
              href={education.href}
              logoUrl={education.logoUrl}
              altText={education.school}
              title={education.school}
              subtitle={education.degree}
              period={{
                start: education.start,
                end: education.end ?? undefined,
                yearOnly: true,
              }}
            />
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {resumeData.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>
      </section>
      <section id="blog">
        <div className="w-full space-y-12 py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">
                Latest Blog Posts
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Unloading my thoughts on the web
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I write about web development, software engineering, and
                everything in between. Here are some of my latest posts.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2">
            {allPosts
              .toSorted(
                (a, b) =>
                  new Date(b.publishedAt).getTime() -
                  new Date(a.publishedAt).getTime(),
              )
              .slice(0, postsToShow)
              .map((post) => (
                <PostCard
                  key={post.slug}
                  title={post.title}
                  description={post.description}
                  categories={post.categories}
                  image={post.image}
                  imageAlt={post.imageAlt}
                  href={`/blog/${post.slug}`}
                />
              ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="w-full space-y-12 py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">
                My Projects
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Check out my latest work
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I&apos;ve worked on a variety of projects, from simple websites
                to complex web applications. Here are a few of my favorites.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2">
            {resumeData.projects.map((project) => (
              <ProjectCard
                href={project.href}
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="grid w-full items-center justify-center gap-4 px-4 py-12 text-center md:px-6">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">
              Contact
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              If you have a cool project that needs my expertise, job
              opportunity, or just want to say hello? Then get in touch by
              sending me a direct message on{" "}
              <Link
                href={generalData.contact.social.LinkedIn.url}
                target="_blank"
                className="text-blue-600 underline decoration-blue-100 hover:decoration-blue-600 dark:text-blue-400 dark:decoration-blue-900 dark:hover:decoration-blue-600"
              >
                LinkedIn
              </Link>{" "}
              and I&apos;ll respond whenever I can.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
