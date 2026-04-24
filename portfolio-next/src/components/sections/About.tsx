"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { bio, stats, achievements } from "@content/bio";
import { TextReveal, RevealBlock } from "@/components/motion/TextReveal";
import { StatCounter } from "@/components/ui/StatCounter";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section id="about" className="relative scroll-mt-20 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <span className="eyebrow">01 — About</span>

        <div ref={ref} className="mt-12 grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
          <div>
            <TextReveal
              as="h2"
              text="I design honest interfaces and engineer the systems behind them."
              className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-balance"
            />
            <RevealBlock delay={0.25} className="mt-10 max-w-2xl space-y-5 text-lg text-[color:var(--color-fg-muted)]">
              <p>{bio.about}</p>
              <p>
                I write TypeScript by day, Python by night, and care equally about
                shader performance and API boundaries. When a product feels fast,
                quiet, and inevitable — that&apos;s when I know it&apos;s done.
              </p>
            </RevealBlock>

            <RevealBlock delay={0.45} className="mt-14">
              <p className="eyebrow">Notable</p>
              <ul className="mt-4 space-y-2.5">
                {achievements.map((a, i) => (
                  <li key={i} className="flex items-start gap-4 text-[color:var(--color-fg)]/90">
                    <span className="mt-[0.55em] h-px w-8 flex-none bg-[color:var(--color-accent)]" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </RevealBlock>
          </div>

          {/* Portrait with grayscale→color hover */}
          <motion.div
            style={{ y: portraitY }}
            className="relative lg:sticky lg:top-28 lg:self-start"
          >
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-[color:var(--color-border)]">
              <motion.div
                className="absolute inset-0"
                style={{ scale: portraitScale }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt={bio.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale contrast-110 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg)] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                <span>{bio.location}</span>
                <span>{bio.timezone}</span>
              </div>
            </div>

            {/* Pull quote */}
            <p className="mt-8 max-w-sm font-serif italic text-xl text-[color:var(--color-fg-muted)] text-pretty">
              &ldquo;The best code is the code you didn&apos;t have to write, and the
              best interface is the one nobody notices.&rdquo;
            </p>
          </motion.div>
        </div>

        {/* Stats band */}
        <div className="mt-24 grid grid-cols-2 divide-x divide-y divide-[color:var(--color-border)] border border-[color:var(--color-border)] md:grid-cols-4 md:divide-y-0">
          {stats.map((s, i) => (
            <RevealBlock key={s.label} delay={i * 0.08} className="p-8 md:p-10">
              <StatCounter value={s.value} suffix={s.suffix} />
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                {s.label}
              </p>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
