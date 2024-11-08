"use client";

import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: {
    start: Date;
    end?: Date;
    yearOnly?: boolean;
  };
  description?: string;
}
export function ResumeCard({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: Readonly<ResumeCardProps>) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="block">
      <Card className="flex">
        <div className="flex-none">
          <Avatar className="m-auto size-12">
            <AvatarImage
              alt={altText}
              src={logoUrl}
              className="object-contain"
            />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="ml-4 grow flex-col items-center">
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="group inline-flex items-center justify-center text-xs font-semibold leading-none sm:text-sm">
                {href ? (
                  <Link href={href} target="_blank">
                    {title}
                  </Link>
                ) : (
                  title
                )}
                {href && (
                  <ChevronRightIcon className="size-4 translate-x-0 rotate-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                )}
              </h3>
              <div className="text-right text-xs tabular-nums text-muted-foreground sm:text-sm">
                {period?.start?.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: period.yearOnly ? undefined : "short",
                })}{" "}
                -{" "}
                {period?.end?.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: period.yearOnly ? undefined : "short",
                }) ?? "Present"}
              </div>
            </div>
            {subtitle && <div className="font-sans text-xs">{subtitle}</div>}
          </CardHeader>
          {description && (
            <div className="group">
              <motion.div
                initial={{
                  overflow: "hidden",
                  display: "-webkit-box",
                }}
                animate={{
                  overflow: isExpanded ? "visible" : "hidden",
                  display: isExpanded ? "block" : "-webkit-box",
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-2 line-clamp-2 text-xs sm:text-sm"
              >
                {description}
                {badges?.length && (
                  <div className="mb-2 mt-3">
                    <span className="flex flex-wrap gap-1">
                      {badges.map((badge, index) => (
                        <Badge
                          variant="secondary"
                          className="align-middle text-xs"
                          key={`${badge}-${index}`}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </span>
                  </div>
                )}
              </motion.div>
              {description.length > 180 && (
                <button className={cn("mt-1 text-xs")} onClick={handleClick}>
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
