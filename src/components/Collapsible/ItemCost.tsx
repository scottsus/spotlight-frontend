import React from 'react';

const ItemCost = ({ text, cost }) => {
  return (
    <div style={itemCostStyles}>
      <h1 style={itemStyles}>Item</h1>
      <h1 style={costStyles}>Cost</h1>
    </div>
  );
};

const itemCostStyles: React.CSSProperties = {
  width: '100%',
  display: 'flex',
};

const itemStyles: React.CSSProperties = {
  width: '50%',
  textAlign: 'left',
  paddingLeft: '10px',
};

const costStyles: React.CSSProperties = {
  width: '50%',
  textAlign: 'right',
  paddingRight: '10px',
};

export default ItemCost;
