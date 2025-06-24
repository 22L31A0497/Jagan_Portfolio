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
        I am a self-driven and passionate developer with a strong foundation in electronics and a deep interest in software development. As a final year ECE (Electronics and Communication Engineering) student at Vignan's Institute of Information Technology (VIIT), I’ve gone beyond my core domain to build real-world expertise in full-stack web development through impactful projects and internships. I enjoy solving complex problems, learning modern technologies, and creating meaningful web applications. My journey reflects a unique blend of ECE fundamentals and strong software engineering skills, fueled by continuous learning and innovation.
      </Text>
      <MobileText>
        I’m a final year ECE student at VIIT, passionate about software development. Though my background is in electronics, I’ve developed strong full-stack skills through real-world projects and internships. I love building web apps, solving problems, and constantly growing in the tech space.
      </MobileText>
    </Container>
  );
};


export default AboutContent;
