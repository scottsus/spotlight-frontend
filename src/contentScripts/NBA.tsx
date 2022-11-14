import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Triangle } from 'react-loader-spinner';
import './NBA.css';

import NBATeams from '../lib/teams';
import findSportsTickets from '../lib/findSportsTickets';

import Logo from '../components/Logo';
import Title from '../components/Title';
import Filters from '../components/Filters';
import MainList from '../components/MainList';
import { ICollapsible } from '../components/Collapsible';

const App: React.FC = () => {
  const [doneWaiting, setDoneWaiting] = useState<boolean>(false);
  const [data, addData] = useState<ICollapsible[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const teams = useRef<string[]>([]);
  const addTeam = (NBATeam) => {
    teams.current.push(NBATeam);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      findSportsTickets(
        document.body.innerText,
        NBATeams,
        teams,
        addTeam,
        data,
        addData,
        setLoader
      );
      setDoneWaiting(true);
    }, 1000); // make sure component renders before scraping
    return () => clearTimeout(timer);
  }, []);

  if (!doneWaiting) {
    // render nothing
  } else if (loader) {
    return (
      <div id='loader'>
        <Triangle height='80' width='80' color='#4B3BFF' ariaLabel='loading' />
        <h1 id='loaderh1'>Searching for better deals...</h1>;
      </div>
    );
  } else {
    // TODO: Venue Data
    return (
      <div id='app'>
        <Logo />
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
        <MainList data={data} />
      </div>
    );
  }
};

const div = document.createElement('div');
document.body.appendChild(div);

const root = createRoot(div);
root.render(<App />);
