import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TicketInfo from '../../../lib/types/ticketInfo';
import Divider from '../../general/Divider';

interface IComparisonTab {
  srcTicket: TicketInfo;
  destTicket: TicketInfo;
}

export default function ComparisonTab({
  srcTicket,
  destTicket,
}: IComparisonTab) {
  return (
    // TODO: SRC AND DEST TICKET
    <ComparisonDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key="ComparisonTab"
    >
      <ComparisonTable>
        <HeaderRow>
          <HeaderCell align="left">Website</HeaderCell>
          <HeaderCell align="right">Section</HeaderCell>
          <HeaderCell align="right">Row</HeaderCell>
          <HeaderCell align="right">Price</HeaderCell>
        </HeaderRow>
        <ItemRow>
          <ItemCell align="left">Ticketmaster</ItemCell>
          <ItemCell align="right">106</ItemCell>
          <ItemCell align="right">17</ItemCell>
          <ItemCell align="right">$430.99</ItemCell>
        </ItemRow>
        <ItemRow>
          <ItemCell align="left">
            <SpotlightChoice>
              SeatGeek
              <SmallIcon
                src={chrome.runtime.getURL(`imgs/small-icon.svg`)}
                className="smallIcon"
              />
            </SpotlightChoice>
          </ItemCell>
          <ItemCell align="right">106</ItemCell>
          <ItemCell align="right">12</ItemCell>
          <ItemCell align="right">$324.99</ItemCell>
        </ItemRow>
      </ComparisonTable>
      <Divider margin="0" />
      <KeyVal myKey="Savings" value="$106.00" />
    </ComparisonDiv>
  );
}

const ComparisonDiv = styled(motion.div)`
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ComparisonTable = styled.table`
  width: 400px;
  height: 115px;
  border: none;
  margin: 15px auto 0;
`;

const HeaderRow = styled.tr``;

const HeaderCell = styled.th<{ align: string }>`
  height: 50px;
  font-size: 16px;
  font-family: Manrope;
  font-weight: 600;
  text-align: ${(props) => props.align};
  color: #27292a;
`;

const ItemRow = styled.tr`
  height: 24px;
  :hover {
    smallIcon {
      scale: 1.1;
      transition: scale 0.5s ease-in-out;
    }
  }
`;

const ItemCell = styled.td<{ align: string }>`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 300;
  text-align: ${(props) => props.align};
  color: #5f5f5f;
`;

const SpotlightChoice = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #4b3bff;
`;

const SmallIcon = styled.img`
  width: 22px;
  height: 22px;
  margin: 0 0 0 5px;
`;

interface IKeyVal {
  myKey: string;
  value: string;
}

function KeyVal({ myKey, value }: IKeyVal) {
  return (
    <KeyValDiv>
      <Item textAlign="left" color="#4b3bff" width={60} isBold>
        {myKey}
      </Item>
      <Item textAlign="right" color="#4b3bff" width={40} isBold>
        {value}
      </Item>
    </KeyValDiv>
  );
}

const KeyValDiv = styled.div`
  width: 400px;
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
