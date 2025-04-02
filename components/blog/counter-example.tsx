"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const CounterExample = () => {
  const [count, setCount] = useState(20);

  const increment = () => {
    if (count < 100) setCount(count + 20);
  };

  const decrement = () => {
    if (count > 0) setCount(count - 20);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md border p-4 md:p-8">
      <div className="flex h-10 items-center justify-center gap-4">
        <Button onClick={decrement} disabled={count === 0}>
          <MinusIcon className="h-4 w-4" />
        </Button>
        <p>{count}%</p>
        <Button onClick={increment} disabled={count === 100}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="bg-secondary relative h-5 w-full overflow-hidden rounded-full">
        <div
          className={cn(
            "to-primary absolute top-0 bottom-0 left-0 rounded-full bg-linear-to-r from-pink-500 transition-all duration-500 ease-out",
            {
              "w-0": count === 0,
              "w-1/5": count === 20,
              "w-2/5": count === 40,
              "w-3/5": count === 60,
              "w-4/5": count === 80,
              "w-full": count === 100,
            },
          )}
        />
      </div>
    </div>
  );
};
