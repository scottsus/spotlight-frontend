import React from 'react';

interface ITotalPrice {
  totalPrice: number;
}

const TotalPrice: React.FC<ITotalPrice> = ({ totalPrice }) => {
  return (
    <div style={totalPriceStyles}>
      <h1 style={totalStyles}>Total</h1>
      <h1 style={priceStyles}>${totalPrice}</h1>
    </div>
  );
};

const totalPriceStyles: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  color: '#4B3BFF',
};

const totalStyles: React.CSSProperties = {
  width: '50%',
  textAlign: 'left',
  fontSize: '15px',
  fontWeight: 600,
};

const priceStyles: React.CSSProperties = {
  width: '50%',
  textAlign: 'right',
  fontSize: '15px',
  fontWeight: 600,
};

export default TotalPrice;
