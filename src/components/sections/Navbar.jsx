import React, { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShimmerButton } from "../ui/ShimmerButton";
import { cn } from "../../lib/utils";
import { Bio } from "../../data/constants";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > prev && latest > 120) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const firstName = Bio?.name?.split(" ")[0] ?? "Portfolio";

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-110%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => handleNav("#hero")}
          className="text-lg md:text-xl font-bold tracking-tight"
        >
          <span className="text-gradient">{firstName}</span>
          <span className="text-white">.dev</span>
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="group relative text-sm text-neutral-400 hover:text-white transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <ShimmerButton
            onClick={() => handleNav("#contact")}
            className="text-sm px-5 py-2.5"
          >
            Hire Me
          </ShimmerButton>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5 p-2 z-[60]"
        >
          <span
            className={cn(
              "h-0.5 w-6 bg-white transition-transform duration-300",
              open && "translate-y-2 rotate-45"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 bg-white transition-opacity duration-300",
              open && "opacity-0"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 bg-white transition-transform duration-300",
              open && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </div>

      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto" },
          closed: { opacity: 0, pointerEvents: "none" },
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed inset-0 top-16 bg-black flex flex-col items-center justify-center gap-8"
      >
        {NAV_LINKS.map((link) => (
          <motion.button
            key={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={
              open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.4 }}
            onClick={() => handleNav(link.href)}
            className="text-2xl font-medium text-neutral-200 hover:text-white"
          >
            {link.label}
          </motion.button>
        ))}
        <ShimmerButton
          onClick={() => handleNav("#contact")}
          className="text-base px-6 py-3 mt-4"
        >
          Hire Me
        </ShimmerButton>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
