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
      <XButton setTagIsOpened={setTagIsOpened} />
      <Divider />
      <Steps>
        <StepBlock
          backgroundColor="#e7dffe"
          stepNumber="Step 1:"
          stepDetail="Peruse through Ticketmaster"
          stepImageUrl="imgs/step1.png"
          stepImageWidth={100}
          stepImageHeight={90}
          stepImageMargin="0 -10px 10px 0"
        />

        <StepBlock
          backgroundColor="#dcecff"
          isRightToLeft
          stepNumber="Step 2:"
          stepDetail="View the best deals we find for your seat"
          stepImageUrl="imgs/step2.png"
          stepImageWidth={118}
          stepImageHeight={70}
          stepImageMargin="0"
        />

        <StepBlock
          backgroundColor="#e0ffcb"
          stepNumber="Step 3:"
          stepDetail="Save precious time and money"
          stepImageUrl="imgs/step3.png"
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
  height: 555px;
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
  margin: 14px 0 18px;
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
  width: 420px;
  height: 100px;
  border-radius: 20px;
  background-color: transparent;
  border: 1.3px solid #dfe0e0;
  margin: 9px auto;
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
  margin: 24px auto 0;
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

interface IXButton {
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function XButton({ setTagIsOpened }: IXButton) {
  return (
    <XButtonContainer onClick={() => setTagIsOpened(false)}>
      <Image src={chrome.runtime.getURL('imgs/X Button.svg')} />
    </XButtonContainer>
  );
}

const XButtonContainer = styled.button`
  position: absolute;
  top: 4%;
  right: 3%;
  border: none;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 15px;
  :hover {
    background-color: #f1f1f1;
  }
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
`;
