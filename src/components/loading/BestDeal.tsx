import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface IBestDeal {
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BestDeal({ setTagIsOpened }: IBestDeal) {
  const closeTag = () => {
    setTagIsOpened(false);
  };
  return (
    <BestDealDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={closeTag}
    >
      <Title>Congrats! The deal you have is truly the </Title>
      <Highlight>BEST DEAL</Highlight>
      <Image
        src={chrome.runtime.getURL('imgs/bestdeal.svg')}
        alt="Purple Ticket"
      />
      <Button>
        <ButtonText>Back to Checkout</ButtonText>
      </Button>
    </BestDealDiv>
  );
}

const BestDealDiv = styled(motion.div)`
  height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 23px;
  font-family: Manrope;
  font-weight: 500;
  color: black;
  text-align: center;
  margin: 30px 0 20px 0;
`;

const Highlight = styled.span`
  font-size: 37px;
  font-family: Mont;
  font-weight: 700;
  color: #51da91;
  margin: 0 0 40px 0;
`;

const Image = styled.img`
  width: 175px;
  height: 135px;
`;

const Button = styled.button`
  width: 220px;
  height: 42px;
  border-radius: 40px;
  background-color: #7a6fff;
  margin: auto 0 20px;
  :hover {
    background-color: #6354ff;
  }
`;

const ButtonText = styled.p`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 500;
  color: #ffffff;
  margin: 0 auto;
`;
