import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import {
  IconBrandGithub,
  IconArrowDown,
  IconDownload,
  IconSparkles,
} from "@tabler/icons-react";
import { Bio } from "../../data/constants";
import { ShimmerButton } from "../ui/ShimmerButton";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";
import { TypewriterEffect } from "../ui/TypewriterEffect";
import { AnimatedGradientText } from "../ui/AnimatedGradientText";
import { SparklesCore } from "../ui/SparklesCore";
import { MagneticButton } from "../ui/MagneticButton";

const TECH_PILLS = [
  { label: "React", x: "4%", y: "16%", rotate: -6 },
  { label: "Node.js", x: "86%", y: "12%", rotate: 5 },
  { label: "React Native", x: "2%", y: "34%", rotate: 4 },
  { label: "Expo", x: "88%", y: "30%", rotate: -5 },
  { label: "TypeScript", x: "8%", y: "62%", rotate: 4 },
  { label: "MongoDB", x: "82%", y: "62%", rotate: -7 },
  { label: "Framer Motion", x: "4%", y: "82%", rotate: -3 },
  { label: "Next.js", x: "90%", y: "48%", rotate: -4 },
  { label: "Zustand", x: "2%", y: "48%", rotate: 6 },
  { label: "TanStack", x: "86%", y: "82%", rotate: 6 },
];

const MARQUEE_TECH = [
  "React",
  "React Native",
  "Next.js",
  "Expo",
  "TypeScript",
  "Node.js",
  "Django",
  "Python",
  "MongoDB",
  "TanStack Query",
  "Zustand",
  "Framer Motion",
  "TailwindCSS",
  "Git",
];

const STATS = [
  { value: "2+", label: "Years building", color: "bg-indigo-400" },
  { value: "15+", label: "Projects shipped", color: "bg-purple-400" },
  { value: "700+", label: "DSA solved", color: "bg-cyan-400" },
];

