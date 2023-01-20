import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import PriceTotal from './PriceTotalTab';
import TicketInfo from './TicketInfoTab';

interface IOpenTicketBlock {
  isOpen: boolean;
}

export default function OpenTicketBlock({ isOpen }: IOpenTicketBlock) {
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
          <Header isActive={!isPriceTotalPage}>Ticket Info</Header>
        </HeaderButton>
      </Headers>
      <AnimatePresence>
        {isPriceTotalPage ? (
          <PriceTotal
            ticketPrice={'250'}
            ticketQty={'2'}
            orderProcessingFee={'15'}
            serviceFee={'20.5'}
            calculatedTax={'2.25'}
          />
        ) : (
          <TicketInfo />
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
  border-radius: 2px;
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
