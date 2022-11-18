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
      <h1>Price Total | Ticket Info</h1>
      <h1>Tickets</h1>
      <ItemCost text={`Resale Ticket x ${ticketQty}`} cost={ticketPrice} />
      <h1>Fees</h1>
      <ItemCost text={'Service'} cost={serviceFee} />
      <ItemCost text={'Order Processing Fee'} cost={orderProcessingFee} />
      <ItemCost text={'Calculated Tax'} cost={calculatedTax} />
      <hr />
      <TotalPrice totalPrice={ticketPrice * ticketQty} />
    </div>
  );
};

const priceTotalStyles: React.CSSProperties = {
  backgroundColor: 'blue',
};

export default PriceTotal;
