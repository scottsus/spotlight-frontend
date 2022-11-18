import React from 'react';

interface IOverview {
  section: string;
  row: string;
  price: number;
}

const Overview: React.FC<IOverview> = ({ section, row, price }) => {
  return (
    <div style={overviewStyles}>
      <h1 style={h1Styles}>
        Section {section}, Row {row}
      </h1>
      <h2 style={h2Styles}>${price} total</h2>
    </div>
  );
};

const overviewStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const h1Styles: React.CSSProperties = {
  fontSize: '17px',
  fontWeight: 500,
  margin: '0px 0px',
};

const h2Styles: React.CSSProperties = {
  fontSize: '16px',
  color: '#5647FF',
  margin: '0px 0px',
};

export default Overview;
