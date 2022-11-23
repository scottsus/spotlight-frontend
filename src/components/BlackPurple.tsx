import React from 'react';

interface IBlackPurple {
  black: string;
  purple: string;
}

const BlackPurple: React.FC<IBlackPurple> = ({ black, purple }) => {
  return (
    <div style={blackPurpleStyles}>
      <h1 style={blackStyles}>{black}</h1>
      <h1 style={purpleStyles}>{purple}</h1>
    </div>
  );
};

const blackPurpleStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'start',
  marginTop: '8px',
};

const blackStyles: React.CSSProperties = {
  fontSize: '15px',
  color: 'black',
  fontWeight: 700,
  margin: '5px 4px 5px 0px',
};

const purpleStyles: React.CSSProperties = {
  fontSize: '15px',
  color: '#4B3BFF',
  fontWeight: 300,
  margin: '5px 0px',
};

export default BlackPurple;
