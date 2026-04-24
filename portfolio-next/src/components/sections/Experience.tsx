"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@content/experiences";
import { education } from "@content/education";
import { TextReveal, RevealBlock } from "@/components/motion/TextReveal";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative scroll-mt-20 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <span className="eyebrow">04 — Journey</span>
        <TextReveal
          as="h2"
          text="Five internships. Production shipped every time."
          className="mt-10 font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-balance max-w-4xl"
        />

        <div ref={ref} className="relative mt-20 md:mt-28">
          {/* Static rail */}
          <div
            aria-hidden
            className="absolute left-4 top-0 bottom-0 w-px bg-[color:var(--color-border)] md:left-1/2 md:-translate-x-1/2"
          />
          {/* Animated accent rail */}
          <motion.div
            aria-hidden
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[color:var(--color-accent)] via-[color:var(--color-accent)]/40 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <ul className="space-y-24">
            {experiences.map((e, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li key={e.id} className="relative md:grid md:grid-cols-2 md:gap-16">
                  {/* Year marker on the rail */}
                  <span className="absolute left-4 top-3 -translate-x-1/2 md:left-1/2">
                    <span className="block h-2.5 w-2.5 rounded-full bg-[color:var(--color-accent)] ring-[6px] ring-[color:var(--color-bg)]" />
                  </span>

                  <div
                    className={
                      isLeft
                        ? "ml-10 md:ml-0 md:pr-16 md:text-right"
                        : "ml-10 md:ml-0 md:col-start-2 md:pl-16"
                    }
                  >
                    <RevealBlock delay={i * 0.05}>
                      <TimelineCard exp={e} align={isLeft ? "right" : "left"} />
                    </RevealBlock>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Education */}
        <div className="mt-32">
          <span className="eyebrow">05 — Education</span>
          <TextReveal
            as="h3"
            text="Before the internships."
            className="mt-8 font-serif text-3xl md:text-4xl tracking-[-0.03em]"
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-border)] md:grid-cols-3">
            {education.map((e, i) => (
              <RevealBlock
                key={e.id}
                delay={i * 0.1}
                className="group bg-[color:var(--color-bg)] p-8 transition-colors hover:bg-[color:var(--color-bg-elev)]"
              >
                <div className="flex items-start gap-4">
                  <div className="relative h-10 w-10 flex-none overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-white">
                    <Image src={e.logo} alt="" fill className="object-contain p-1" />
                  </div>
                  <div>
                    <p className="font-serif text-lg leading-tight">{e.school}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-muted)]">
                      {e.location}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm">{e.degree}</p>
                <div className="mt-4 flex items-center justify-between font-mono text-xs text-[color:var(--color-muted)]">
                  <span>{e.date}</span>
                  <span className="text-[color:var(--color-accent)]">{e.grade}</span>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  exp,
  align,
}: {
  exp: (typeof experiences)[number];
  align: "left" | "right";
}) {
  return (
    <article className="rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-bg-elev)] p-6 text-left md:p-8">
      <div className={`flex items-start gap-4 ${align === "right" ? "md:flex-row-reverse md:text-right" : ""}`}>
        <div className="relative h-11 w-11 flex-none overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-white">
          <Image src={exp.logo} alt="" fill className="object-cover" />
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-accent)]">
            {exp.year}
          </p>
          <p className="mt-1 font-serif text-2xl leading-tight md:text-3xl">{exp.role}</p>
          <p className="mt-0.5 text-sm text-[color:var(--color-muted)]">{exp.company} · {exp.date}</p>
        </div>
      </div>
      <p className="mt-6 text-[color:var(--color-fg)]/85 text-pretty">{exp.description}</p>
      <ul className={`mt-5 space-y-2 text-sm text-[color:var(--color-fg-muted)]`}>
        {exp.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-[0.6em] h-px w-4 flex-none bg-[color:var(--color-accent)]" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <div className={`mt-6 flex flex-wrap gap-1.5 ${align === "right" ? "md:justify-end" : ""}`}>
        {exp.skills.map((s) => (
          <span
            key={s}
            className="rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[color:var(--color-muted)]"
          >
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}
