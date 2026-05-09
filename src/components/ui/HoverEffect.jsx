import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const HoverEffect = ({ items, className, renderItem }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.id ?? idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 block rounded-2xl"
                layoutId="hoverBg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              />
            )}
          </AnimatePresence>
          {renderItem ? renderItem(item, idx) : null}
        </div>
      ))}
    </div>
  );
};

export const HoverCard = ({ children, className }) => (
  <div
    className={cn(
      "rounded-2xl h-full w-full overflow-hidden bg-[#0a0a0a] border border-white/[0.08] group-hover:border-white/[0.2] relative z-20 transition-all duration-300",
      className
    )}
  >
    {children}
  </div>
);
