import React from 'react';
import Hoverable from '../components/Hoverable';

interface ICheckoutButton {
  url: string;
}

const CheckoutButton: React.FC<ICheckoutButton> = ({ url }) => {
  return (
    <div>
      <Hoverable url={url}>
        <h1 style={h1Styles}>Buy Now</h1>
      </Hoverable>
    </div>
  );
};

const h1Styles: React.CSSProperties = {
  color: '#FFFFFF',
  fontSize: '15px',
  fontWeight: '500',
};

export default CheckoutButton;
