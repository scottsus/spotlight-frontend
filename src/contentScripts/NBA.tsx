import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import NBATeams from '../lib/teams';
import Logo from '../components/Logo';
import Title from '../components/Title';
import Filters from '../components/Filters';
import Block from '../components/Block';

interface IBlockItem {
  name: string;
  seats: string;
  price: number;
  url: string;
}

const App = () => {
  const teamsList = [];
  const [foundCheaper, setFoundCheaper] = useState(false);
  const [data, addData] = useState([]);
  useEffect(() => {
    const s: string = document.body.innerText;
    for (const team of NBATeams) {
      if (s.includes(team)) {
        teamsList.push(team);
        if (teamsList.length == 2) {
          setFoundCheaper((foundCheaper) => true);
          fetch('http://localhost:6969/find-tickets', {
            headers: {
              team1: teamsList[0],
              team2: teamsList[1],
            },
          })
            .then((res) => res.json())
            .then((dataArray) => {
              for (const [_, item] of dataArray.entries()) {
                const newData = {
                  name: item['name'],
                  seats: item['seats'],
                  price: item['price'],
                  url: item['url'],
                };
                addData((data) => [...data, newData]);
              }
            })
            .catch((err) => {
              console.log('Error:', err);
            });
          break;
        }
      }
    }
  }, []);
  const blockItems = data.map((block) => (
    <Block
      logo={chrome.runtime.getURL(`${block.name}.png`)}
      seats={block.seats}
      price={block.price}
      url={block.url}
    />
  ));
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
