import React from 'react';
import styled from 'styled-components';
import { codingProfiles } from '../../data/constants'; // Adjust the path as necessary

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.text_primary};
`;

const ProfileList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const ProfileItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
  border: 1.5px solid #6751b9;
  padding: 20px;
  border-radius: 15px;
  width: 250px;
  background-color: linear-radient(180deg,#6751b9 0%,#6751b9 100%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 15px;
  border-radius: 50%;
`;

const ProfileName = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
`;


const ViewProfileButton = styled.button`
  background-color: #fff; /* White background */
  color: #6751b9; /* Primary color text */
  border: 1px solid #6751b9;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #6751b9;
    color: #fff;
  }
`;

const CodingProfiles = () => {
  return (
    <Container id="coding-profiles">
      <Title>My Coding Profiles</Title>
      <ProfileList>
        {codingProfiles.map((profile) => (
          <ProfileItem key={profile.name} href={profile.link} target="_blank" rel="noopener noreferrer">
            <ProfileImage src={profile.image} alt={profile.name} />
            <ProfileName>{profile.name}</ProfileName>
            <ViewProfileButton>View Profile</ViewProfileButton>
          </ProfileItem>
        ))}
      </ProfileList>
    </Container>
  );
};

export default CodingProfiles;
