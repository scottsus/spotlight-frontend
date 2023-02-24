import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import TicketInfo from '../../lib/TicketInfo';
import { getProperSiteName } from '../../lib/sitenames';
import { seatNumberToAlphabet } from '../../lib/seatConversion';

interface IComparisonTab {
  srcTicket: TicketInfo;
  destTicket: TicketInfo;
}

export default function ComparisonTab({
  srcTicket,
  destTicket,
}: IComparisonTab) {
  return (
    <ComparisonDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key="ComparisonTab"
    >
      <TicketBox ticket={srcTicket} name={srcTicket.site} />
      <TicketBox ticket={destTicket} name="spotlight" />
    </ComparisonDiv>
  );
}

const ComparisonDiv = styled(motion.div)`
  height: 200px;
  padding: 5px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface ITicketBox {
  ticket: TicketInfo;
  name: string;
}

function TicketBox({ ticket, name }: ITicketBox) {
  return (
    <TicketBoxDiv>
      <TitleText isSpotlight={name === 'spotlight'}>
        {getProperSiteName(name)}
      </TitleText>
      <KeyVal myKey="Section:" value={ticket.seatInfo.section} />
      <KeyVal myKey="Row:" value={seatNumberToAlphabet(ticket.seatInfo.row)} />
      <Divider />
      <KeyVal
        myKey="Total Price:"
        value={`$${ticket.priceInfo.totalPrice.toString()}`}
      />
    </TicketBoxDiv>
  );
}

const TicketBoxDiv = styled.div`
  width: 48%;
  border: 2px solid #dfe0e0;
  border-radius: 10px;
  padding: 7.5px 30px;
`;

const TitleText = styled.h1<{ isSpotlight: boolean }>`
  font-size: 20px;
  font-family: Manrope;
  font-weight: 700;
  color: ${(props) => (props.isSpotlight ? '#4b3bff' : '#27292a')};
  text-align: center;
  margin: 0 0 20px 0;
`;

interface IKeyVal {
  myKey: string;
  value: string;
}

function KeyVal({ myKey, value }: IKeyVal) {
  return (
    <KeyValDiv>
      <Item textAlign="left" color="#27292a" width={60}>
        {myKey}
      </Item>
      <Item textAlign="right" color="#27292a" width={40}>
        {value}
      </Item>
    </KeyValDiv>
  );
}

const KeyValDiv = styled.div`
  display: flex;
`;

interface IItem {
  textAlign: string;
  width: number;
  color: string;
  isBold?: boolean;
}

const Item = styled.p<IItem>`
  font-size: 16px;
  font-family: Manrope;
  font-weight: ${(props) => (props.isBold ? 700 : 300)};
  color: ${(props) => props.color};
  margin: 2px 0;
  width: ${(props) => props.width}%;
  text-align: ${(props) => props.textAlign};
`;

const Divider = styled.div`
  height: 2px;
  width: 98%;
  background-color: #dfe0e0;
  border-radius: 2px;
  margin: 12px auto 8px;
`;
