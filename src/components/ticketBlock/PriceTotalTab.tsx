import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface IPriceTotalTab {
  ticketPrice: string;
  ticketQty: string;
  orderProcessingFee: string;
  serviceFee: string;
  calculatedTax: string;
}

export default function PriceTotalTab({
  ticketPrice,
  ticketQty,
  orderProcessingFee,
  serviceFee,
  calculatedTax,
}: IPriceTotalTab) {
  return (
    <PriceTotalDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key="PriceTotalDiv"
    >
      <CategoryHeader>Tickets</CategoryHeader>
      <ItemCost
        text={`Resale Ticket x ${ticketQty}`}
        cost={parseFloat(ticketPrice)}
      />

      <CategoryHeader style={{ marginTop: '5px' }}>Fees</CategoryHeader>
      <ItemCost text="Service" cost={parseFloat(serviceFee)} />
      <ItemCost
        text={'Order Processing Fee'}
        cost={parseFloat(orderProcessingFee)}
      />
      <ItemCost text="Calculated Tax" cost={parseFloat(calculatedTax)} />

      <Divider />
      <ItemCost
        text="Total"
        cost={parseFloat(ticketPrice) * parseFloat(ticketQty)}
        color="#4b3bff"
        isBold
      />
    </PriceTotalDiv>
  );
}

const PriceTotalDiv = styled(motion.div)`
  padding: 5px 35px;
`;

const CategoryHeader = styled.h3`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 700;
  color: #27292a;
  margin: 2px 0;
`;

const Divider = styled.div`
  height: 2px;
  width: 98%;
  background-color: #27292a;
  border-radius: 1px;
  margin: 14px auto 11px;
`;

interface IItemCost {
  text: string;
  cost: number;
  color?: string;
  isBold?: boolean;
}

function ItemCost({
  text,
  cost,
  color = '#5f5f5f',
  isBold = false,
}: IItemCost) {
  return (
    <ItemCostDiv>
      <Item textAlign="left" color={color} isBold={isBold}>
        {text}
      </Item>
      <Item textAlign="right" color={color} isBold={isBold}>
        ${cost.toFixed(2)}
      </Item>
    </ItemCostDiv>
  );
}

const ItemCostDiv = styled.div`
  display: flex;
`;

interface IItem {
  textAlign: string;
  color: string;
  isBold: boolean;
}

const Item = styled.p<IItem>`
  font-size: 16px;
  font-family: Manrope;
  font-weight: ${(props) => (props.isBold ? 700 : 300)};
  color: ${(props) => props.color};
  margin: 2.2px 0;
  width: 50%;
  text-align: ${(props) => props.textAlign};
`;
