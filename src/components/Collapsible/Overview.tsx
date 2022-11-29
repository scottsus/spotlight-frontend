import React from 'react';

interface IOverview {
  section: string;
  row: string;
  price: number;
  quantity?: number;
}

const Overview: React.FC<IOverview> = ({ section, row, price, quantity }) => {
  return (
    <div style={overviewStyles}>
      <h1 style={h1Styles}>
        Section {section}, Row {row}
      </h1>
      <h2 style={h2Styles}>
        ${price}
        <p style={pStyles}> each</p>
      </h2>
    </div>
  );
};

const overviewStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const h1Styles: React.CSSProperties = {
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 400,
  color: '#27292A',
  margin: '0px 0px',
};

const h2Styles: React.CSSProperties = {
  fontFamily: 'Manrope',
  fontSize: '20px',
  fontWeight: 700,
  color: '#4B3BFF',
  margin: '0px 0px',
  display: 'inline',
};

const pStyles: React.CSSProperties = {
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 300,
  color: '#4B3BFF',
  margin: '0px 0px',
  display: 'inline',
};

export default Overview;
