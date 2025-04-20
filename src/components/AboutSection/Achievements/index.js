 // AchievementsContent.js
import React from 'react';
import { achievements } from '../../../data/constants'; // Adjust the path if needed
import styled from 'styled-components';
const About = styled.div`
   color: ${({ theme }) => theme.text_primary};
    background: ${({ theme }) => theme.body};
    `

const AchievementsContent = () => {
  return (
    <About><div className="achievements">
      <h3>Achievements</h3>
      <ul>
        {achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
    </div></About>
  );
};

export default AchievementsContent;
