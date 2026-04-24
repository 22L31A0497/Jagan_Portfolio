"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/*
  <Magnetic> — wraps any element and pulls it toward the cursor when the pointer
  enters its bounds. Uses Framer's useSpring for buttery damping.
*/
type Props = {
  children: ReactNode;
  strength?: number;      // 0..1, how aggressively it follows (default 0.3)
  range?: number;         // px of cursor distance to respond to (unused here; triggered on hover)
  className?: string;
  as?: "div" | "span";
};

export function Magnetic({
  children,
  strength = 0.3,
  className = "",
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement | HTMLSpanElement>(null);
  const isTouch = useMediaQuery("(hover: none)");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = (as === "span" ? motion.span : motion.div) as typeof motion.div;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </Tag>
  );
}
