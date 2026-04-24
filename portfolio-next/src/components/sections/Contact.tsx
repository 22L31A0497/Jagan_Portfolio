"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Send, Github, Linkedin, Twitter, Instagram, Mail, Code2 } from "lucide-react";
import { bio } from "@content/bio";
import { codingProfiles } from "@content/education";
import { TextReveal, RevealBlock } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";

/*
  Form is wired to Web3Forms (web3forms.com) — free, no CORS, 250 emails/mo.
  Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local.
  The access key is a public "write-only" token; harmless in client code.
*/

type Status = "idle" | "sending" | "sent" | "error";

const socials = [
  { icon: Github, label: "GitHub", href: bio.github },
  { icon: Linkedin, label: "LinkedIn", href: bio.linkedin },
  { icon: Twitter, label: "Twitter", href: bio.twitter },
  { icon: Instagram, label: "Instagram", href: bio.instagram },
  { icon: Mail, label: "Email", href: `mailto:${bio.email}` },
];

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setErr(`Form not configured yet — email me directly at ${bio.email}`);
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const fd = new FormData(formRef.current);
      fd.append("access_key", accessKey);
      fd.append("from_name", "Portfolio Contact Form");
      fd.append("subject", `Portfolio · ${fd.get("subject") ?? "New message"}`);
      // Honeypot for bots — real users never fill this
      fd.append("botcheck", "");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      const data: { success: boolean; message?: string } = await res.json();
      if (!data.success) throw new Error(data.message ?? "Submission rejected");

      setStatus("sent");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: unknown) {
      console.error("[Contact] submit failed:", err);
      const msg = err instanceof Error ? err.message : "Unknown error";
      setErr(`Couldn't send: ${msg}`);
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(bio.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section id="contact" className="relative scroll-mt-20 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <span className="eyebrow">06 — Contact</span>

        <TextReveal
          as="h2"
          text="Let's build something worth remembering."
          className="mt-10 font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[1.02] tracking-[-0.04em] text-balance max-w-5xl"
        />

        {/* Giant email */}
        <RevealBlock delay={0.2} className="mt-12">
          <div className="flex flex-wrap items-center gap-4">
            <Magnetic strength={0.15}>
              <a
                href={`mailto:${bio.email}`}
                data-cursor="link"
                className="group font-serif text-[clamp(1.5rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.02em]"
              >
                <span className="link-wipe">{bio.email}</span>
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={copyEmail}
              data-cursor="link"
              aria-label="Copy email"
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-muted)] transition-colors hover:border-[color:var(--color-accent)]/60 hover:text-[color:var(--color-fg)]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="ok"
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    className="inline-flex items-center gap-1 text-[color:var(--color-accent)]"
                  >
                    <Check size={12} strokeWidth={2.5} /> Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    className="inline-flex items-center gap-1"
                  >
                    <Copy size={11} /> Copy
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </RevealBlock>

        <div className="mt-24 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          {/* Form */}
          <RevealBlock>
            <form
              ref={formRef}
              onSubmit={submit}
              className="rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-bg-elev)] p-8 md:p-10"
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                  Inquiry form
                </p>
                <span className="font-mono text-xs text-[color:var(--color-muted-2)]">
                  Usually replies within 24h
                </span>
              </div>

              <Field name="name" label="Your name" type="text" required />
              <Field name="email" label="Your email" type="email" required />
              <Field name="subject" label="What's it about?" type="text" required />
              <Field name="message" label="Tell me more" type="textarea" required />
              {/* Honeypot — hidden from humans, filled by bots */}
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

              <div className="mt-8 flex items-center justify-between gap-4">
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    data-cursor="link"
                    disabled={status === "sending" || status === "sent"}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[color:var(--color-accent)]/50 bg-[color:var(--color-accent-soft)] px-6 py-3 text-sm font-medium transition-colors hover:border-[color:var(--color-accent)] disabled:opacity-70"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 translate-y-full bg-[color:var(--color-accent)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                    />
                    <span className="relative z-10 transition-colors group-hover:text-[color:var(--color-bg)]">
                      {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Send message"}
                    </span>
                    <AnimatePresence mode="wait" initial={false}>
                      {status === "sent" ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 18 }}
                          className="relative z-10 text-[color:var(--color-bg)]"
                        >
                          <Check size={14} strokeWidth={3} />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="send"
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 4 }}
                          className="relative z-10 transition-colors group-hover:text-[color:var(--color-bg)]"
                        >
                          <Send size={13} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </Magnetic>

                <AnimatePresence>
                  {status === "sent" && (
                    <motion.p
                      key="ok"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-[color:var(--color-accent)]"
                    >
                      Received. I&apos;ll be in touch.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      key="err"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-red-400"
                    >
                      {err}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </RevealBlock>

          {/* Side column */}
          <RevealBlock delay={0.15} className="flex flex-col gap-10">
            <div>
              <p className="eyebrow">Location</p>
              <p className="mt-4 font-serif text-2xl">
                {bio.location}
                <br />
                <span className="text-[color:var(--color-muted)]">
                  {bio.timezone}
                </span>
              </p>
            </div>

            <div>
              <p className="eyebrow">Elsewhere</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {socials.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      aria-label={label}
                      className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-3.5 py-1.5 text-sm transition-all hover:-translate-y-0.5 hover:border-[color:var(--color-accent)]/60 hover:bg-[color:var(--color-accent-soft)]"
                    >
                      <Icon size={13} className="transition-colors group-hover:text-[color:var(--color-accent)]" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Competitive</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {codingProfiles.map((p) => (
                  <li key={p.name}>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="group inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-3 py-1.5 text-xs transition-all hover:-translate-y-0.5 hover:border-[color:var(--color-accent)]/60 hover:bg-[color:var(--color-accent-soft)]"
                    >
                      <Code2 size={11} className="text-[color:var(--color-accent)]" />
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type,
  required,
}: {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  required?: boolean;
}) {
  const baseCls =
    "peer w-full bg-transparent border-b border-[color:var(--color-border-strong)] pt-6 pb-2 text-base text-[color:var(--color-fg)] outline-none transition-colors focus:border-[color:var(--color-accent)]";

  return (
    <div className="relative mt-6 first:mt-0">
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          placeholder=" "
          data-cursor="text"
          className={`${baseCls} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder=" "
          data-cursor="text"
          className={baseCls}
        />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-0 top-6 font-mono text-sm text-[color:var(--color-muted)] transition-all duration-300 peer-focus:top-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-[color:var(--color-accent)] peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[11px] peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-widest"
      >
        {label}
      </label>
    </div>
  );
}
