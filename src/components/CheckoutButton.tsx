import React from 'react';

const CheckoutButton = () => {
  return (
    <div style={checkoutButtonStyles}>
      <h1>Buy Now</h1>
    </div>
  );
};

const checkoutButtonStyles: React.CSSProperties = {
  marginTop: '25px',
  marginLeft: '10px',
  borderRadius: '10px',
  backgroundColor: '#4B3BFF',
  height: '45px',
  width: '120px',
  color: '#FFFFFF',
  fontSize: '15px',
  fontWeight: '400',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default CheckoutButton;
