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
      <hr style={hrStyles} />
      <div style={headersStyles}>
        <h1 style={activeHeaderStyles}>Price Total</h1>
        <h1 style={inactiveHeaderStyles}>Ticket Info</h1>
      </div>
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
  // backgroundColor: 'blue',
  height: '100%',
  width: '100%',
  // marginTop: '10px',
  padding: '10px 10px',
  fontSize: '15px',
};

const hrStyles = {
  borderTop: '1px solid #DFE0E0',
};

const headersStyles = {
  display: 'flex',
  justifyContent: 'space-evenly',
  margin: '10px 0px',
  fontSize: '18px',
  fontWeight: 500,
};

const activeHeaderStyles = {
  color: '#4B3BFF',
  fontSize: '15px',
};

const inactiveHeaderStyles = {
  color: '#96979C',
  fontSize: '15px',
};

const categoryHeaderStyles = {
  color: '#000000',
  margin: '2px 0px',
  fontSize: '17px',
  fontWeight: 600,
};

export default PriceTotal;
