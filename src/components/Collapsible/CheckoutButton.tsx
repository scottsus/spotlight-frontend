import React from 'react';
import Hoverable from '../Hoverable';

interface ICheckoutButton {
  price: string;
  url: string;
}

const CheckoutButton: React.FC<ICheckoutButton> = ({ price, url }) => {
  return (
    <div>
      <Hoverable url={url}>
        <h1 style={h1Styles}>Buy for ${price}</h1>
      </Hoverable>
    </div>
  );
};

const h1Styles: React.CSSProperties = {
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 700,
  color: '#FFFFFF',
};

export default CheckoutButton;
