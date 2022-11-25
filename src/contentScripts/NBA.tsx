import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './NBA.css';

import NBATeams from '../lib/teams';
import findSportsTickets from '../lib/findSportsTickets';

import PurpleTag from '../components/PurpleTag';
import XButton from '../components/XButton';
import Logo from '../components/Logo';
import Title from '../components/Title';
import Filters from '../components/Filters';
import MainList from '../components/MainList';
import { ICollapsible } from '../components/Collapsible/Collapsible';
import Skeletons from '../components/Skeletons';

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
  if (!tagIsOpened) {
    return (
      <PurpleTag tagIsOpened={tagIsOpened} setTagIsOpened={setTagIsOpened} />
    );
  } else {
    // TODO: Venue Data
    return (
      <div id='app'>
        <Logo />
        <XButton tagIsOpened={tagIsOpened} setTagIsOpened={setTagIsOpened} />
        <Title
          team1={teams.current[0]}
          team2={teams.current[1]}
          stadium='SoFi Stadium'
          city='Inglewood'
          state='CA'
          day='Sat'
          date='Nov 26'
          time='6:30pm'
        />
        <Filters />
        {isLoading ? <Skeletons /> : <MainList tickets={tickets} />}
      </div>
    );
  }
};

const div = document.createElement('div');
document.body.appendChild(div);

const root = createRoot(div);
root.render(<App />);
