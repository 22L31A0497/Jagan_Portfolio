import React from "react";
import { motion } from "framer-motion";
import { skills as skillsData } from "../../data/constants";
import { AnimatedGradientText } from "../ui/AnimatedGradientText";
import { Meteors } from "../ui/Meteors";
import { BentoGrid } from "../ui/BentoGrid";
import { MarqueePills } from "../ui/MarqueePills";
import { CardSpotlight } from "../ui/CardSpotlight";
import {
  fadeUpVariants,
  containerVariants,
} from "../../hooks/useScrollAnimation";

const findCategory = (title) =>
  skillsData.find((s) => s.title.toLowerCase().includes(title.toLowerCase()));

const SkillIcon = ({ skill, size = "md" }) => (
  <div
    className={`flex flex-col items-center gap-1.5 group ${
      size === "sm" ? "w-14" : "w-20"
    }`}
  >
    <div
      className={`${
        size === "sm" ? "w-10 h-10" : "w-12 h-12"
      } rounded-lg bg-white/[0.03] border border-white/10 p-2 flex items-center justify-center group-hover:border-indigo-400/40 group-hover:bg-indigo-500/10 group-hover:shadow-[0_0_18px_rgba(99,102,241,0.35)] transition-all duration-300`}
    >
      <img
        src={skill.image}
        alt={skill.name}
        className="w-full h-full object-contain"
      />
    </div>
    <span className="text-[10px] md:text-xs text-neutral-400 text-center leading-tight group-hover:text-neutral-200 transition-colors">
      {skill.name}
    </span>
  </div>
);

const Skills = () => {
  const technologies = findCategory("Technologies");
  const languages = findCategory("Languages");
  const tools = findCategory("Tools");
  const others = findCategory("Others");

  const allSkills = skillsData.flatMap((cat) => cat.skills.map((s) => s.name));

  return (
    <section
      id="skills"
      className="relative w-full bg-black text-white py-20 md:py-32 px-5 sm:px-6 md:px-8 overflow-hidden"
    >
      <Meteors number={18} />
      <div className="absolute inset-0 grid-pattern opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-7xl mx-auto"
      >
        <motion.div variants={fadeUpVariants} className="flex justify-center mb-4">
          <AnimatedGradientText>{"// SKILLS"}</AnimatedGradientText>
        </motion.div>

        <motion.h2
          variants={fadeUpVariants}
          className="text-center text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-12 md:mb-16"
        >
          My <span className="text-gradient">technical toolkit</span>.
        </motion.h2>

        <BentoGrid>
          {/* Frontend / Tech - col-span-2 */}
          <motion.div variants={fadeUpVariants} className="md:col-span-2">
            <CardSpotlight className="p-6 md:p-8 h-full" spotlightColor="rgba(99,102,241,0.18)">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="text-xl md:text-2xl font-bold">Frontend & Stack</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/20 text-indigo-300">
                  Core
                </span>
              </div>
              <p className="text-sm text-neutral-400 mb-6">
                The frameworks and libraries I reach for daily.
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                {technologies?.skills.map((s) => (
                  <SkillIcon key={s.name} skill={s} />
                ))}
              </div>
            </CardSpotlight>
          </motion.div>

          {/* Languages */}
          <motion.div variants={fadeUpVariants}>
            <CardSpotlight className="p-6 md:p-8 h-full" spotlightColor="rgba(139,92,246,0.2)">
              <h3 className="text-xl md:text-2xl font-bold mb-3">Languages</h3>
              <p className="text-sm text-neutral-400 mb-6">
                The languages I think and build in.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {languages?.skills.map((s) => (
                  <SkillIcon key={s.name} skill={s} size="sm" />
                ))}
              </div>
            </CardSpotlight>
          </motion.div>

          {/* Tools & Deployment */}
          <motion.div variants={fadeUpVariants} className="md:col-span-2">
            <CardSpotlight className="p-6 md:p-8 h-full" spotlightColor="rgba(6,182,212,0.18)">
              <h3 className="text-xl md:text-2xl font-bold mb-3">Tools & Deployment</h3>
              <p className="text-sm text-neutral-400 mb-6">
                Source control, dev tooling, and cloud platforms.
              </p>
              <div className="flex flex-wrap gap-3">
                {tools?.skills.map((s) => (
                  <SkillIcon key={s.name} skill={s} size="sm" />
                ))}
              </div>
            </CardSpotlight>
          </motion.div>

          {/* Currently learning - featured pulse */}
          <motion.div variants={fadeUpVariants}>
            <CardSpotlight className="p-6 md:p-8 h-full relative" spotlightColor="rgba(99,102,241,0.25)">
              <div className="absolute top-5 right-5 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
                <span className="text-xs text-indigo-300">Now</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Currently Learning</h3>
              <ul className="space-y-2 text-sm text-neutral-300 mt-4">
                <li className="flex items-center gap-2">
                  <span className="text-indigo-400">▸</span> Computer Vision (YOLOv8, OpenCV)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-400">▸</span> ONNX Runtime & model optimization
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-400">▸</span> System design at scale
                </li>
              </ul>
            </CardSpotlight>
          </motion.div>

          {/* Soft skills + marquee - col-span-3 */}
          <motion.div variants={fadeUpVariants} className="md:col-span-3">
            <CardSpotlight
              className="p-6 md:p-8 h-full"
              spotlightColor="rgba(139,92,246,0.18)"
            >
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <h3 className="text-xl md:text-2xl font-bold">All Skills</h3>
                <span className="text-xs text-neutral-400">
                  {others?.title} included
                </span>
              </div>
              <MarqueePills items={allSkills} speed={45} />
              <div className="mt-3">
                <MarqueePills items={allSkills.slice().reverse()} reverse speed={50} />
              </div>
            </CardSpotlight>
          </motion.div>
        </BentoGrid>
      </motion.div>
    </section>
  );
};

export default Skills;
