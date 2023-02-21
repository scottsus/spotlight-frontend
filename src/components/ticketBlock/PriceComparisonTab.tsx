import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ItemCost from './ItemCost';

interface IPriceComparisonTab {
  currentPrice: number;
  spotlightPrice: number;
}

export default function PriceComparisonTab({
  currentPrice,
  spotlightPrice,
}: IPriceComparisonTab) {
  return (
    <PriceComparisonDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key="PriceComparisonTab"
    >
      <YouSavedBox>
        <ItemCost text="Current Price:" cost={currentPrice} margin="3px 0" />
        <ItemCost
          text="Spotlight Price:"
          cost={spotlightPrice}
          margin="3px 0"
        />
        <Divider />
        <ItemCost
          text="You Save:"
          cost={currentPrice - spotlightPrice}
          color="#4b3bff"
          isBold
        />
      </YouSavedBox>
    </PriceComparisonDiv>
  );
}

const PriceComparisonDiv = styled(motion.div)`
  margin-top: 40px;
  padding: 5px 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const YouSavedBox = styled.div`
  width: 80%;
  border: 2px solid #dfe0e0;
  border-radius: 10px;
  padding: 10px 35px;
`;

const Divider = styled.div`
  height: 2px;
  width: 98%;
  background-color: #dfe0e0;
  border-radius: 2px;
  margin: 12px auto 8px;
`;
