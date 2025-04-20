import React, { useState } from 'react';
import './Skills.css';
import { skills } from '../../data/constants';
import SkillCard from './SkillCard/SkillCard';
import SkillInfoCard from './SkillInfoCard/SkillInfoCard';
import styled from 'styled-components';
const H1 = styled.h1`
  color: ${({ theme }) => theme.text_primary};
  
  `
  const H5 = styled.h5`
  color: ${({ theme }) => theme.text_secondary};
  
  `

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const handleSelectSkill = (skill) => {
    setSelectedSkill(skill);
  }
  return (
    <section className="skills-container" id="skills">
      <H1><h1>Skills</h1></H1>
      <H5><h5>Here are some of my skills on which I have been working</h5></H5>
      <div className="skills-content">
        <div className="skills">
          {skills.map((item)=>(
            <SkillCard
            key={item.title}
            iconUrl={item.icon}
            title={item.title}
            isActive={selectedSkill.title === item.title}
            onClick={()=>handleSelectSkill(item)}
            />
          ))}
        </div>
        <div className="skills-info">
          <SkillInfoCard
          heading={selectedSkill.title}
          skills={selectedSkill.skills}/>
        </div>
      </div>
    </section>
  )
}

export default Skills