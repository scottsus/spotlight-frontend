console.log('before imports');
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './contentScript.css';

import NBATeams from '../lib/teams';

console.log('Content script!');

const App: React.FC<{}> = () => {
  const teamsList = [];
  const [foundTeams, setFoundTeams] = useState(0);
  const [foundCheaper, setFoundCheaper] = useState(false);
  const [props, setProps] = useState('');
  useEffect(() => {
    console.log('content!');
    const s: string = document.body.innerText;
    for (const team of NBATeams) {
      if (s.includes(team)) {
        teamsList.push(team);
        setFoundTeams((foundTeams) => foundTeams + 1);
        if (foundTeams == 2) {
          setFoundCheaper((foundCheaper) => true);
          fetch('http://localhost:6969/find-tickets', {
            headers: {
              team1: teamsList[0],
              team2: teamsList[1],
            },
          })
            .then((res) => res.json())
            .then((data) => setProps((props) => data.message))
            .catch((err) => {
              console.log('Error:', err);
              return;
            });
        }
      }
    }
  }, []);
  if (foundCheaper) {
    return (
      <div id='spotlight'>
        <h1>YO SPOTLIGHT!</h1>
        <h2>{props.toString()}</h2>
      </div>
    );
  }
  return (
    <div id='spotlight'>
      <h1>Could not find cheaper tix 🙏🙏</h1>
    </div>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);

console.log('rendered popup!');
