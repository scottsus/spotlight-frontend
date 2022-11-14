import React from 'react';
import Overview from './Overview';
import CheckoutButton from './CheckoutButton';

export interface IBlock {
  logo: string;
  seats: string;
  price: number;
  url: string;
}

const Block: React.FC<IBlock> = ({ logo, seats, price, url }) => {
  return (
    <div style={blockStyle}>
      {/* arrow */}
      <img src={logo} alt='logo' />
      <Overview seats={seats} price={price} />
      <CheckoutButton url={url} />
    </div>
  );
};

const blockStyle: React.CSSProperties = {
  border: '2px solid grey',
  borderRadius: '5px',
  height: '100px',
  width: '100%',
  display: 'flex',
  margin: '10px 0px',
};

const imgStyle: React.CSSProperties = {
  height: '50px',
  width: '65px',
  display: 'inline',
};

export default Block;
