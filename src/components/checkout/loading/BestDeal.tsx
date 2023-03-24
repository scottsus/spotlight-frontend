import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Header from '../../general/Header';
import Divider from '../../general/Divider';
import { gradientText } from '../../general/GradientText';

interface IBestDeal {
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BestDeal({ setTagIsOpened }: IBestDeal) {
  return (
    <BestDealDiv
      key="BestDealDiv"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Header setTagIsOpened={setTagIsOpened} logoMargin="0" />
      <Divider margin="7px 0 20px" />
      <Body>
        <GoldenTicket
          src={chrome.runtime.getURL(`imgs/checkout/golden-ticket.png`)}
        />
        <Text>
          <Congrats>Congrats! You already have the</Congrats>
          <Best>Best Ticket.</Best>
        </Text>
      </Body>
    </BestDealDiv>
  );
}

const BestDealDiv = styled(motion.div)`
  height: 380px;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  display: flex;
`;

const GoldenTicket = styled.img`
  width: 98px;
  height: 123px;
  margin: 0 20px 0 0;
`;

const Text = styled.div`
  margin: 10px 0 0 10px;
  display: flex;
  flex-direction: column;
`;

const Congrats = styled.h3`
  font-size: 24px;
  font-family: Mont;
  font-weight: 600;
  letter-spacing: -1.5px;
`;

const Best = styled.h2`
  font-size: 57px;
  font-family: Mont;
  font-weight: 700;
  ${gradientText(
    `linear-gradient(180deg, #2ef48a 0%, rgba(20, 170, 89, 0.72) 100%)`
  )}
  margin: -4px 0 0 -4px;
`;
