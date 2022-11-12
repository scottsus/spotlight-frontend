import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './contentScript.css';

const getData = async (res) => {
  const data = await res.json();
  console.log(data);
};

const App: React.FC<{}> = () => {
  const [foundCheaper, setFoundCheaper] = useState(false);
  const [res, setRes] = useState('');
  useEffect(() => {
    const s: string = document.body.innerText;

    if (s.includes('Los Angeles Lakers')) {
      setFoundCheaper((foundCheaper) => !foundCheaper);
      fetch('http://localhost:6969/find-cheaper-tickets', {
        headers: {
          name: 'Los Angeles Lakers vs Golden State Warriors',
          website: 'SeatGeek',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRes((res) => data.message);
          console.log(data);
        })
        .catch((err) => {
          console.log('ERROR');
          console.log(err);
        });

      console.log('Found the lakers!');
    }
  }, []);
  console.log('found?', foundCheaper);
  if (foundCheaper) {
    return (
      <div id='spotlight'>
        {/* <img id="image" src="icon.png" /> */}
        <h1>YO SPOTLIGHT!</h1>
        <h2>{res.toString()}</h2>
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
