"use client";

/*
  Projects — sticky-pinned showcase (Robin Noguier pattern).
  - Featured projects: image pins on left while content swaps on right as you scroll
  - Grid of all remaining projects below
  - Modal opens a full case study on click
*/

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@content/projects";
import { TextReveal, RevealBlock } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";

const featured = projects.filter((p) => p.featured);
const archive = projects.filter((p) => !p.featured);

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
  }, [active]);

  return (
    <section id="projects" className="relative scroll-mt-20 pt-28 md:pt-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <span className="eyebrow">03 — Selected Work</span>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <TextReveal
            as="h2"
            text="Real products, real users, real constraints."
            className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-balance max-w-3xl"
          />
          <RevealBlock delay={0.2}>
            <p className="max-w-sm text-[color:var(--color-fg-muted)]">
              Four featured projects below. Click any for a detailed breakdown.
            </p>
          </RevealBlock>
        </div>
      </div>

      <FeaturedShowcase onOpen={setActive} />

      {/* Archive grid */}
      <div className="mx-auto mt-32 max-w-7xl px-6 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <h3 className="font-serif text-3xl md:text-4xl">Archive</h3>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
            {archive.length} more
          </span>
        </div>
        <div className="grid gap-px overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-border)] md:grid-cols-3">
          {archive.map((p, i) => (
            <ArchiveCard key={p.id} p={p} index={i} onOpen={() => setActive(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <CaseStudyModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Sticky featured showcase ---------- */

function FeaturedShowcase({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <div className="relative mt-20">
      {featured.map((p, i) => (
        <ShowcasePanel key={p.id} project={p} index={i} total={featured.length} onOpen={() => onOpen(p)} />
      ))}
    </div>
  );
}

function ShowcasePanel({
  project,
  index,
  total,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.05]);

  const alignRight = index % 2 === 1;

  return (
    <div ref={ref} className="relative">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-12 md:gap-12 md:px-10 md:py-32">
        {/* Image */}
        <motion.div
          style={{ y: imageY }}
          className={cn(
            "relative md:col-span-7",
            alignRight ? "md:order-2 md:col-start-6" : ""
          )}
          data-cursor="view"
          onClick={onOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
        >
          <motion.div
            style={{ scale: imageScale }}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)]"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg)]/50 via-transparent to-transparent" />
            {/* Corner crosshairs */}
            <Crosshair corner="tl" />
            <Crosshair corner="tr" />
            <Crosshair corner="bl" />
            <Crosshair corner="br" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className={cn("flex flex-col justify-center gap-6 md:col-span-5", alignRight ? "md:order-1" : "")}>
          <div className="flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            <span className="text-[color:var(--color-accent)]">{project.number}</span>
            <span>/ {String(total).padStart(2, "0")}</span>
            <span className="ml-auto">{project.year}</span>
          </div>

          <TextReveal
            as="h3"
            text={project.title}
            className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]"
          />

          <RevealBlock delay={0.15}>
            <p className="font-serif italic text-lg text-[color:var(--color-fg-muted)] md:text-xl">
              {project.tagline}
            </p>
          </RevealBlock>

          <RevealBlock delay={0.25}>
            <p className="text-[color:var(--color-fg)]/85">
              {project.description[0]}
            </p>
          </RevealBlock>

          <RevealBlock delay={0.35}>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {project.tags.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[color:var(--color-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.45}>
            <div className="flex items-center gap-6 pt-4 font-mono text-xs uppercase tracking-[0.2em]">
              <span className="text-[color:var(--color-muted)]">{project.role}</span>
              <button
                type="button"
                onClick={onOpen}
                data-cursor="view"
                className="group link-wipe inline-flex items-center gap-1.5 text-[color:var(--color-fg)]"
              >
                Case study
                <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </RevealBlock>
        </div>
      </div>
    </div>
  );
}

function Crosshair({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const pos = {
    tl: "top-3 left-3",
    tr: "top-3 right-3",
    bl: "bottom-3 left-3",
    br: "bottom-3 right-3",
  }[corner];
  return (
    <span
      aria-hidden
      className={`absolute ${pos} h-3 w-3 border-[color:var(--color-fg)]/40`}
      style={{
        borderTopWidth: corner.startsWith("t") ? 1 : 0,
        borderBottomWidth: corner.startsWith("b") ? 1 : 0,
        borderLeftWidth: corner.endsWith("l") ? 1 : 0,
        borderRightWidth: corner.endsWith("r") ? 1 : 0,
      }}
    />
  );
}

/* ---------- Archive card ---------- */

function ArchiveCard({
  p,
  index,
  onOpen,
}: {
  p: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      data-cursor="view"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex min-h-[20rem] flex-col items-start justify-end gap-3 bg-[color:var(--color-bg)] p-7 text-left transition-colors hover:bg-[color:var(--color-bg-elev)]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-20 grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-40 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg)] via-[color:var(--color-bg)]/80 to-transparent" />
      </div>

      <div className="relative w-full space-y-3">
        <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-accent)]">
          {p.number}
        </span>
        <h4 className="font-serif text-2xl leading-tight">{p.title}</h4>
        <p className="text-sm text-[color:var(--color-muted)]">{p.tagline}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {p.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-[color:var(--color-border-strong)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[color:var(--color-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

/* ---------- Case-study modal ---------- */

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-label={project.title}
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl overflow-hidden rounded-sm border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-elev)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          data-cursor="link"
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg)]/60 p-2 backdrop-blur-md transition-colors hover:border-[color:var(--color-accent)]/60 hover:bg-[color:var(--color-accent-soft)]"
        >
          <X size={15} />
        </button>

        <div className="relative aspect-[16/9] w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg-elev)] via-[color:var(--color-bg-elev)]/30 to-transparent" />
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-8 md:p-12">
          <div className="flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            <span className="text-[color:var(--color-accent)]">{project.number}</span>
            <span>· {project.role}</span>
            <span className="ml-auto">{project.year}</span>
          </div>
          <h3 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-2 font-serif italic text-xl text-[color:var(--color-fg-muted)]">
            {project.tagline}
          </p>

          <div className="mt-8 space-y-4 text-[color:var(--color-fg)]/90">
            {project.description.map((d, i) => (
              <p key={i} className="text-pretty">{d}</p>
            ))}
          </div>

          {project.highlights && (
            <div className="mt-10">
              <p className="eyebrow">Highlights</p>
              <ul className="mt-4 space-y-2.5">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-[0.55em] h-px w-6 flex-none bg-[color:var(--color-accent)]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[color:var(--color-muted)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {project.webapp && (
              <a
                href={project.webapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-accent)]/50 bg-[color:var(--color-accent-soft)] px-5 py-2.5 text-sm transition-all hover:bg-[color:var(--color-accent)]/30"
              >
                Live demo <ArrowUpRight size={14} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-5 py-2.5 text-sm transition-all hover:border-[color:var(--color-fg)]/40"
              >
                <Github size={14} /> Source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
