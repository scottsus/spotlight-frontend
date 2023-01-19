import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TicketBlock from './TicketBlock';
import OpenTicketBlock from './OpenTicketBlock';

export interface IContainer {
  logo: string;
  section: string;
  row: string;
  price: string;
  quantity: string;
  url: string;
}

export default function Container({
  logo,
  section,
  row,
  price,
  quantity,
  url,
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
        section={section}
        row={row}
        price={price}
        quantity={quantity}
        url={url}
      />
      <OpenTicketBlock isOpen={childIsOpen} />
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
