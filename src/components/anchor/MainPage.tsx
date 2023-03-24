import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getNameFromURL,
  getProperSiteName,
} from '../../lib/constants/sitenames';

import Header from '../general/Header';
import Divider from '../general/Divider';

interface IMainPage {
  tagIsOpened: boolean;
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MainPage({ tagIsOpened, setTagIsOpened }: IMainPage) {
  const [website, setWebsite] = useState('');
  const closeTag = () => {
    setTagIsOpened(!tagIsOpened);
  };
  useEffect(() => {
    const siteName = getNameFromURL(document.URL);
    setWebsite(`Peruse through ${getProperSiteName(siteName)}.`);
  });
  return (
    <MainPageDiv isVisible={tagIsOpened}>
      <Header setTagIsOpened={setTagIsOpened} logoMargin="10px 0 0" />
      <Divider margin="14px 0 18px" />
      <Steps>
        <StepBlock
          backgroundColor="#e7dffe"
          stepNumber="Step 1:"
          stepDetail={website}
          stepImageUrl="imgs/anchor/step1.png"
          stepImageWidth={100}
          stepImageHeight={90}
          stepImageMargin="0 -10px 10px 0"
        />

        <StepBlock
          backgroundColor="#dcecff"
          isRightToLeft
          stepNumber="Step 2:"
          stepDetail="View the best deals we find for your seat."
          stepImageUrl="imgs/anchor/step2.png"
          stepImageWidth={118}
          stepImageHeight={70}
          stepImageMargin="0"
        />

        <StepBlock
          backgroundColor="#e0ffcb"
          stepNumber="Step 3:"
          stepDetail="Save precious time and money."
          stepImageUrl="imgs/anchor/step3.png"
          stepImageWidth={58}
          stepImageHeight={72}
          stepImageMargin="0 10px 0 0"
        />
      </Steps>
      <SeeYouButton onClick={closeTag}>
        <ButtonText>See you at checkout!</ButtonText>
      </SeeYouButton>
    </MainPageDiv>
  );
}

const MainPageDiv = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 70px;
  right: 10px;
  width: 480px;
  height: 540px;
  border-radius: 10.5px;
  background-color: #ffffff;
  padding: 20px 30px;
  z-index: 10000;
  filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.26));
  overflow: hidden;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IStepBlock {
  backgroundColor: string;
  isRightToLeft?: boolean;
  stepNumber: string;
  stepDetail: string;
  stepImageUrl: string;
  stepImageWidth: number;
  stepImageHeight: number;
  stepImageMargin: string;
}

function StepBlock({
  backgroundColor,
  isRightToLeft = false,
  stepNumber,
  stepDetail,
  stepImageUrl,
  stepImageWidth,
  stepImageHeight,
  stepImageMargin,
}: IStepBlock) {
  return (
    <StepBlockDiv backgroundColor={backgroundColor}>
      {!isRightToLeft ? (
        <>
          <TextBlock>
            <StepNumber>{stepNumber}</StepNumber>
            <StepDetail>{stepDetail}</StepDetail>
          </TextBlock>
          <StepImage
            src={chrome.runtime.getURL(stepImageUrl)}
            width={stepImageWidth}
            height={stepImageHeight}
            margin={stepImageMargin}
          />
        </>
      ) : (
        <>
          <StepImage
            src={chrome.runtime.getURL(stepImageUrl)}
            width={stepImageWidth}
            height={stepImageHeight}
          />
          <TextBlock style={{ margin: '0 0 0 30px' }}>
            <StepNumber>{stepNumber}</StepNumber>
            <StepDetail>{stepDetail}</StepDetail>
          </TextBlock>
        </>
      )}
    </StepBlockDiv>
  );
}

const StepBlockDiv = styled.div<{ backgroundColor: string }>`
  width: 424px;
  height: 100px;
  border-radius: 20px;
  background-color: transparent;
  border: 1.5px solid #dfe0e0;
  margin: 7px auto;
  padding: 0 40px;
  display: flex;
  justify-content: start;
  align-items: center;
  // :hover {
  //   background-color: #ebe9ff;
  // }
`;

const TextBlock = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const StepNumber = styled.h2`
  font-size: 20px;
  font-family: Manrope;
  font-weight: 600;
`;

const StepDetail = styled.p`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 400;
`;

interface IStepImage {
  width: number;
  height: number;
  margin: string;
}

const StepImage = styled.img<IStepImage>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin};
`;

const SeeYouButton = styled.button`
  height: 46px;
  padding: 0 40px;
  background-color: #4b3bff;
  border-radius: 52px;
  margin: 20px auto 0;
  display: block;
  :hover {
    background-color: #7a6fff;
  }
`;

const ButtonText = styled.h3`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 500;
  color: #ffffff;
`;
