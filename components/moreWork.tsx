"use client";

import React, { useState } from "react";
import { ResumeCard } from "@/components/resume-card";
import { Button } from "@/components/ui/button";
import { data } from "@/data/resume";

const MoreWork = ({
  workData,
  limit,
}: {
  workData: typeof data.work;
  limit: number;
}) => {
  const [showAll, setShowAll] = useState(false);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  if (!workData || workData.length <= limit) {
    return null;
  }

  if (!showAll) {
    return (
      <div className="flex justify-center">
        <Button onClick={handleToggleShowAll}>
          Show all {workData.length} experiences
        </Button>
      </div>
    );
  }

  // Show the rest of the work experiences
  const workToShow = workData.slice(limit);

  return (
    <>
      {workToShow.map((work) => (
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
      <div className="flex justify-center">
        <Button onClick={handleToggleShowAll}>Show less experiences</Button>
      </div>
    </>
  );
};

export default MoreWork;
