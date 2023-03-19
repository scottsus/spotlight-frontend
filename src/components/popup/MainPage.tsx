import React, { useState } from 'react';
import styled from 'styled-components';
import Suggestion from './Suggestion';

export default function MainPage() {
  return (
    <MainPageDiv>
      <Logo>spotlight</Logo>
      <LifetimeSavings>
        <SavingsProgress
          src={chrome.runtime.getURL(`imgs/partialTicketProgress.svg`)}
        />
        <SavingsTextBox>
          <SoFar>With Spotlight, you saved...</SoFar>
          <Dollar>
            $22.00 <NumTickets>with 1 ticket</NumTickets>
          </Dollar>
        </SavingsTextBox>
      </LifetimeSavings>
      <Upcoming>
        Upcoming Events near <Location>Los Angeles, CA</Location>
      </Upcoming>
      <Divider />
      <SuggestionList>
        <Suggestion
          thumbnailUrl="imgs/keshi.png"
          performer="keshi - The Hell & Back Tour"
          venue="Greek Theater"
          date="Apr 8"
          time="Sat · 7:30 PM"
        />
        <Suggestion
          thumbnailUrl="imgs/dabin.png"
          performer="Dabin (18+ Event)"
          venue="Shrine Auditorium and Expo Hall"
          date="Apr 18"
          time="Fri · 8:00 PM"
        />
        <Suggestion
          thumbnailUrl="imgs/lakers-clippers.png"
          performer="Lakers vs. Clippers"
          venue="Crypto.com Arena"
          date="Apr 23"
          time="Thu · 8:30 PM"
        />
      </SuggestionList>
      <Footer>
        <Feedback>
          Your opinion matters 🔥 share it with us{' '}
          <FeedbackLink>here</FeedbackLink>
        </Feedback>
        <Socials>
          <a href="https://www.instagram.com/tryspotlight" target="_blank">
            <Instagram src={chrome.runtime.getURL(`imgs/instagram.svg`)} />
          </a>
          <a href="https://twitter.com/spotlightxyz" target="_blank">
            <Twitter src={chrome.runtime.getURL(`imgs/twitter.svg`)} />
          </a>
          <a
            href="https://www.linkedin.com/company/tryspotlight/"
            target="_blank"
          >
            <LinkedIn src={chrome.runtime.getURL(`imgs/linkedin.svg`)} />
          </a>
          <a href="https://www.tryspotlight.xyz/" target="_blank">
            <Landing src={chrome.runtime.getURL(`imgs/landing.svg`)} />
          </a>
        </Socials>
      </Footer>
    </MainPageDiv>
  );
}

const MainPageDiv = styled.div`
  padding: 10px 20px;
  width: 550px;
  height: 580px;
  border-radius: 10.6px;
  background-color: #ffffff;
  z-index: 100;
  overflow: hidden;
`;

const Logo = styled.h1`
  font-size: 30px;
  font-family: Mont;
  font-weight: 800;
  color: #4b3bff;
  letter-spacing: -0.03em;
  margin: 8px auto 0;
`;

const LifetimeSavings = styled.div`
  margin: 22px auto 10px;
  height: 115px;
  display: flex;
`;

const SavingsProgress = styled.img`
  width: 80px;
  height: 100px;
  margin: 0 20px 0 10px;
`;

const SavingsTextBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: 18.5px 0 0 10px;
`;

const SoFar = styled.h3`
  font-size: 18px;
  font-family: Manrope;
  font-weight: 500;
  color: #27292a;
`;

const Dollar = styled.h2`
  font-size: 24px;
  font-family: Manrope;
  font-weight: 600;
  color: #42d988;
`;

const NumTickets = styled.span`
  font-size: 18px;
  font-family: Manrope;
  font-weight: 500;
  color: #5f5f5f;
`;

const Upcoming = styled.h2`
  font-size: 18px;
  font-family: Manrope;
  font-weight: 500;
  color: #27292a;
`;

const Location = styled.span`
  color: #4b3bff;
`;

const Divider = styled.div`
  height: 2px;
  background-color: #dfe0e0;
  margin: 10px auto 16px;
`;

const SuggestionList = styled.div`
  height: 260px;
  overflow-y: scroll;
`;

const Footer = styled.div`
  margin: 22.5px 0 0 0;
  display: flex;
  justify-content: space-between;
`;

const Feedback = styled.p`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 300;
  color: #27292a;
`;

const FeedbackLink = styled.span`
  color: #4b3bff;
  text-decoration: underline;
`;

const Socials = styled.div`
  width: 22%;
  display: flex;
  justify-content: space-around;
`;

const Instagram = styled.img`
  width: 20px;
  height: 20px;
`;

const Twitter = styled.img`
  width: 20px;
  height: 20px;
`;

const LinkedIn = styled.img`
  width: 20px;
  height: 20px;
`;

const Landing = styled.img`
  width: 20px;
  height: 20px;
`;
