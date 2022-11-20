import React from 'react';
import ItemCost from './ItemCost';
import TotalPrice from './TotalPrice';

interface IPriceTotal {
  ticketPrice: number;
  ticketQty: number;
  orderProcessingFee: number;
  serviceFee: number;
  calculatedTax: number;
}

const PriceTotal: React.FC<IPriceTotal> = ({
  ticketPrice,
  ticketQty,
  orderProcessingFee,
  serviceFee,
  calculatedTax,
}) => {
  return (
    <div style={priceTotalStyles}>
      <h1 style={categoryHeaderStyles}>Tickets</h1>
      <ItemCost text={`Resale Ticket x ${ticketQty}`} cost={ticketPrice} />
      <h1 style={{ ...categoryHeaderStyles, marginTop: '8px' }}>Fees</h1>
      <ItemCost text={'Service'} cost={serviceFee} />
      <ItemCost text={'Order Processing Fee'} cost={orderProcessingFee} />
      <ItemCost text={'Calculated Tax'} cost={calculatedTax} />
      <hr />
      <TotalPrice totalPrice={ticketPrice * ticketQty} />
    </div>
  );
};

const priceTotalStyles: React.CSSProperties = {
  height: '100%',
  width: '100%',
  padding: '0px 10px',
  fontSize: '15px',
};

const categoryHeaderStyles: React.CSSProperties = {
  color: '#000000',
  margin: '2px 0px',
  fontSize: '17px',
  fontWeight: 600,
};

export default PriceTotal;
