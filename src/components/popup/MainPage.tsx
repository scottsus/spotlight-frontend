import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import fonts from '../../lib/constants/fonts';
import Suggestion from './Suggestion';
import Logo from '../general/Logo';
import Divider from '../general/Divider';

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
      <style>{fonts}</style>
      <Logo margin="8px auto 0">spotlight</Logo>
      <LifetimeSavings>
        <SavingsProgress
          src={chrome.runtime.getURL(`imgs/partialTicketProgress.png`)}
        />
        <SavingsTextBox>
          <SoFar>With Spotlight, you saved...</SoFar>
          <Dollar>
            ${dollarSaved.toFixed(2)}&thinsp;
            <NumTickets>with 0 tickets</NumTickets>
          </Dollar>
        </SavingsTextBox>
      </LifetimeSavings>
      <Upcoming>
        Upcoming Events near <Location>Los Angeles, CA</Location>
      </Upcoming>
      <Divider margin="10px auto 16px" />
      <SuggestionList>
        <Suggestion
          thumbnailUrl="imgs/lakers-clippers.png"
          performer="LA Lakers vs. LA Clippers"
          venue="Crypto.com Arena"
          date="Apr 5"
          time="Wed · 7:00 PM"
          ticketHrefs={lakersClippersHrefs}
          minPrices={lakersClippersMinPrices}
        />
        <Suggestion
          thumbnailUrl="imgs/keshi.png"
          performer="keshi w/ James Ivy"
          venue="Greek Theater"
          date="Apr 7, 8"
          time="Fri · 7:30 PM"
          ticketHrefs={keshiTicketHrefs}
          minPrices={keshiMinPrices}
        />
        <Suggestion
          thumbnailUrl="imgs/dabin.png"
          performer="Dabin (18+ event)"
          venue="Shrine Expo Hall"
          date="Apr 7, 8"
          time="Sat · 8:00 PM"
          ticketHrefs={dabinTicketHrefs}
          minPrices={dabinMinPrices}
        />
        <Suggestion
          thumbnailUrl="imgs/jackson-wang.png"
          performer="Jackson Wang"
          venue="Shrine Expo Hall"
          date="Apr 26"
          time="Wed · 8:00 PM"
          ticketHrefs={jacksonWangHrefs}
          minPrices={jacksonWangMinPrices}
        />
        <Suggestion
          thumbnailUrl="imgs/joji.png"
          performer="Joji Presents Smithereens"
          venue="Kia Forum"
          date="May 13"
          time="Sat · 8:00 PM"
          ticketHrefs={jojiHrefs}
          minPrices={jojiMinPrices}
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
          .
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

const LifetimeSavings = styled.div`
  margin: 22px auto 10px;
  height: 115px;
  display: flex;
`;

const SavingsProgress = styled.img`
  width: 90px;
  height: 110px;
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
  font-weight: 400;
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
  :hover {
    opacity: 0.6;
  }
`;

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

const lakersClippersMinPrices = [102, 98, 101, 111, 120, 97, 114, 138];

const keshiTicketHrefs = [
  `https://www.stubhub.com/keshi-los-angeles-tickets-4-7-2023/event/150564946/`,
  `https://gametime.co/concert/keshi-tickets/4-7-2023-los-angeles-ca-greek-theatre/events/6356bd42a0e56f00017682c1`,
  `https://seatgeek.com/keshi-tickets/los-angeles-california-the-greek-theatre-los-angeles-2023-04-07-7-pm/concert/5851885`,
  `https://www.ticketmaster.com/event/Z7r9jZ1Ad_ppk`,
  `https://www.tickpick.com`,
  `https://www.vividseats.com/keshi-tickets-los-angeles-greek-theatre---los-angeles-4-7-2023--concerts-alternative/production/4168372`,
  `https://www.axs.com/events/451535/keshi-tickets`,
  `https://www.ticketiq.com/buy-keshi-tickets-greek-theatre-los-angeles-ca-4-7-23-7pm/5391349/`,
];

const keshiMinPrices = [32, 46, 67, 56, 70, 45, 30, 56];

const dabinTicketHrefs = [
  `https://www.stubhub.com/dabin-los-angeles-tickets-4-8-2023/event/151382734/`,
  `https://gametime.co/concert/dabin-tickets/4-8-2023-los-angeles-ca-shrine-expo-hall/events/63c1d39e8a1e69000189fb8a`,
  `https://seatgeek.com/dabin-18-tickets/los-angeles-california-shrine-expo-hall-2023-04-08-7-30-pm/concert/5914760`,
  `https://www.ticketmaster.com/event/Z7r9jZ1AdqAep`,
  `https://www.tickpick.com`,
  `https://www.vividseats.com/dabin-tickets-los-angeles-shrine-auditorium-and-expo-hall-los-angeles-2-8-2023--concerts-dance-electronica/production/4269506`,
  `https://www.axs.com/events/462222/dabin-tickets`,
  `https://www.ticketiq.com/buy-dabin-tickets-shrine-expo-hall-4-8-23-8pm/5527160/`,
];

const dabinMinPrices = [63, 63, 115, 80, 90, 64, 45, 81];

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

const jacksonWangMinPrices = [82, 79, 113, 111, 100, 86, 135, 113];

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

const jojiMinPrices = [117, 113, 163, 140, 150, 122, 140, 162];
