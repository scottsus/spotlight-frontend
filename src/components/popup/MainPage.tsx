import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Suggestion from './Suggestion';

export default function MainPage() {
  const [dollarSaved, setDollarSaved] = useState(0);
  useEffect(() => {
    const initialSetDollarSaved = async () => {
      await chrome.storage.local.set({ dollarSaved: 0 });
    };
    const getDollarSaved = async () => {
      const keyVal = await chrome.storage.local.get(`dollarSaved`);
      return keyVal[`dollarSaved`] as number;
    };
    initialSetDollarSaved().catch((err) => console.log(err));
    getDollarSaved()
      .then((dollarSaved) => setDollarSaved(dollarSaved))
      .catch((err) => console.log(err));
  });
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
            ${dollarSaved.toFixed(2)}&thinsp;
            <NumTickets>with 1 ticket</NumTickets>
          </Dollar>
        </SavingsTextBox>
      </LifetimeSavings>
      <Upcoming>
        Upcoming Events near <Location>Los Angeles, CA</Location>
      </Upcoming>
      <Divider />
      <SuggestionList>
        <Suggestion
          thumbnailUrl="imgs/jackson-wang.png"
          performer="Jackson Wang"
          venue="Shrine Expo Hall"
          date="Apr 26"
          time="Wed · 8:00 PM"
          ticketHrefs={jacksonWangHrefs}
        />
        <Suggestion
          thumbnailUrl="imgs/joji.png"
          performer="Joji Presents Smithereens"
          venue="Kia Forum"
          date="May 13"
          time="Sat · 8:00 PM"
          ticketHrefs={jojiHrefs}
        />
        <Suggestion
          thumbnailUrl="imgs/lakers-clippers.png"
          performer="LA Lakers vs. LA Clippers"
          venue="Crypto.com Arena"
          date="Apr 05"
          time="Wed · 7:00 PM"
          ticketHrefs={lakersClippersHrefs}
        />
      </SuggestionList>
      <Footer>
        <Feedback>
          Your opinion matters 🔥 share it with us{' '}
          <FeedbackLink>
            <a href="https://forms.gle/pEoztLqSCdgu6E9U6" target="_blank">
              here
            </a>
          </FeedbackLink>
        </Feedback>
        <Socials>
          <a href="https://www.instagram.com/tryspotlight" target="_blank">
            <SocialIcon src={chrome.runtime.getURL(`imgs/instagram.svg`)} />
          </a>
          <a href="https://twitter.com/spotlightxyz" target="_blank">
            <SocialIcon src={chrome.runtime.getURL(`imgs/twitter.svg`)} />
          </a>
          <a
            href="https://www.linkedin.com/company/tryspotlight/"
            target="_blank"
          >
            <SocialIcon src={chrome.runtime.getURL(`imgs/linkedin.svg`)} />
          </a>
          <a href="https://www.tryspotlight.xyz/" target="_blank">
            <SocialIcon src={chrome.runtime.getURL(`imgs/landing.svg`)} />
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
  height: 270px;
  overflow-y: scroll;
`;

const Footer = styled.div`
  margin: 13px 0 0 5px;
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

const SocialIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const jacksonWangHrefs = [
  `https://www.stubhub.com/jackson-wang-los-angeles-tickets-4-26-2023/event/151388684/`,
  `https://gametime.co/concert/jackson-wang-tickets/4-26-2023-los-angeles-ca-shrine-expo-hall/events/63c1d3c33f5b310001839e9f`,
  `https://seatgeek.com/jackson-wang-tickets/los-angeles-california-shrine-expo-hall-2023-04-26-8-pm/concert/5914761`,
  `https://www.ticketmaster.com/event/Z7r9jZ1Adqk8A?tmrid=TMR-3746405&routing=y`,
  `https://www.tickpick.com/buy-jackson-wang-tickets-shrine-expo-hall-4-26-23-8pm/5529044/`,
  `https://www.vividseats.com/jackson-wang-tickets-los-angeles-shrine-auditorium-and-expo-hall-los-angeles-4-26-2023--concerts-k-pop/production/4272266`,
  `https://www.axs.com/events/464713/jackson-wang-tickets`,
  `https://www.ticketiq.com/buy-jackson-wang-tickets-shrine-expo-hall-4-26-23-8pm/5529044/`,
];
const jojiHrefs = [
  `https://www.stubhub.com/joji-inglewood-tickets-5-13-2023/event/151205722/`,
  `https://gametime.co/concert/joji-tickets/5-13-2023-inglewood-ca-the-forum/events/63655a2f46631b00011cba84`,
  `https://seatgeek.com/joji-tickets/inglewood-california-kia-forum-2-2023-05-13-7-30-pm/concert/5864111`,
  `https://www.ticketmaster.com/joji-presents-smithereens-oblivion-with-rei-inglewood-california-05-13-2023/event/09005D5E34307424`,
  `https://www.tickpick.com/buy-joji-tickets-the-kia-forum-5-13-23-7pm/5414801/`,
  `https://www.vividseats.com/joji-tickets-inglewood-kia-forum-5-13-2023--concerts-rap-hip-hop/production/4187644`,
  `https://www.axs.com/events/455069/joji-tickets`,
  `https://www.ticketiq.com/buy-joji-tickets-the-kia-forum-5-13-23-7pm/5414801/`,
];

const lakersClippersHrefs = [
  `https://www.stubhub.com/los-angeles-lakers-los-angeles-tickets-4-5-2023/event/150339034/`,
  `https://gametime.co/nba-basketball/lakers-at-clippers-tickets/4-5-2023-los-angeles-ca-crypto-com-arena/events/62fd48aaf3a44b0001934fd3`,
  `https://seatgeek.com/lakers-at-clippers-tickets/4-5-2023-los-angeles-california-crypto-com-arena/nba/5776494`,
  `https://www.ticketmaster.com/event/Z7r9jZ1Ad4sOS?tmrid=TMR-3571833&routing=y`,
  `https://www.tickpick.com/buy-los-angeles-clippers-vs-los-angeles-lakers-tickets-crypto-com-arena-4-5-23-7pm/5274651/`,
  `https://www.vividseats.com/la-clippers-tickets-cryptocom-arena-4-5-2023--sports-nba-basketball/production/4068597`,
  `https://www.axs.com/events/444333/22-23-la-clippers-vs-los-angeles-lakers-tickets`,
  `https://www.ticketiq.com/buy-los-angeles-clippers-vs-los-angeles-lakers-tickets-crypto-com-arena-4-5-23-7pm/5274651/`,
];
