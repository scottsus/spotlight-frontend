import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import PriceTotal from './PriceTotalTab';
import PriceComparisonTab from './TicketComparisonTab';
import TicketInfo from '../../lib/types/ticketInfo';

interface IOpenTicketBlock {
  isOpen: boolean;
  srcTicket: TicketInfo;
  destTicket: TicketInfo;
}

export default function OpenTicketBlock({
  isOpen,
  srcTicket,
  destTicket,
}: IOpenTicketBlock) {
  const [height, setHeight] = useState(0);
  const [openOverflow, setOpenOverflow] = useState('hidden');
  const [isPriceTotalPage, setIsPriceTotalPage] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setHeight(275);
      setOpenOverflow('visible');
    } else {
      setHeight(0);
      setOpenOverflow('hidden');
    }
  }, [isOpen]);

  return (
    <OpenTicketBlockDiv height={height} overflow={openOverflow}>
      <Divider />
      <PurpleBar isOnLeft={isPriceTotalPage} />
      <Headers>
        <HeaderButton onClick={() => setIsPriceTotalPage(true)}>
          <Header isActive={isPriceTotalPage}>Price Total</Header>
        </HeaderButton>
        <HeaderButton onClick={() => setIsPriceTotalPage(false)}>
          <Header isActive={!isPriceTotalPage}>Ticket Comparison</Header>
        </HeaderButton>
      </Headers>
      <AnimatePresence>
        {isPriceTotalPage ? (
          <PriceTotal ticket={destTicket} />
        ) : (
          <PriceComparisonTab srcTicket={srcTicket} destTicket={destTicket} />
        )}
      </AnimatePresence>
    </OpenTicketBlockDiv>
  );
}

interface IOpenTicketBlockDiv {
  height: string;
  overflow: string;
}

const OpenTicketBlockDiv = styled.div<IOpenTicketBlockDiv>`
  position: static;
  height: ${(props) => props.height};
  overflow: ${(props) => props.overflow};
  transition: height 0.2s ease-in-out;
`;

const Divider = styled.div`
  height: 2px;
  background-color: #dfe0e0;
`;

const PurpleBar = styled.div<{ isOnLeft: boolean }>`
  width: 253px;
  height: 4px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #4b3bff;
  margin-left: ${(props) => (props.isOnLeft ? '0' : '253px')};
  transition: margin-left 0.2s ease-in-out;
`;

const Headers = styled.div`
  height: 28px;
  display: flex;
  justify-content: space-evenly;
  margin: 5px 0;
`;

const Header = styled.h2<{ isActive: boolean }>`
  font-size: 16px;
  font-family: Manrope;
  font-weight: ${(props) => (props.isActive ? 600 : 300)};
  color: ${(props) => (props.isActive ? '#4b3bff' : '#96979c')};
  margin: 0;
  :hover {
    color: #695cff;
  }
`;

const HeaderButton = styled.button`
  width: 50%;
`;
