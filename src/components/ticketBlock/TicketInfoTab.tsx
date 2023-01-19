import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ITicketInfoTab {}

export default function TicketInfoTab({}: ITicketInfoTab) {
  return (
    <TicketInfoDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key="TicketInfoTab"
    >
      <CategoryHeader>Tickets Available</CategoryHeader>
      <Text>1 - 3 Resale Tickets</Text>

      <CategoryHeader>Electronic Tickets</CategoryHeader>
      <Text>E-tickets delivered to your email address</Text>

      <CategoryHeader>Notes from Seller</CategoryHeader>
      <Text>XFER</Text>

      <CategoryHeader>Buyer Guarantee</CategoryHeader>
      <Text>🚀🚀</Text>
    </TicketInfoDiv>
  );
}

const TicketInfoDiv = styled(motion.div)`
  padding: 5px 35px;
  overflow-y: scroll;
`;

const CategoryHeader = styled.h3`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 700;
  color: #27292a;
  margin: 2px 0;
`;

const Text = styled.p`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 300;
  color: #5f5f5f;
  margin: 2.5px 0 10px;
`;
