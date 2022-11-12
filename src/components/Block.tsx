import React from 'react';
import Overview from './Overview';
import CheckoutButton from './CheckoutButton';

const Block = ({ logo, section, row, price }) => {
  return (
    <div style={blockStyle}>
      {/* arrow */}
      <img src={logo} alt='logo' />
      <Overview section={section} row={row} price={price} />
      <CheckoutButton />
    </div>
  );
};

const blockStyle = {
  border: '2px solid grey',
  borderRadius: '5px',
  display: 'flex',
};

const imgStyle = {
  height: '50px',
  width: '50px',
  style: 'inline',
};

export default Block;
