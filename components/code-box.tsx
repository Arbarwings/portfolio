"use client";

import { Sandpack, SandpackProps } from "@codesandbox/sandpack-react";

export interface CodeBoxProps extends Omit<SandpackProps, "theme"> {
  template:
    | "static"
    | "react"
    | "react-ts"
    | "vanilla-ts"
    | "vanilla"
    | "node"
    | "nextjs"
    | "vite"
    | "vite-react"
    | "vite-react-ts";
}

export const CodeBox: React.FC<CodeBoxProps> = (props) => {
  return (
    <Sandpack
      {...props}
      theme={{
        colors: {
          surface1: "#2a2a40",
          surface2: "#0a0a23",
          surface3: "#3b3b4f",
          clickable: "#dfdfe2",
          base: "#ffffff",
          disabled: "#858591",
          hover: "#ffffff",
          accent: "#dbb8ff",
          error: "#ffffff",
          errorSurface: "#3b3b4f",
        },
        syntax: {
          plain: "#ffffff",
          comment: {
            color: "#858591",
            fontStyle: "italic",
          },
          keyword: "#dbb8ff",
          tag: "#f07178",
          punctuation: "#99c9ff",
          definition: "#ffffff",
          property: "#99c9ff",
          static: "#f78c6c",
          string: "#acd157",
        },
      }}
    />
  );
};
