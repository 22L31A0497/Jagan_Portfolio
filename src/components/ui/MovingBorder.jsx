import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "../../lib/utils";

export const MovingBorder = ({
  children,
  duration = 4000,
  rx = "1.75rem",
  ry = "1.75rem",
  className,
  containerClassName,
  borderClassName,
  as: Component = "div",
  ...rest
}) => {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-base h-full w-full overflow-hidden p-[2px]",
        containerClassName
      )}
      style={{ borderRadius: rx }}
      {...rest}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${rx} * 0.96)` }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full absolute"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        >
          <rect
            fill="none"
            width="100%"
            height="100%"
            rx={rx}
            ry={ry}
            stroke="url(#mb-grad)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient
              id="mb-grad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <BorderTrail duration={duration} className={borderClassName} />
      </div>

      <div
        className={cn(
          "relative bg-[#0a0a0a] border border-white/[0.08] backdrop-blur-xl flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{ borderRadius: `calc(${rx} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
};

const BorderTrail = ({ duration, className }) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength?.();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          ref={pathRef}
          fill="none"
          width="100%"
          height="100%"
          rx="28"
          ry="28"
        />
      </svg>
      <motion.div
        style={{ position: "absolute", top: 0, left: 0, transform }}
        className={cn(
          "h-20 w-20 opacity-[0.85] bg-[radial-gradient(circle_at_center,#a78bfa_0%,#6366f1_30%,transparent_70%)]",
          className
        )}
      />
    </>
  );
};
