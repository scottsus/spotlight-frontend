import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TicketInfo, { SeatInfo, PriceInfo } from '../../lib/TicketInfo';
import TicketBlock from './TicketBlock';
import OpenTicketBlock from './OpenTicketBlock';

export interface IContainer {
  logo: string;
  quantity: string;
  seatInfo: SeatInfo;
  priceInfo: PriceInfo;
  url: string;
  srcTicket: TicketInfo;
}

export default function Container({
  logo,
  quantity,
  seatInfo,
  priceInfo,
  url,
  srcTicket,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [childIsOpen, setChildIsOpen] = useState(false);
  const [height, setHeight] = useState(85);
  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  useEffect(() => {
    if (isOpen) {
      setChildIsOpen(true);
      setHeight(355);
    } else {
      setChildIsOpen(false);
      setHeight(85);
    }
  }, [isOpen]);

  return (
    <ContainerDiv height={height}>
      <TicketBlock
        isOpen={isOpen}
        toggle={toggle}
        logo={logo}
        section={seatInfo.section}
        row={seatInfo.row}
        srcPrice={srcTicket.priceInfo.totalPrice}
        destPrice={priceInfo.totalPrice}
        quantity={quantity}
        url={url}
      />
      <OpenTicketBlock isOpen={childIsOpen} priceInfo={priceInfo} />
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
  border: 2px solid #dfe0e0;
  border-radius: 10px;
  margin: 7px auto;
  transition: height 0.2s ease-in-out;
  overflow: hidden;
`;
