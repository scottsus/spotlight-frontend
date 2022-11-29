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
  marginTop: '16px',
};

const blackStyles: React.CSSProperties = {
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 700,
  color: '#27292A',
  margin: '4px 4px 4px 0px',
};

const purpleStyles: React.CSSProperties = {
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 300,
  color: '#4B3BFF',
  margin: '4px 0px',
};

export default BlackPurple;
