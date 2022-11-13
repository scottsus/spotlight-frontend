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
  height: '100px',
  width: '100%',
  display: 'flex',
  margin: '10px 0px',
};

const imgStyle = {
  height: '50px',
  width: '65px',
  style: 'inline',
};

export default Block;
