import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBaseURL = () => {
  // Client
  if (typeof window !== "undefined") {
    // This will always be the most accurate
    return new URL("/", window.location.origin);
  }

  // Server and SSG
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    // Check if the value includes the protocol
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL.includes("://")) {
      return new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL);
    }
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }

  // Default to localhost
  return new URL(`http://localhost:3000`);
};
