import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createRoot } from 'react-dom/client';

import fonts from '../lib/fonts';
import findSportsTickets from '../lib/findSportsTickets';
import './globals.css';

import PurpleTag from '../components/PurpleTag';
import MainPage from '../components/MainPage';
import TicketInfo from '../lib/ticketInfo';

const App: React.FC = () => {
  const [tagIsOpened, setTagIsOpened] = useState<boolean>(false);

  // Getting Tickets
  const [destTickets, addDestTickets] = useState<TicketInfo[]>([]);
  const [srcTicketInfo, setSrcTicketInfo] = useState<TicketInfo>();

  // Loading Results
  const [hasOneGoodResult, setHasOneGoodResult] = useState<boolean>(false);
  const [hasLoadedAll, setHasLoadedAll] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      findSportsTickets(
        document.URL,
        document.body.outerHTML,
        addDestTickets,
        setSrcTicketInfo,
        setHasOneGoodResult,
        setHasLoadedAll
      );
      // console.log(document.body.outerHTML);
    }, 4000); // make sure page loads before scraping
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppDiv>
      <style>{fonts}</style>
      <PurpleTag tagIsOpened={tagIsOpened} setTagIsOpened={setTagIsOpened} />;
      <MainPage
        tagIsOpened={tagIsOpened}
        setTagIsOpened={setTagIsOpened}
        srcTicketInfo={srcTicketInfo}
        destTickets={destTickets}
        hasOneGoodResult={hasOneGoodResult}
        hasLoadedAll={hasLoadedAll}
      />
    </AppDiv>
  );
};

const AppDiv = styled.div`
  * {
    line-height: 1.4;
  }
`;

const div = document.createElement('div');
document.body.appendChild(div);

const shadowRoot = createRoot(div);
shadowRoot.render(<App />);
