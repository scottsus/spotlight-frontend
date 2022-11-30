import React from 'react';
import stateToAbbreviation from '../lib/stateToAbbreviation';

interface ITitle {
  team1: string;
  team2: string;
  stadium?: string;
  city?: string;
  state?: string;
  day?: string;
  date?: string;
  time?: string;
}

const Title: React.FC<ITitle> = ({
  team1,
  team2,
  stadium,
  city,
  state,
  day,
  date,
  time,
}) => {
  return (
    <div style={titleStyles}>
      <h2 style={h2Styles}>
        {team1} vs {team2}
      </h2>
      <h3 style={h3Styles}>
        {stadium} • {city}, {stateToAbbreviation(state)} • {day}, {date} at{' '}
        {time}
      </h3>
      <div style={dividerStyles} />
    </div>
  );
};

const titleStyles: React.CSSProperties = {
  height: '70px',
  width: '100%',
  paddingTop: '15px',
  margin: '0px 0px 30px 0px',
};

const h2Styles: React.CSSProperties = {
  font: 'Helvetica',
  fontSize: '20px',
  fontWeight: 600,
  margin: '5px 0px 0px 0px',
};

const h3Styles: React.CSSProperties = {
  font: 'Helvetica',
  fontSize: '16px',
  fontWeight: 300,
  margin: '0px 0px 20px 0px',
};

const dividerStyles: React.CSSProperties = {
  height: '2px',
  width: '100%',
  backgroundColor: '#DFE0E0',
};

export default Title;
