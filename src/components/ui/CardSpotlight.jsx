import React, { useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "../../lib/utils";

export const CardSpotlight = ({
  children,
  className,
  spotlightColor = "rgba(99, 102, 241, 0.18)",
  size = 400,
}) => {
  const [opacity, setOpacity] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 70%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a] overflow-hidden transition-colors duration-300 hover:border-white/[0.18]",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{ opacity, background }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
