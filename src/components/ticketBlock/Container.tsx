import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TicketInfo from '../../lib/TicketInfo';
import TicketBlock from './TicketBlock';
import OpenTicketBlock from './OpenTicketBlock';

export interface IContainer {
  srcTicket: TicketInfo;
  destTicket: TicketInfo;
}

export default function Container({ srcTicket, destTicket }) {
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
        srcPrice={srcTicket.priceInfo.totalPrice}
        destTicket={destTicket}
      />
      <OpenTicketBlock
        isOpen={childIsOpen}
        srcTicket={srcTicket}
        destTicket={destTicket}
      />
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
