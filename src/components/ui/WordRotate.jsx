import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const WordRotate = ({
  words = [],
  duration = 2500,
  className,
  framerProps = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, duration);
    return () => clearInterval(t);
  }, [duration, words.length]);

  return (
    <div className="overflow-hidden inline-flex">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          {...framerProps}
          className={cn("inline-block", className)}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
