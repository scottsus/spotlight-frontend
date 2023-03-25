import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TicketInfo from '../../../lib/types/ticketInfo';
import { getProperSiteName } from '../../../lib/constants/sitenames';
import Divider from '../../general/Divider';
import { isGA } from '../../../lib/constants/classifySeat';

interface IComparisonTab {
  srcTicket: TicketInfo;
  destTicket: TicketInfo;
}

export default function ComparisonTab({
  srcTicket,
  destTicket,
}: IComparisonTab) {
  const srcSection = isGA(srcTicket.seatInfo.section)
    ? `GA`
    : srcTicket.seatInfo.section;
  const destSection = isGA(destTicket.seatInfo.section)
    ? `GA`
    : destTicket.seatInfo.section;

  const srcRow = srcSection === `GA` ? `-` : srcTicket.seatInfo.row;
  const destRow = destSection === `GA` ? `-` : destTicket.seatInfo.row;

  const totalSavings =
    srcTicket.priceInfo.totalPrice - destTicket.priceInfo.totalPrice;
  return (
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
          <ItemCell align="left">{getProperSiteName(srcTicket.site)}</ItemCell>
          <ItemCell align="right">{srcSection}</ItemCell>
          <ItemCell align="right">{srcRow}</ItemCell>
          <ItemCell align="right">
            ${srcTicket.priceInfo.totalPrice.toFixed(2)}
          </ItemCell>
        </ItemRow>
        <ItemRow>
          <ItemCell align="left">
            <SpotlightChoice>
              {getProperSiteName(destTicket.site)}
              <SmallIcon
                src={chrome.runtime.getURL(
                  `imgs/icons/small-spotlight-icon.svg`
                )}
                className="smallIcon"
              />
            </SpotlightChoice>
          </ItemCell>
          <ItemCell align="right">{destSection}</ItemCell>
          <ItemCell align="right">{destRow}</ItemCell>
          <ItemCell align="right">
            ${destTicket.priceInfo.totalPrice.toFixed(2)}
          </ItemCell>
        </ItemRow>
      </ComparisonTable>
      <Divider margin="0" width="400px" />
      <KeyVal myKey="Savings" value={totalSavings.toFixed(2)} />
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
        ${value}
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
