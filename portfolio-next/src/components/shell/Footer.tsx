"use client";

import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import { bio } from "@content/bio";
import { Magnetic } from "@/components/motion/Magnetic";

const socials = [
  { icon: Github, label: "GitHub", href: bio.github },
  { icon: Linkedin, label: "LinkedIn", href: bio.linkedin },
  { icon: Twitter, label: "Twitter", href: bio.twitter },
  { icon: Instagram, label: "Instagram", href: bio.instagram },
  { icon: Mail, label: "Email", href: `mailto:${bio.email}` },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[color:var(--color-border)] pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow">Currently</p>
            <p className="mt-4 font-serif text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.2] text-pretty">
              Finishing my B.Tech and open to full-time roles, part-time contracts, and interesting side projects.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-4 flex flex-col gap-1.5">
              {socials.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-fg)]"
                  >
                    <Icon size={14} className="text-[color:var(--color-muted-2)] transition-colors group-hover:text-[color:var(--color-accent)]" />
                    <span className="link-wipe">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow">Inbox</p>
            <a
              href={`mailto:${bio.email}`}
              data-cursor="link"
              className="link-wipe mt-4 inline-block font-mono text-sm"
            >
              {bio.email}
            </a>
            <div className="mt-8">
              <Magnetic strength={0.3}>
                <button
                  type="button"
                  onClick={() => {
                    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
                    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
                    else window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  data-cursor="link"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-5 py-2.5 text-sm transition-all hover:border-[color:var(--color-accent)]/60 hover:bg-[color:var(--color-accent-soft)]"
                >
                  Back to top <ArrowUp size={13} />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Giant outlined signature */}
        <div className="mt-24 overflow-hidden" aria-hidden>
          <motion.p
            initial={{ y: 120, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif select-none text-[clamp(5rem,22vw,26rem)] leading-[0.82] tracking-[-0.05em]"
            style={{
              WebkitTextStroke: "1px color-mix(in oklab, var(--color-fg) 24%, transparent)",
              color: "transparent",
            }}
          >
            Jaganmohan.
          </motion.p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[color:var(--color-border)] pt-6 text-xs text-[color:var(--color-muted)] font-mono md:flex-row">
          <p>© {new Date().getFullYear()} {bio.name}</p>
          <p>Designed &amp; built in Visakhapatnam · Next.js · R3F · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
