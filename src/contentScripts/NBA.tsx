import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import NBATeams from '../lib/teams';
import findSportsTickets from '../lib/findSportsTickets';

import { ICollapsible } from '../components/Collapsible/Collapsible';
import PurpleTag from '../components/PurpleTag';
import MainPage from '../components/MainPage';

const App: React.FC = () => {
  const [tagIsOpened, setTagIsOpened] = useState<boolean>(false);
  const [tickets, addTickets] = useState<ICollapsible[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        addTickets,
        setIsLoading
      );
    }, 2000); // make sure component renders before scraping
    return () => clearTimeout(timer);
  }, []);
  if (!tagIsOpened)
    return (
      <PurpleTag tagIsOpened={tagIsOpened} setTagIsOpened={setTagIsOpened} />
    );
  else
    return (
      <MainPage
        tagIsOpened={tagIsOpened}
        setTagIsOpened={setTagIsOpened}
        teams={teams}
        isLoading={isLoading}
        tickets={tickets}
      />
    );
};

const div = document.createElement('div');
document.body.appendChild(div);

const root = createRoot(div);
root.render(<App />);
