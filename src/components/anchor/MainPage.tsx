import React from 'react';
import styled from 'styled-components';

interface IMainPage {
  tagIsOpened: boolean;
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MainPage({ tagIsOpened, setTagIsOpened }: IMainPage) {
  const closeTag = () => {
    setTagIsOpened(!tagIsOpened);
  };
  return (
    <MainPageDiv isVisible={tagIsOpened}>
      <Logo>spotlight</Logo>
      <Divider />
      <Steps>
        <StepBlock
          backgroundColor="#e7dffe"
          stepNumber="Step 1:"
          stepDetail="Peruse through Ticketmaster"
          stepImageUrl="imgs/step1.png"
          stepImageWidth={105}
          stepImageHeight={85}
        />

        <StepBlock
          backgroundColor="#dcecff"
          isRightToLeft
          stepNumber="Step 2:"
          stepDetail="View the best deals we find for your seat"
          stepImageUrl="imgs/step2.png"
          stepImageWidth={118}
          stepImageHeight={70}
        />

        <StepBlock
          backgroundColor="#e0ffcb"
          stepNumber="Step 1:"
          stepDetail="Save precious time and money"
          stepImageUrl="imgs/step3.png"
          stepImageWidth={64}
          stepImageHeight={72}
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
  height: 570px;
  border-radius: 10.5px;
  background-color: #ffffff;
  padding: 20px 30px;
  z-index: 10000;
  filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.26));
  overflow: hidden;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

const Logo = styled.h1`
  font-size: 30px;
  font-family: Mont;
  font-weight: 800;
  color: #4b3bff;
  letter-spacing: -0.03em;
  margin: 10px 0 0;
`;

const Divider = styled.div`
  height: 1.5px;
  background-color: #d0d0d0;
  margin: 14px 0;
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
}

function StepBlock({
  backgroundColor,
  isRightToLeft = false,
  stepNumber,
  stepDetail,
  stepImageUrl,
  stepImageWidth,
  stepImageHeight,
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
          />
        </>
      ) : (
        <>
          <StepImage
            src={chrome.runtime.getURL(stepImageUrl)}
            width={stepImageWidth}
            height={stepImageHeight}
          />
          <TextBlock>
            <StepNumber>{stepNumber}</StepNumber>
            <StepDetail>{stepDetail}</StepDetail>
          </TextBlock>
        </>
      )}
    </StepBlockDiv>
  );
}

const StepBlockDiv = styled.div<{ backgroundColor: string }>`
  width: 420px;
  height: 100px;
  border-radius: 90px;
  background-color: ${(props) => props.backgroundColor};
  margin: 9px auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextBlock = styled.div`
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
}

const StepImage = styled.img<IStepImage>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const SeeYouButton = styled.button`
  height: 46px;
  padding: 0 40px;
  background-color: #4b3bff;
  border-radius: 52px;
  margin: 30px auto 0;
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
