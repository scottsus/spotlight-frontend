import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import NBATeams from '../lib/teams';
import findSportsTickets from '../lib/findSportsTickets';
import './globals.css';

import fonts from '../lib/fonts';

import PurpleTag from '../components/PurpleTag';
import MainPage from '../components/MainPage';
import TicketInfo from '../lib/ticketInfo';

const App: React.FC = () => {
  const [tagIsOpened, setTagIsOpened] = useState<boolean>(false);

  // Getting Tickets
  const [destTickets, addDestTickets] = useState<TicketInfo[]>([]);
  const [srcTicketInfo, setSrcTicketInfo] = useState<TicketInfo>();

  // Loading Results
  const [hasLoadedOne, setHasLoadedOne] = useState<boolean>(false);
  const [hasLoadedAll, setHasLoadedAll] = useState<boolean>(false);

  const teams = useRef<string[]>([]);
  const addTeam = (NBATeam) => {
    teams.current.push(NBATeam);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      findSportsTickets(
        document.URL,
        document.body.innerText,
        NBATeams,
        teams,
        addTeam,
        addDestTickets,
        setSrcTicketInfo,
        setHasLoadedOne,
        setHasLoadedAll
      );
    }, 2000); // make sure page loads before scraping
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <style>{fonts}</style>
      <PurpleTag tagIsOpened={tagIsOpened} setTagIsOpened={setTagIsOpened} />;
      <MainPage
        tagIsOpened={tagIsOpened}
        setTagIsOpened={setTagIsOpened}
        srcTicketInfo={srcTicketInfo}
        destTickets={destTickets}
        hasLoadedOne={hasLoadedOne}
        hasLoadedAll={hasLoadedAll}
      />
    </div>
  );
};

const div = document.createElement('div');
document.body.appendChild(div);

const shadowRoot = createRoot(div);
shadowRoot.render(<App />);
