import React from "react";
import { Bio } from "../../data/constants";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative w-full bg-black text-neutral-400 pt-12 pb-8 px-5 md:px-8 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-[0.05] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div className="text-white font-bold">
          <span className="text-gradient">{Bio.name.split(" ")[0]}</span>
          <span className="text-white">.dev</span>
        </div>
        <p className="text-neutral-500 text-xs md:text-sm">
          Built with <span className="text-indigo-300">React</span> +{" "}
          <span className="text-purple-300">Aceternity UI</span> +{" "}
          <span className="text-cyan-300">Tailwind</span>
        </p>
        <p className="text-neutral-500 text-xs md:text-sm">
          © {year} {Bio.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
