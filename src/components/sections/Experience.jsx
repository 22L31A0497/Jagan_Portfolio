import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experiences } from "../../data/constants";
import { AnimatedGradientText } from "../ui/AnimatedGradientText";
import { CardSpotlight } from "../ui/CardSpotlight";
import {
  fadeUpVariants,
  containerVariants,
} from "../../hooks/useScrollAnimation";

const TimelineEntry = ({ exp, index }) => {
  const isLeft = index % 2 === 0;
  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-8 mb-12">
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={isLeft ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12"}
      >
        <CardSpotlight
          className="p-5 md:p-6"
          spotlightColor="rgba(139,92,246,0.18)"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl border border-white/10 bg-[#0a0a0a] p-1 flex items-center justify-center shrink-0">
              <img
                src={exp.img}
                alt={exp.company}
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-bold text-white">
                {exp.role}
              </h3>
              <p className="text-sm text-indigo-300">{exp.company}</p>
              <span className="inline-block mt-1.5 text-[11px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-400">
                {exp.date}
              </span>
            </div>
          </div>
          <p className="text-sm text-neutral-400 mt-4 leading-relaxed line-clamp-5">
            {exp.desc}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {exp.skills?.slice(0, 8).map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300"
              >
                {s}
              </span>
            ))}
          </div>
        </CardSpotlight>
      </motion.div>

      {/* Dot on the timeline (desktop) */}
      <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 items-center justify-center">
        <span className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-50"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-black"></span>
        </span>
      </div>
    </div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative w-full bg-black text-white py-20 md:py-32 px-5 sm:px-6 md:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 dot-pattern opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-5xl mx-auto"
      >
        <motion.div variants={fadeUpVariants} className="flex justify-center mb-4">
          <AnimatedGradientText>{"// EXPERIENCE"}</AnimatedGradientText>
        </motion.div>

        <motion.h2
          variants={fadeUpVariants}
          className="text-center text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-12 md:mb-16"
        >
          Where I've <span className="text-gradient">built things</span>.
        </motion.h2>

        <div ref={containerRef} className="relative">
          {/* Vertical center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-white/[0.08]" />
          <motion.div
            style={{ height: lineHeight }}
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-px bg-gradient-to-b from-indigo-400 via-purple-500 to-cyan-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
          />

          {/* Mobile vertical line */}
          <div className="md:hidden absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-400 via-purple-500 to-cyan-400 opacity-50" />

          <div className="md:pl-0 pl-6">
            {experiences.map((exp, idx) => (
              <TimelineEntry key={exp.id} exp={exp} index={idx} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
