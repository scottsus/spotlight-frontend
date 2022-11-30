import React from 'react';
import { motion } from 'framer-motion';
import ItemCost from './ItemCost';
import TotalPrice from './TotalPrice';

interface IPriceTotalTab {
  ticketPrice: string;
  ticketQty: string;
  orderProcessingFee: string;
  serviceFee: string;
  calculatedTax: string;
}

const PriceTotalTab: React.FC<IPriceTotalTab> = ({
  ticketPrice,
  ticketQty,
  orderProcessingFee,
  serviceFee,
  calculatedTax,
}) => {
  return (
    <motion.div
      style={priceTotalTabStyles}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key='pricetotaltab'
    >
      <h1 style={categoryHeaderStyles}>Tickets</h1>
      <ItemCost
        text={`Resale Ticket x ${ticketQty}`}
        cost={parseFloat(ticketPrice)}
      />
      <h1 style={{ ...categoryHeaderStyles, marginTop: '12px' }}>Fees</h1>
      <ItemCost text={'Service'} cost={parseFloat(serviceFee)} />
      <ItemCost
        text={'Order Processing Fee'}
        cost={parseFloat(orderProcessingFee)}
      />
      <ItemCost text={'Calculated Tax'} cost={parseFloat(calculatedTax)} />
      <div style={dividerStyles} />
      <TotalPrice
        totalPrice={parseFloat(ticketPrice) * parseFloat(ticketQty)}
      />
    </motion.div>
  );
};

const priceTotalTabStyles: React.CSSProperties = {
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

export default PriceTotalTab;
