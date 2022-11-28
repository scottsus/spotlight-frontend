import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import NBATeams from '../lib/teams';
import findSportsTickets from '../lib/findSportsTickets';

import { ICollapsible } from '../components/collapsible/Collapsible';
import PurpleTag from '../components/PurpleTag';
import MainPage from '../components/MainPage';

const App: React.FC = () => {
  const [tagIsOpened, setTagIsOpened] = useState<boolean>(false);
  const [tickets, addTickets] = useState<ICollapsible[]>([]);
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
        addTickets,
        setHasLoadedOne,
        setHasLoadedAll
      );
    }, 2000); // make sure page loads before scraping
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <PurpleTag tagIsOpened={tagIsOpened} setTagIsOpened={setTagIsOpened} />;
      <MainPage
        tagIsOpened={tagIsOpened}
        setTagIsOpened={setTagIsOpened}
        teams={teams}
        tickets={tickets}
        hasLoadedOne={hasLoadedOne}
        hasLoadedAll={hasLoadedAll}
      />
    </div>
  );
};

const div = document.createElement('div');
document.body.appendChild(div);

const root = createRoot(div);
root.render(<App />);
