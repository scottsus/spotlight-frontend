import React from 'react';

interface ICheckoutButton {
  url: string;
}

const CheckoutButton: React.FC<ICheckoutButton> = ({ url }) => {
  return (
    <div style={checkoutButtonStyles}>
      <a href={url} target='_blank'>
        <h1 style={h1Styles}>Buy Now</h1>
      </a>
    </div>
  );
};

const checkoutButtonStyles: React.CSSProperties = {
  borderRadius: '10px',
  backgroundColor: '#4B3BFF',
  height: '45px',
  width: '120px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const h1Styles: React.CSSProperties = {
  color: '#FFFFFF',
  fontSize: '15px',
  fontWeight: '400',
};

export default CheckoutButton;
