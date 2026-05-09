import React from "react";
import { cn } from "../../lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[minmax(18rem,auto)] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "row-span-1 rounded-2xl group/bento hover:shadow-xl transition-all duration-300 shadow-input p-6 bg-[#0a0a0a] border border-white/[0.08] justify-between flex flex-col space-y-4 relative overflow-hidden hover:border-white/20",
        onClick && "cursor-pointer",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-1 transition duration-200">
        {icon && <div className="mb-2">{icon}</div>}
        {title && (
          <div className="font-bold text-white text-lg mb-2">{title}</div>
        )}
        {description && (
          <div className="text-neutral-400 text-sm leading-relaxed">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
