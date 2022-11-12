import React from 'react';

const Overview = ({ section, row, price }) => {
  return (
    <div style={overviewStyles}>
      <h1 style={h1Styles}>
        Section {section}, Row {row}
      </h1>
      <h2 style={h2Styles}>{price} each</h2>
    </div>
  );
};

const overviewStyles = {
  display: 'inline',
};

const h1Styles = {
  fontSize: '15px',
};

const h2Styles = {
  fontSize: '15px',
  color: '#5647FF',
};

export default Overview;
