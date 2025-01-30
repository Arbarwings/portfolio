import type React from "react";
import { PlusIcon, MinusIcon } from "lucide-react";

interface ProsConsCardProps {
  title: string;
  pros: string[];
  cons: string[];
}

export const ProsConsCard: React.FC<ProsConsCardProps> = ({
  title,
  pros,
  cons,
}) => {
  return (
    <div className="not-prose mx-auto p-4">
      <h2 className="mb-6 text-center text-2xl font-bold">{title}</h2>
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="md:flex">
          <div className="bg-green-50 p-4 md:w-1/2">
            <span className="mb-4 flex items-center text-lg font-semibold text-green-700">
              <PlusIcon className="mr-2 h-5 w-5" />
              Pros
            </span>
            <ul className="space-y-2">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <PlusIcon className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="-mt-1 text-gray-800">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 p-4 md:w-1/2">
            <span className="mb-4 flex items-center text-lg font-semibold text-red-700">
              <MinusIcon className="mr-2 h-5 w-5" />
              Cons
            </span>
            <ul className="space-y-2">
              {cons.map((con, index) => (
                <li key={index} className="flex items-start">
                  <MinusIcon className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                  <span className="-mt-1 text-gray-800">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
