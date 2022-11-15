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

const overviewStyles = {
  display: 'inline',
  paddingTop: '30px',
};

const h1Styles = {
  fontSize: '17px',
  fontWeight: 500,
};

const h2Styles = {
  fontSize: '16px',
  color: '#5647FF',
};

export default Overview;
