import React from 'react';

const Overview = ({ section, row, price }) => {
  return (
    <div style={overviewStyles}>
      <h1 style={h1Styles}>
        Section {section}, Row {row}
      </h1>
      <h2 style={h2Styles}>${price} each</h2>
    </div>
  );
};

const overviewStyles = {
  display: 'inline',
};

const h1Styles = {
  fontSize: '17px',
  marginBottom: '-3px',
};

const h2Styles = {
  fontSize: '16px',
  color: '#5647FF',
  marginTop: '-3px',
};

export default Overview;
