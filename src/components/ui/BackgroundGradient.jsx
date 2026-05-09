import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}) => {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: { backgroundPosition: ["0 50%", "100% 50%", "0 50%"] },
  };

  return (
    <div className={cn("relative p-[2px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? { duration: 5, repeat: Infinity, repeatType: "reverse" }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className="absolute inset-0 rounded-[inherit] z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform bg-[radial-gradient(circle_farthest-side_at_0_100%,#6366f1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#8b5cf6,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#06b6d4,transparent),radial-gradient(circle_farthest-side_at_0_0,#6366f1,#0a0a0a)]"
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? { duration: 5, repeat: Infinity, repeatType: "reverse" }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className="absolute inset-0 rounded-[inherit] z-[1] will-change-transform bg-[radial-gradient(circle_farthest-side_at_0_100%,#6366f1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#8b5cf6,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#06b6d4,transparent),radial-gradient(circle_farthest-side_at_0_0,#6366f1,#0a0a0a)]"
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
