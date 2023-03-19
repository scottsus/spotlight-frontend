import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';

import fonts from '../lib/constants/fonts';
import processCheckout from '../lib/processCheckout';
import './globals.css';

import PurpleTag from '../components/PurpleTag';
import MainPage from '../components/MainPage';
import TicketInfo from '../lib/types/ticketInfo';

export default function Checkout() {
  const [tagIsOpened, setTagIsOpened] = useState<boolean>(false);

  // Getting Tickets
  const [srcTicket, setSrcTicket] = useState<TicketInfo>();
  const [destTickets, addDestTickets] = useState<TicketInfo[]>([]);

  // Loading Results
  const [hasOneGoodResult, setHasOneGoodResult] = useState<boolean>(false);
  const [hasProcessedAll, setHasProcessedAll] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      processCheckout(
        document.URL,
        document.body.outerHTML,
        addDestTickets,
        setSrcTicket,
        setHasOneGoodResult,
        setHasProcessedAll
      );
    }, 4000); // Ensure page hydrates before scraping
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppDiv>
      <style>{fonts}</style>
      <PurpleTag tagIsOpened={tagIsOpened} setTagIsOpened={setTagIsOpened} />;
      <MainPage
        tagIsOpened={tagIsOpened}
        setTagIsOpened={setTagIsOpened}
        srcTicketInfo={srcTicket}
        destTickets={destTickets}
        hasOneGoodResult={hasOneGoodResult}
        hasProcessedAll={hasProcessedAll}
      />
    </AppDiv>
  );
}

const AppDiv = styled.div`
  * {
    line-height: 1.4;
  }
`;

const div = document.createElement('div');
document.body.appendChild(div);

const shadowRoot = createRoot(div);
shadowRoot.render(<Checkout />);
