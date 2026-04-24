"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/*
  Scroll-triggered count-up.
  - Fires the instant the element's top crosses into the viewport (no deep-margin delay).
  - Respects prefers-reduced-motion: shows the final value with no animation.
*/
export function StatCounter({
  value,
  suffix = "",
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [n, setN] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4); // ease-out-quart
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reducedMotion]);

  return (
    <span ref={ref} className="font-serif text-[clamp(3rem,6vw,5rem)] leading-none tabular-nums">
      {n.toLocaleString()}
      <span className="text-[color:var(--color-accent)]">{suffix}</span>
    </span>
  );
}
