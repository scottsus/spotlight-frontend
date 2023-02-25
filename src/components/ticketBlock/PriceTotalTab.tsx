import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TicketInfo from '../../lib/TicketInfo';
import ItemCost from './ItemCost';

interface IPriceTotalTab {
  ticket: TicketInfo;
}

export default function PriceTotalTab({ ticket }: IPriceTotalTab) {
  const calculatedTax = ticket.priceInfo.totalPrice * 0.1;
  const getFee = (ticket: TicketInfo, option: string) => {
    if (ticket.priceInfo.serviceFee == -1) return 'INCLUDED';
    if (option === 'service') return ticket.priceInfo.serviceFee;
    if (option === 'delivery') return ticket.priceInfo.deliveryFee;
    return '';
  };
  return (
    <PriceTotalDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key="PriceTotalDiv"
    >
      <CategoryHeader>Tickets</CategoryHeader>
      <ItemCost
        text={`Resale Ticket x ${ticket.priceInfo.quantity}`}
        cost={
          (ticket.priceInfo.totalPrice -
            ticket.priceInfo.serviceFee -
            ticket.priceInfo.deliveryFee -
            calculatedTax) /
          ticket.priceInfo.quantity
        }
      />

      <CategoryHeader style={{ marginTop: '5px' }}>Fees</CategoryHeader>
      <ItemCost text="Service Fee" cost={getFee(ticket, 'service') as number} />
      <ItemCost
        text="Delivery Fee"
        cost={getFee(ticket, 'delivery') as number}
      />
      <ItemCost text="Calculated Tax" cost={calculatedTax} />

      <Divider />
      <ItemCost
        text="Total"
        cost={ticket.priceInfo.totalPrice}
        color="#4b3bff"
        isBold
      />
    </PriceTotalDiv>
  );
}

const PriceTotalDiv = styled(motion.div)`
  padding: 5px 35px;
`;

const CategoryHeader = styled.h3`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 700;
  color: #27292a;
  margin: 2px 0;
`;

const Divider = styled.div`
  height: 2px;
  background-color: #dfe0e0;
  border-radius: 1px;
  margin: 12px auto 8px;
`;
