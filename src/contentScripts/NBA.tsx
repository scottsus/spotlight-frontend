import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Triangle } from 'react-loader-spinner';

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

const App: React.FC = () => {
  const [data, addData] = useState<IBlockItem[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const teams = useRef<string[]>([]);
  const addTeam = (NBATeam) => {
    teams.current.push(NBATeam);
  };
  const blockItems = data.map((block) => (
    <Block
      logo={chrome.runtime.getURL(`${block.name}.png`)}
      seats={block.seats}
      price={block.price}
      url={block.url}
    />
  ));

  useEffect(() => {
    const fullDocumentText: string = document.body.innerText;
    const truncatedDocText: string = fullDocumentText.substring(0, 200);
    console.log(truncatedDocText);
    for (const NBATeam of NBATeams) {
      if (truncatedDocText.includes(NBATeam)) {
        console.log(NBATeam);
        addTeam(NBATeam);
        // addTeams((teams) => [...teams, NBATeam]);
        if (teams.current.length == 2) {
          fetch('http://localhost:6969/find-sports-tickets', {
            headers: {
              team1: teams.current[0],
              team2: teams.current[1],
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
              setLoader(false);
            })
            .catch((err) => {
              console.log('Error:', err);
            });
          break;
        }
      }
    }
  }, []);

  if (loader) {
    return (
      <div style={loaderStyles}>
        <Triangle height='80' width='80' color='#4B3BFF' ariaLabel='loading' />
        <h1 style={h1Styles}>Searching for better deals...</h1>;
      </div>
    );
  }
  // TODO: Venue Data
  return (
    <div style={appStyles}>
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
      <div id='blocks'>{blockItems}</div>
    </div>
  );
};

const loaderStyles: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  position: 'absolute',
  left: '70%',
  top: '1%',
  width: '300px',
  height: '100px',
  zIndex: '1000',
  borderRadius: '10px',
  paddingLeft: '10px',
  display: 'flex',
  alignItems: 'center',
};

const h1Styles: React.CSSProperties = {
  color: '#4B3BFF',
  fontSize: '20px',
  fontWeight: 400,
};

const appStyles: React.CSSProperties = {
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
};

const div = document.createElement('div');
document.body.appendChild(div);

const root = createRoot(div);
root.render(<App />);
