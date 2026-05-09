import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bio } from "../../data/constants";

export const LoadingScreen = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_55%)]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col items-center gap-6"
          >
            <div className="relative w-16 h-16">
              <span className="absolute inset-0 rounded-full border-2 border-indigo-400/20" />
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-400 border-r-purple-400"
              />
              <span className="absolute inset-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.6)]" />
            </div>

            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.4em" }}
              animate={{ opacity: 1, letterSpacing: "0.05em" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-2xl md:text-3xl font-bold"
            >
              <span className="text-gradient">{Bio.name.split(" ")[0]}</span>
              <span className="text-white">.dev</span>
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
