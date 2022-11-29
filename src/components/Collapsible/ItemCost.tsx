import React from 'react';

const ItemCost = ({ text, cost }) => {
  return (
    <div style={itemCostStyles}>
      <h1 style={{ ...itemStyles, ...{ textAlign: 'left' } }}>{text}</h1>
      <h1 style={{ ...itemStyles, ...{ textAlign: 'right' } }}>${cost}</h1>
    </div>
  );
};

const itemCostStyles: React.CSSProperties = {
  width: '100%',
  display: 'flex',
};

const itemStyles: React.CSSProperties = {
  width: '50%',
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 300,
  color: '#5F5F5F',
  margin: '2px 0px',
};

export default ItemCost;
