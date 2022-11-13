import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import NBATeams from '../lib/teams';
import Logo from '../components/Logo';
import Title from '../components/Title';
import Filters from '../components/Filters';
import Block from '../components/Block';

const App = () => {
  const teamsList = [];
  const [foundCheaper, setFoundCheaper] = useState(false);
  const [msg, setMsg] = useState('');
  const [url, setUrl] = useState('');
  const data = [
    {
      logo: chrome.runtime.getURL('seatgeek.png'),
      section: 324,
      row: 7,
      price: 148,
    },
    {
      logo: chrome.runtime.getURL('ticketmaster.png'),
      section: 324,
      row: 8,
      price: 149,
    },
    {
      logo: chrome.runtime.getURL('tickpick.png'),
      section: 324,
      row: 9,
      price: 150,
    },
    {
      logo: chrome.runtime.getURL('stubhub.png'),
      section: 324,
      row: 10,
      price: 151,
    },
  ];
  const blockItems = data.map((block) => (
    <Block
      logo={block.logo}
      section={block.section}
      row={block.row}
      price={block.price}
    />
  ));
  // useEffect(() => {
  //   const s: string = document.body.innerText;
  //   for (const team of NBATeams) {
  //     if (s.includes(team)) {
  //       teamsList.push(team);
  //       if (teamsList.length == 2) {
  //         setFoundCheaper((foundCheaper) => true);
  //         fetch('http://localhost:6969/find-tickets', {
  //           headers: {
  //             team1: teamsList[0],
  //             team2: teamsList[1],
  //           },
  //         })
  //           .then((res) => res.json())
  //           .then((data) => {
  //             setMsg((msg) => data.message);
  //             setUrl((url) => data.url);
  //           })
  //           .catch((err) => {
  //             console.log('Error:', err);
  //           });
  //         break;
  //       }
  //     }
  //   }
  // }, []);
  if (true) {
    return (
      <div style={appStyles}>
        <Logo />
        <Title
          team1='Los Angeles Lakers'
          team2='Winnipeg Jets'
          stadium='SoFi Stadium'
          city='Inglewood'
          state='CA'
          day='Sat'
          date='Nov 26'
          time='6:30pm'
        />
        <Filters />
        <div id='blocks'>{blockItems}</div>
      </div>
    );
  }
  return (
    <div id='spotlight'>
      <h1>Could not find cheaper tix 🙏🙏</h1>
    </div>
  );
};

const appStyles = {
  backgroundColor: '#FFFFFF',
  color: 'black',
  position: 'absolute',
  left: '53%',
  top: '1%',
  width: '500px',
  height: '650px',
  zIndex: '1000',
  borderRadius: '10px',
  padding: '20px',
} as React.CSSProperties;

const div = document.createElement('div');
document.body.appendChild(div);

const root = createRoot(div);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
