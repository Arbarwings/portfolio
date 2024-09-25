"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

import React, { forwardRef } from "react";

interface ModeToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ModeToggle = forwardRef<HTMLButtonElement, ModeToggleProps>(
  (props, ref) => {
    const { theme, setTheme } = useTheme();

    // remove onClick from props
    const { onClick: _onClick, ...rest } = props;

    return (
      <Button
        ref={ref}
        variant="ghost"
        type="button"
        size="icon"
        className="size-12"
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        {...rest}
      >
        <SunIcon className="size-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
        <MoonIcon className="hidden size-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
      </Button>
    );
  },
);

ModeToggle.displayName = "ModeToggle";
