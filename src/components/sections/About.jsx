import React from "react";
import { motion } from "framer-motion";
import { Bio } from "../../data/constants";
import profileImg from "../../images/profile.jpg";
import { AnimatedGradientText } from "../ui/AnimatedGradientText";
import { CardSpotlight } from "../ui/CardSpotlight";
import { NumberTicker } from "../ui/NumberTicker";
import { MovingBorder } from "../ui/MovingBorder";
import {
  fadeUpVariants,
  containerVariants,
  slideInLeft,
  slideInRight,
} from "../../hooks/useScrollAnimation";

const STATS = [
  { value: 3, suffix: "+", label: "Years of Coding" },
  { value: 20, suffix: "+", label: "Projects Built" },
  { value: 10, suffix: "+", label: "Technologies" },
];

const FLOATING_ICONS = [
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "React Native", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Expo", img: "https://avatars.githubusercontent.com/u/12504344?s=200&v=4" },
  { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Framer Motion", img: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
  { name: "TanStack Query", img: "https://avatars.githubusercontent.com/u/72518640?s=200&v=4" },
  { name: "Zustand", img: "https://raw.githubusercontent.com/pmndrs/zustand/main/bear.jpg" },
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Django", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "TailwindCSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full bg-black text-white py-20 md:py-32 px-5 sm:px-6 md:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 dot-pattern opacity-[0.06] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-7xl mx-auto"
      >
        <motion.div variants={fadeUpVariants} className="flex justify-center mb-4">
          <AnimatedGradientText>{"// ABOUT ME"}</AnimatedGradientText>
        </motion.div>

        <motion.h2
          variants={fadeUpVariants}
          className="text-center text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-12 md:mb-16"
        >
          Crafting code, building <span className="text-gradient">products</span>.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          <motion.div variants={slideInLeft} className="flex justify-center">
            <MovingBorder
              duration={5000}
              rx="1.5rem"
              ry="1.5rem"
              containerClassName="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80"
              className="!p-0"
            >
              <img
                src={profileImg}
                alt={Bio.name}
                className="w-full h-full object-cover rounded-[1.4rem]"
              />
            </MovingBorder>
          </motion.div>

          <motion.div variants={slideInRight} className="space-y-5 md:space-y-6 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
              Hi, I'm <span className="text-gradient">{Bio.name.split(" ")[0]}</span>{" "}
              — a full stack developer & competitive programmer.
            </h3>
            <p className="text-neutral-400 leading-relaxed text-sm sm:text-base md:text-lg">
              {Bio.description} I love crafting clean, performant interfaces and
              shipping end-to-end products — from intuitive React & React Native
              frontends to robust Node.js & Django backends. Currently building
              production apps at AskFirst with Next.js & Expo, and exploring
              computer vision alongside full-stack development.
            </p>

            <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4">
              {STATS.map((s) => (
                <CardSpotlight
                  key={s.label}
                  className="p-4 md:p-5"
                  spotlightColor="rgba(139, 92, 246, 0.2)"
                >
                  <div className="text-2xl md:text-4xl font-extrabold text-gradient">
                    <NumberTicker value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs md:text-sm text-neutral-400 mt-2 leading-tight">
                    {s.label}
                  </div>
                </CardSpotlight>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUpVariants}
          className="mt-16 md:mt-20 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8"
        >
          {FLOATING_ICONS.map((tech, i) => (
            <motion.div
              key={tech.name}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl border border-white/10 bg-[#0a0a0a] p-2 md:p-3 flex items-center justify-center group-hover:border-white/30 transition-all">
                <img
                  src={tech.img}
                  alt={tech.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
