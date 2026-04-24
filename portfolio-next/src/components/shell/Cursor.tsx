"use client";

/*
  Custom two-part cursor:
  - dot:  solid circle, 1:1 follow
  - ring: outlined circle, spring-lerped follow

  Interactive state resolved via the `data-cursor` attribute on any element.
  Values: "link" | "view" | "drag" | "text" | default
*/

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type CursorState = "default" | "link" | "view" | "drag" | "text";

export function Cursor() {
  const isTouch = useMediaQuery("(hover: none), (pointer: coarse)");
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [state, setState] = useState<CursorState>("default");
  const [down, setDown] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  // Target + current (lerped) positions
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isTouch || prefersReduced) return;

    document.documentElement.classList.add("cursor-custom");

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible) setVisible(true);

      // Resolve cursor state by walking up from the element under the pointer
      const el = e.target as HTMLElement | null;
      const host = el?.closest<HTMLElement>("[data-cursor]");
      const next = (host?.dataset.cursor as CursorState) || "default";
      setState(next);
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);

    let rafId = 0;
    const tick = () => {
      // Lerp ring toward target (0.18 = soft spring feel)
      const lerp = 0.18;
      current.current.x += (target.current.x - current.current.x) * lerp;
      current.current.y += (target.current.y - current.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("cursor-custom");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isTouch, prefersReduced, visible]);

  if (isTouch || prefersReduced) return null;

  // Ring size per state
  const ringSize = (() => {
    switch (state) {
      case "view": return 110;
      case "link": return 54;
      case "drag": return 80;
      case "text": return 4;
      default:     return 36;
    }
  })();

  const label = state === "view" ? "VIEW" : state === "drag" ? "DRAG" : "";

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[6px] w-[6px] rounded-full bg-[color:var(--color-fg)] transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0, mixBlendMode: "difference" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border font-mono text-[10px] uppercase tracking-[0.2em] transition-[width,height,background-color,border-color,color,opacity,transform] duration-[300ms]"
        style={{
          width: ringSize,
          height: ringSize === 4 ? 22 : ringSize,
          borderRadius: state === "text" ? 2 : 9999,
          borderColor: state === "view" ? "transparent" : "var(--color-fg)",
          backgroundColor:
            state === "view"
              ? "var(--color-accent)"
              : state === "link"
              ? "rgba(212,163,115,0.15)"
              : "transparent",
          color: state === "view" ? "var(--color-bg)" : "var(--color-fg)",
          opacity: visible ? (state === "text" ? 0.55 : 1) : 0,
          mixBlendMode: state === "view" ? "normal" : "difference",
          transform: `translate3d(0,0,0) scale(${down ? 0.88 : 1})`,
          transformOrigin: "center",
        }}
      >
        {label && <span className="font-medium">{label}</span>}
      </div>
    </>
  );
}
