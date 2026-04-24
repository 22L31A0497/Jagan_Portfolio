"use client";

/*
  First-visit loader.
  - Instantly visible on page boot (no flash of content)
  - Simulates progress while real assets load (images.decode() for priority images)
  - At 100%: panel splits — top slides up, bottom slides down — revealing content
  - Stored in sessionStorage; subsequent navigations skip the loader
*/

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const NAME = "JAGAN";
const STORAGE_KEY = "portfolio:loader-seen";
const MIN_DURATION = 1600; // ms — ensures the moment lands even on fast networks
const MAX_DURATION = 3000; // ms — hard cap; never hold the user

export function Loader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(STORAGE_KEY) !== "1";
  });
  const [progress, setProgress] = useState(0);

  // Fake progress that tracks real image decoding
  useEffect(() => {
    if (!show) {
      onDone();
      return;
    }

    let current = 0;
    let rafId = 0;
    const start = performance.now();

    // Try to decode a few hero-adjacent images so the number reflects real work
    const imgs = [
      "/images/profile.jpg",
      "/images/projects/chatpulse.png",
      "/images/projects/lms.jpg",
      "/images/projects/medimate.png",
    ];
    let decoded = 0;
    imgs.forEach((src) => {
      const im = new Image();
      im.src = src;
      im.decode?.().then(() => { decoded += 1; }).catch(() => { decoded += 1; });
    });

    const tick = (now: number) => {
      const elapsed = now - start;
      const timeFrac = Math.min(elapsed / MIN_DURATION, 1);
      const decodeFrac = decoded / imgs.length;
      // Weighted: 65% time + 35% decode
      const target = Math.min(timeFrac * 0.65 + decodeFrac * 0.35, 1);
      current += (target - current) * 0.08;
      const displayed = Math.min(Math.floor(current * 100), 100);
      setProgress(displayed);

      if (displayed >= 100 || elapsed > MAX_DURATION) {
        setProgress(100);
        // Hold briefly so users register the 100, then reveal
        setTimeout(() => {
          setShow(false);
          sessionStorage.setItem(STORAGE_KEY, "1");
          // Give the exit animation time to play before firing onDone
          setTimeout(onDone, 900);
        }, 220);
        return;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [show, onDone]);

  const letters = useMemo(() => NAME.split(""), []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          {/* Top half */}
          <motion.div
            aria-hidden
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.87, 0, 0.13, 1] } }}
            className="absolute inset-x-0 top-0 h-1/2 bg-[color:var(--color-bg)]"
          />
          {/* Bottom half */}
          <motion.div
            aria-hidden
            initial={{ y: 0 }}
            exit={{ y: "100%", transition: { duration: 0.9, ease: [0.87, 0, 0.13, 1] } }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[color:var(--color-bg)]"
          />

          {/* Content sits above both halves, fades out just before split */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* Center: kinetic name */}
            <div className="flex overflow-hidden">
              {letters.map((ch, i) => (
                <span key={i} className="overflow-hidden">
                  <motion.span
                    initial={{ y: "120%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-serif inline-block text-[clamp(3rem,12vw,9rem)] leading-none tracking-[-0.04em]"
                  >
                    {ch}
                  </motion.span>
                </span>
              ))}
            </div>

            {/* Bottom-left: percentage */}
            <div className="absolute bottom-8 left-8 flex items-baseline gap-2">
              <span
                key={progress}
                className="font-mono text-5xl tabular-nums md:text-6xl"
              >
                {String(progress).padStart(3, "0")}
              </span>
              <span className="font-mono text-sm text-[color:var(--color-muted)]">%</span>
            </div>

            {/* Bottom-right: loading label */}
            <div className="absolute bottom-8 right-8 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
              Preparing the work —
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-[color:var(--color-border)]">
              <motion.div
                className="h-full bg-[color:var(--color-accent)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
