import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronUp,
  faChevronDown,
} from '@fortawesome/fontawesome-free-solid';

interface TicketInfo {}

interface ITicketBlock {
  isOpen: boolean;
  toggle: () => void;
  logo: string;
  section: string;
  row: string;
  price: string;
  quantity: string;
  url: string;
}

export default function TicketBlock({
  isOpen,
  toggle,
  logo,
  section,
  row,
  price,
  quantity,
  url,
}: ITicketBlock) {
  const down = faChevronDown as IconProp;
  const up = faChevronUp as IconProp;
  return (
    <TicketBlockDiv>
      <ArrowButton onClick={toggle}>
        <FontAwesomeIcon icon={isOpen ? up : down} />
      </ArrowButton>
      <Logo src={logo} alt="Website Logo" />
      <Overview section={section} row={row} price={price} quantity={quantity} />
      <CheckoutButton price={price} url={url} />
    </TicketBlockDiv>
  );
}

const TicketBlockDiv = styled.div`
  height: 85px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  :hover {
    background-color: #ebe9ff;
  }
`;

const ArrowButton = styled.button`
  height: 16px;
  width: 14px;
  padding: 0;
  background-color: transparent;
  color: #4b3bff;
`;

const Logo = styled.img`
  height: 70px;
  width: 85px;
  display: inline;
`;

interface ICheckoutButton {
  price: string;
  url: string;
}

interface IOverview {
  section: string;
  row: string;
  price: string;
  quantity: string;
}

function Overview({ section, row, price, quantity }: IOverview) {
  const singlePrice = parseFloat(price) / parseFloat(quantity);
  return (
    <OverviewDiv>
      <Text color="#27292a" size="16px" weight={400}>
        Section {section}, Row {row}
      </Text>
      <Text color="#4b3bff" size="18px" weight={700}>
        ${singlePrice} <p style={{ display: 'inline' }}>each</p>
      </Text>
    </OverviewDiv>
  );
}

const OverviewDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IText {
  color: string;
  size: string;
  weight: number;
}

const Text = styled.h3<IText>`
  display: inline;
  font-size: ${(props) => props.size};
  font-family: Manrope;
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  margin: 0;
`;

function CheckoutButton({ price, url }: ICheckoutButton) {
  return (
    <a href={url} target="_blank">
      <Button>
        <ButtonText>Buy for ${price}</ButtonText>
      </Button>
    </a>
  );
}

const Button = styled.button`
  height: 48px;
  width: 160px;
  background-color: #4b3bff;
  border-radius: 8px;
  :hover {
    background-color: #695cff;
  }
`;

const ButtonText = styled.h2`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 700px;
  color: #ffffff;
  margin: 0;
`;
