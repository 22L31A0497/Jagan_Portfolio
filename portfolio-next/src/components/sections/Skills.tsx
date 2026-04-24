"use client";

import { skillGroups, marqueeRowOne, marqueeRowTwo } from "@content/skills";
import { TextReveal, RevealBlock } from "@/components/motion/TextReveal";
import { LogoMarquee } from "@/components/motion/Marquee";

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-20 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <span className="eyebrow">02 — Stack</span>
        <TextReveal
          as="h2"
          text="The craft I keep coming back to."
          className="mt-10 font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-balance max-w-4xl"
        />
        <RevealBlock delay={0.2}>
          <p className="mt-6 max-w-xl text-lg text-[color:var(--color-fg-muted)]">
            Opinionated tools I reach for on most jobs — with enough range to pick up whatever the product needs.
          </p>
        </RevealBlock>
      </div>

      {/* Dual-row marquee */}
      <div className="mt-20 space-y-1">
        <LogoMarquee
          items={marqueeRowOne}
          direction="left"
          eyebrow={
            <>
              <span className="font-serif text-3xl italic md:text-4xl">I build</span>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                Frontend · Interfaces
              </span>
            </>
          }
        />
        <LogoMarquee
          items={marqueeRowTwo}
          direction="right"
          eyebrow={
            <>
              <span className="font-serif text-3xl italic md:text-4xl">I ship</span>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                Backend · Data · ML
              </span>
            </>
          }
        />
      </div>

      {/* Skill groups grid */}
      <div className="mx-auto mt-24 max-w-7xl px-6 md:px-10">
        <div className="grid gap-px overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-border)] md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <RevealBlock
              key={group.id}
              delay={i * 0.1}
              className="group relative bg-[color:var(--color-bg)] p-8 transition-colors hover:bg-[color:var(--color-bg-elev)]"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl tracking-tight">{group.label}</h3>
                <span className="font-mono text-xs text-[color:var(--color-muted-2)]">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">
                {group.blurb}
              </p>
              <ul className="mt-6 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center justify-between border-t border-[color:var(--color-border)] py-2 text-sm">
                    <span>{item}</span>
                    <span className="font-mono text-[10px] text-[color:var(--color-muted-2)]">·</span>
                  </li>
                ))}
              </ul>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
