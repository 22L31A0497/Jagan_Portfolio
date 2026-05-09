import React, { Suspense, lazy } from "react";
import "./styles/globals.css";
import Navbar from "./components/sections/Navbar";
import LoadingScreen from "./components/ui/LoadingScreen";

const Hero = lazy(() => import("./components/sections/Hero"));
const About = lazy(() => import("./components/sections/About"));
const Skills = lazy(() => import("./components/sections/Skills"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Experience = lazy(() => import("./components/sections/Experience"));
const Contact = lazy(() => import("./components/sections/Contact"));
const Footer = lazy(() => import("./components/sections/Footer"));

const SectionFallback = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-indigo-400/30 border-t-indigo-400 animate-spin" />
  </div>
);

function App() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <LoadingScreen />
      <Navbar />
      <main>
        <Suspense fallback={<SectionFallback />}>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}

export default App;

