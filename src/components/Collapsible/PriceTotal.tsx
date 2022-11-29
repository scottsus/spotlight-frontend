import React from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      style={priceTotalStyles}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key='pricetotal'
    >
      <h1 style={categoryHeaderStyles}>Tickets</h1>
      <ItemCost text={`Resale Ticket x ${ticketQty}`} cost={ticketPrice} />
      <h1 style={{ ...categoryHeaderStyles, marginTop: '12px' }}>Fees</h1>
      <ItemCost text={'Service'} cost={serviceFee} />
      <ItemCost text={'Order Processing Fee'} cost={orderProcessingFee} />
      <ItemCost text={'Calculated Tax'} cost={calculatedTax} />
      <div style={dividerStyles} />
      <TotalPrice totalPrice={ticketPrice * ticketQty} />
    </motion.div>
  );
};

const priceTotalStyles: React.CSSProperties = {
  height: '100%',
  width: '100%',
  padding: '16px 35px',
};

const categoryHeaderStyles: React.CSSProperties = {
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 700,
  color: '#27292A',
  margin: '2px 0px',
};

const dividerStyles: React.CSSProperties = {
  height: '2px',
  width: '98%',
  backgroundColor: '#27292A',
  borderRadius: '1px',
  margin: '14px auto 11px',
};

export default PriceTotal;
