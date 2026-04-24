"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks } from "@content/education";
import { bio } from "@content/bio";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-4 z-[50] flex justify-center px-4 md:top-5"
      >
        <div
          className={cn(
            "flex w-full max-w-5xl items-center justify-between gap-6 rounded-full border px-3 py-2 transition-all duration-500",
            scrolled
              ? "border-[color:var(--color-border)] bg-[color:var(--color-bg-elev)]/85 backdrop-blur-xl shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]"
              : "border-transparent bg-transparent"
          )}
        >
          <a
            href="#hero"
            data-cursor="link"
            className="flex items-center gap-2 pl-3 font-serif text-xl tracking-tight"
          >
            <span>{bio.shortName}</span>
            <span className="text-[color:var(--color-accent)]">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor="link"
                  className="relative rounded-full px-3.5 py-1.5 text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-fg)]"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[color:var(--color-surface)]"
                      transition={{ type: "spring", bounce: 0.22, duration: 0.55 }}
                    />
                  )}
                  <span className={cn(isActive && "text-[color:var(--color-fg)]")}>
                    {link.label}
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 pr-1">
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                data-cursor="link"
                className="group hidden md:inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-4 py-1.5 text-xs font-medium tracking-wide transition-colors hover:border-[color:var(--color-accent)]/60 hover:bg-[color:var(--color-accent-soft)]"
              >
                Let&apos;s talk
                <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden rounded-full border border-[color:var(--color-border-strong)] p-2 text-[color:var(--color-fg)]"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[color:var(--color-bg)]/96 backdrop-blur-3xl md:hidden"
          >
            <nav className="flex h-full flex-col items-start justify-center gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-6xl leading-[1] tracking-[-0.03em]"
                >
                  <span className="text-[color:var(--color-accent)] font-mono text-sm mr-3 align-middle">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={bio.resume}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + navLinks.length * 0.06 }}
                className="mt-10 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-accent)]/40 bg-[color:var(--color-accent-soft)] px-6 py-3 text-sm"
              >
                Download Résumé <ArrowUpRight size={14} />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
