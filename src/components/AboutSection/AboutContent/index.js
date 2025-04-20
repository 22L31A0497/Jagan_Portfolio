import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
color: ${({ theme }) => theme.text_primary};
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

const Text = styled.p`
  font-size: 1.2rem;
  transition: height 0.3s ease;
color: ${({ theme }) => theme.text_primary};
  @media (max-width: 500px) {
    display: none;
  }
`;

const MobileText = styled.p`
  display: none;
  font-size: 1rem;
color: ${({ theme }) => theme.text_primary};
  @media (max-width: 500px) {
    display: block;
  }
`;

const AboutContent = () => {
  return (
    <Container>
     <Title>About Me</Title>
<Text>
I am a self-driven and passionate developer with a strong foundation in electronics and a deep interest in software development. As a third year ECE (Electronics and Communication Engineering) student at Vignan's Institute of Information Technology (VIIT), I’ve explored beyond my core domain and gained hands-on experience in full-stack web development through various real-world projects and internships. I enjoy solving problems, learning new technologies, and building impactful web applications. My journey showcases a unique combination of ECE fundamentals and modern software skills, driven by continuous learning and innovation.
</Text>
<MobileText>
I’m a third year ECE student at VIIT, passionate about software development. Though my background is in electronics, I’ve built strong full-stack skills through practical projects and internships. I enjoy solving problems and creating web apps, constantly learning and pushing my boundaries in tech.
</MobileText>

    </Container>
  );
};

export default AboutContent;
