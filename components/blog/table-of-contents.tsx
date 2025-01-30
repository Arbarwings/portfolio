import { ChevronRightIcon } from "lucide-react";
import type React from "react";

interface TableOfContentsProps {
  items: {
    title: string;
    href: string;
    children?: {
      title: string;
      href: string;
    }[];
  }[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  return (
    <div className="not-prose my-10 rounded-lg border pb-4 pr-4">
      <h2 className="px-6 py-5 pb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
        <span>Table of contents</span>
      </h2>
      <ul className="pl-4 dark:border-slate-800">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              aria-label={item.title}
              className="mb-0.5 flex items-center gap-x-2 rounded-lg px-2 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:hover:bg-slate-800 dark:focus:bg-slate-800"
            >
              <div className="w-full break-words py-2 text-base text-slate-700 focus:outline-none dark:text-slate-200">
                {item.title}
              </div>
            </a>
            {item.children && (
              <ul className="pl-4 dark:border-slate-800">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <a
                      href={child.href}
                      aria-label={child.title}
                      className="-mt-1 mb-1 flex items-center gap-x-2 rounded-lg px-2 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:hover:bg-slate-800 dark:focus:bg-slate-800"
                    >
                      <span className="text-slate-400 dark:text-slate-500">
                        <ChevronRightIcon size={16} />
                      </span>
                      <div className="w-full break-words py-2 text-base text-slate-600 focus:outline-none dark:text-slate-300">
                        {child.title}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
