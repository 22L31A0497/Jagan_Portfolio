"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { bio } from "@content/bio";
import { Magnetic } from "@/components/motion/Magnetic";

// R3F canvas is client-only and lazy — it's the heaviest thing on the page
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

const NAME = "Jaganmohan";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-12"
    >
      {/* 3D canvas — full bleed, behind everything */}
      <motion.div
        aria-hidden
        style={{ scale: sceneScale }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <HeroScene />
      </motion.div>

      {/* Subtle vignette to keep type legible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(9,9,11,0.55) 65%, rgba(9,9,11,0.95) 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 md:px-10">
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-2 self-start rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)]/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
          </span>
          Available · 2026 opportunities
        </motion.div>

        {/* Massive kinetic name */}
        <motion.h1
          style={{ y: titleY }}
          className="font-serif text-[clamp(3.4rem,13vw,11rem)] leading-[0.88] tracking-[-0.04em] text-balance"
        >
          <span className="block overflow-hidden">
            <motion.span
              className="inline-block text-[color:var(--color-muted)]"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              Hello, I&apos;m
            </motion.span>
          </span>
          <span className="block" aria-label={NAME}>
            {NAME.split("").map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  aria-hidden
                  className="inline-block"
                  initial={{ y: "115%", filter: "blur(12px)" }}
                  animate={{ y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 1,
                    delay: 0.45 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
            <span className="text-[color:var(--color-accent)]">.</span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="inline-flex items-baseline italic text-[color:var(--color-muted)]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              A <span className="not-italic text-[color:var(--color-fg)] mx-3">full-stack engineer</span> who ships.
            </motion.span>
          </span>
        </motion.h1>

        {/* Subline + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-xl text-base text-[color:var(--color-fg-muted)] md:text-lg">
            {bio.tagline} Currently shipping real-time platforms, applied computer
            vision, and hackathon-scale MVPs out of {bio.location}.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic strength={0.25}>
              <a
                href="#projects"
                data-cursor="link"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[color:var(--color-accent)]/60 bg-[color:var(--color-accent-soft)] px-6 py-3 text-sm font-medium transition-colors hover:border-[color:var(--color-accent)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 translate-y-full bg-[color:var(--color-accent)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                />
                <span className="relative z-10 transition-colors group-hover:text-[color:var(--color-bg)]">
                  View selected work
                </span>
                <ArrowDown size={14} className="relative z-10 -rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--color-bg)]" />
              </a>
            </Magnetic>
            <a
              href="#contact"
              data-cursor="link"
              className="link-wipe px-1 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]"
            >
              Or get in touch →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        aria-hidden
        style={{ opacity: hintOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-muted)]"
      >
        <span>Scroll</span>
        <span className="flex h-8 w-5 justify-center rounded-full border border-[color:var(--color-border-strong)] pt-1.5">
          <span className="h-1.5 w-0.5 rounded-full bg-[color:var(--color-fg)]/50 animate-hint" />
        </span>
      </motion.div>
    </section>
  );
}
