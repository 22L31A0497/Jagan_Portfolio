import React from "react";
import { cn } from "../../lib/utils";

export const MarqueePills = ({
  items = [],
  className,
  pauseOnHover = true,
  reverse = false,
  speed = 40,
  renderItem,
}) => {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row",
        className
      )}
      style={{ "--animation-duration": `${speed}s` }}
    >
      {[0, 1].map((dup) => (
        <div
          key={dup}
          className={cn(
            "flex shrink-0 [gap:var(--gap)] animate-scroll flex-row",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]"
          )}
          style={{ "--animation-direction": reverse ? "reverse" : "forwards" }}
        >
          {items.map((item, idx) =>
            renderItem ? (
              <React.Fragment key={`${dup}-${idx}`}>
                {renderItem(item, idx)}
              </React.Fragment>
            ) : (
              <span
                key={`${dup}-${idx}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[#111] text-sm text-neutral-300 whitespace-nowrap"
              >
                {item}
              </span>
            )
          )}
        </div>
      ))}
    </div>
  );
};
