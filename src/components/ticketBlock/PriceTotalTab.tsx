import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ItemCost from './ItemCost';

interface IPriceTotalTab {
  totalPrice: number;
  ticketQty: number;
  serviceFee: number;
  deliveryFee: number;
}

export default function PriceTotalTab({
  totalPrice,
  ticketQty,
  serviceFee,
  deliveryFee,
}: IPriceTotalTab) {
  const calculatedTax = totalPrice * 0.1;
  return (
    <PriceTotalDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key="PriceTotalDiv"
    >
      <CategoryHeader>Tickets</CategoryHeader>
      <ItemCost
        text={`Resale Ticket x ${ticketQty}`}
        cost={
          (totalPrice - serviceFee - deliveryFee - calculatedTax) / ticketQty
        }
      />

      <CategoryHeader style={{ marginTop: '5px' }}>Fees</CategoryHeader>
      <ItemCost text="Service Fee" cost={serviceFee} />
      <ItemCost text="Delivery Fee" cost={deliveryFee} />
      <ItemCost text="Calculated Tax" cost={calculatedTax} />

      <Divider />
      <ItemCost text="Total" cost={totalPrice} color="#4b3bff" isBold />
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
