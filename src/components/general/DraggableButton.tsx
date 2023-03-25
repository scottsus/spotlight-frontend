import React, { useState } from 'react';
import styled from 'styled-components';

interface IDraggableButton {
  draggableMargin: string;
  dotsTop: number;
  dotsLeft: number;
}

export default function DraggableButton({
  draggableMargin,
  dotsTop,
  dotsLeft,
}: IDraggableButton) {
  const [height, setHeight] = useState(START_HEIGHT);
  const [opaqueTop, setOpaqueTop] = useState(OPAQUE_START_TOP);
  const onMouseEnter = () => {
    setHeight(END_HEIGHT);
    setOpaqueTop(50.5);
  };
  const onMouseLeave = () => {
    setHeight(START_HEIGHT);
    setOpaqueTop(OPAQUE_START_TOP);
  };
  return (
    <DraggableContainer
      draggableMargin={draggableMargin}
      dotsTop={dotsTop}
      dotsLeft={dotsLeft}
    >
      <DraggableButtonDiv
        height={height}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <DraggableDots
          src={chrome.runtime.getURL(`imgs/general/draggable-dots.svg`)}
          draggable={false}
          top={dotsTop}
          left={dotsLeft}
        />
      </DraggableButtonDiv>
      <OpaqueBox top={opaqueTop} left={dotsLeft} />
    </DraggableContainer>
  );
}

const START_HEIGHT = 8;
const END_HEIGHT = 30;

const OPAQUE_START_TOP = 28.6;

interface IDraggableContainer {
  draggableMargin: string;
}

const DraggableContainer = styled.div<IDraggableContainer>`
  height: 30px;
  margin: ${(props) => props.draggableMargin};
`;

interface IDraggableButtonDiv {
  height: number;
}

const DraggableButtonDiv = styled.div<IDraggableButtonDiv>`
  width: 75px;
  height: ${(props) => props.height}px;
  border-radius: 10px;
  background-color: #f0eeff;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: height 0.8s ease-in-out;
`;

interface IDraggableDots {
  top: number;
  left: number;
}

const DraggableDots = styled.img<IDraggableDots>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: 35px;
  height: 14px;
  z-index: 110;
`;

interface IOpaqueBox {
  top: number;
  left: number;
}

const OpaqueBox = styled.div<IOpaqueBox>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: 205px;
  //   background-color: #ffffff;
  background-color: red;
  width: 75px;
  height: 30px;
  z-index: 111;
  transition: top 0.8s ease-in-out;
`;
