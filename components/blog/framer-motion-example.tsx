"use client";

import { motion } from "motion/react";

export const FramerMotionExample = () => {
  return (
    <div className="flex justify-center p-4">
      <motion.div
        className="h-[150px] w-[150px] rounded-3xl bg-primary"
        animate={{ rotate: 360 }}
        transition={{
          type: "spring",
          duration: 5,
          bounce: 0.6,
          repeat: Infinity,
        }}
      />
    </div>
  );
};
