import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './contentScript.css';
import myImage from '../static/sp.png';
import sg from './sp.png';
const sh = require('./sp.png');

import NBATeams from '../lib/teams';
import Logo from '../components/Logo';
import Title from '../components/Title';
import Filters from '../components/Filters';
import Block from '../components/Block';

const App = () => {
  console.log('APP');
  console.log(sg);
  console.log(sh);
  return (
    <div id='spotlight'>
      <h1>Image</h1>
      <img src='sp.png' alt='' />
      <h1>Image2</h1>
      <img src='spotlight.png' alt='' />
      <h1>Image3</h1>
      <img src='stubhub.png' alt='' />
    </div>
  );
};

// const App = () => {
//   const teamsList = [];
//   const [foundCheaper, setFoundCheaper] = useState(false);
//   const [msg, setMsg] = useState('');
//   const [url, setUrl] = useState('');
//   const data = [
//     { logo: png, section: 324, row: 7, price: 148 },
//     { logo: png, section: 324, row: 8, price: 149 },
//     { logo: png, section: 324, row: 9, price: 150 },
//     { logo: png, section: 324, row: 10, price: 151 },
//   ];
//   const blockItems = data.map((block) => (
//     <Block
//       logo={png}
//       section={block.section}
//       row={block.row}
//       price={block.price}
//     />
//   ));
//   // useEffect(() => {
//   //   const s: string = document.body.innerText;
//   //   for (const team of NBATeams) {
//   //     if (s.includes(team)) {
//   //       teamsList.push(team);
//   //       if (teamsList.length == 2) {
//   //         setFoundCheaper((foundCheaper) => true);
//   //         fetch('http://localhost:6969/find-tickets', {
//   //           headers: {
//   //             team1: teamsList[0],
//   //             team2: teamsList[1],
//   //           },
//   //         })
//   //           .then((res) => res.json())
//   //           .then((data) => {
//   //             setMsg((msg) => data.message);
//   //             setUrl((url) => data.url);
//   //           })
//   //           .catch((err) => {
//   //             console.log('Error:', err);
//   //           });
//   //         break;
//   //       }
//   //     }
//   //   }
//   // }, []);
//   if (true) {
//     return (
//       <div id='spotlight'>
//         <Logo />
//         <Title
//           team1='Los Angeles Lakers'
//           team2='Winnipeg Jets'
//           stadium='SoFi Stadium'
//           city='Inglewood'
//           state='CA'
//           day='Sat'
//           date='Nov 26'
//           time='6:30pm'
//         />
//         <Filters />
//         <img src={png} />
//         <div id='blocks'>{blockItems}</div>
//       </div>
//     );
//   }
//   return (
//     <div id='spotlight'>
//       <h1>Could not find cheaper tix 🙏🙏</h1>
//     </div>
//   );
// };

const div = document.createElement('div');
document.body.appendChild(div);

const root = createRoot(div);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
