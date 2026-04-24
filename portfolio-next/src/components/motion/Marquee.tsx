"use client";

import Image from "next/image";
import { ReactNode } from "react";

type Logo = { name: string; url: string };

export function LogoMarquee({
  items,
  direction = "left",
  eyebrow,
  className = "",
}: {
  items: Logo[];
  direction?: "left" | "right";
  eyebrow?: ReactNode;
  className?: string;
}) {
  const row = [...items, ...items];
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className={`pause-on-hover group relative ${className}`}>
      {eyebrow && (
        <div className="mb-4 flex items-baseline gap-4 px-6 md:px-8">
          {eyebrow}
        </div>
      )}
      <div className="relative overflow-hidden py-6 border-y border-[color:var(--color-border)]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[color:var(--color-bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[color:var(--color-bg)] to-transparent" />
        <div className={`flex w-max gap-16 ${animClass}`}>
          {row.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="group/item flex min-w-[140px] items-center gap-3 opacity-60 transition-all duration-500 hover:opacity-100 hover:-translate-y-0.5"
              data-cursor="link"
            >
              <div className="relative h-8 w-8 flex-none">
                <Image
                  src={logo.url}
                  alt=""
                  fill
                  unoptimized
                  className="object-contain grayscale transition-all duration-500 group-hover/item:grayscale-0"
                />
              </div>
              <span className="font-serif text-2xl leading-none tracking-tight md:text-3xl">
                {logo.name}
              </span>
              <span className="ml-6 text-[color:var(--color-muted-2)]">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
