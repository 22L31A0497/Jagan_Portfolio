import React, { useState } from 'react';
import './AboutSection.css';
import AboutContent from './AboutContent';
import EducationContent from './EducationContent';
import AchievementsContent from './Achievements';
import styled from 'styled-components';
const H1 = styled.h1`
  color: ${({ theme }) => theme.text_primary};

  `
  const H5 = styled.h5`
  color: ${({ theme }) => theme.text_secondary};
  `
  const About = styled.div`
    color: ${({ theme }) => theme.text_primary};

    background: ${({ theme }) => theme.body};
    `
const AboutSection = () => {
  const [selectedOption, setSelectedOption] = useState('about');

  const renderContent = () => {
    switch (selectedOption) {
      case 'about':
        return <AboutContent />;
      case 'education':
        return <EducationContent />;
      case 'achievements':
        return <AchievementsContent />;
      default:
        return <AboutContent />;
    }
  };

  return (
 <section className="about-section" id="about">
      <H1><h1>About Me</h1></H1>
      <H5><h5>Get to know me</h5></H5>
      <div className="about-content">
        <div className="about-options">
          <button
            className={`option-button ${selectedOption === 'about' ? 'active' : ''}`}
            onClick={() => setSelectedOption('about')}
          >
            About Me
          </button>
          <button
            className={`option-button ${selectedOption === 'education' ? 'active' : ''}`}
            onClick={() => setSelectedOption('education')}
          >
            Education
          </button>
          <button
            className={`option-button ${selectedOption === 'achievements' ? 'active' : ''}`}
            onClick={() => setSelectedOption('achievements')}
          >
            Achievements
          </button>
        </div>
       <About> <div className="about-details">
          {renderContent()}
        </div></About>
      </div>
    </section>
  );
};

export default AboutSection;
