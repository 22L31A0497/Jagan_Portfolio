import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import { projects } from "../../data/constants";
import { AnimatedGradientText } from "../ui/AnimatedGradientText";
import { CardSpotlight } from "../ui/CardSpotlight";
import { BackgroundGradient } from "../ui/BackgroundGradient";
import {
  fadeUpVariants,
  containerVariants,
} from "../../hooks/useScrollAnimation";

const FILTERS = ["All", "Frontend", "Backend", "Full Stack", "ML"];

const classifyProject = (p) => {
  const tags = (p.tags || []).join(" ").toLowerCase();
  const hasFrontend = /react|next|tailwind|html|css|javascript|redux|axios/.test(tags);
  const hasBackend = /node|express|django|mongodb|jwt|mongoose|rest|api/.test(tags);
  const hasML = /python|tensorflow|scikit|onnx|yolo|opencv|seaborn|pandas|numpy|matplotlib|logistic|forest|tree/.test(tags);
  if (hasFrontend && hasBackend) return "Full Stack";
  if (hasML) return "ML";
  if (hasBackend) return "Backend";
  if (hasFrontend) return "Frontend";
  return "Other";
};

const ProjectCard = ({ project }) => (
  <CardSpotlight className="h-full p-0 group/card overflow-hidden flex flex-col">
    <div className="relative h-48 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center hover:bg-indigo-500/30 hover:border-indigo-400/40 transition-colors"
          >
            <IconBrandGithub size={16} />
          </a>
        )}
        {project.webapp && (
          <a
            href={project.webapp}
            target="_blank"
            rel="noreferrer"
            aria-label="Live"
            className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center hover:bg-purple-500/30 hover:border-purple-400/40 transition-colors"
          >
            <IconExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <h3 className="text-base md:text-lg font-bold mb-2 line-clamp-2">
        {project.title}
      </h3>
      <p className="text-xs md:text-sm text-neutral-400 leading-relaxed line-clamp-3 mb-4 whitespace-pre-line">
        {project.description?.split("\n").filter(Boolean).slice(0, 2).join(" ").trim()}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags?.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300"
          >
            {tag}
          </span>
        ))}
        {project.tags?.length > 5 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-500">
            +{project.tags.length - 5}
          </span>
        )}
      </div>
    </div>
  </CardSpotlight>
);

const FeaturedProject = ({ project }) => {
  if (!project) return null;
  return (
    <BackgroundGradient containerClassName="rounded-2xl mb-10 md:mb-12">
      <div className="rounded-2xl bg-[#0a0a0a] overflow-hidden grid md:grid-cols-2 gap-0">
        <div className="relative h-56 sm:h-64 md:h-auto md:min-h-[320px] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/40 md:to-[#0a0a0a]/20" />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <AnimatedGradientText>★ Featured Project</AnimatedGradientText>
          </div>
        </div>
        <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 leading-tight">
            {project.title}
          </h3>
          <p className="text-sm md:text-base text-neutral-300 leading-relaxed whitespace-pre-line mb-5 line-clamp-5">
            {project.description?.trim()}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.slice(0, 8).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-sm hover:bg-white/[0.05] transition-colors"
              >
                <IconBrandGithub size={16} /> Code
              </a>
            )}
            {project.webapp && (
              <a
                href={project.webapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all"
              >
                <IconExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </BackgroundGradient>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const featured = projects[0];
  const rest = projects.slice(1);

  const filtered = useMemo(() => {
    if (filter === "All") return rest;
    return rest.filter((p) => classifyProject(p) === filter);
  }, [filter, rest]);

  return (
    <section
      id="projects"
      className="relative w-full bg-black text-white py-20 md:py-32 px-5 sm:px-6 md:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative max-w-7xl mx-auto"
      >
        <motion.div variants={fadeUpVariants} className="flex justify-center mb-4">
          <AnimatedGradientText>{"// PROJECTS"}</AnimatedGradientText>
        </motion.div>

        <motion.h2
          variants={fadeUpVariants}
          className="text-center text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-10 md:mb-12"
        >
          Selected <span className="text-gradient">work</span>.
        </motion.h2>

        <motion.div variants={fadeUpVariants}>
          <FeaturedProject project={featured} />
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="relative px-4 py-2 rounded-full text-sm transition-colors"
            >
              {filter === f && (
                <motion.span
                  layoutId="activeFilter"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                />
              )}
              <span
                className={`relative z-10 ${
                  filter === f ? "text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                {f}
              </span>
              {filter !== f && (
                <span className="absolute inset-0 rounded-full border border-white/10" />
              )}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-neutral-500 mt-12">
            No projects in this category yet.
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;
