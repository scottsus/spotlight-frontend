import React from 'react';
import styled from 'styled-components';
import TicketInfo from '../../lib/types/ticketInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/fontawesome-free-solid';

interface ITicketBlock {
  isOpen: boolean;
  toggle: () => void;
  srcPrice: number;
  destTicket: TicketInfo;
}

export default function TicketBlock({
  isOpen,
  toggle,
  srcPrice,
  destTicket,
}: ITicketBlock) {
  const down = faChevronDown as IconProp;
  return (
    <TicketBlockDiv onClick={toggle}>
      <ArrowButton>
        <FontAwesomeIcon
          icon={down}
          className={isOpen ? 'fa-chevron-down open' : 'fa-chevron-down'}
        />
      </ArrowButton>
      <Logo
        src={chrome.runtime.getURL(`imgs/${destTicket.site}.svg`)}
        alt="Website Logo"
      />
      <Overview
        section={destTicket.seatInfo.section}
        row={destTicket.seatInfo.row}
        srcPrice={srcPrice}
        destPrice={destTicket.priceInfo.totalPrice}
        quantity={destTicket.quantity}
      />
      <CheckoutButton
        price={destTicket.priceInfo.totalPrice}
        url={destTicket.url}
      />
    </TicketBlockDiv>
  );
}

const TicketBlockDiv = styled.div`
  height: 85px;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #ebe9ff;
  }
`;

const ArrowButton = styled.button`
  height: 16px;
  width: 14px;
  margin: 0 20px 0 20px;
  padding: 0;
  border: none;
  background-color: transparent;
  color: #4b3bff;

  .fa-chevron-down {
    transform: rotate(0deg);
    transition: transform 0.6s ease;
  }

  .fa-chevron-down.open {
    transform: rotate(-180deg);
    transition: transform 0.6s ease;
  }
`;

const Logo = styled.img`
  height: 70px;
  width: 85px;
  margin: 0 17.5px 0 0;
  display: inline;
`;

interface IOverview {
  section: string;
  row: string;
  srcPrice: number;
  destPrice: number;
  quantity: number;
}

function Overview({ section, row, srcPrice, destPrice, quantity }: IOverview) {
  const savings = srcPrice - destPrice;
  const singlePrice = destPrice / quantity;
  return (
    <OverviewDiv>
      <Text color="#27292a" size="16px" weight={400}>
        Section {section}, Row {row}
      </Text>
      {savings > 0 ? (
        <Text color="#42d988" size="18px" weight={700}>
          ${Math.round(savings)}{' '}
          <span style={{ fontSize: '16px', fontWeight: 400, color: '#73757a' }}>
            saved
          </span>
        </Text>
      ) : (
        <Text color="#4b3bff" size="18px" weight={700}>
          ${Math.round(singlePrice)}{' '}
          <p style={{ display: 'inline', fontWeight: 500 }}>each</p>
        </Text>
      )}
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

interface ICheckoutButton {
  price: number;
  url: string;
}

function CheckoutButton({ price, url }: ICheckoutButton) {
  return (
    <CheckoutAnchor href={url} target="_blank">
      <Button>
        <ButtonText>Buy for ${Math.round(price)}</ButtonText>
      </Button>
    </CheckoutAnchor>
  );
}

const CheckoutAnchor = styled.a`
  margin: 0 22.5px 0 auto;
`;

const Button = styled.button`
  height: 48px;
  width: 160px;
  background-color: #4b3bff;
  border: 1.5px solid #dfe0e0;
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
