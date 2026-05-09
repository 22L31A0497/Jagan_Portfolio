import React from "react";
import { cn } from "../../lib/utils";

export const AnimatedGradientText = ({ children, className }) => {
  const isPlainText = typeof children === "string";

  return (
    <div
      className={cn(
        "group relative inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#0a0a0a] border border-white/10 px-4 py-1.5 text-xs sm:text-sm shadow-[inset_0_-8px_10px_rgba(255,255,255,0.04)] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_rgba(99,102,241,0.18)]",
        className
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#6366f1]/30 via-[#8b5cf6]/30 to-[#06b6d4]/30 bg-[length:300%_100%] animate-gradient-x p-px [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude]"
        aria-hidden
      />
      {isPlainText ? (
        <span className="relative inline-block bg-gradient-to-r from-[#818cf8] via-[#a78bfa] to-[#22d3ee] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x font-semibold tracking-wide">
          {children}
        </span>
      ) : (
        children
      )}
    </div>
  );
};
