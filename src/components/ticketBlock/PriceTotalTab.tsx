import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TicketInfo from '../../lib/TicketInfo';
import ItemCost from './ItemCost';

interface IPriceTotalTab {
  ticketInfo: TicketInfo;
}

export default function PriceTotalTab({ ticketInfo }: IPriceTotalTab) {
  const calculatedTax = ticketInfo.priceInfo.totalPrice * 0.1;
  return (
    <PriceTotalDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key="PriceTotalDiv"
    >
      <CategoryHeader>Tickets</CategoryHeader>
      <ItemCost
        text={`Resale Ticket x ${ticketInfo.priceInfo.quantity}`}
        cost={
          (ticketInfo.priceInfo.totalPrice -
            ticketInfo.priceInfo.serviceFee -
            ticketInfo.priceInfo.deliveryFee -
            calculatedTax) /
          ticketInfo.priceInfo.quantity
        }
      />

      <CategoryHeader style={{ marginTop: '5px' }}>Fees</CategoryHeader>
      <ItemCost text="Service Fee" cost={ticketInfo.priceInfo.serviceFee} />
      <ItemCost text="Delivery Fee" cost={ticketInfo.priceInfo.deliveryFee} />
      <ItemCost text="Calculated Tax" cost={calculatedTax} />

      <Divider />
      <ItemCost
        text="Total"
        cost={ticketInfo.priceInfo.totalPrice}
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
  width: 98%;
  background-color: #dfe0e0;
  border-radius: 1px;
  margin: 12px auto 8px;
`;
