import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Themes.js";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Projects from "./components/Projects";

import AboutSection from "./components/AboutSection/index.js";
import CodingProfiles from "./components/CodingProfile/index.js";
import styled from "styled-components";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

const ThemeToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
  z-index: 1000;
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Toggle theme between dark and light
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Navbar />
        <Body>
          <HeroSection />
          <Wrapper>
            <AboutSection />
            <Skills />
            <Experience />
          </Wrapper>
          <Wrapper>
            <Projects />
            <CodingProfiles />
            <Contact />
          </Wrapper>
          <Footer />
        </Body>

        
        <ThemeToggleButton onClick={toggleTheme}>
          {darkMode ? "🌙" : "☀️"}
        </ThemeToggleButton>
      </Router>
    </ThemeProvider>
  );
}

export default App;