const Hero = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 1, h: 1 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 80, damping: 30 });
  const sy = useSpring(mouseY, { stiffness: 80, damping: 30 });

  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [mouseX, mouseY]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const titleRotateY = useTransform(sx, [0, size.w], [-6, 6]);
  const titleRotateX = useTransform(sy, [0, size.h], [4, -4]);
  const parallaxX = useTransform(sx, [0, size.w], [-15, 15]);
  const parallaxY = useTransform(sy, [0, size.h], [-15, 15]);
  const blob1X = useTransform(sx, [0, size.w], [-25, 25]);
  const blob1Y = useTransform(sy, [0, size.h], [-25, 25]);
  const blob2X = useTransform(sx, [0, size.w], [30, -30]);
  const blob2Y = useTransform(sy, [0, size.h], [30, -30]);

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${sx}px ${sy}px, rgba(139,92,246,0.18), rgba(99,102,241,0.06) 40%, transparent 70%)`;

  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [first, ...lastParts] = Bio.name.split(" ");
  const lastName = lastParts.join(" ");

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col bg-black overflow-hidden"
    >
      {/* Ambient gradient blobs */}
      <motion.div
        style={{ x: blob1X, y: blob1Y }}
        className="pointer-events-none absolute -top-40 -left-32 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-indigo-600/30 blur-[120px]"
        aria-hidden
      />
      <motion.div
        style={{ x: blob2X, y: blob2Y }}
        className="pointer-events-none absolute -bottom-40 -right-32 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-purple-600/25 blur-[120px]"
        aria-hidden
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full bg-cyan-500/10 blur-[100px]"
        aria-hidden
      />

      {/* Lamp cone from top */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0.6 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1100px] h-[400px] md:h-[500px]"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_0%,transparent_0deg,rgba(99,102,241,0.25)_50deg,rgba(139,92,246,0.35)_180deg,rgba(99,102,241,0.25)_310deg,transparent_360deg)] blur-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] md:w-[450px] h-1 rounded-full bg-gradient-to-r from-transparent via-indigo-300 to-transparent shadow-[0_0_24px_rgba(165,180,252,0.6)]" />
      </motion.div>

      {/* Mouse-tracking spotlight */}
      <motion.div
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
      />

      {/* Grid + sparkles */}
      <div
        className="absolute inset-0 grid-pattern opacity-15 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        aria-hidden
      />
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden>
        <SparklesCore
          id="hero-sparkles"
          minSize={0.4}
          maxSize={1.4}
          particleDensity={70}
          particleColor="#a78bfa"
        />
      </div>

      {/* Floating tech pills (desktop only, parallax) */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-0 z-[2] pointer-events-none hidden lg:block"
        aria-hidden
      >
        {TECH_PILLS.map((pill, i) => (
          <motion.div
            key={pill.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
            transition={{
              opacity: { delay: 0.5 + i * 0.07, duration: 0.6 },
              scale: { delay: 0.5 + i * 0.07, duration: 0.6 },
              y: {
                duration: 5 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              },
            }}
            style={{
              left: pill.x,
              top: pill.y,
              transform: `rotate(${pill.rotate}deg)`,
            }}
            className="absolute pointer-events-auto"
          >
            <span className="px-3 py-1.5 rounded-full text-xs lg:text-sm bg-[#0a0a0a]/80 backdrop-blur-md border border-white/15 text-neutral-300 shadow-[0_0_24px_rgba(99,102,241,0.2)] hover:border-indigo-400/50 hover:text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-1 transition-all duration-300 cursor-default">
              {pill.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Main content - centered with flex-1 */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-6 md:px-8 pt-24 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 md:mb-6"
        >
          <AnimatedGradientText>
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="bg-gradient-to-r from-[#818cf8] via-[#a78bfa] to-[#22d3ee] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x font-semibold tracking-wide">
              Available for opportunities
            </span>
            <IconSparkles size={12} className="text-indigo-300 shrink-0" />
          </AnimatedGradientText>
        </motion.div>

        <motion.h1
          style={{
            rotateX: titleRotateX,
            rotateY: titleRotateY,
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold leading-[0.95] tracking-tight will-change-transform text-[clamp(2.5rem,9vw,7rem)]"
        >
          <span className="block text-white drop-shadow-[0_4px_24px_rgba(99,102,241,0.4)]">
            {first}
          </span>
          <span className="block text-gradient drop-shadow-[0_4px_30px_rgba(139,92,246,0.5)]">
            {lastName}
          </span>
        </motion.h1>

        <div className="mt-6 md:mt-8 max-w-xl md:max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 px-2">
          <TextGenerateEffect words="Crafting elegant digital experiences with clean code, intuitive design, and a relentless drive to build things that matter." />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-5 md:mt-6 text-base md:text-xl lg:text-2xl font-medium flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-neutral-300"
        >
          <span>I build as a</span>
          <TypewriterEffect
            words={[...Bio.roles, "Mobile App Developer", "UI/UX Enthusiast"]}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center"
        >
          <MagneticButton>
            <ShimmerButton
              onClick={() => handleScroll("#projects")}
              className="text-sm md:text-base"
            >
              View My Work
            </ShimmerButton>
          </MagneticButton>

          <MagneticButton>
            <a
              href={Bio.resume}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-neutral-200 hover:text-white hover:border-white/30 hover:bg-white/[0.05] transition-all backdrop-blur-sm text-sm md:text-base"
            >
              <IconDownload
                size={18}
                className="group-hover:translate-y-0.5 transition-transform"
              />
              Download CV
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href={Bio.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="group inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/15 text-neutral-300 hover:text-white hover:border-white/30 hover:bg-white/[0.05] transition-all backdrop-blur-sm"
            >
              <IconBrandGithub
                size={20}
                className="group-hover:rotate-12 transition-transform"
              />
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.7 }}
          className="mt-10 md:mt-12 flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-3 text-xs sm:text-sm text-neutral-400"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
              <span>
                <span className="text-white font-semibold">{s.value}</span> {s.label}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>
              Currently @{" "}
              <span className="text-emerald-300 font-semibold">AskFirst</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom strip: marquee + scroll indicator (in flow, not absolute) */}
      <div className="relative z-[2] pb-6 md:pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
          aria-hidden
        >
          <div
            className="flex animate-scroll gap-12 whitespace-nowrap py-2"
            style={{
              "--animation-duration": "40s",
              "--animation-direction": "forwards",
            }}
          >
            {[...MARQUEE_TECH, ...MARQUEE_TECH].map((tech, i) => (
              <span
                key={`marquee-${i}`}
                className="text-neutral-600 text-sm md:text-base font-medium tracking-wider hover:text-indigo-300 transition-colors"
              >
                {tech} <span className="ml-12 text-neutral-700">✦</span>
              </span>
            ))}
          </div>
        </motion.div>

        <motion.button
          onClick={() => handleScroll("#about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="mt-4 mx-auto text-neutral-500 hover:text-white text-[10px] md:text-xs uppercase tracking-[0.3em] flex flex-col items-center gap-2 group"
          aria-label="Scroll down to about section"
        >
          <span className="w-px h-6 md:h-8 bg-gradient-to-b from-transparent via-neutral-500 to-transparent group-hover:via-indigo-400 transition-colors" />
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <IconArrowDown size={14} />
          </motion.span>
          <span>Scroll</span>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
