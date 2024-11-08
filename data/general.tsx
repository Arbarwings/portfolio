import {
  CodeIcon,
  ContactIcon,
  GithubIcon,
  HouseIcon,
  LinkedinIcon,
  NotebookIcon,
} from "lucide-react";

export const data = {
  navbar: [
    { href: "/", icon: HouseIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/#projects", icon: CodeIcon, label: "Projects" },
    { href: "/#contact", icon: ContactIcon, label: "Contact" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Arbarwings/",
        icon: GithubIcon,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/melvin-oostendorp/",
        icon: LinkedinIcon,
        navbar: true,
      },
    },
  },
} as const;
